const axios = require("axios");
const getCategories = require("../Services");

const resolvers = {
  Query: {
    allCategories: async () => {
      console.log("RUNNING ALL CATEGORIES");
      const categories = await getCategories(axios);
      return categories.data;
    }
  }
};

module.exports = resolvers;

// {
//   allCategories {
//     categories {
//       categories {
//         id
//         name
//       }
//     }
//   }
// }
