const zomatoKey = require("../../../Config");

const getCategories = async axios => {
  return await axios({
    method: "get",
    url: `https://developers.zomato.com/api/v2.1/categories`,
    headers: { "user-key": zomatoKey }
  });
};

module.exports = getCategories;
