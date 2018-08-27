const zomatoAPIKey = require("../../../Config");

const getCategories = async (axios, zomatoapikey) => {
  if (process.env.NODE_ENV === "development") {
    zomatoapikey = zomatoAPIKey;
  }
  return await axios({
    method: "get",
    url: `https://developers.zomato.com/api/v2.1/categories`,
    headers: { "user-key": zomatoapikey }
  });
};

module.exports = getCategories;
