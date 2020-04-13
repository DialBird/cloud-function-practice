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
app.get('/auth/twitter/callback', (req, res) => {
  passport.authenticate('twitter', { successRedirect: config.session.redirect_url, failureRedirect: config.session.redirect_url })(req, res);
});

module.exports = { app };
