"use strict";

const path = require('path');
const prisma = require('../src/db/prisma');

function fileUrlFor(subfolder, filename) {
  // served at /uploads/<subfolder>/<filename>
  return `/uploads/${subfolder}/${filename}`;
}

/**
 * Subir o actualizar portada del álbum
 */
exports.albumsAlbumIdCoverPOST = async function (albumId, file) {
  if (!file) {
    const err = new Error('No file uploaded');
    err.status = 400;
    throw err;
  }

  const url = fileUrlFor('covers', file.filename);

  const createdImage = await prisma.image.create({
    data: {
      url,
      alt: file.originalname || null,
      width: 0,
      height: 0,
    },
  });

  const updated = await prisma.album.update({
    where: { id: albumId },
    data: { coverId: createdImage.id },
    // Album schema does not define artist/label relations, only scalar ids.
    // Include only existing relations to avoid Prisma include errors.
    include: { cover: true, tracks: true, stats: true },
  });

  return { data: updated };
};


/**
 * Subir imágenes del producto (merch)
 */
exports.merchMerchIdImagesPOST = async function (merchId, files) {
  if (!files || !files.length) {
    const err = new Error('No files uploaded');
    err.status = 400;
    throw err;
  }

  // create image records for each file
  const created = [];
  for (const f of files) {
    const url = fileUrlFor('merch', f.filename);
    const img = await prisma.image.create({ data: { url, alt: f.originalname || null, width: 0, height: 0 } });
    created.push(img);
  }

  // If merch has no cover yet, set the first image as cover
  const merch = await prisma.merchItem.findUnique({ where: { id: merchId }, select: { id: true, coverId: true } });
  if (!merch) {
    const err = new Error('Merch item not found');
    err.status = 404;
    throw err;
  }
  // Always update cover with the first uploaded image
  if (created.length > 0) {
    await prisma.merchItem.update({ where: { id: merchId }, data: { coverId: created[0].id } });
  }

  // return merch item (no Prisma include available for cover on MerchItem)
  const out = await prisma.merchItem.findUnique({ where: { id: merchId } });
  // Optionally enrich with cover object for client convenience
  if (out && out.coverId) {
    try {
      const cover = await prisma.image.findUnique({ where: { id: out.coverId } });
      return { data: { ...out, cover } };
    } catch (_) {
      // if cover fetch fails, still return base merch item
      return { data: out };
    }
  }
  return { data: out };
};


/**
 * Subir o actualizar archivo de audio para una pista
 */
exports.tracksTrackIdAudioPOST = async function (trackId, file) {
  if (!file) {
    const err = new Error('No file uploaded');
    err.status = 400;
    throw err;
  }

  const track = await prisma.track.findUnique({ where: { id: trackId } });
  if (!track) {
    const err = new Error('Track not found');
    err.status = 404;
    throw err;
  }

  const url = fileUrlFor('audio', file.filename);

  // crude codec detection from mimetype
  const mime = (file.mimetype || '').split('/')[1] || null;
  const codec = mime ? mime.split('+')[0] : null;

  // bitrate unknown here — set 0 as placeholder
  const bitrate = 0;

  // upsert audio record for this track
  const updated = await prisma.track.update({
    where: { id: trackId },
    data: {
      audio: {
        upsert: {
          create: { codec: codec, bitrate: bitrate, url },
          update: { codec: codec, bitrate: bitrate, url },
        },
      },
    },
    include: { album: true, audio: true, lyrics: true, stats: true },
  });

  return { data: updated };
};

/**
 * Subir o actualizar portada (imagen) de una pista
 */
// exports.tracksTrackIdCoverPOST removed: tracks use album cover
/*
  if (!file) {
    const err = new Error('No file uploaded');
    err.status = 400;
    throw err;
  }

  const track = await prisma.track.findUnique({ where: { id: trackId } });
  if (!track) {
    const err = new Error('Track not found');
    err.status = 404;
    throw err;
  }

  const url = fileUrlFor('track-covers', file.filename);

  const updated = await prisma.track.update({
    where: { id: trackId },
    data: { coverUrl: url },
    include: { album: true, audio: true, lyrics: true, stats: true },
  });

  return { data: updated };
*/


