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
  if (!includeCsv)
    return { album: true, audio: true, lyrics: true, stats: true };
  const parts = String(includeCsv)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const include = {};
  const allowed = ["album", "audio", "lyrics", "stats"];
  for (const p of parts) if (allowed.includes(p)) include[p] = true;
  // ensure defaults
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

exports.tracksTrackIdAudioPOST = async function (trackId) {
  // This endpoint would normally accept multipart/form-data or a JSON body with audio metadata/url
  // For simplicity we expect JSON in body-like form (not available here). We'll implement a minimal helper
  throw new Error(
    "Not implemented: use tracksTrackIdAudioPOST with request body in controllers to supply audio data"
  );
};

exports.tracksTrackIdLyricsPOST = async function (body, trackId) {
  // Upsert lyrics for a given track
  const t = await prisma.track.findUnique({ where: { id: trackId } });
  if (!t) {
    const err = new Error(`Track with id ${trackId} not found`);
    err.status = 400;
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

exports.tracksTrackIdGET = async function (trackId, include) {
  const track = await prisma.track.findUnique({
    where: { id: trackId },
    include: buildInclude(include),
  });
  if (!track) {
    const err = new Error("Track not found");
    err.status = 404;
    throw err;
  }
  return { data: track };
};

/**
 * Subir o actualizar archivo de audio
 *
 * trackId UUID
 * returns TrackResponse
 **/
exports.tracksTrackIdAudioPOST = function (trackId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: {
        createdAt: "2000-01-23T04:56:07.000+00:00",
        trackNumber: 5,
        stats: {
          playCount: 7,
        },
        album: {
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          title: "title",
        },
        id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        audio: {
          codec: "codec",
          bitrate: 2,
          url: "http://example.com/aeiou",
        },
        title: "title",
        durationSec: 5,
        lyrics: {
          language: "language",
          text: "text",
        },
        updatedAt: "2000-01-23T04:56:07.000+00:00",
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Listar comentarios de una pista
 *
 * trackId UUID
 * page Integer  (optional)
 * limit Integer  (optional)
 * returns PaginatedCommentList
 **/
exports.tracksTrackIdCommentsGET = function (trackId, page, limit) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: [
        {
          createdAt: "2000-01-23T04:56:07.000+00:00",
          targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          replies: [null, null],
          rating: 1,
          targetType: "album",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          text: "text",
          userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          status: "visible",
          likes: 6,
          updatedAt: "2000-01-23T04:56:07.000+00:00",
        },
        {
          createdAt: "2000-01-23T04:56:07.000+00:00",
          targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          replies: [null, null],
          rating: 1,
          targetType: "album",
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          text: "text",
          userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          status: "visible",
          likes: 6,
          updatedAt: "2000-01-23T04:56:07.000+00:00",
        },
      ],
      meta: {
        total: 123,
        limit: 20,
        page: 1,
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Comentar en una pista
 *
 * body CommentCreateInput
 * trackId UUID
 * returns CommentResponse
 **/
exports.tracksTrackIdCommentsPOST = function (body, trackId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: {
        createdAt: "2000-01-23T04:56:07.000+00:00",
        targetId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        replies: [null, null],
        rating: 1,
        targetType: "album",
        id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        text: "text",
        userId: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        status: "visible",
        likes: 6,
        updatedAt: "2000-01-23T04:56:07.000+00:00",
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Eliminar pista
 *
 * trackId UUID
 * no response value expected for this operation
 **/
exports.tracksTrackIdDELETE = function (trackId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

/**
 * Detalle de pista
 *
 * trackId UUID
 * include List Campos relacionados a incluir, separados por coma. Ej. `tracks,label,stats` (optional)
 * returns TrackResponse
 **/
exports.tracksTrackIdGET = async function (trackId, include) {
  const track = await prisma.track.findUnique({
    where: { id: trackId },
    include: buildInclude(include),
  });
  if (!track) {
    const err = new Error('Track not found');
    err.status = 404;
    throw err;
  }
  return { data: track };
};

/**
 * Añadir o actualizar letras
 *
 * body TrackId_lyrics_body
 * trackId UUID
 * returns TrackResponse
 **/
exports.tracksTrackIdLyricsPOST = function (body, trackId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      data: {
        createdAt: "2000-01-23T04:56:07.000+00:00",
        trackNumber: 5,
        stats: {
          playCount: 7,
        },
        album: {
          id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
          title: "title",
        },
        id: "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        audio: {
          codec: "codec",
          bitrate: 2,
          url: "http://example.com/aeiou",
        },
        title: "title",
        durationSec: 5,
        lyrics: {
          language: "language",
          text: "text",
        },
        updatedAt: "2000-01-23T04:56:07.000+00:00",
      },
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Actualizar parcialmente una pista
 *
 * body TrackUpdateInput
 * trackId UUID
 * returns TrackResponse
 **/
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
 * URL de streaming/preview (redirección 302 o URL firmada)
 *
 * trackId UUID
 * returns inline_response_200
 **/
exports.tracksTrackIdStreamGET = function (trackId) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      url: "http://example.com/aeiou",
      expiresAt: "2000-01-23T04:56:07.000+00:00",
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
