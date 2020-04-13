const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
export const db = admin.firestore();
