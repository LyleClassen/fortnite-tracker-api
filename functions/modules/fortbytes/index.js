const express = require('express');
const cors = require('cors');
const updateFortBytes = require('./update-fortbytes');
const getFortBytes = require('./get-fortbytes');

const app = express();   
app.use(cors({ origin: true }));


const fortBytes = (admin) => { 
  app.put('/:season', updateFortBytes(admin));
  app.get('/:season', getFortBytes(admin));
  return app;
};

module.exports = fortBytes;