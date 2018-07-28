const zomatoKey = require("../../../Config");

// Might need to place the user-key in the header
const getEstablishments = async (axios, { latitude, longitude }) => {
  return await axios({
    method: "get",
    url: `https://developers.zomato.com/api/v2.1/cuisines?lat=${latitude}&lon=${longitude}`,
    headers: { "user-key": zomatoKey }
  });
};

module.exports = getEstablishments;
