const functions = require('firebase-functions');
const escapeHtml = require('escape-html');
const moment = require("moment-timezone");

const { app } = require('./app');
const { sampleText } = require('./sampleText');
const { twitterClient } = require('./twitter');

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.helloWorldOnCall = functions.https.onCall((data, context) => {
  const headers = context.rawRequest.headers;
  return { dream: 'foofoo', ag: ['abc','def'] };
});

exports.word = functions.https.onRequest((request, response) => {
  response.send(sampleText(request.query.word));
});

exports.momentTest = functions.https.onRequest((request, response) => {
  const day = moment().tz('UTC').format('DD');
  response.send(day);
})

exports.tweet = functions.https.onRequest((req, res) => {
  const { word, accessKey, accessSecret, redirectTo } = req.body;
  const client = twitterClient(accessKey, accessSecret);

  client.post('statuses/update', {status: `this is ${word}`}, (error, tweet, response) => {
    if (!error) {
      res.redirect(redirectTo)
    } else {
      res.redirect(redirectTo)
    }
  });
});

exports.api = functions.https.onRequest(app);
