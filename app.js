const Telegraf = require('telegraf')
// Logger
var winston = require('winston');
const moment = require('moment');
const tsFormat = () => moment().format('YYYY-MM-DD hh:mm:ss').trim();

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
       timestamp: tsFormat,
       colorize: true,
       level: 'info'
     }),
      new (require('winston-daily-rotate-file'))({
        level: 'info',
        filename: 'logs/bot-%DATE%.log',
        timestamp: tsFormat,
        datePattern: 'YYYY-MM-DD-HH',
        prepend: true,
      })
    ]
  });

const config = require('./config.js');
const bot = new Telegraf(config.token)

var mrDecisionBot = require('./mrDecisionBot.js');

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply(mrDecisionBot.helpMessage))
bot.command('/about', (ctx) => ctx.reply(mrDecisionBot.aboutText))
bot.on('text', (ctx) => {
  // Explicit usage
  var response = mrDecisionBot.process(ctx);
  // Using shortcut
  if (response !== null) {
    logger.log('info', response);
    ctx.reply(response)
  }
})

bot.startPolling()
