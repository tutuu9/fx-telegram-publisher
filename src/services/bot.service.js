const { env } = require('../config/env')
const axios = require('axios');
const { getRates } = require('./currency.service');
const { sendMessage } = require('./telegram.service');
const { formatRatesMessage } = require('../utils/formatRatesMessage');

let lastUpdateId = 0;

function isAdmin(userId) {
    const admins = env.telegram.admins;
    const user = String(userId);

    const result = admins.includes(user);
    return result;
    // also return env.telegram.admins.includes(String(userId));
};

async function startBot() {
    setInterval(async () => {
        try {
            const url = `https://api.telegram.org/bot${env.telegram.botToken}/getUpdates`;
            const response = await axios.get(url, {
                params: {
                    offset: lastUpdateId,
                },
            });
            const updates = response.data.result;

            for (const update of updates) {
                lastUpdateId = update.update_id + 1;
                const message = update.message;

                if (!message) continue;

                const text = message.text;
                const userId = message.from.id;

                if (text === '/postnow') {
                    if (!isAdmin(userId)) {
                        console.log(`Access denied for user: ${userId}`);
                        continue;
                    }

                    const rates = await getRates();
                    const formattedMessage = formatRatesMessage(rates);
                    await sendMessage(env.telegram.chatId, formattedMessage);
                    await sendMessage(userId, '✅ Post successfully published');
                    console.log('Post sent by admin command');
                }
            }
        } catch (error) {
            console.error('Bot polling error:', error.message);
        }
    }, 3000);
}

module.exports = { isAdmin , startBot };