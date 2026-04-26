async function sendMessage(text) {
    try {
        const url = `https://api.telegram.org/bot${env.telegram.botToken}/sendMessage`;

        await axios.post(url, {
            chat_id: env.telegram.chatId,
            text: text
        });
    } catch (error) {
        console.log(error);
    };
}

module.exports = { sendMessage };