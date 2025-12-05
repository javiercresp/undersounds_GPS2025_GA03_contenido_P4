const service = require('../service/AlbumsService');

const body = {
  title: 'string',
  description: 'string',
  artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  labelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  releaseDate: '2025-11-08',
  price: 0,
  currency: 'EUR',
  genres: ['string'],
  tags: ['string']
};

(async () => {
  try {
    const res = await service.albumsPOST(body);
    console.log('OK', res);
  } catch (e) {
    console.error('ERROR STACK:', e.stack || e);
    console.error('ERROR MESSAGE:', e.message || e);
    if (e.meta) console.error('META:', e.meta);
  } finally {
    // ensure process exit
    process.exit(0);
  }
})();
