const express = require('express');
const cors = require('cors');
const { scrapeFortByteData } = require('./scraper');

const fortBytes = express();   
fortBytes.use(cors({ origin: true }));

fortBytes.get('/',async (req,res) => {
  const fortByteData = await scrapeFortByteData();
  res.send(fortByteData);
});

module.exports = fortBytes;