const axios = require("axios");
const getEstablishments = require("../Services");

const resolvers = {
  Query: {
    allEstablishments: async (
      parentValue,
      { latitude, longitude },
      { headers: { zomatoapikey } }
    ) => {
      console.log("RUNNING ALL ESTABLISHMENTS");
      const establishments = await getEstablishments(
        axios,
        {
          latitude,
          longitude
        },
        zomatoapikey
      );
      return establishments.data;
    }
  }
};

module.exports = resolvers;
