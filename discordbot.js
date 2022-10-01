const Discord = require('discord.js');
const config = require('./config.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const mrDecisionBot = require('./mrDecisionBot.js');

client.on('message', msg => {
  /* discord wrapper */
  let reply = mrDecisionBot.discord(msg.content)
  if(reply !== null) {
    console.log(reply);
    msg.reply(reply.a);  
  }
});

client.login(config.discord_token);
