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
      }
    ) => {
      console.log("RUNNING ALL RESTAURANTS");
      // console.log("The latitude: ", latitude);
      // console.log("The longitude: ", longitude);
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
