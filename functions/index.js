const functions = require('firebase-functions');
const escapeHtml = require('escape-html');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.tweet = functions.https.onRequest((req, res) => {
  res.send(`hello keisuke ${escapeHtml(req.query.name || req.body.name || 'World')}`);
});
