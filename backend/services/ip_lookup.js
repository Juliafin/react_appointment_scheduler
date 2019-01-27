const axios = require('axios');
const lookupUserIP = async(req, res) => {
  const LOOKUP_URL = "http://ip-api.com/json/";
  let ipData = await axios.get(LOOKUP_URL + "73.43.238.155");
  console.log(ipData.data);
  if (ipData) {
    return res.json({message: "Ip found", ipData: ipData.data});
  } else {
    return res.json.status(404).json({message: "Ip not found"});
  }
};


module.exports = lookupUserIP;