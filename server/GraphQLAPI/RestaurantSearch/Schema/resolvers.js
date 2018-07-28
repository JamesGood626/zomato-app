const axios = require("axios");
const getRestaurantSearch = require("../Services");

const resolvers = {
  Query: {
    allRestaurants: async (
      parentValue,
      { latitude, longitude, cuisines, categories, establishment, radius }
    ) => {
      console.log("RUNNING ALL CUISINES");
      const restaurants = await getRestaurantSearch(axios, {
        latitude,
        longitude,
        cuisines,
        categories,
        establishment,
        radius
      });
      return restaurants.data;
    }
  }
};

module.exports = resolvers;
