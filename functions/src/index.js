const functions = require('firebase-functions');
const escapeHtml = require('escape-html');
const Twitter = require('twitter');
const admin = require('firebase-admin');
admin.initializeApp();

import { app, keisuke, byeWorld } from './app.js';
import { sampleText } from './sampleText.js';

// const config = functions.config();

// const twitter = (accessKey, accessSecrect) => {
//   return new Twitter({
//     consumer_key: config.twitter.consumer_key,
//     consumer_secret: config.twitter.consumer_secret,
//     access_token_key: accessKey,
//     access_token_secret: accessSecrect
//   });
// }

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.word = functions.https.onRequest((request, response) => {
  response.send(sampleText("foooooo"));
});

exports.byeWorld = functions.https.onRequest(byeWorld);

exports.keisuke = functions.https.onRequest(keisuke);

exports.api = functions.https.onRequest(app);

// exports.tweet = functions.https.onRequest((req, res) => {
//   const { word, accessKey, accessSecret } = req.body;
//   const client = twitter(accessKey, accessSecret);
//
//   client.post('statuses/update', {status: `this is ${word}`}, (error, tweet, response) => {
//     if (!error) {
//       res.send({ title: 'Express', tweet })
//     }
//     else {
//       res.send({ error: "this is error: " + error })
//     }
//   });
// });
