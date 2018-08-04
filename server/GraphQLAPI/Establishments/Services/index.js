const zomatoAPIKey = require("../../../Config");

const getEstablishments = async (
  axios,
  { latitude, longitude },
  zomatoapikey
) => {
  if (process.env.NODE_ENV === "development") {
    zomatoapikey = zomatoAPIKey;
  }
  return await axios({
    method: "get",
    url: `https://developers.zomato.com/api/v2.1/establishments?lat=${latitude}&lon=${longitude}`,
    headers: { "user-key": zomatoapikey }
  });
};

module.exports = getEstablishments;
