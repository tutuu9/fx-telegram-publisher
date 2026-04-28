# 💱 FX Telegram Publisher

Node.js backend service that tracks currency exchange rates and automatically publishes updates to a Telegram channel.

## Features

- Fetch exchange rates from external API
- Publish formatted messages to Telegram channel
- Automatic posting by cron schedule
- Manual publishing with `/postnow`
- Admin-only command access
- Rate change indicators: ⬆️ ⬇️ ➖
- Configuration through `.env`

## Tech Stack

- Node.js
- Axios
- node-cron
- dotenv
- Telegram Bot API

## Project Structure

```bash
src/
  config/
    env.js
  services/
    currency.service.js
    telegram.service.js
    bot.service.js
    ratesHistory.service.js
  jobs/
    publishRates.job.js
  utils/
    formatRatesMessage.js
  app.js
  index.js
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development

TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_channel_id
TELEGRAM_ADMIN_IDS=your_telegram_user_id

CURRENCY_API_BASE_URL=https://open.er-api.com/v6/latest
CURRENCY_PAIRS=USD/PLN,EUR/PLN,USD/UAH,EUR/UAH

CRON_SCHEDULE=0 9 * * *
```

For testing cron every minute:

```env
CRON_SCHEDULE=*/1 * * * *
```

## Installation

```bash
git clone <your-repository-url>
cd fx-telegram-publisher
npm install
```

## Run Locally

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Telegram Setup

1. Create a bot using BotFather.
2. Add the bot to your Telegram channel.
3. Give the bot admin permission to publish messages.
4. Add your bot token and channel ID to `.env`.
5. Add your Telegram user ID to `TELEGRAM_ADMIN_IDS`.

If there are multiple admins, separate IDs with commas:

```env
TELEGRAM_ADMIN_IDS=123456789,987654321
```

## Bot Commands

```txt
/postnow
```

Publishes exchange rates manually.  
Only users listed in `TELEGRAM_ADMIN_IDS` can use this command.

## Example Message

```txt
💱 Exchange Rates

USD/PLN: 3.62 ⬆️ +0.03
EUR/PLN: 4.24 ➖ 0.00
USD/UAH: 44.03 ⬇️ -0.05
EUR/UAH: 51.48 ⬆️ +0.10
```

## Roadmap

- Store rate history in a database
- Add more Telegram commands
- Add better logging
- Add Docker support
- Deploy to VPS or cloud hosting
- Improve message formatting

