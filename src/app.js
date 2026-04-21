const { env } = require('./config/env');

function createApp() {
  return {
    start() {
      console.log('App has been initialized');
      console.log(`Environment: ${env.nodeEnv}`);
      console.log(`Configured currency pairs: ${env.currencyPairs.join(', ')}`);
    },
  };
}

module.exports = { createApp };