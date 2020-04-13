const functions = require('firebase-functions');
const Twitter = require('twitter');
const config = functions.config();

export const twitterClient = (accessKey, accessSecrect) => {
  return new Twitter({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: accessKey,
    access_token_secret: accessSecrect
  });
}
