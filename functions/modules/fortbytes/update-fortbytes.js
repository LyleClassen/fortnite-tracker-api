const Joi = require('@hapi/joi');
const HttpCodes = require('http-status-codes');

const fbPutSchema = Joi.object().keys({
  season: Joi.number().required(),
  lastUpdatedDate: Joi.string().required(),
  fortBytes: Joi.array().required(),
});

/**
 * 
 * @param {import('firebase-admin')} admin 
 */
const updateFortBytes = (admin) => async (req,res) => {
  try {
    const { season } = req.params;
    const { lastUpdatedDate, fortBytes } = req.body;
 
    const { error, value } = Joi.validate({ season, lastUpdatedDate, fortBytes }, fbPutSchema);

    if(error){
      const { details } = error; 
      res.status(HttpCodes.BAD_REQUEST);
      res.send(details.map(detail => detail.message));
    }
    else{
      const db = admin.firestore().collection('fortbyteInfo').doc(`Season ${season}`)
      const result = await db.set({ lastUpdatedDate, fortBytes })
      res.send(result);
    }
  } catch (error) {
    res.status(HttpCodes.EXPECTATION_FAILED);
    console.log(error);
    res.send(error);
  }
}

module.exports = updateFortBytes;