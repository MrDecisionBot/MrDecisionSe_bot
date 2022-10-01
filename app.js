const { Telegraf } = require('telegraf')
// config.sample.js 파일을 참조해주십시요.
const config = require('./config.js');
const bot = new Telegraf(config.token)

const mrDecisionBot = require('./mrDecisionBot.js');

bot.start((ctx) => ctx.reply(mrDecisionBot.helpMessage))
bot.help((ctx) => ctx.reply(mrDecisionBot.helpMessage))
bot.command('/about', (ctx) => ctx.reply(mrDecisionBot.aboutText))
bot.catch((err) => { console.error('Telegram Error : ', err) })
bot.on('text', (ctx) => {
  let response = mrDecisionBot.process(ctx);  
  ctx.reply(response.a)
})

bot.startPolling()
