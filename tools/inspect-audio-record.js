const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const trackId = process.argv[2];
if (!trackId) {
  console.error('Usage: node inspect-audio-record.js <trackId>');
  process.exit(1);
}

(async () => {
  try {
    const a = await prisma.audio.findFirst({ where: { trackId } });
    console.log(JSON.stringify(a, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
})();
