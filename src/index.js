const { createApp } = require('./app');
const { getRates } = require('./services/currency.service');
const { sendMessage } = require('./services/telegram.service');
const { formatRatesMessage } = require('./utils/formatRatesMessage');
const { startRatesJob } = require('./jobs/publishRates.job');

async function bootstrap() {
  const app = createApp();
  app.start();

  const rates = await getRates();
  const message = formatRatesMessage(rates);
  
  console.log(message);
  
  await sendMessage(message);

  startRatesJob();
  
  console.log('fx-telegram-publisher is running');
}

bootstrap();