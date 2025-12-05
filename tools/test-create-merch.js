'use strict';

(async () => {
  try {
    const Merch = require('../service/MerchService');
    const payload = {
      name: 'Camiseta de prueba',
      type: 'camiseta',
      description: 'Merch de testing',
      price: 15.5,
      currency: 'EUR',
      stock: 12,
      sku: 'TEST-SKU-001'
    };

    const resp = await Merch.merchPOST(payload);
    console.log('merchPOST response =', JSON.stringify(resp, null, 2));
  } catch (err) {
    console.error('Test failed', err);
    process.exit(1);
  }
})();
