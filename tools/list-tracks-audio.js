const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const ts = await prisma.track.findMany({ include: { audio: true }, take: 50 });
    ts.forEach(t => {
      console.log(t.id, '-', t.title || '<no-title>', '-', (t.audio && t.audio.url) ? t.audio.url : '<no-audio>');
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
})();
