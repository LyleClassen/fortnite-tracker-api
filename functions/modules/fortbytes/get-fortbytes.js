const HttpCodes = require('http-status-codes');

/**
 * 
 * @param {import('firebase-admin')} admin 
 */
const getFortBytes = (admin) => async (req,res) => {
  try {
    const { season } = req.params;
    const db = admin.firestore().collection('fortbyteInfo').doc(`Season ${season}`);
    const result = await db.get();
    res.send(result.data());
  } catch (error) {
    res.status(HttpCodes.EXPECTATION_FAILED);
    console.log(error);
    res.send(error);
  }
}

module.exports = getFortBytes;