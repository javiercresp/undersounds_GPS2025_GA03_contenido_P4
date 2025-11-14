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
  const allowed = ["tracks", "label", "stats", "artist", "cover"];
  for (const p of parts) if (allowed.includes(p)) include[p] = true;
  return Object.keys(include).length ? include : undefined;
};

const like = (q) => ({ contains: q.toLowerCase() });

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
      label: true,
      stats: true,
      artist: true,
    },
  });

  return { data: updated };
};

// ----------------- CRUD ÁLBUM -----------------

exports.albumsAlbumIdDELETE = async function (albumId, hard) {
  if (hard === true) {
    await prisma.album.delete({ where: { id: albumId } });
    return;
  }
  await prisma.album.update({
    where: { id: albumId },
    data: { releaseState: "archived" },
  });
};

exports.albumsAlbumIdGET = async function (albumId, include) {
  const album = await prisma.album.findUnique({
    where: { id: albumId },
    include: buildInclude(include),
  });
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

  const updated = await prisma.album.update({
    where: { id: albumId },
    data: patch,
    include: {
      tracks: true,
      label: true,
      stats: true,
      artist: true,
      cover: true,
    },
  });

  return { data: updated };
};

// ----------------- POST ÁLBUM -----------------

exports.albumsPOST = async function (body) {
  console.log("[albumsPOST] body =", body);
  try {
    const {
      title,
      description = null,
      releaseDate = null,
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
    if (!labelId)
      return { data: { message: "labelId is required" }, status: 400 };

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
      releaseState: "draft",
      genres: genresStr, // si usas arrays en BD, guarda 'genres' directamente
      tags: tagsStr, // idem
      artist: { connect: { id: artistId } },
      label: { connect: { id: labelId } },
    };

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
          label: true,
          stats: true,
          artist: true,
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
          label: true,
          stats: true,
          artist: true,
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
        label: true,
        stats: true,
        artist: true,
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

  // Si usas CSV en BD:
  if (genre) where.genres = like(genre);
  if (tag) where.tags = like(tag);

  if (q) where.OR = [{ title: like(q) }, { description: like(q) }];

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
