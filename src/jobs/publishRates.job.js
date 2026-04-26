const cron = require('node-cron');
const { getRates } = require('../services/currency.service');
const { sendMessage } = require('../services/telegram.service');
const { formatRatesMessage } = require('../utils/formatRatesMessage');
const { env } = require('../config/env');

function startRatesJob() {
    console.log(`Rates job scheduled with: ${env.cronSchedule}`);

    cron.schedule(env.cronSchedule, async () => {
        try {
            console.log('Running scheduled rates job...');

            const rates = await getRates();
            const message = formatRatesMessage(rates);

            console.log(message);

            await sendMessage(message);

        } catch (error) {
            console.error('Rates job failed:', error.message);
        }
    });
}

module.exports = { startRatesJob };