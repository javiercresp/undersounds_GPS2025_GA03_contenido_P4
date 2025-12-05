'use strict';

const path = require('path');
const http = require('http');
const express = require('express');           // ✅ NUEVO
const oas3Tools = require('oas3-tools');
const cors = require('cors');                 // ✅ NUEVO

const serverPort = parseInt(process.env.PORT, 10) || 8081;

// Config swagger/oas3-tools
const options = {
  routing: { controllers: path.join(__dirname, './controllers') },
  middleware: {
    swaggerTools: false,  // Desactiva validación automática de swagger
    swaggerValidator: false,  // Desactiva validador de request
    swaggerSecurity: false,   // Desactiva seguridad
  },
  strict: false,  // No ser estricto con la validación
};

// Crea la app generada por oas3-tools (sub-app)
const expressAppConfig = oas3Tools.expressAppConfig(
  path.join(__dirname, 'api/openapi.yaml'),
  options
);
const oasApp = expressAppConfig.getApp();

// ✅ App principal (wrapping)
const app = express();

// ✅ CORS permisivo para el front local
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

// ✅ Preflight global: responde 204 y evita el 405
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);   // <- responde al preflight
  }
  next();
});

// Body parsers — importante el orden para multipart
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Middleware de logging para debug
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PATCH') {
    console.log(`[${req.method}] ${req.path}`, 'body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Middleware para rutas de upload — ANTES de oas3-tools para evitar validación
const multer = require('multer');
const fs = require('fs');
const UploadsService = require('./service/UploadsService');
const utils = require('./utils/writer');

function makeMulferForRoute(subfolder) {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'uploads', subfolder);
        try {
          fs.mkdirSync(dir, { recursive: true });
        } catch (e) {
          // ignore
        }
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname) || '';
        const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
        cb(null, name);
      }
    }),
    limits: { fileSize: subfolder === 'audio' ? 200 * 1024 * 1024 : 20 * 1024 * 1024 }
  });
}

// Rutas de upload — interceptadas ANTES de oas3-tools
app.post('/albums/:albumId/cover', makeMulferForRoute('covers').single('file'), (req, res, next) => {
  console.log('[UPLOAD] /albums/%s/cover received file=', req.params.albumId, req.file && { originalname: req.file.originalname, filename: req.file.filename, path: req.file.path });
  UploadsService.albumsAlbumIdCoverPOST(req.params.albumId, req.file)
    .then(response => utils.writeJson(res, response))
    .catch(err => {
      console.error('[albumsAlbumIdCoverPOST]', err?.message || err);
      utils.writeJson(res, { data: { message: err?.message || 'Error' }, status: err?.status || 500 }, err?.status || 500);
    });
});

app.post('/merch/:merchId/images', makeMulferForRoute('merch').array('files', 10), (req, res, next) => {
  console.log('[UPLOAD] /merch/%s/images received files=', req.params.merchId, (req.files || []).map(f => ({ originalname: f.originalname, filename: f.filename, path: f.path })) );
  UploadsService.merchMerchIdImagesPOST(req.params.merchId, req.files)
    .then(response => utils.writeJson(res, response))
    .catch(err => {
      console.error('[merchMerchIdImagesPOST]', err?.message || err);
      utils.writeJson(res, { data: { message: err?.message || 'Error' }, status: err?.status || 500 }, err?.status || 500);
    });
});

app.post('/tracks/:trackId/audio', makeMulferForRoute('audio').single('file'), (req, res, next) => {
  console.log('[UPLOAD] /tracks/%s/audio received file=', req.params.trackId, req.file && { originalname: req.file.originalname, filename: req.file.filename, path: req.file.path });
  UploadsService.tracksTrackIdAudioPOST(req.params.trackId, req.file)
    .then(response => utils.writeJson(res, response))
    .catch(err => {
      console.error('[tracksTrackIdAudioPOST]', err?.message || err);
      utils.writeJson(res, { data: { message: err?.message || 'Error' }, status: err?.status || 500 }, err?.status || 500);
    });
});

// ✅ NUEVO: Crear track con audio (multipart)
const TracksService = require('./service/TracksService');
app.post('/tracks', makeMulferForRoute('audio').single('file'), (req, res, next) => {
  // Si es multipart, req.body estará poblado por multer (text fields) y req.file por el archivo
  // Si es JSON, multer no hará nada con el body (o lo parseará si es multipart sin archivo)
  // Pero como usamos express.json() antes, si el content-type es application/json, express lo maneja.
  // Si es multipart/form-data, multer lo maneja.
  
  // Si hay archivo, delegamos a una nueva función en TracksService o modificamos tracksPOST
  if (req.is('multipart/form-data')) {
    console.log('[UPLOAD] /tracks received file=', req.file && { originalname: req.file.originalname, filename: req.file.filename });
    console.log('[UPLOAD] /tracks received body=', req.body);
    
    TracksService.tracksPOST(req.body, req.file)
      .then(response => utils.writeJson(res, response))
      .catch(err => {
        console.error('[tracksPOST multipart]', err?.message || err);
        utils.writeJson(res, { data: { message: err?.message || 'Error' }, status: err?.status || 500 }, err?.status || 500);
      });
  } else {
    // Si no es multipart, dejamos pasar al siguiente middleware (oas3-tools)
    next();
  }
});

// Servir archivos estáticos subidos en /uploads
const uploadsDir = path.join(__dirname, 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
} catch (e) {
  console.warn('Could not create uploads dir', e?.message || e);
}
app.use('/uploads', express.static(uploadsDir));

// ✅ Monta la app de oas3-tools *después* de las rutas de upload
app.use(oasApp);

http.createServer(app).listen(serverPort, function () {
  console.log(`Your server is listening on port ${serverPort} (http://localhost:${serverPort})`);
  console.log(`Swagger-ui is available on http://localhost:${serverPort}/docs`);
});

