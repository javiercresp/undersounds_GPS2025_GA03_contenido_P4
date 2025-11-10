'use strict';

const path = require('path');
const http = require('http');
const express = require('express');           // ✅ NUEVO
const oas3Tools = require('oas3-tools');
const cors = require('cors');                 // ✅ NUEVO

const serverPort = 8080;

// Config swagger/oas3-tools
const options = {
  routing: { controllers: path.join(__dirname, './controllers') },
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

// (opcional) body parser explícito por si hiciera falta
app.use(express.json());

// ✅ Monta la app de oas3-tools *después* del CORS/preflight
app.use(oasApp);

http.createServer(app).listen(serverPort, function () {
  console.log(`Your server is listening on port ${serverPort} (http://localhost:${serverPort})`);
  console.log(`Swagger-ui is available on http://localhost:${serverPort}/docs`);
});
