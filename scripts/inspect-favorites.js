const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    console.log('=== Favorites ===');
    const favs = await prisma.favorite.findMany({ orderBy: { createdAt: 'desc' } });
    console.log(JSON.stringify(favs, null, 2));

    console.log('\n=== Albums (first 20) ===');
    const albums = await prisma.album.findMany({ take: 20 });
    console.log(JSON.stringify(albums.map(a => ({ id: a.id, title: a.title, coverId: a.coverId })), null, 2));

    console.log('\n=== Tracks (first 20) ===');
    const tracks = await prisma.track.findMany({ take: 20 });
    console.log(JSON.stringify(tracks.map(t => ({ id: t.id, title: t.title, albumId: t.albumId })), null, 2));

  } catch (e) {
    console.error('Inspect error:', e?.message || e);
  } finally {
    await prisma.$disconnect();
  }
})();
