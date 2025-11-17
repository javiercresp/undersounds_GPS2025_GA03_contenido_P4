'use strict';

var utils = require('../utils/writer.js');
var Uploads = require('../service/UploadsService');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Helpers to create per-route upload directories and storage
function makeStorage(subfolder) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = path.join(__dirname, '..', 'uploads', subfolder);
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (e) {
        // ignore
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname) || '';
      const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
      cb(null, name);
    }
  });
}

const coverUpload = multer({ storage: makeStorage('covers'), limits: { fileSize: 20 * 1024 * 1024 } });
const merchImagesUpload = multer({ storage: makeStorage('merch'), limits: { fileSize: 10 * 1024 * 1024 } });
const audioUpload = multer({ storage: makeStorage('audio'), limits: { fileSize: 200 * 1024 * 1024 } });

module.exports.albumsAlbumIdCoverPOST = function albumsAlbumIdCoverPOST (req, res, next, albumId) {
  // Expect form field 'file'
  coverUpload.single('file')(req, res, function (err) {
    if (err) {
      return utils.writeJson(res, { data: { message: err.message || 'Upload error' }, status: 500 });
    }
    Uploads.albumsAlbumIdCoverPOST(albumId, req.file)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  });
};

module.exports.merchMerchIdImagesPOST = function merchMerchIdImagesPOST (req, res, next, merchId) {
  // Expect form field 'files' (multiple)
  merchImagesUpload.array('files', 10)(req, res, function (err) {
    if (err) {
      return utils.writeJson(res, { data: { message: err.message || 'Upload error' }, status: 500 });
    }
    Uploads.merchMerchIdImagesPOST(merchId, req.files)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  });
};

module.exports.tracksTrackIdAudioPOST = function tracksTrackIdAudioPOST (req, res, next, trackId) {
  // Expect form field 'file'
  audioUpload.single('file')(req, res, function (err) {
    if (err) {
      return utils.writeJson(res, { data: { message: err.message || 'Upload error' }, status: 500 });
    }
    Uploads.tracksTrackIdAudioPOST(trackId, req.file)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  });
};
