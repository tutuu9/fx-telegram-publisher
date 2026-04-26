const { createApp } = require('./app');
const { getRates } = require('./services/currency.service');
const { sendMessage } = require('./services/telegram.service');
const { formatRatesMessage } = require('./utils/formatRatesMessage');


async function bootstrap() {
  const app = createApp();
  app.start();

  const rates = await getRates();
  console.log(rates);
  const message = formatRatesMessage(rates);
  await sendMessage(message);
  console.log('fx-telegram-publisher is running');
}

bootstrap();