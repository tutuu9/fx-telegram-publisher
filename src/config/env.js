const dotenv = require('dotenv');

dotenv.config();

const requiredEnvVars = ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
  currencyApi: {
    baseUrl: process.env.CURRENCY_API_BASE_URL || 'https://api.exchangerate.host',
  },
  currencyPairs: process.env.CURRENCY_PAIRS
    ? process.env.CURRENCY_PAIRS.split(',').map((pair) => pair.trim())
    : ['USD/PLN', 'EUR/PLN'],
  cronSchedule: process.env.CRON_SCHEDULE || '0 9 * * *',
};

module.exports = { env };