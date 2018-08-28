const axios = require("axios");
const getEstablishments = require("../Services");

const resolvers = {
  Query: {
    allEstablishments: async (
      parentValue,
      { latitude, longitude },
      { headers: { zomatokey } }
    ) => {
      const establishments = await getEstablishments(
        axios,
        {
          latitude,
          longitude
        },
        zomatokey
      );
      return establishments.data;
    }
  }
};

module.exports = resolvers;
