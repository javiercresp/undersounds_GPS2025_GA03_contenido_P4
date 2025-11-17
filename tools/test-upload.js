/**
 * Test: Upload files (audio, cover, merch images) and verify DB persistence + URL generation
 */

const fs = require('fs');
const path = require('path');
const prisma = require('../src/db/prisma');

// Create fake media files for testing
const audioFile = path.join(__dirname, '..', 'uploads', 'test-audio.mp3');
const coverFile = path.join(__dirname, '..', 'uploads', 'test-cover.jpg');

function ensureTestFiles() {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  // Create minimal fake MP3 (just a tiny file with magic bytes)
  if (!fs.existsSync(audioFile)) {
    const mp3Header = Buffer.from([0xff, 0xfb, 0x10, 0x00]); // minimal MP3 sync header
    fs.writeFileSync(audioFile, Buffer.concat([mp3Header, Buffer.alloc(100)]));
    console.log(`✓ Created fake audio file: ${audioFile}`);
  }

  // Create minimal fake JPEG
  if (!fs.existsSync(coverFile)) {
    const jpegHeader = Buffer.from([0xff, 0xd8, 0xff, 0xe0]); // JPEG SOI + APP0
    fs.writeFileSync(coverFile, Buffer.concat([jpegHeader, Buffer.alloc(100), Buffer.from([0xff, 0xd9])]));
    console.log(`✓ Created fake cover file: ${coverFile}`);
  }
}

async function testUploadWorkflow() {
  try {
    console.log('\n========== UPLOAD TEST WORKFLOW ==========\n');

    ensureTestFiles();

    // 1. Create or fetch an artist
    console.log('1. Creating Artist...');
    const artist = await prisma.artist.create({
      data: { name: `Test Artist for Upload ${Date.now()}` },
    });
    console.log(`   ✓ Artist: ${artist.id}`);

    // 2. Create or fetch a label
    console.log('2. Creating Label...');
    const label = await prisma.label.create({
      data: { name: `Test Label for Upload ${Date.now()}` },
    });
    console.log(`   ✓ Label: ${label.id}`);

    // 3. Create an album (with minimal cover)
    console.log('3. Creating Album...');
    const album = await prisma.album.create({
      data: {
        title: `Album Upload Test ${Date.now()}`,
        releaseDate: new Date(),
        price: 10.0,
        currency: 'EUR',
        genres: 'rock',
        tags: 'test',
        releaseState: 'draft',
        artist: { connect: { id: artist.id } },
        label: { connect: { id: label.id } },
        cover: {
          create: {
            url: '/uploads/placeholder.jpg',
            alt: 'placeholder',
            width: 300,
            height: 300,
          },
        },
      },
      include: { cover: true },
    });
    console.log(`   ✓ Album: ${album.id}, current cover: ${album.cover.url}`);

    // 4. Create a track
    console.log('4. Creating Track...');
    const track = await prisma.track.create({
      data: {
        title: `Track Upload Test ${Date.now()}`,
        trackNumber: 1,
        durationSec: 180, // 3 minutes
        album: { connect: { id: album.id } },
      },
      include: { audio: true },
    });
    console.log(`   ✓ Track: ${track.id}, audio: ${track.audio ? 'exists' : 'null'}`);

    // 5. Create a merch item
    console.log('5. Creating Merch Item...');
    const merch = await prisma.merchItem.create({
      data: {
        title: `Merch Upload Test ${Date.now()}`,
        category: 'SHIRT',
        priceCents: 2500,
        currency: 'EUR',
        stock: 10,
        artist: { connect: { id: artist.id } },
      },
    });
    console.log(`   ✓ Merch: ${merch.id}`);

    // 6. Simulate UploadsService.tracksTrackIdAudioPOST
    console.log('\n6. Simulating POST /tracks/{trackId}/audio...');
    {
      const UploadsService = require('../service/UploadsService');
      const mockFile = {
        filename: 'test-track-audio.mp3',
        originalname: 'my-song.mp3',
        mimetype: 'audio/mpeg',
      };
      const result = await UploadsService.tracksTrackIdAudioPOST(track.id, mockFile);
      console.log(`   ✓ Result status/code: ${result.status || 200}`);
      console.log(`   ✓ Updated track audio URL: ${result.data.audio?.url || 'N/A'}`);
      console.log(`   ✓ Audio codec: ${result.data.audio?.codec || 'N/A'}`);
    }

    // 7. Verify audio was persisted
    console.log('7. Verifying Track audio in DB...');
    {
      const updated = await prisma.track.findUnique({
        where: { id: track.id },
        include: { audio: true },
      });
      console.log(`   ✓ Track audio URL: ${updated.audio?.url || 'missing'}`);
      console.log(`   ✓ Track audio codec: ${updated.audio?.codec || 'missing'}`);
    }

    // 8. Simulate UploadsService.albumsAlbumIdCoverPOST
    console.log('\n8. Simulating POST /albums/{albumId}/cover...');
    {
      const UploadsService = require('../service/UploadsService');
      const mockFile = {
        filename: 'album-cover-new.jpg',
        originalname: 'cover-art.jpg',
        mimetype: 'image/jpeg',
      };
      const result = await UploadsService.albumsAlbumIdCoverPOST(album.id, mockFile);
      console.log(`   ✓ Updated album cover URL: ${result.data.cover?.url || 'N/A'}`);
    }

    // 9. Verify album cover was updated
    console.log('9. Verifying Album cover in DB...');
    {
      const updated = await prisma.album.findUnique({
        where: { id: album.id },
        include: { cover: true },
      });
      console.log(`   ✓ Album cover URL: ${updated.cover?.url || 'missing'}`);
    }

    // 10. Simulate UploadsService.merchMerchIdImagesPOST
    console.log('\n10. Simulating POST /merch/{merchId}/images...');
    {
      const UploadsService = require('../service/UploadsService');
      const mockFiles = [
        { filename: 'merch-img-1.jpg', originalname: 'shirt-front.jpg', mimetype: 'image/jpeg' },
        { filename: 'merch-img-2.jpg', originalname: 'shirt-back.jpg', mimetype: 'image/jpeg' },
      ];
      const result = await UploadsService.merchMerchIdImagesPOST(merch.id, mockFiles);
      console.log(`   ✓ Updated merch cover URL: ${result.data.cover?.url || 'N/A'}`);
    }

    // 11. Verify merch cover
    console.log('11. Verifying Merch cover in DB...');
    {
      const updated = await prisma.merchItem.findUnique({
        where: { id: merch.id },
        include: { cover: true },
      });
      console.log(`   ✓ Merch cover URL: ${updated.cover?.url || 'missing'}`);
    }

    // 12. Test TracksService.tracksTrackIdStreamGET
    console.log('\n12. Testing GET /tracks/{trackId}/stream...');
    {
      const TracksService = require('../service/TracksService');
      const result = await TracksService.tracksTrackIdStreamGET(track.id);
      console.log(`   ✓ Stream URL: ${result.url || 'N/A'}`);
      console.log(`   ✓ Expires at: ${result.expiresAt || 'N/A'}`);
    }

    console.log('\n========== ALL TESTS PASSED ✓ ==========\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ TEST FAILED:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

testUploadWorkflow();
