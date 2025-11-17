#!/usr/bin/env node
'use strict';

const http = require('http');
const prisma = require('../src/db/prisma');

const BASE_URL = 'http://localhost:8080';

/**
 * Helper para hacer requests HTTP
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
      },
      timeout: options.timeout || 5000
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        } catch {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function main() {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('TEST: Endpoint Stream - Verificar playCount');
    console.log('='.repeat(60));

    // 1. Obtener un track de la BD
    console.log('\n1. Buscando track en la BD...');
    const track = await prisma.track.findFirst({
      include: { stats: true }
    });

    if (!track) {
      console.log('   ERROR: No hay tracks en la BD');
      return;
    }

    const trackId = track.id;
    console.log(`   ✓ Track encontrado: ${trackId}`);
    console.log(`   Título: ${track.title}`);

    // 2. Obtener stats actual desde BD
    console.log('\n2. Stats en BD antes del stream:');
    let stats = await prisma.trackStats.findUnique({
      where: { trackId: trackId }
    });

    let playCountBefore = 0;
    if (stats) {
      playCountBefore = stats.playCount;
      console.log(`   ✓ PlayCount: ${playCountBefore}`);
    } else {
      console.log(`   ⚠ No hay stats, se crearán al hacer stream`);
    }

    // 3. Hacer 3 requests al endpoint de stream
    console.log('\n3. Haciendo 3 requests al endpoint /stream...');
    for (let i = 1; i <= 3; i++) {
      try {
        console.log(`   Request ${i}...`);
        const streamRes = await httpRequest(`${BASE_URL}/tracks/${trackId}/stream`);
        console.log(`      Status: ${streamRes.status}`);
        
        // Pequeña pausa
        await new Promise(r => setTimeout(r, 200));
      } catch (err) {
        console.log(`      Error (esperado si archivo no existe): ${err.message}`);
        // Es normal si el archivo no existe
      }
    }

    // 4. Esperar un poco para asegurar que las BD se actualizaron
    console.log('\n4. Esperando a que se guarden los cambios en BD...');
    await new Promise(r => setTimeout(r, 1500));

    // 5. Verificar playCount después desde BD
    console.log('\n5. Stats en BD después del stream:');
    stats = await prisma.trackStats.findUnique({
      where: { trackId: trackId }
    });

    let playCountAfter = 0;
    if (stats) {
      playCountAfter = stats.playCount;
      console.log(`   ✓ PlayCount: ${playCountAfter}`);
    } else {
      console.log(`   ✗ Stats no existen (error!)`);
    }

    // 6. Verificar endpoint GET /stats
    console.log('\n6. Verificando endpoint GET /tracks/{trackId}/stats...');
    const statsRes = await httpRequest(`${BASE_URL}/tracks/${trackId}/stats`);
    console.log(`   Status: ${statsRes.status}`);
    console.log(`   PlayCount del endpoint: ${statsRes.data?.data?.playCount}`);

    // 7. Resultado
    console.log('\n7. Resultado:');
    const increment = playCountAfter - playCountBefore;
    console.log(`   PlayCount antes: ${playCountBefore}`);
    console.log(`   PlayCount después: ${playCountAfter}`);
    console.log(`   Incremento: ${increment}`);

    if (increment === 3) {
      console.log('   ✅ SUCCESS: Se registraron las 3 reproducciones');
    } else if (increment > 0) {
      console.log(`   ⚠️ PARTIAL: Se registraron ${increment} reproducciones (esperadas 3)`);
    } else {
      console.log('   ❌ FAILURE: El playCount no se incrementó');
    }

    console.log('\n' + '='.repeat(60));

  } catch (err) {
    console.error('\n❌ ERROR:', err.message);
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
