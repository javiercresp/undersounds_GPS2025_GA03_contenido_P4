'use strict';

var utils = require('../utils/writer.js');
var Labels = require('../service/LabelsService');

module.exports.labelsGET = function labelsGET (req, res, next, page, limit, q, country) {
  Labels.labelsGET(page, limit, q, country)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.labelsLabelIdAlbumsGET = function labelsLabelIdAlbumsGET (req, res, next, labelId, page, limit) {
  Labels.labelsLabelIdAlbumsGET(labelId, page, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.labelsLabelIdArtistsArtistIdDELETE = function labelsLabelIdArtistsArtistIdDELETE (req, res, next, labelId, artistId) {
  Labels.labelsLabelIdArtistsArtistIdDELETE(labelId, artistId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.labelsLabelIdArtistsGET = function labelsLabelIdArtistsGET (req, res, next, labelId) {
  Labels.labelsLabelIdArtistsGET(labelId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.labelsLabelIdArtistsPOST = function labelsLabelIdArtistsPOST (req, res, next, body, labelId) {
  Labels.labelsLabelIdArtistsPOST(body, labelId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.labelsLabelIdDELETE = function labelsLabelIdDELETE (req, res, next, labelId) {
  Labels.labelsLabelIdDELETE(labelId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.labelsLabelIdGET = function labelsLabelIdGET (req, res, next, labelId, include) {
  Labels.labelsLabelIdGET(labelId, include)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.labelsLabelIdPATCH = function labelsLabelIdPATCH (req, res, next, body, labelId) {
  Labels.labelsLabelIdPATCH(body, labelId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.labelsPOST = function labelsPOST (req, res, next, body) {
  Labels.labelsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
