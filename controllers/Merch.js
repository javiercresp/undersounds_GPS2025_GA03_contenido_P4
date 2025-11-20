'use strict';

var utils = require('../utils/writer.js');
var Merch = require('../service/MerchService');

module.exports.merchGET = function merchGET (req, res, next, page, limit, artistId, labelId, type, availability, sort, order, q) {

  Merch.merchGET(limit, artistId, labelId, type, availability, sort, order, q, undefined)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdCommentsGET = function merchMerchIdCommentsGET (req, res, next, merchId, page, limit) {
  Merch.merchMerchIdCommentsGET(merchId, page, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdCommentsPOST = function merchMerchIdCommentsPOST (req, res, next, body, merchId) {
  Merch.merchMerchIdCommentsPOST(body, merchId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdDELETE = function merchMerchIdDELETE (req, res, next, merchId) {
  Merch.merchMerchIdDELETE(merchId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdGET = function merchMerchIdGET (req, res, next, merchId) {
  Merch.merchMerchIdGET(merchId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdImagesPOST = function merchMerchIdImagesPOST (req, res, next, merchId) {
  Merch.merchMerchIdImagesPOST(merchId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdPATCH = function merchMerchIdPATCH (req, res, next, body, merchId) {
  Merch.merchMerchIdPATCH(body, merchId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdVariantsGET = function merchMerchIdVariantsGET (req, res, next, merchId) {
  Merch.merchMerchIdVariantsGET(merchId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdVariantsPOST = function merchMerchIdVariantsPOST (req, res, next, body, merchId) {
  Merch.merchMerchIdVariantsPOST(body, merchId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdVariantsVariantIdDELETE = function merchMerchIdVariantsVariantIdDELETE (req, res, next, merchId, variantId) {
  Merch.merchMerchIdVariantsVariantIdDELETE(merchId, variantId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchMerchIdVariantsVariantIdPATCH = function merchMerchIdVariantsVariantIdPATCH (req, res, next, body, merchId, variantId) {
  Merch.merchMerchIdVariantsVariantIdPATCH(body, merchId, variantId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.merchPOST = function merchPOST (req, res, next, body) {
  Merch.merchPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
