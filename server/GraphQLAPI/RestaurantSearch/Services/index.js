const zomatoKey = require("../../../Config");

// Might need to place the user-key in the header
const getRestaurantSearch = async (
  axios,
  { latitude, longitude, cuisines, categories, establishment, radius }
) => {
  let builtUrl = `https://developers.zomato.com/api/v2.1/search?lat=${latitude}&lon=${longitude}`;
  if (typeof cuisines === "object" && cuisines.length > 0) {
    const cuisineQueryString = createEncodedCommaSeparatedQueryString(cuisines);
    builtUrl += `&cuisines=${cuisineQueryString}`;
  }
  if (typeof categories === "object" && categories.length > 0) {
    const categoriesQueryString = createEncodedCommaSeparatedQueryString(
      categories
    );
    builtUrl += `&catagories=${categoriesQueryString}`;
  }
  if (establishment) {
    builtUrl += `&establishment=${establishment}`;
  }
  if (radius) {
    builtUrl += `&radius=${radius}`;
  }
  return await axios({
    method: "get",
    url: builtUrl,
    headers: { "user-key": zomatoKey }
  });
};

const createEncodedCommaSeparatedQueryString = arr => {
  return arr.join("%2C");
};
// Can Query
// Cuisines (Comma separated list) cuisines=6%2C%20152" <- What it looks like in the query string.
// Categories (Comma separated list)
// Establishment (single id)
// Radius in Meters -> Perhaps utilize a conversion for miles and give the option to toggle between the two

module.exports = getRestaurantSearch;

// Example Query
// query allRestaurants($longitude: String!, $latitude: String!, $cuisines: [String]) {
//   allRestaurants(longitude: $longitude, latitude: $latitude, cuisines: $cuisines) {
//     restaurants {
//       restaurant {
//         R {
//           res_id
//         }
//         id
//         name
//         location {
//           address
//           city
//           latitude
//           longitude
//           zipcode
//         }
//         average_cost_for_two
//       }
//     }
//   }
// }

// Query Variables
// {
//   "longitude": "-74.004821",
//   "latitude": "40.742051",
//   "cuisines": ["6", "152"]
// }
