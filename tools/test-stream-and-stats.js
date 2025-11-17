#!/usr/bin/env node
'use strict';

const http = require('http');

const BASE_URL = 'http://localhost:8080';

/**
 * HTTP helper functions
 */
function httpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

/**
 * Test script para probar:
 * 1. Crear un álbum
 * 2. Crear una pista con audio
 * 3. Reproducir la pista (stream) varias veces
 * 4. Verificar que se actualicen las estadísticas
 * 5. Obtener las estadísticas de reproducción
 */

async function main() {
  try {
    console.log('='.repeat(60));
    console.log('TEST: Streaming y Track Stats');
    console.log('='.repeat(60));

    // 1. Crear un artista y un label (si es necesario)
    console.log('\n1. Obteniendo artistas y labels...');
    const artistsRes = await httpRequest(`${BASE_URL}/artists?limit=1`);
    let artistId = artistsRes.data?.data?.[0]?.id;
    
    if (!artistId) {
      console.log('   ERROR: No hay artistas en la BD. Crear uno primero.');
      return;
    }
    console.log(`   ✓ Artist ID: ${artistId}`);

    const labelsRes = await httpRequest(`${BASE_URL}/labels?limit=1`);
    let labelId = labelsRes.data?.data?.[0]?.id;
    
    if (!labelId) {
      console.log('   ERROR: No hay labels en la BD. Crear uno primero.');
      return;
    }
    console.log(`   ✓ Label ID: ${labelId}`);

    // 2. Crear un álbum
    console.log('\n2. Creando álbum de prueba...');
    const albumRes = await httpRequest(`${BASE_URL}/albums`, {
      method: 'POST',
      body: {
        title: 'Test Album - Stream Stats ' + Date.now(),
        description: 'Album para testear estadísticas',
        artistId: artistId,
        labelId: labelId,
        releaseDate: new Date().toISOString(),
        releaseState: 'draft',
        price: 9.99,
        currency: 'EUR',
        genres: 'Rock,Pop',
        tags: 'test,streaming'
      }
    });
    const albumId = albumRes.data?.data?.id;
    console.log(`   ✓ Album creado: ${albumId}`);

    // 3. Crear una pista
    console.log('\n3. Creando pista de prueba...');
    const trackRes = await httpRequest(`${BASE_URL}/tracks`, {
      method: 'POST',
      body: {
        title: 'Test Track - Stream Stats ' + Date.now(),
        durationSec: 180,
        trackNumber: 1,
        albumId: albumId,
        audio: {
          codec: 'mp3',
          bitrate: 320,
          url: '/uploads/audio/test-track.mp3'
        }
      }
    });
    const trackId = trackRes.data?.data?.id;
    console.log(`   ✓ Track creado: ${trackId}`);

    // 4. Obtener estadísticas iniciales
    console.log('\n4. Obteniendo estadísticas iniciales...');
    const statsInitial = await httpRequest(`${BASE_URL}/tracks/${trackId}/stats`);
    const playCountInitial = statsInitial.data?.data?.playCount || 0;
    console.log(`   ✓ Play count inicial: ${playCountInitial}`);

    // 5. Simular reproducciones
    console.log('\n5. Simulando 3 reproducciones (stream)...');
    for (let i = 1; i <= 3; i++) {
      try {
        console.log(`   Reproducción ${i}...`);
        // Hacer un GET a /tracks/{trackId}/stream
        // Usamos timeout muy corto porque no queremos descargar el audio
        const streamPromise = httpRequest(`${BASE_URL}/tracks/${trackId}/stream`);
        await Promise.race([
          streamPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1000))
        ]).catch(() => {
          // Es normal que falle, solo nos importa que se actualice el contador
        });
        console.log(`   ✓ Request procesado`);
      } catch (err) {
        console.log(`   (Request procesado)`);
      }
      // Pequeña pausa entre requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 6. Esperar un poco para asegurar que las actualizaciones se hayan guardado
    console.log('\n6. Esperando a que se guarden las estadísticas...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 7. Obtener estadísticas actualizadas
    console.log('\n7. Obteniendo estadísticas actualizadas...');
    const statsUpdated = await httpRequest(`${BASE_URL}/tracks/${trackId}/stats`);
    const playCountUpdated = statsUpdated.data?.data?.playCount || 0;
    console.log(`   ✓ Play count actualizado: ${playCountUpdated}`);
    console.log(`   ✓ Diferencia: ${playCountUpdated - playCountInitial} reproducciones registradas`);

    // 8. Verificar resultado
    console.log('\n8. Resultado del test:');
    if (playCountUpdated > playCountInitial) {
      console.log('   ✅ SUCCESS: Las estadísticas se actualizaron correctamente');
      console.log(`   Se registraron ${playCountUpdated - playCountInitial} reproducciones`);
    } else {
      console.log('   ❌ FAILURE: Las estadísticas no se actualizaron');
    }

    console.log('\n' + '='.repeat(60));
    console.log('TEST COMPLETADO');
    console.log('='.repeat(60));

  } catch (err) {
    console.error('\n❌ ERROR:');
    console.error('   Message:', err.message);
    process.exit(1);
  }
}

main();
