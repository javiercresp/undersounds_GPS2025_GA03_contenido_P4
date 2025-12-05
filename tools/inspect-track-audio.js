const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const trackId = process.argv[2];
if (!trackId) {
  console.error('Usage: node inspect-track-audio.js <trackId>');
  process.exit(1);
}

(async () => {
  try {
    const t = await prisma.track.findUnique({ where: { id: trackId }, include: { audio: true } });
    console.log(JSON.stringify(t, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
})();
