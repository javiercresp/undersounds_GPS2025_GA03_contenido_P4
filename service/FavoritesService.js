'use strict';

// Implement favorites using Prisma
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

// ----------------- ALBUM FAVORITES -----------------

exports.usersUserIdFavoritesAlbumsGET = async function (userId, page, limit) {
  const pageNum = toInt(page, 1);
  const pageSize = toInt(limit, 20);
  const skip = (pageNum - 1) * pageSize;

  const where = { userId: String(userId), targetType: 'album' };
  const total = await prisma.favorite.count({ where });

  const favs = await prisma.favorite.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: pageSize });
  const ids = favs.map(f => f.targetId).filter(Boolean);

  // debug: log favorites found for this user
  try { console.debug('[FavoritesService] usersUserIdFavoritesAlbumsGET userId=', String(userId), 'favs=', favs.length, 'ids=', ids); } catch (e) {}
  // Try to load albums by ids (may return empty if ids don't match)
  const albums = ids.length
    ? await prisma.album.findMany({ where: { id: { in: ids } }, include: { tracks: true, stats: true, cover: true } })
    : [];

  // Build a map from id -> album for quick lookup
  const albumMap = {};
  for (const a of albums) albumMap[a.id] = a;

  // Return the favorite tuples, and attach the album object if available
  const results = favs.map(f => ({
    id: f.id,
    userId: f.userId,
    targetId: f.targetId,
    targetType: f.targetType,
    createdAt: f.createdAt,
    album: albumMap[f.targetId] || null
  }));

  return { data: results, meta: { total, page: pageNum, limit: pageSize } };
};

// Debug helper: return all favorite rows (no filters)
exports.favoritesRawAll = async function () {
  try {
    const all = await prisma.favorite.findMany({ orderBy: { createdAt: 'desc' } });
    return { data: all, meta: { total: all.length } };
  } catch (e) {
    console.error('[FavoritesService] favoritesRawAll error', e?.message || e);
    return { data: [], meta: { total: 0 } };
  }
};

exports.usersUserIdFavoritesAlbumsPOST = async function (body, userId) {
  if (!body || !body.albumId) return { data: { message: 'albumId is required' }, status: 400 };
  const payload = {
    userId: String(userId),
    targetId: String(body.albumId),
    targetType: 'album'
  };
  try {
    const created = await prisma.favorite.create({ data: payload });
    try { console.debug('[FavoritesService] usersUserIdFavoritesAlbumsPOST created=', created); } catch (e) {}
    return { data: created, status: 201 };
  } catch (err) {
    console.error('[FavoritesService] error creating album favorite', err?.message || err);
    return { data: { message: 'Failed to add favorite' }, status: 500 };
  }
};

exports.usersUserIdFavoritesAlbumsAlbumIdDELETE = async function (userId, albumId) {
  try {
    await prisma.favorite.deleteMany({ where: { userId: String(userId), targetId: String(albumId), targetType: 'album' } });
    return { status: 204 };
  } catch (err) {
    console.error('[FavoritesService] error deleting album favorite', err?.message || err);
    return { data: { message: 'Failed to remove favorite' }, status: 500 };
  }
};

// ----------------- MERCH FAVORITES -----------------

exports.usersUserIdFavoritesMerchGET = async function (userId, page, limit) {
  const pageNum = toInt(page, 1);
  const pageSize = toInt(limit, 20);
  const skip = (pageNum - 1) * pageSize;

  const where = { userId: String(userId), targetType: 'merch' };
  const total = await prisma.favorite.count({ where });
  const favs = await prisma.favorite.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: pageSize });
  const ids = favs.map(f => f.targetId).filter(Boolean);

  const items = ids.length
    ? await prisma.merchItem.findMany({ where: { id: { in: ids } } })
    : [];

  // Enrich with cover image objects (same as merchGET)
  const coverIds = items.map(r => r.coverId).filter(Boolean);
  let coverMap = new Map();
  if (coverIds.length) {
    const images = await prisma.image.findMany({ where: { id: { in: coverIds } } });
    coverMap = new Map(images.map(img => [img.id, img]));
  }
  const data = items.map(r => (coverMap.size && r.coverId ? { ...r, cover: coverMap.get(r.coverId) || null } : r));

  return { data, meta: { total, page: pageNum, limit: pageSize } };
};

exports.usersUserIdFavoritesMerchPOST = async function (body, userId) {
  if (!body || !body.merchId) return { data: { message: 'merchId is required' }, status: 400 };
  const payload = {
    userId: String(userId),
    targetId: String(body.merchId),
    targetType: 'merch'
  };
  try {
    const created = await prisma.favorite.create({ data: payload });
    return { data: created, status: 201 };
  } catch (err) {
    console.error('[FavoritesService] error creating merch favorite', err?.message || err);
    return { data: { message: 'Failed to add favorite' }, status: 500 };
  }
};

exports.usersUserIdFavoritesMerchMerchIdDELETE = async function (userId, merchId) {
  try {
    await prisma.favorite.deleteMany({ where: { userId: String(userId), targetId: String(merchId), targetType: 'merch' } });
    return { status: 204 };
  } catch (err) {
    console.error('[FavoritesService] error deleting merch favorite', err?.message || err);
    return { data: { message: 'Failed to remove favorite' }, status: 500 };
  }
};

// ----------------- TRACK FAVORITES -----------------

exports.usersUserIdFavoritesTracksGET = async function (userId, page, limit) {
  const pageNum = toInt(page, 1);
  const pageSize = toInt(limit, 20);
  const skip = (pageNum - 1) * pageSize;

  const where = { userId: String(userId), targetType: 'track' };
  const total = await prisma.favorite.count({ where });
  const favs = await prisma.favorite.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: pageSize });
  const ids = favs.map(f => f.targetId).filter(Boolean);

  const tracks = ids.length
    ? await prisma.track.findMany({ where: { id: { in: ids } }, include: { album: true, stats: true, audio: true } })
    : [];

  return { data: tracks, meta: { total, page: pageNum, limit: pageSize } };
};

exports.usersUserIdFavoritesTracksPOST = async function (body, userId) {
  if (!body || !body.trackId) return { data: { message: 'trackId is required' }, status: 400 };
  const payload = {
    userId: String(userId),
    targetId: String(body.trackId),
    targetType: 'track'
  };
  try {
    const created = await prisma.favorite.create({ data: payload });
    return { data: created, status: 201 };
  } catch (err) {
    console.error('[FavoritesService] error creating track favorite', err?.message || err);
    return { data: { message: 'Failed to add favorite' }, status: 500 };
  }
};

exports.usersUserIdFavoritesTracksTrackIdDELETE = async function (userId, trackId) {
  try {
    await prisma.favorite.deleteMany({ where: { userId: String(userId), targetId: String(trackId), targetType: 'track' } });
    return { status: 204 };
  } catch (err) {
    console.error('[FavoritesService] error deleting track favorite', err?.message || err);
    return { data: { message: 'Failed to remove favorite' }, status: 500 };
  }
};

