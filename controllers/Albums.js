"use strict";

var utils = require("../utils/writer.js");
var Albums = require("../service/AlbumsService");

module.exports.albumsAlbumIdCommentsGET = function (
  req,
  res,
  next,
  albumId,
  page,
  limit
) {
  Albums.albumsAlbumIdCommentsGET(albumId, page, limit)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.albumsAlbumIdCommentsPOST = function (
  req,
  res,
  next,
  body,
  albumId
) {
  Albums.albumsAlbumIdCommentsPOST(body, albumId)
    .then((r) => utils.writeJson(res, r, 201))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.albumsAlbumIdCoverPOST = function (req, res, next, albumId) {
  Albums.albumsAlbumIdCoverPOST(albumId)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.albumsAlbumIdDELETE = function (req, res, next, albumId) {
  Albums.albumsAlbumIdDELETE(albumId)
    .then(() => res.status(204).end())
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.albumsAlbumIdGET = function (req, res, next, albumId, include) {
  // Obtener include de query params en lugar del parámetro de función
  const includeParam = req.query.include || req.openapi?.queryParams?.include || include;
  Albums.albumsAlbumIdGET(req.openapi.pathParams.albumId, includeParam)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.albumsAlbumIdPATCH = function (req, res, next, body, albumId) {
  Albums.albumsAlbumIdPATCH(body, albumId)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.albumsAlbumIdPublishPOST = function (req, res, next, albumId) {
  Albums.albumsAlbumIdPublishPOST(albumId)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.albumsAlbumIdStatsGET = function (
  req,
  res,
  next,
  albumId,
  range
) {
  Albums.albumsAlbumIdStatsGET(albumId, range)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.albumsAlbumIdTracksPOST = function (
  req,
  res,
  next,
  body,
  albumId
) {
  Albums.albumsAlbumIdTracksPOST(body, albumId)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.albumsAlbumIdTracksTrackIdDELETE = function (
  req,
  res,
  next,
  albumId,
  trackId
) {
  Albums.albumsAlbumIdTracksTrackIdDELETE(albumId, trackId)
    .then(() => res.status(204).end())
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.albumsGET = function (
  req,
  res,
  next,
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
  Albums.albumsGET(
    page,
    limit,
    include,
    artistId,
    labelId,
    genre,
    tag,
    releaseState,
    q
  )
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.albumsPOST = function (req, res, next, body) {
  Albums.albumsPOST(body)
    .then((r) => utils.writeJson(res, r, 201))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.labelsLabelIdAlbumsGET = function (
  req,
  res,
  next,
  labelId,
  page,
  limit
) {
  Albums.labelsLabelIdAlbumsGET(labelId, page, limit)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};
