const TelegrammApi = require('node-telegram-bot-api');

const token = '7297844201:AAEfkUfN2MWre3GgLBgN49r_VwllfSrfNhw'

const bot = new TelegrammApi(token, {polling: true});
const chats ={};

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
        ]
    })
}
const start = () =>{
    bot.setMyCommands([
        {command: '/start', description: 'helo'},
        {command: '/info', description: 'your name'},
        {command: '/game', description: 'playing random games'}
    ])

    bot.on('message', async msg =>{
        console.log(msg);
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start'){
            return  bot.sendMessage(chatId, text);
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Yor name is ${msg.chat.username}`);
        }

        if (text === '/game') {
            await bot.sendMessage(chatId, `Загадываю цифру от 1 до 10`);
            const randomNumber = Math.floor(Math.random() * 10);
            chats[chatId] = randomNumber
            return bot.sendMessage(chatId, `Guess it`, gameOptions);
        }

        return bot.sendMessage(chatId, 'dont understand you');
    })

    bot.on('callback_query', async msg => {
        console.log('logs msg', msg)
        const chatId = msg.message.chat.id;
        if (msg.data === chats[chatId]) {
            return  await bot.sendMessage(chatId, `You are right`);
        }
        return await bot.sendMessage(chatId, `You are wrong, the number i imaged is ${chats[chatId]}`);
    })
}

start()