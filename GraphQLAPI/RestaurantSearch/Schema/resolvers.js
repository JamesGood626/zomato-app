const axios = require("axios");
const getRestaurantSearch = require("../Services");

const resolvers = {
  Query: {
    allRestaurants: async (
      parentValue,
      {
        input: {
          latitude,
          longitude,
          cuisines,
          categories,
          establishment,
          radius
        }
      },
      { headers: { zomatoapikey } }
    ) => {
      const restaurants = await getRestaurantSearch(
        axios,
        {
          latitude,
          longitude,
          cuisines,
          categories,
          establishment,
          radius
        },
        zomatoapikey
      );
      return restaurants.data;
    }
  }
};

module.exports = resolvers;
