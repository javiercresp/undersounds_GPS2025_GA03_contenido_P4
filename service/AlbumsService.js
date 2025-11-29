// service/AlbumsService.js
"use strict";

// -------- PRISMA ROBUST LOADER --------
let prisma;
try {
  const prismaModule = require("../src/db/prisma");
  prisma = prismaModule?.prisma || prismaModule?.default || prismaModule;
  if (!prisma) {
    const { PrismaClient } = require("@prisma/client");
    prisma = new PrismaClient();
  }
} catch (e) {
  const { PrismaClient } = require("@prisma/client");
  prisma = new PrismaClient();
}
console.log("[AlbumsService] Prisma loaded =", !!prisma);

// -------- HELPERS --------
const toInt = (v, def) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : def;
};

const buildInclude = (includeCsv) => {
  if (!includeCsv) return undefined;
  const parts = String(includeCsv)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const include = {};
  const allowed = ["tracks", "stats", "cover"];
  for (const p of parts) if (allowed.includes(p)) include[p] = true;
  return Object.keys(include).length ? include : undefined;
};

// SQLite workaround: Prisma `mode: 'insensitive'` is not supported on SQLite.
// Use simple `contains` and rely on variant generation to cover cases.
const like = (q) => ({ contains: String(q || '') });

// Helpers to normalize genre variants similar to TracksService
const stripDiacritics = (s) =>
  (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const stripPunctuation = (s) => (s || '').replace(/[\p{P}\p{S}]/gu, '');

const sepVariants = (s) => [
  s,
  s.replace(/\s+/g, ' ').trim(),
  s.replace(/\s+/g, '-'),
  s.replace(/-/g, ' '),
  s.replace(/[\s-]+/g, ''), // fused: "hip hop" -> "hiphop"
];

const toTitleCase = (s) =>
  s
    .split(/([\s-]+)/)
    .map((part) => (/^[\s-]+$/.test(part) ? part : (part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())))
    .join('');

// ----------------- COMMENTS -----------------

exports.albumsAlbumIdCommentsGET = async function (albumId, page, limit) {
  const pageNum = toInt(page, 1);
  const pageSize = toInt(limit, 20);
  const skip = (pageNum - 1) * pageSize;

  const where = { targetType: "album", targetId: albumId };

  const [data, total] = await Promise.all([
    prisma.comment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.comment.count({ where }),
  ]);

  return { data, meta: { total, page: pageNum, limit: pageSize } };
};

exports.albumsAlbumIdCommentsPOST = async function (body, albumId) {
  const created = await prisma.comment.create({
    data: {
      targetType: "album",
      targetId: albumId,
      text: body?.text ?? null,
      rating: body?.rating ?? null,
      userId: body?.userId ?? null,
      status: "visible",
    },
  });
  return { data: created };
};

// ----------------- COVER -----------------

exports.albumsAlbumIdCoverPOST = async function (albumId /*, body */) {
  const createdImage = await prisma.image.create({
    data: {
      url: "",
      alt: "cover",
      width: null,
      height: null,
    },
  });

  const updated = await prisma.album.update({
    where: { id: albumId },
    data: { coverId: createdImage.id },
    include: {
      cover: true,
      tracks: true,
      stats: true,
    },
  });

  return { data: updated };
};

// ----------------- CRUD ÁLBUM -----------------

exports.albumsAlbumIdDELETE = async function (albumId) {
  // Always perform irreversible delete server-side.
  // Delete album and related tracks and dependent records in a transaction.

  // Load album with its tracks and cover
  const album = await prisma.album.findUnique({
    where: { id: albumId },
    include: { tracks: { select: { id: true } }, cover: true },
  });

  if (!album) {
    const err = new Error("Álbum no encontrado");
    err.status = 404;
    throw err;
  }

  const trackIds = (album.tracks || []).map((t) => t.id);
  const coverId = album.coverId;

  try {
    // Use interactive transaction to run ordered deletes and get clearer errors
    await prisma.$transaction(async (tx) => {
      console.log('[albumsAlbumIdDELETE] starting transaction for album', albumId);

      // 1) Delete comments referencing the album
      console.log('[albumsAlbumIdDELETE] deleting album comments');
      await tx.comment.deleteMany({ where: { targetType: "album", targetId: albumId } });

      if (trackIds.length) {
        console.log('[albumsAlbumIdDELETE] deleting comments for tracks:', trackIds);
        await tx.comment.deleteMany({ where: { targetType: "track", targetId: { in: trackIds } } });

        console.log('[albumsAlbumIdDELETE] deleting favorites for tracks');
        // favorites store targetType/targetId, remove favorites that point to these tracks
        await tx.favorite.deleteMany({ where: { targetType: 'track', targetId: { in: trackIds } } });

        console.log('[albumsAlbumIdDELETE] deleting trackStats for tracks');
        await tx.trackStats.deleteMany({ where: { trackId: { in: trackIds } } });

        console.log('[albumsAlbumIdDELETE] deleting audio objects for tracks');
        await tx.audio.deleteMany({ where: { trackId: { in: trackIds } } });

        console.log('[albumsAlbumIdDELETE] deleting lyrics for tracks');
        await tx.lyrics.deleteMany({ where: { trackId: { in: trackIds } } });

        console.log('[albumsAlbumIdDELETE] deleting tracks');
        await tx.track.deleteMany({ where: { albumId: albumId } });
      }

      console.log('[albumsAlbumIdDELETE] deleting albumStats');
      await tx.albumStats.deleteMany({ where: { albumId: albumId } });

      console.log('[albumsAlbumIdDELETE] deleting album record');
      await tx.album.delete({ where: { id: albumId } });

      if (coverId) {
        console.log('[albumsAlbumIdDELETE] deleting cover image', coverId);
        await tx.image.delete({ where: { id: coverId } });
      }

      console.log('[albumsAlbumIdDELETE] transaction complete for album', albumId);
    });

    return;
  } catch (err) {
    console.error('[albumsAlbumIdDELETE] transaction error for album', albumId, err?.code || '', err?.meta || '', err?.message || err);
    // If Prisma reports P2025 (record not found) we can translate to 404, otherwise 500
    const e = new Error(err?.message || 'Failed to delete album');
    e.status = err?.code === 'P2025' ? 404 : 500;
    throw e;
  }
};

exports.albumsAlbumIdGET = async function (albumId, include) {
  console.log('[albumsAlbumIdGET] albumId=', albumId, 'include=', include);
  const includeObj = buildInclude(include);
  console.log('[albumsAlbumIdGET] includeObj=', includeObj);
  const album = await prisma.album.findUnique({
    where: { id: albumId },
    include: includeObj,
  });
  console.log('[albumsAlbumIdGET] album=', album);
  if (!album) {
    const err = new Error("Álbum no encontrado");
    err.status = 404;
    throw err;
  }
  return { data: album };
};

// ----------------- PATCH ÁLBUM -----------------

exports.albumsAlbumIdPATCH = async function (body, albumId) {
  const patch = {
    title: body?.title,
    description: body?.description,
    price: body?.price,
    currency: body?.currency,
    releaseDate: body?.releaseDate ? new Date(body.releaseDate) : undefined,
    releaseState: body?.releaseState,
  };

  // Normaliza genres/tags según tu esquema (aquí asumimos CSV en BD)
  if (Object.prototype.hasOwnProperty.call(body ?? {}, "genres")) {
    patch.genres = Array.isArray(body.genres)
      ? body.genres.join(",")
      : typeof body.genres === "string"
      ? body.genres
      : "";
  }
  if (Object.prototype.hasOwnProperty.call(body ?? {}, "tags")) {
    patch.tags = Array.isArray(body.tags)
      ? body.tags.join(",")
      : typeof body.tags === "string"
      ? body.tags
      : "";
  }

  Object.keys(patch).forEach((k) => patch[k] === undefined && delete patch[k]);

  try {
    const updated = await prisma.album.update({
      where: { id: albumId },
      data: patch,
      include: {
        tracks: true,
        stats: true,
        cover: true,
      },
    });

    return { data: updated };
  } catch (err) {
    console.error('[albumsAlbumIdPATCH] error for albumId=', albumId, err?.code || '', err?.meta || '', err?.message || err);
    // Return a structured error payload so the controller can respond with useful info
    return { data: { message: 'Failed to update album', error: err?.message || String(err) }, status: 500 };
  }
};

// ----------------- POST ÁLBUM -----------------

exports.albumsPOST = async function (body) {
  console.log("[albumsPOST] body =", body);
  try {
    const {
      title,
      description = null,
      releaseDate = null,
      releaseState = null,
      price = null,
      currency = null,
      genres = [], // llega array por OpenAPI
      tags = [], // llega array por OpenAPI
      artistId,
      labelId,
      // coverId, coverUrl, coverAlt, coverWidth, coverHeight
    } = body || {};

    if (!title) return { data: { message: "title is required" }, status: 400 };
    if (!artistId)
      return { data: { message: "artistId is required" }, status: 400 };

    // Convierte artistId a string
    const artistIdStr = String(artistId).trim();

    // Ajusta a tu esquema de BD:
    // Si en Prisma genres/tags son String CSV:
    const genresStr = Array.isArray(genres)
      ? genres.filter(Boolean).join(",")
      : "";
    const tagsStr = Array.isArray(tags) ? tags.filter(Boolean).join(",") : "";

    const data = {
      title,
      description,
      releaseDate: releaseDate ? new Date(releaseDate) : null,
      price,
      currency,
      releaseState: releaseState || "draft",
      genres: genresStr, // si usas arrays en BD, guarda 'genres' directamente
      tags: tagsStr, // idem
      artistId: artistIdStr, // Almacenar directamente como string, sin conexión forzada
    };

    // Label es opcional
    if (labelId) {
      data.labelId = String(labelId).trim();
    }

    // Portada: si tu relación cover es obligatoria, crea una mínima.
    // Si no lo es, comenta esto.
    data.cover = { create: { url: "", alt: "cover", width: 0, height: 0 } };

    const created = await prisma.album.create({ data });
    return { data: created, status: 201 };
  } catch (err) {
    console.error("[albumsPOST] error", err?.code, err?.meta, err);
    return { data: { message: "Internal Server Error" }, status: 500 };
  }
};

// ----------------- TRACKS -----------------

exports.albumsAlbumIdTracksPOST = async function (body, albumId) {
  try {
    const tracksIn = Array.isArray(body?.tracks) ? body.tracks : [];

    // No obligamos a enviar pistas: si no hay, devolvemos el álbum tal cual
    if (!tracksIn.length) {
      const out = await prisma.album.findUnique({
        where: { id: albumId },
        include: {
          tracks: true,
          stats: true,
          cover: true,
        },
      });
      return { data: out, status: 200 };
    }

    // Cargamos el álbum para heredar relaciones
    const album = await prisma.album.findUnique({
      where: { id: albumId },
      select: { id: true, artistId: true, labelId: true },
    });
    if (!album) return { data: { message: "Album not found" }, status: 404 };

    // Verificamos si el label realmente existe (por si te lo inventaste)
    let labelExists = false;
    if (album.labelId) {
      const lab = await prisma.label.findUnique({
        where: { id: album.labelId },
        select: { id: true },
      });
      labelExists = !!lab;
    }

    const clean = (s) => (typeof s === "string" ? s.trim() : "");
    const toCreate = tracksIn
      .map((t, i) => ({
        title: clean(t?.title),
        trackNumber: t?.trackNumber ?? i + 1,
        durationSec: t?.durationSec ?? null,
      }))
      .filter((t) => t.title);

    if (!toCreate.length) {
      const out = await prisma.album.findUnique({
        where: { id: albumId },
        include: {
          tracks: true,
          stats: true,
          cover: true,
        },
      });
      return { data: out, status: 200 };
    }

    await prisma.$transaction(
      toCreate.map((t) =>
        prisma.track.create({
          data: {
            title: t.title,
            trackNumber: t.trackNumber,
            durationSec: t.durationSec,
            album: { connect: { id: album.id } }, // siempre
            ...(album.artistId
              ? { artist: { connect: { id: album.artistId } } }
              : {}),
            ...(labelExists
              ? { label: { connect: { id: album.labelId } } }
              : {}),
          },
        })
      )
    );

    const updated = await prisma.album.findUnique({
      where: { id: albumId },
      include: {
        tracks: true,
        stats: true,
        cover: true,
      },
    });

    return { data: updated, status: 201 };
  } catch (err) {
    console.error("[albumsAlbumIdTracksPOST] error", err?.code, err?.meta, err);
    return { data: { message: "Internal Server Error" }, status: 500 };
  }
};

exports.albumsAlbumIdTracksTrackIdDELETE = async function (albumId, trackId) {
  await prisma.track.delete({ where: { id: trackId } });
  return;
};

// ----------------- LISTADOS -----------------

exports.albumsGET = async function (
  page,
  limit,
  include,
  artistId,
  labelId,
  genre,
  tag,
  releaseState,
  q
) {
  const pageNum = toInt(page, 1);
  const pageSize = toInt(limit, 20);
  const skip = (pageNum - 1) * pageSize;

  const where = {};
  if (artistId) where.artistId = artistId;
  if (labelId) where.labelId = labelId;
  if (releaseState) where.releaseState = releaseState;

  // Build AND conditions to combine multiple filters cleanly
  const andConds = [];

  // Género: generar variantes (espacios, guiones, fusionado) y casos
  if (genre && String(genre).trim()) {
    const gRaw = String(genre).trim();
    const gClean = stripPunctuation(stripDiacritics(gRaw));

    const base = [
      ...sepVariants(gRaw),
      ...sepVariants(gClean),
    ];
    const withCase = base.flatMap((v) => [
      v,
      v.toLowerCase(),
      v.toUpperCase(),
      toTitleCase(v),
    ]);
    const variants = Array.from(new Set(withCase)).filter(Boolean);

    // Combine variants with OR; each uses simple contains (no mode flag)
    andConds.push({ OR: variants.map((v) => ({ genres: { contains: v } })) });
  }

  // Tag: coincide dentro del CSV de tags (insensible a mayúsculas)
  if (tag && String(tag).trim()) {
    andConds.push({ tags: like(String(tag).trim()) });
  }

  // Búsqueda de texto libre en título o descripción
  if (q && String(q).trim()) {
    andConds.push({ OR: [{ title: like(q) }, { description: like(q) }] });
  }

  if (andConds.length) {
    where.AND = andConds;
  }

  const [rows, total] = await Promise.all([
    prisma.album.findMany({
      where,
      include: buildInclude(include),
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.album.count({ where }),
  ]);

  return { data: rows, meta: { total, page: pageNum, limit: pageSize } };
};

exports.labelsLabelIdAlbumsGET = async function (labelId, page, limit) {
  const pageNum = toInt(page, 1);
  const pageSize = toInt(limit, 20);
  const skip = (pageNum - 1) * pageSize;

  const where = { labelId };

  const [rows, total] = await Promise.all([
    prisma.album.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.album.count({ where }),
  ]);

  return { data: rows, meta: { total, page: pageNum, limit: pageSize } };
};
