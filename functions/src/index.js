const functions = require('firebase-functions');
const escapeHtml = require('escape-html');
const moment = require("moment-timezone");

const { app } = require('./app');
const { sampleText } = require('./sampleText');
const { twitterClient } = require('./twitter');

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.word = functions.https.onRequest((request, response) => {
  response.send(sampleText(request.query.word));
});

exports.momentTest = functions.https.onRequest((request, response) => {
  const day = moment().tz('UTC').format('DD');
  response.send(day);
})

exports.tweet = functions.https.onRequest((req, res) => {
  const { word, accessKey, accessSecret } = req.body;
  const client = twitterClient(accessKey, accessSecret);

  client.post('statuses/update', {status: `this is ${word}`}, (error, tweet, response) => {
    if (!error) {
      res.send({ title: 'Express', tweet })
    }
    else {
      res.send({ error: "this is error: " + error })
    }
  });
});

exports.api = functions.https.onRequest(app);
