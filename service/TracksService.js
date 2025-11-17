"use strict";

// PRISMA ROBUST LOADER (similar pattern to AlbumsService)
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

const toInt = (v, def) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : def;
};

const buildInclude = (includeCsv) => {
  const allowed = ["album", "audio", "lyrics", "stats"];
  // Default: include all relations
  if (!includeCsv) {
    const d = {};
    for (const a of allowed) d[a] = true;
    return d;
  }

  // Normalize input: accept CSV string, array, or single string
  let parts = [];
  if (Array.isArray(includeCsv)) {
    parts = includeCsv.map(String).map((s) => s.trim()).filter(Boolean);
  } else if (typeof includeCsv === 'string') {
    parts = includeCsv.split(',').map((s) => s.trim()).filter(Boolean);
  } else if (includeCsv && typeof includeCsv === 'object') {
    // If router provides an object (sometimes frameworks do), extract keys
    parts = Object.keys(includeCsv).map(String).map((s) => s.trim()).filter(Boolean);
  } else {
    parts = [String(includeCsv)];
  }

  const include = {};
  for (const p of parts) {
    if (allowed.includes(p)) include[p] = true;
  }
  // ensure defaults (explicit booleans expected by Prisma)
  for (const a of allowed) if (include[a] === undefined) include[a] = false;
  return include;
};

const like = (q) => ({ contains: q, mode: "insensitive" });

exports.tracksGET = async function (
  page,
  limit,
  include,
  albumId,
  artistId,
  labelId,
  genre,
  tag,
  language,
  minDurationSec,
  maxDurationSec,
  releasedFrom,
  releasedTo,
  sort,
  order,
  q
) {
  const pageNum = toInt(page, 1);
  const pageSize = toInt(limit, 20);
  const skip = (pageNum - 1) * pageSize;

  // Filtrado

  const trackFilters = {};
  if (q) {
    trackFilters.title = { contains: q };
  }

  const min = Number(minDurationSec);
  const max = Number(maxDurationSec);

  const durationFilter = {};
  if (!isNaN(min)) durationFilter.gte = min;
  if (!isNaN(max)) durationFilter.lte = max;

  if (Object.keys(durationFilter).length > 0) {
    trackFilters.durationSec = durationFilter;
  }

  const albumFilters = {};
  if (genre) albumFilters.genres = { contains: genre, mode: "insensitive" };
  if (releasedFrom || releasedTo) {
    albumFilters.releaseDate = {};
    if (releasedFrom) albumFilters.releaseDate.gte = new Date(releasedFrom);
    if (releasedTo) albumFilters.releaseDate.lte = new Date(releasedTo);
  }

  let albumWhere = Object.keys(albumFilters).length ? { ...albumFilters } : {};

  const where = {
    ...trackFilters,
    ...(Object.keys(albumWhere).length ? { album: albumWhere } : {}),
  };

  // Ordenación
  const validSortFields = ["durationSec", "title", "createdAt"];
  const validOrder = ["asc", "desc"];

  const sortField = validSortFields.includes(sort) ? sort : "createdAt";
  const sortOrder = validOrder.includes(order) ? order : "desc";

  const [rows, total] = await Promise.all([
    prisma.track.findMany({
      where,
      include: buildInclude(include),
      orderBy: { [sortField]: sortOrder },
      skip,
      take: pageSize,
    }),
    prisma.track.count({ where }),
  ]);

  return { data: rows, meta: { total, page: pageNum, limit: pageSize } };
};

exports.tracksPOST = async function (body) {
  console.log("[tracksPOST] body =", body);

  // albumId is required: a track must belong to an existing album
  if (!body?.albumId) {
    const err = new Error("albumId is required to create a track");
    err.status = 400;
    throw err;
  }

  const album = await prisma.album.findUnique({ where: { id: body.albumId } });
  if (!album) {
    const err = new Error(`Album with id ${body.albumId} not found`);
    err.status = 400;
    throw err;
  }

  const data = {
    title: body?.title ?? "untitled",
    durationSec: body?.durationSec ?? null,
    trackNumber: body?.trackNumber ?? null,
    album: { connect: { id: body.albumId } },
  };

  // audio (optional)
  if (body?.audio) {
    data.audio = {
      create: {
        codec: body.audio.codec ?? null,
        bitrate: body.audio.bitrate ?? null,
        url: body.audio.url ?? "",
      },
    };
  }

  // lyrics (optional)
  if (body?.lyrics) {
    data.lyrics = {
      create: {
        language: body.lyrics.language ?? null,
        text: body.lyrics.text ?? "",
      },
    };
  }

  const created = await prisma.track.create({
    data,
    include: { album: true, audio: true, lyrics: true, stats: true },
  });
  return { data: created };
};

exports.tracksTrackIdGET = async function (trackId, include) {
  const includeOptions = buildInclude(include) || {};

  // Asegura que siempre traigamos las estadísticas para exponer el playCount
  includeOptions.stats = true;

  const track = await prisma.track.findUnique({
    where: { id: trackId },
    include: includeOptions,
  });

  if (!track) {
    const err = new Error("Track not found");
    err.status = 404;
    throw err;
  }

  return { data: track };
};



