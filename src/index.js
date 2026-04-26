const { createApp } = require('./app');
const { getRates } = require('./services/currency.service');

async function bootstrap() {
  const app = createApp();
  app.start();

  const rates = await getRates();
  console.log(rates);

  console.log('fx-telegram-publisher is running');
}

bootstrap();