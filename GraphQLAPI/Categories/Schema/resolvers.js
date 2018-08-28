const axios = require("axios");
const getCategories = require("../Services");

const resolvers = {
  Query: {
    allCategories: async (parentValue, {}, { headers: { zomatokey } }) => {
      const categories = await getCategories(axios, zomatokey);
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

// Best restaurant search test
// query allRestaurants($input: SearchRestaurantInput) {
//   allRestaurants(input: $input) {
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
//         user_rating {
//           aggregate_rating
//           votes
//         }
//         menu_url
//       }
//     }
//   }
// }

//   {
//   "input": {
//    	"latitude": 33.6536265,
//     "longitude": -112.0143622,
//     "categories": ["2", "3"],
//     "cuisines": ["1", "3"],
//     "establishment": "5",
//     "radius": "50000"
//   }
// }
