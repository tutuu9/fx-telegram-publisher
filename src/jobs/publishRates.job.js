const cron = require('node-cron');
const { getRates } = require('../services/currency.service');
const { sendMessage } = require('../services/telegram.service');
const { formatRatesMessage } = require('../utils/formatRatesMessage');
const { env } = require('../config/env');

function startRatesJob() {
    cron.schedule(env.cronSchedule, async () => {
        const rates = await getRates();
        const message = formatRatesMessage(rates);
        
        console.log(message);
        
        await sendMessage(message);

        console.log('Running scheduled rates job...');
    }); 
}
module.exports = { startRatesJob };