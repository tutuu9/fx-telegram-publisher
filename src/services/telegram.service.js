const axios = require('axios');
const { env } = require('../config/env');

async function sendMessage(text) {
    try {
        const url = `https://api.telegram.org/bot${env.telegram.botToken}/sendMessage`;

        await axios.post(url, {
            chat_id: env.telegram.chatId,
            text: text
        });
        console.log('Message sent to Telegram');
    } catch (error) {
        console.error('Failed to send Telegram message:', error.message);
    };
}

module.exports = { sendMessage };