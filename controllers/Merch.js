"use strict";

var utils = require("../utils/writer.js");
var Merch = require("../service/MerchService");

module.exports.merchGET = function merchGET (req, res, next, page, limit, artistId, labelId, type, availability, sort, order, q) {
  Merch.merchGET(page, limit, artistId, labelId, type, availability, sort, order, q)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.merchMerchIdCommentsGET = function merchMerchIdCommentsGET (req, res, next, merchId, page, limit) {
  Merch.merchMerchIdCommentsGET(merchId, page, limit)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.merchMerchIdCommentsPOST = function merchMerchIdCommentsPOST (req, res, next, body, merchId) {
  Merch.merchMerchIdCommentsPOST(body, merchId)
    .then((r) => utils.writeJson(res, r, 201))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.merchMerchIdDELETE = function merchMerchIdDELETE (req, res, next, merchId) {
  Merch.merchMerchIdDELETE(merchId)
    .then(() => res.status(204).end())
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.merchMerchIdGET = function merchMerchIdGET (req, res, next, merchId) {
  Merch.merchMerchIdGET(merchId)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.merchMerchIdImagesPOST = function merchMerchIdImagesPOST (req, res, next, merchId) {
  Merch.merchMerchIdImagesPOST(merchId)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.merchMerchIdPATCH = function merchMerchIdPATCH (req, res, next, body, merchId) {
  Merch.merchMerchIdPATCH(body, merchId)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.merchMerchIdVariantsGET = function merchMerchIdVariantsGET (req, res, next, merchId) {
  Merch.merchMerchIdVariantsGET(merchId)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.merchMerchIdVariantsPOST = function merchMerchIdVariantsPOST (req, res, next, body, merchId) {
  Merch.merchMerchIdVariantsPOST(body, merchId)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.merchMerchIdVariantsVariantIdDELETE = function merchMerchIdVariantsVariantIdDELETE (req, res, next, merchId, variantId) {
  Merch.merchMerchIdVariantsVariantIdDELETE(merchId, variantId)
    .then(() => res.status(204).end())
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.merchMerchIdVariantsVariantIdPATCH = function merchMerchIdVariantsVariantIdPATCH (req, res, next, body, merchId, variantId) {
  Merch.merchMerchIdVariantsVariantIdPATCH(body, merchId, variantId)
    .then((r) => utils.writeJson(res, r))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};

module.exports.merchPOST = function merchPOST (req, res, next, body) {
  Merch.merchPOST(body)
    .then((r) => utils.writeJson(res, r, 201))
    .catch((e) =>
      utils.writeJson(res, { message: e.message }, e.status || 500)
    );
};
