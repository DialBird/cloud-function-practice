const functions = require('firebase-functions');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = functions.config();

passport.use(new TwitterStrategy({
  consumerKey: config.twitter.consumer_key,
  consumerSecret: config.twitter.consumer_secret,
  callbackURL: config.twitter.callback_url
}, (token, tokenSecret, profile, done) => {
  done(null, profile);
}));
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = { passport };
