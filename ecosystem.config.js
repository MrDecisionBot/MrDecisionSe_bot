module.exports = {
  apps : [{
    name: 'telegram',
    script: './app.js',
    log_file: './logs/telegram.log',
    time: true
  }, {
    name: 'discord',
    script: './discordbot.js',
    log_file: './logs/discord.log',
    time: true
  }, {
    name: 'line',
    script: './linebot.js',
    log_file: './logs/line.log',
    time: true
  },{
    name: 'slack',
    script: './slack.js',
    log_file: './logs/slack.log',
    time: true
  }]
};
