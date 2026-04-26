const axios = require('axios');
const { env } = require('../config/env');

async function getRates() {
  try {
    const rates = [];

    for (const pair of env.currencyPairs) {
      const [base, target] = pair.split('/');

      const response = await axios.get(`${env.currencyApi.baseUrl}/${base}`);

      if (response.data.result !== 'success') {
        throw new Error(`Currency API failed for base currency: ${base}`);
      }

      const rate = response.data.rates[target];

      if (!rate) {
        throw new Error(`Rate not found for pair: ${pair}`);
      }

      rates.push({
        pair,
        base,
        target,
        rate,
        updatedAt: response.data.time_last_update_utc,
      });
    }

    return rates;
  } catch (error) {
    console.error('Failed to fetch currency rates:', error.message);
    throw error;
  }
}

module.exports = { getRates };