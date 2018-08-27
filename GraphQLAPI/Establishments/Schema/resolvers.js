const axios = require("axios");
const getEstablishments = require("../Services");

const resolvers = {
  Query: {
    allEstablishments: async (
      parentValue,
      { latitude, longitude },
      { headers: { zomatoapikey } }
    ) => {
      try {
        const establishments = await getEstablishments(
          axios,
          {
            latitude,
            longitude
          },
          zomatoapikey
        );
        return establishments.data;
      } catch (err) {
        console.log("Error in the allEstablishments resolver: ", err);
      }
    }
  }
};

module.exports = resolvers;
