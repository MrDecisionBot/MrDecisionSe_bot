const line = require('@line/bot-sdk');
const express = require('express');

const config = require('./config.js');
const mrDecisionBot = require('./mrDecisionBot.js');

const conf = {
  channelAccessToken: config.CHANNEL_ACCESS_TOKEN,
  channelSecret: config.CHANNEL_SECRET,
};

const client = new line.Client(conf);
const app = express();
app.use(express.static('./public'));

app.post('/', line.middleware(conf), (req, res) => {
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
        console.dir(err);
        res.status(500).end();
      });
  });

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  
  let response = mrDecisionBot.process(event);
  if(response !== null) {
    const echo = { type: 'text', text: response.a};
    return client.replyMessage(event.replyToken, echo);
  }
}

const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
