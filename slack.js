const config = require('./config.js');
const mrDecisionBot = require('./mrDecisionBot.js');

const { App } = require('@slack/bolt');

const app = new App({
  token: config.SLACK_BOT_TOKEN,
  signingSecret: config.SLACK_SIGNING_SECRET
});

app.message(/\D*/, async ({ context, say }) => {
  let reply = mrDecisionBot.discord(context.matches[0])
  if(reply !== null) {
    await say(reply.a);
  }
});

(async () => {
  await app.start(3500);
  console.log('⚡️ Bolt app is running!');
})();
