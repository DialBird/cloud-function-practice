const functions = require('firebase-functions');
const express = require('express');
const cookieParser = require('cookie-parser')();
const session = require('express-session');
const cors = require('cors')({origin: true});
const app = express();
const config = functions.config();

import { passport } from './passport';

app.use(cookieParser);
app.use(cors);
app.use(session({secret: config.session.secret}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/hello', (req, res) => { res.send(`Hello ${req.query.name}`); });
app.get('/auth/twitter', (req, res) => {
  req.session.uid = req.query.uid;
  passport.authenticate('twitter')(req, res);
})
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: config.session.redirect_url }), (req, res) => {
    res.redirect(config.session.redirect_url);
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
