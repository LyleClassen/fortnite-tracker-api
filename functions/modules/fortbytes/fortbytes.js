const express = require('express');
const cors = require('cors');
const HttpCodes = require('http-status-codes');
const { scrapeFortByteData } = require('./scraper');
const app = express();   
app.use(cors({ origin: true }));

/**
 * 
 * @param {import('firebase-admin')} admin 
 */
const fortBytes = (admin) => { 
  app.put('/',async (req,res) => {
    try {
      const { lastUpdatedDate, fortBytes } = req.body;
      const db = admin.firestore().collection('fortbyteInfo').doc('fortbyteData')

    } catch (error) {
      res.status(HttpCodes.BAD_REQUEST);
      res.send();
    }
  
  });
};

module.exports = fortBytes;