exports.tracksTrackIdPATCH = async function (body, trackId) {
  try {
    const patch = {};
    if (Object.prototype.hasOwnProperty.call(body ?? {}, 'title')) patch.title = body.title;
    if (Object.prototype.hasOwnProperty.call(body ?? {}, 'durationSec')) patch.durationSec = body.durationSec ? Number(body.durationSec) : null;
    if (Object.prototype.hasOwnProperty.call(body ?? {}, 'trackNumber')) patch.trackNumber = body.trackNumber ? Number(body.trackNumber) : null;

    Object.keys(patch).forEach(k => patch[k] === undefined && delete patch[k]);

    if (Object.keys(patch).length === 0) {
      return { data: { message: 'No fields to update' }, status: 400 };
    }

    const updated = await prisma.track.update({
      where: { id: trackId },
      data: patch,
      include: { album: true, audio: true, lyrics: true, stats: true },
    });
    return { data: updated };
  } catch (err) {
    console.error('[tracksTrackIdPATCH] error', err?.message || err);
    return { data: { message: err?.message || 'Internal Server Error' }, status: 500 };
  }
};

/**
 * Eliminar pista
 */
exports.tracksTrackIdDELETE = async function (trackId) {
  try {
    await prisma.track.delete({ where: { id: trackId } });
    return { data: { message: 'Track deleted' } };
  } catch (err) {
    const e = new Error(err.message || 'Failed to delete track');
    e.status = err.code === 'P2025' ? 404 : 500;
    throw e;
  }
};

/**
 * URL de streaming/preview
 */
exports.tracksTrackIdStreamGET = async function (trackId) {
  const track = await prisma.track.findUnique({ 
    where: { id: trackId }, 
    include: { audio: true } 
  });
  if (!track) {
    const err = new Error('Track not found');
    err.status = 404;
    throw err;
  }
  if (!track.audio || !track.audio.url) {
    const err = new Error('No audio available for this track');
    err.status = 404;
    throw err;
  }
  return { url: track.audio.url, expiresAt: null };
};

/**
 * URL de streaming/preview
 */
exports.tracksTrackIdStreamGET = async function (trackId) {
  const track = await prisma.track.findUnique({ 
    where: { id: trackId }, 
    include: { audio: true } 
  });
  if (!track) {
    const err = new Error('Track not found');
    err.status = 404;
    throw err;
  }
  if (!track.audio || !track.audio.url) {
    const err = new Error('No audio available for this track');
    err.status = 404;
    throw err;
  }
  return { url: track.audio.url, expiresAt: null };
};

/**
 * Subir o actualizar audio de una pista
 */
exports.tracksTrackIdAudioPOST = async function (trackId, body) {
  if (!body || !body.url) {
    const err = new Error('Audio URL is required');
    err.status = 400;
    throw err;
  }

  const track = await prisma.track.findUnique({ where: { id: trackId } });
  if (!track) {
    const err = new Error('Track not found');
    err.status = 404;
    throw err;
  }

  const upserted = await prisma.track.update({
    where: { id: trackId },
    data: {
      audio: {
        upsert: {
          create: {
            codec: body.codec ?? null,
            bitrate: body.bitrate ?? null,
            url: body.url,
          },
          update: {
            codec: body.codec ?? null,
            bitrate: body.bitrate ?? null,
            url: body.url,
          },
        },
      },
    },
    include: { audio: true },
  });
  return { data: upserted };
};

/**
 * Añadir o actualizar letras
 */
exports.tracksTrackIdLyricsPOST = async function (body, trackId) {
  const track = await prisma.track.findUnique({ where: { id: trackId } });
  if (!track) {
    const err = new Error(`Track with id ${trackId} not found`);
    err.status = 404;
    throw err;
  }

  const upserted = await prisma.track.update({
    where: { id: trackId },
    data: {
      lyrics: {
        upsert: {
          create: { language: body.language ?? null, text: body.text ?? "" },
          update: { language: body.language ?? null, text: body.text ?? "" },
        },
      },
    },
    include: { lyrics: true },
  });
  return { data: upserted };
};

/**
 * Listar comentarios de una pista
 */
exports.tracksTrackIdCommentsGET = async function (trackId, page, limit) {
  // TODO: Implementar cuando exista la tabla de comentarios
  return { 
    data: [],
    meta: { total: 0, page: 1, limit: 20 }
  };
};

/**
 * Comentar en una pista
 */
exports.tracksTrackIdCommentsPOST = async function (body, trackId) {
  // TODO: Implementar cuando exista la tabla de comentarios
  const err = new Error('Comments not yet implemented');
  err.status = 501;
  throw err;
};

/**
 * Obtener estadísticas de reproducción de una pista
 */
exports.tracksTrackIdStatsGET = async function (trackId) {
  const track = await prisma.track.findUnique({
    where: { id: trackId },
    include: { stats: true }
  });

  if (!track) {
    const err = new Error('Track not found');
    err.status = 404;
    throw err;
  }

  if (!track.stats) {
    return { 
      data: { 
        id: null,
        playCount: 0,
        trackId: trackId
      } 
    };
  }

  return { data: track.stats };
};
