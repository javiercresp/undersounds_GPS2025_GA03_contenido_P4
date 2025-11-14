'use strict';

(async () => {
  try {
    const Tracks = require('../service/TracksService');
    
    // Usa el ID del track del screenshot: 90b4a4d1-ee07-4e98-bc68-43d4c8c1ca79
    const trackId = '90b4a4d1-ee07-4e98-bc68-43d4c8c1ca79';
    
    // Actualizar el title
    const updatePayload = {
      title: 'Track Actualizado - ' + new Date().toISOString(),
      durationSec: 300
    };
    
    console.log(`[test-update-track] Actualizando track ${trackId} con:`, updatePayload);
    
    const resp = await Tracks.tracksTrackIdPATCH(updatePayload, trackId);
    console.log('tracksTrackIdPATCH response =', JSON.stringify(resp, null, 2));
    
    // Verify: fetch the track again to confirm update
    const resp2 = await Tracks.tracksTrackIdGET(trackId, 'album,audio,lyrics,stats');
    console.log('Verificación (GET): ', JSON.stringify(resp2.data, null, 2));
  } catch (err) {
    console.error('Test failed', err);
    process.exit(1);
  }
})();
