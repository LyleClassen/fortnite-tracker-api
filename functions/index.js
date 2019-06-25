const functions = require('firebase-functions');
const fortBytes = require('./modules/fortbytes/fortbytes');

const fortbytes =  functions.https.onRequest(fortBytes);

module.exports = {
  fortbytes,
};
