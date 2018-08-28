const zomatoAPIKey = require("../../../Config");

const getCategories = async (axios, zomatoKey) => {
  if (process.env.NODE_ENV === "development") {
    zomatoKey = zomatoAPIKey;
  }
  return await axios({
    method: "get",
    url: `https://developers.zomato.com/api/v2.1/categories`,
    headers: { "user-key": zomatoKey }
  });
};

module.exports = getCategories;
