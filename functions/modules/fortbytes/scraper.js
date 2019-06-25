const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://fortniteintel.com/complete-list-of-all-fortbyte-challenges-currently-available/17530/';

const getFortByteCheerioData  = (html) => {
  const fortByteTrackerBlock = $('.td-post-content.td-pb-padding-side p > strong',html);

  const fortByteCheerioData = fortByteTrackerBlock.filter((i,line) => {
    if(/^(Fortbyte )(\d){2,3}/.test($(line).text())){
      return line;
    } 
  });
  return fortByteCheerioData;
}

const getDescAndUrl = (fbCheerio) => {
  let fbInfo;
  if (fbCheerio.siblings().length) {
    const helpLink = fbCheerio.siblings('a');
    fbInfo = {
      description: fbCheerio.text() + helpLink.text(),
      url: helpLink.attr('href'),
      canBeFound: true,
    };
  }
  else {
    fbInfo = {
      description: fbCheerio.text(),
      isAchieved: true,
    };
  }
  return fbInfo;
}

const processCheerioData = (fortByteCheerioData) => {
  const fortByteData = [];
  fortByteCheerioData.each((i, fbCheerioRaw) => {
    const fbCheerio = $(fbCheerioRaw);

    let fbInfo = getDescAndUrl(fbCheerio);

    fbInfo.id = parseInt(fbCheerio.text().split(' ')[1]);
    fbInfo.unlocked = !fbCheerio.text().endsWith('???');

    fortByteData.push(fbInfo);
  })
  return fortByteData;
} 

const scrapeFortByteData = async () => {
  const html = await rp(url);
  
  const fortByteCheerioData = getFortByteCheerioData(html)

  const fortByteData = processCheerioData(fortByteCheerioData);

  return fortByteData;
};

module.exports = {
  scrapeFortByteData,
};


