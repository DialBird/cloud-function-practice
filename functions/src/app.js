const functions = require('firebase-functions');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const app = express();

const config = functions.config();

passport.use(new TwitterStrategy({
  consumerKey: config.twitter.consumer_key,
  consumerSecret: config.twitter.consumer_secret,
  callbackURL: config.twitter.callback_url
}, (token, tokenSecret, profile, cb) => {
  console.log('token', token);
  console.log('secret', tokenSecret);
}));

app.use(cookieParser);
app.use(cors);
app.get('/hello', (req, res) => {
  res.send(`Hello ${req.query.name}`);
});
app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/twitter/callback',
  passport.authenticate('twitter'), (req, res) => {
    res.redirect('https://example.com');
  });

// app.post('/tweet', (req, res) => {
//   const { word, accessKey, accessSecret } = req.body;
//   cnsole.log('word', word);
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

module.exports = { app };