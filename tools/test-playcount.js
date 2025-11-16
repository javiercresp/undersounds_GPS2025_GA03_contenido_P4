#!/usr/bin/env node
'use strict';

/**
 * Script para probar directamente que el playCount se incrementa
 * Usa Prisma directamente, sin HTTP
 */

const prisma = require('../src/db/prisma');

async function main() {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('TEST: Verificar incremento de playCount');
    console.log('='.repeat(60));

    // 1. Obtener cualquier track con stats
    console.log('\n1. Buscando tracks con estadísticas...');
    const tracksWithStats = await prisma.track.findMany({
      include: { stats: true },
      take: 1
    });

    if (tracksWithStats.length === 0) {
      console.log('   No hay tracks en la BD. Creando uno...');
      
      // Crear artista
      const artist = await prisma.artist.create({
        data: { name: 'Test Artist ' + Date.now() }
      });
      console.log(`   ✓ Artist creado: ${artist.id}`);

      // Crear label
      const label = await prisma.label.create({
        data: { name: 'Test Label ' + Date.now() }
      });
      console.log(`   ✓ Label creado: ${label.id}`);

      // Crear album
      const album = await prisma.album.create({
        data: {
          title: 'Test Album ' + Date.now(),
          artistId: artist.id,
          labelId: label.id,
          releaseDate: new Date(),
          releaseState: 'draft',
          price: 9.99,
          currency: 'EUR',
          genres: 'Rock',
          tags: 'test',
          coverId: 'temp-id-placeholder' // Esto podría causar error, pero veremos
        }
      }).catch(err => {
        console.log('   Error creando album (probablemente por cover obligatorio)');
        return null;
      });

      if (!album) {
        console.log('\n   Saltando prueba por falta de datos...');
        return;
      }

      // Crear track
      const track = await prisma.track.create({
        data: {
          title: 'Test Track ' + Date.now(),
          trackNumber: 1,
          durationSec: 180,
          albumId: album.id
        }
      });
      console.log(`   ✓ Track creado: ${track.id}`);

      // Crear stats
      const stats = await prisma.trackStats.create({
        data: {
          playCount: 0,
          trackId: track.id
        }
      });
      console.log(`   ✓ TrackStats creado con playCount = ${stats.playCount}`);

      // Continuar con el track creado
      tracksWithStats.push(track);
    }

    const track = tracksWithStats[0];
    console.log(`\n2. Track seleccionado: ${track.id}`);
    console.log(`   Título: ${track.title}`);

    // 2. Obtener stats actual
    console.log('\n3. Obteniendo stats actuales...');
    let stats = await prisma.trackStats.findUnique({
      where: { trackId: track.id }
    });

    if (!stats) {
      console.log('   Stats no existe. Creando...');
      stats = await prisma.trackStats.create({
        data: {
          playCount: 0,
          trackId: track.id
        }
      });
    }

    const playCountBefore = stats.playCount;
    console.log(`   Play count ANTES: ${playCountBefore}`);

    // 3. Incrementar el playCount 5 veces
    console.log('\n4. Incrementando playCount 5 veces...');
    for (let i = 1; i <= 5; i++) {
      stats = await prisma.trackStats.update({
        where: { id: stats.id },
        data: { playCount: stats.playCount + 1 }
      });
      console.log(`   Incremento ${i}: playCount = ${stats.playCount}`);
    }

    // 4. Verificar que se actualicó
    console.log('\n5. Verificando resultado final...');
    stats = await prisma.trackStats.findUnique({
      where: { trackId: track.id }
    });

    const playCountAfter = stats.playCount;
    console.log(`   Play count DESPUÉS: ${playCountAfter}`);
    console.log(`   Diferencia: ${playCountAfter - playCountBefore}`);

    // 5. Resultado
    console.log('\n6. Resultado:');
    if (playCountAfter === playCountBefore + 5) {
      console.log('   ✅ SUCCESS: playCount se incrementó correctamente');
    } else {
      console.log('   ❌ FAILURE: playCount no se incrementó como se esperaba');
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
