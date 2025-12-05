'use strict';

(async () => {
  try {
    const Merch = require('../service/MerchService');
    // Simula la llamada desde Swagger: page=1, limit=20, q='Camiseta de prueba22'
    const resp = await Merch.merchGET(1, 20, undefined, undefined, undefined, undefined, undefined, undefined, 'asc', 'Camiseta de prueba22');
    console.log('merchGET response =', JSON.stringify(resp, null, 2));
  } catch (err) {
    console.error('Test search failed', err);
    process.exit(1);
  }
})();
