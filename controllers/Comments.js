'use strict';

var utils = require('../utils/writer.js');
var Comments = require('../service/CommentsService');

module.exports.albumsAlbumIdCommentsGET = function albumsAlbumIdCommentsGET (req, res, next, albumId, page, limit) {
  Comments.albumsAlbumIdCommentsGET(limit, albumId, page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.albumsAlbumIdCommentsPOST = function albumsAlbumIdCommentsPOST (req, res, next, body, albumId) {
  Comments.albumsAlbumIdCommentsPOST(body, albumId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsCommentIdDELETE = function commentsCommentIdDELETE (req, res, next, commentId) {
  Comments.commentsCommentIdDELETE(commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsCommentIdGET = function commentsCommentIdGET (req, res, next, commentId) {
  Comments.commentsCommentIdGET(commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsCommentIdLikeDELETE = function commentsCommentIdLikeDELETE (req, res, next, commentId) {
  Comments.commentsCommentIdLikeDELETE(commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsCommentIdLikePOST = function commentsCommentIdLikePOST (req, res, next, commentId) {
  Comments.commentsCommentIdLikePOST(commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsCommentIdPATCH = function commentsCommentIdPATCH (req, res, next, body, commentId) {
  Comments.commentsCommentIdPATCH(body, commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsCommentIdRepliesGET = function commentsCommentIdRepliesGET (req, res, next, commentId) {
  Comments.commentsCommentIdRepliesGET(commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsCommentIdRepliesPOST = function commentsCommentIdRepliesPOST (req, res, next, body, commentId) {
  Comments.commentsCommentIdRepliesPOST(body, commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsCommentIdReportPOST = function commentsCommentIdReportPOST (req, res, next, body, commentId) {
  Comments.commentsCommentIdReportPOST(body, commentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsGET = function commentsGET (req, res, next, page, limit, targetType, targetId, status, q) {
  Comments.commentsGET(page, limit, targetType, targetId, status, q)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsPOST = function commentsPOST (req, res, next, body) {
  Comments.commentsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdCommentsGET = function merchMerchIdCommentsGET (req, res, next, merchId, page, limit) {
  Comments.merchMerchIdCommentsGET(limit, merchId, page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdCommentsPOST = function merchMerchIdCommentsPOST (req, res, next, body, merchId) {
  Comments.merchMerchIdCommentsPOST(body, merchId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksTrackIdCommentsGET = function tracksTrackIdCommentsGET (req, res, next, trackId, page, limit) {
  Comments.tracksTrackIdCommentsGET(trackId, page, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tracksTrackIdCommentsPOST = function tracksTrackIdCommentsPOST (req, res, next, body, trackId) {
  Comments.tracksTrackIdCommentsPOST(body, trackId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
