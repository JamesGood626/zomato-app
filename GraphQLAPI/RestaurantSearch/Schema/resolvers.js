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
      { headers: { zomatokey } }
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
        zomatokey
      );
      return restaurants.data;
    }
  }
};

module.exports = resolvers;
