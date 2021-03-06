const axios = require("axios");
const getCuisines = require("../Services");

const resolvers = {
  Query: {
    allCuisines: async (
      parentValue,
      { latitude, longitude },
      { headers: { zomatokey } }
    ) => {
      const cuisines = await getCuisines(
        axios,
        { latitude, longitude },
        zomatokey
      );
      return cuisines.data;
    }
  }
};

module.exports = resolvers;

//   query allCuisines($longitude: String, $latitude: String) {
//   allCuisines(longitude: $longitude, latitude: $latitude) {
//     cuisine {
//       cuisine {
//         cuisine_id
//         cuisine_name
//       }
//     }
//   }
// }

// {
//   "longitude": "-74.004821",
//   "latitude": "40.742051"
// }
