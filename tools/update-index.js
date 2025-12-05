const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.js');
let content = fs.readFileSync(filePath, 'utf8');

// Agregar require de StreamingService si no está
if (!content.includes('StreamingService')) {
  content = content.replace(
    "const UploadsService = require('./service/UploadsService');",
    "const UploadsService = require('./service/UploadsService');\nconst StreamingService = require('./service/StreamingService');"
  );
}

// Agregar ruta de streaming si no está
if (!content.includes("app.get('/tracks/:trackId/stream'")) {
  content = content.replace(
    "});\n\n// Servir archivos estáticos",
    "});\n\n// ====== STREAMING ENDPOINT PARA REPRODUCCIÓN DE AUDIO ======\napp.get('/tracks/:trackId/stream', (req, res) => {\n  StreamingService.streamTrackAudio(req.params.trackId, req, res);\n});\n\n// Servir archivos estáticos"
  );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ index.js actualizado con StreamingService');
