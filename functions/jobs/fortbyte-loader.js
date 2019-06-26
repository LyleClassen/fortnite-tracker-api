#!/usr/bin/env node
const rp = require('request-promise');
const { scrapeFortByteData } = require('./scraper.js');
const fortByteURL = 'https://us-central1-fortnite-tracker-ba7c9.cloudfunctions.net/fortbytes';

require('yargs')
  .scriptName("fortbyte-loader")
  .usage('$0 <season>', 'load fortbytes', (yargs) => {
    yargs.positional('season', {
      describe: 'the season number to load',
      type: 'number',
    })
  },
  async ({ season }) => {
    try {
      const fbData = await scrapeFortByteData();

      const options = { 
        method: 'PUT',
        uri: `${fortByteURL}/${season}`,
        body: fbData,
        json: true 
      }
     const result = await rp(options);

     console.log('Success:', result);
    } catch (error) {
      console.error(error);
    }
  })
  .help()
  .argv