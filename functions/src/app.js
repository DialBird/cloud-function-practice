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
app.get('/auth/twitter', (req, res, next) => {
  req.session.redirectTo = req.query.redirectTo;
  passport.authenticate('twitter')(req, res, next);
});
app.get('/auth/twitter/callback', (req, res, next) => {
  passport.authenticate('twitter', (err, user, info) => {
    if (err) { return res.redirect(req.session.redirectTo); }
    const { token, secret } = req.session;
    return res.redirect(`${req.session.redirectTo}?token=${token}&secret=${secret}`);
  })(req, res, next);
});

module.exports = { app };
