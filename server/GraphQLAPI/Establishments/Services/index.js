const zomatoKey = require("../../../Config");

const getEstablishments = async (axios, { latitude, longitude }) => {
  return await axios({
    method: "get",
    url: `https://developers.zomato.com/api/v2.1/establishments?lat=${latitude}&lon=${longitude}`,
    headers: { "user-key": zomatoKey }
  });
};

module.exports = getEstablishments;
