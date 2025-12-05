'use strict';

var utils = require('../utils/writer.js');
var Favorites = require('../service/FavoritesService');

module.exports.usersUserIdFavoritesAlbumsAlbumIdDELETE = function usersUserIdFavoritesAlbumsAlbumIdDELETE (req, res, next, userId, albumId) {
  const userIdParam = req.params && req.params.userId ? String(req.params.userId) : String(userId);
  const albumIdParam = req.params && req.params.albumId ? String(req.params.albumId) : String(albumId);
  Favorites.usersUserIdFavoritesAlbumsAlbumIdDELETE(userIdParam, albumIdParam)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdFavoritesAlbumsGET = function usersUserIdFavoritesAlbumsGET (req, res, next, userId/* removed page/limit to avoid confusion */) {
  // Prefer explicit path param from Express to avoid generator arg-order issues
  const userIdParam = req.params && req.params.userId ? String(req.params.userId) : String(userId);
  // If caller asks for raw DB rows for debugging, return them
  if (req.query && (req.query.raw === '1' || req.query.raw === 'true')) {
    Favorites.favoritesRawAll()
      .then(function(response) { utils.writeJson(res, response); })
      .catch(function(response) { utils.writeJson(res, response); });
    return;
  }
  Favorites.usersUserIdFavoritesAlbumsGET(userIdParam)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdFavoritesAlbumsPOST = function usersUserIdFavoritesAlbumsPOST (req, res, next, body, userId) {
  const userIdParam = req.params && req.params.userId ? String(req.params.userId) : String(userId);
  Favorites.usersUserIdFavoritesAlbumsPOST(body, userIdParam)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdFavoritesMerchGET = function usersUserIdFavoritesMerchGET (req, res, next, userId/* removed page/limit to avoid confusion */) {
  // Prefer explicit path param from Express to avoid generator arg-order issues
  const userIdParam = req.params && req.params.userId ? String(req.params.userId) : String(userId);
  Favorites.usersUserIdFavoritesMerchGET(userIdParam)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.usersUserIdFavoritesTracksGET = function usersUserIdFavoritesTracksGET (req, res, next, userId/*, page, limit*/) {
  const page = req.query && req.query.page;
  const limit = req.query && req.query.limit;
  const userIdParam = req.params && req.params.userId ? String(req.params.userId) : String(userId);
  Favorites.usersUserIdFavoritesTracksGET(userIdParam, page, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.usersUserIdFavoritesMerchMerchIdDELETE = function usersUserIdFavoritesMerchMerchIdDELETE (req, res, next, userId, merchId) {
  const userIdParam = req.params && req.params.userId ? String(req.params.userId) : String(userId);
  const merchIdParam = req.params && req.params.merchId ? String(req.params.merchId) : String(merchId);
  Favorites.usersUserIdFavoritesMerchMerchIdDELETE(userIdParam, merchIdParam)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdFavoritesMerchPOST = function usersUserIdFavoritesMerchPOST (req, res, next, body, userId) {
  const userIdParam = req.params && req.params.userId ? String(req.params.userId) : String(userId);
  Favorites.usersUserIdFavoritesMerchPOST(body, userIdParam)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdFavoritesTracksGET = function usersUserIdFavoritesTracksGET (req, res, next, userId/*, page, limit*/) {
  const page = req.query && req.query.page;
  const limit = req.query && req.query.limit;
  const userIdParam = req.params && req.params.userId ? req.params.userId : userId;
  Favorites.usersUserIdFavoritesTracksGET(userIdParam, page, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdFavoritesTracksPOST = function usersUserIdFavoritesTracksPOST (req, res, next, body, userId) {
  const userIdParam = req.params && req.params.userId ? String(req.params.userId) : String(userId);
  Favorites.usersUserIdFavoritesTracksPOST(body, userIdParam)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdFavoritesTracksTrackIdDELETE = function usersUserIdFavoritesTracksTrackIdDELETE (req, res, next, userId, trackId) {
  const userIdParam = req.params && req.params.userId ? String(req.params.userId) : String(userId);
  const trackIdParam = req.params && req.params.trackId ? String(req.params.trackId) : String(trackId);
  Favorites.usersUserIdFavoritesTracksTrackIdDELETE(userIdParam, trackIdParam)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
