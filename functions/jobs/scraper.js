const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.eurogamer.net/articles/2019-05-24-fortnite-fortbyte-locations-6003';

const getFortByteCheerioData  = (html) => {
  const fortByteTrackerBlock = $('.table-wrapper table tbody > tr',html);

  return fortByteTrackerBlock;
}

/**
 * 
 * @param {Cheerio} fortByteCheerioData 
 */
const processCheerioData = (fortByteCheerioData) => {
 
  const fortByteData = fortByteCheerioData.toArray().map(cheerioData => {
   const fbCheerio = $('td', cheerioData);
   
   if(fbCheerio.find('a').text()){
    const achorCheerio = fbCheerio.find('a');
    const fortByteNumber = achorCheerio.first().text();
    const description = achorCheerio.last().text();
    return {
      id: parseInt(fortByteNumber.split(' ')[1]),
      description: `${fortByteNumber} - ${description}`,
      url: achorCheerio.first().attr('href'),
      unlocked: true,
      canBeFound: true,
    };
   }

   const fortByteNumber = fbCheerio.first().text();
   const description = fbCheerio.last().text();
   return {
      id: parseInt(fortByteNumber.split(' ')[1]),
      description: `${fortByteNumber} - ${description}`,
      unlocked: !description.includes('Fortbyte TBC'),
      isAchieved: !description.includes('Fortbyte TBC'),
    };
  });
  return fortByteData;
} 

const findUpdatedDate = (html) => {
  const articleUpdateDateBlock = $('.date span',html);

  return $(articleUpdateDateBlock).text();
};

const scrapeFortByteData = async () => {
  const html = await rp(url);
  
  const fortByteCheerioData = getFortByteCheerioData(html)

  const lastUpdatedDate = findUpdatedDate(html);

  const fortBytes = processCheerioData(fortByteCheerioData);

  return {
    lastUpdatedDate,
    fortBytes,
  };
};

module.exports = {
  scrapeFortByteData,
};


