'use strict';

const path = require('path');
const fs = require('fs');
const prisma = require('../src/db/prisma');

/**
 * Stream de audio para reproducción de una pista
 * GET /tracks/{trackId}/stream
 * 
 * Soporta:
 * - Streaming completo (Content-Length, Cache headers)
 * - Partial content / Range requests (para seek/scrubbing)
 * - Múltiples formatos (MP3, WAV, OGG, M4A, FLAC, WebM)
 * 
 * IMPORTANTE: Se actualiza el playCount al inicio, independientemente de si el archivo existe
 */
exports.streamTrackAudio = async (trackId, req, res) => {
  try {
    // 1. Buscar track y audio en BD
    const track = await prisma.track.findUnique({
      where: { id: trackId },
      include: { audio: true, stats: true }
    });

    if (!track) {
      console.warn(`[STREAM] Track not found: ${trackId}`);
      res.status(404).json({ error: 'Track not found' });
      return;
    }

    if (!track.audio || !track.audio.url) {
      console.warn(`[STREAM] No audio available for track: ${trackId}`);
      res.status(404).json({ error: 'No audio available for this track' });
      return;
    }

    // 1.5. *** ACTUALIZAR ESTADÍSTICAS DE REPRODUCCIÓN PRIMERO ***
    // Esto se debe hacer ANTES de validar el archivo, para asegurar que siempre se registre
    try {
      // Use an atomic upsert with increment to avoid race conditions
      // Prisma supports increment operator which is safe for concurrent requests.
      const upserted = await prisma.trackStats.upsert({
        where: { trackId: trackId },
        update: { playCount: { increment: 1 } },
        create: { trackId: trackId, playCount: 1 }
      });
      console.log(`[STREAM] TrackStats upsert for ${trackId}: playCount=${upserted.playCount}`);
    } catch (statsErr) {
      console.error(`[STREAM] Error upserting stats for track ${trackId}:`, statsErr && statsErr.message ? statsErr.message : statsErr);
      // continue even if stats update fails
    }

    // 2. Resolver ruta del archivo
    // track.audio.url es relativa: /uploads/audio/1762890000-987654321.mp3
    let filePath = track.audio.url;
    if (filePath.startsWith('/')) {
      filePath = filePath.substring(1); // Quitar / inicial
    }
    filePath = path.join(__dirname, '..', filePath);

    // 3. Validar que el archivo existe en disco
    if (!fs.existsSync(filePath)) {
      console.warn('[STREAM] File not found on disk:', filePath);
      res.status(404).json({ error: 'Audio file not found on disk' });
      return;
    }

    // 4. Obtener información del archivo
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    // 5. Detectar MIME type según extensión
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.ogg': 'audio/ogg',
      '.m4a': 'audio/mp4',
      '.flac': 'audio/flac',
      '.webm': 'audio/webm',
      '.aac': 'audio/aac',
      '.opus': 'audio/opus'
    };
    const contentType = mimeTypes[ext] || 'audio/mpeg';

    // 6. MANEJO DE RANGE REQUESTS (para seek, fast-forward, rewind)
    const range = req.headers.range;
    if (range) {
      // Cliente solicita un rango: "bytes=1024-2047" o "bytes=1024-"
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      // Validaciones de rango
      if (isNaN(start) || start < 0 || start >= fileSize) {
        res.status(416).set('Content-Range', `bytes */${fileSize}`).send('Range Not Satisfiable');
        return;
      }

      const actualEnd = Math.min(end, fileSize - 1);
      const chunkSize = actualEnd - start + 1;

      console.log(`[STREAM] Range request: bytes=${start}-${actualEnd}/${fileSize}`);

      // Responder con 206 Partial Content
      res.status(206);
      res.set({
        'Content-Range': `bytes ${start}-${actualEnd}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // 24 horas
      });

      const stream = fs.createReadStream(filePath, { start, end: actualEnd });
      stream.on('error', (err) => {
        console.error('[STREAM] Error reading file:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Error reading audio file' });
        }
      });
      stream.pipe(res);
    } else {
      // Sin Range: devolver archivo completo
      res.set({
        'Content-Length': fileSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=86400', // 24 horas
      });

      console.log(`[STREAM] Full file request: ${fileSize} bytes, type: ${contentType}`);

      const stream = fs.createReadStream(filePath);
      stream.on('error', (err) => {
        console.error('[STREAM] Error reading file:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Error reading audio file' });
        }
      });
      stream.pipe(res);
    }
  } catch (err) {
    console.error('[STREAM]', err?.message || err);
    if (!res.headersSent) {
      res.status(500).json({ error: err?.message || 'Internal Server Error' });
    }
  }
};
