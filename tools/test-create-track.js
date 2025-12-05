const Albums = require('../service/AlbumsService');
const Tracks = require('../service/TracksService');

(async () => {
  try {
    // Create a minimal album to attach the track to (AlbumsService uses connectOrCreate for artist/label)
    const albRes = await Albums.albumsPOST({
      title: 'Test Album for Track',
      description: 'Album created by test script',
      artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      labelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      releaseDate: '2025-11-08',
      price: 0,
      currency: 'EUR',
      genres: ['test'],
      tags: ['test']
    });

    const albumId = albRes.data.id;
    console.log('Created album id =', albumId);

    const trackBody = {
      title: 'My Test Track',
      durationSec: 200,
      trackNumber: 1,
      albumId,
      audio: { codec: 'mp3', bitrate: 128, url: 'http://example.com/test.mp3' },
      lyrics: { language: 'en', text: 'La la la' }
    };

    const res = await Tracks.tracksPOST(trackBody);
    console.log('Track created:', res);
  } catch (e) {
    console.error('ERROR:', e.stack || e);
  } finally {
    process.exit(0);
  }
})();
