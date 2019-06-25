const admin = require("firebase-admin");
const functions = require('firebase-functions');
const fortBytes = require('./modules/fortbytes/fortbytes');

admin.initializeApp();

const fortbytes =  functions.https.onRequest(fortBytes(admin));

module.exports = {
  fortbytes,
};
