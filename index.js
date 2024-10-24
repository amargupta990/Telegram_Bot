
const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
dotenv.config();

console.log(process.env.TELEGRAM_TOKEN);

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/joke/, async (msg) => {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        console.log(response.data);

        const setup = response.data.setup;
        const punchline = response.data.punchline;

        bot.sendMessage(msg.chat.id, `${setup} ... ${punchline}`);
    } catch (error) {
        console.error('Error fetching joke:', error);
        bot.sendMessage(msg.chat.id, 'Sorry, I could not fetch a joke at this time.');
    }
});
