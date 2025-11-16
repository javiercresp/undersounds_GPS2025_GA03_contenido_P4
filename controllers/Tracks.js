'use strict';

var utils = require('../utils/writer.js');
var Tracks = require('../service/TracksService');
var StreamingService = require('../service/StreamingService');

module.exports.tracksGET = function tracksGET (req, res, next, page, limit, include, albumId, artistId, labelId, genre, tag, language, minDurationSec, maxDurationSec, releasedFrom, releasedTo, sort, order, q) {
  Tracks.tracksGET(page, limit, include, albumId, artistId, labelId, genre, tag, language, minDurationSec, maxDurationSec, releasedFrom, releasedTo, sort, order, q)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksPOST = function tracksPOST (req, res, next, body) {
  Tracks.tracksPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksTrackIdAudioPOST = function tracksTrackIdAudioPOST (req, res, next, trackId) {
  Tracks.tracksTrackIdAudioPOST(trackId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksTrackIdCommentsGET = function tracksTrackIdCommentsGET (req, res, next, trackId, page, limit) {
  Tracks.tracksTrackIdCommentsGET(trackId, page, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksTrackIdCommentsPOST = function tracksTrackIdCommentsPOST (req, res, next, body, trackId) {
  Tracks.tracksTrackIdCommentsPOST(body, trackId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksTrackIdDELETE = function tracksTrackIdDELETE (req, res, next, trackId) {
  Tracks.tracksTrackIdDELETE(trackId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksTrackIdGET = function tracksTrackIdGET (req, res, next, trackId, include) {
  // Safety: if swagger/oas3 mapping failed and `trackId` is undefined,
  // try to read it from `req.params` (express path params). Also log
  // incoming params to help debugging when requests provide unexpected values.
  const resolvedTrackId = trackId || (req && req.params && req.params.trackId);
  console.log('[tracksTrackIdGET] resolvedTrackId=', resolvedTrackId, 'trackIdArg=', trackId, 'req.params=', req && req.params, 'req.query=', req && req.query);

  Tracks.tracksTrackIdGET(resolvedTrackId, include)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksTrackIdLyricsPOST = function tracksTrackIdLyricsPOST (req, res, next, body, trackId) {
  Tracks.tracksTrackIdLyricsPOST(body, trackId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksTrackIdPATCH = function tracksTrackIdPATCH (req, res, next, body, trackId) {
  Tracks.tracksTrackIdPATCH(body, trackId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksTrackIdStreamGET = function tracksTrackIdStreamGET (req, res, next, trackId) {
  StreamingService.streamTrackAudio(trackId, req, res);
};

module.exports.tracksTrackIdStatsGET = function tracksTrackIdStatsGET (req, res, next, trackId) {
  Tracks.tracksTrackIdStatsGET(trackId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
