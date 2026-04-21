const { createApp } = require('./app');

function bootstrap() {
  const app = createApp();
  app.start();

  console.log('fx-telegram-publisher is running');
}

bootstrap();