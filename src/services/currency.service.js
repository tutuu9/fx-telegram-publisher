const axios = require('axios');
const { env } = require('../config/env');

async function getRates() {
  try {
    const rates = [];

    for (const pair of env.currencyPairs) {
      const [base, target] = pair.split('/');

      const response = await axios.get(`${env.currencyApi.baseUrl}/convert`, {
        params: {
          from: base,
          to: target,
          amount: 1,
          access_key: env.currencyApi.accessKey,
        },
      });

      rates.push({
        pair,
        base,
        target,
        rate: response.data.result,
      });
    }

    return rates;
  } catch (error) {
    console.error('Failed to fetch currency rates:', error.message);
    throw error;
  }
}

module.exports = { getRates };