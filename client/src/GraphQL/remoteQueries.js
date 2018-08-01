import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
  query Categories {
    allCategories {
      categories {
        categories {
          id
          name
        }
      }
    }
  }
`;

export const GET_CUISINES = gql`
  query Cuisines {
    allCuisines {
      cuisines {
        cuisine {
          cuisine_id
          cuisine_name
        }
      }
    }
  }
`;

export const GET_ESTABLISHMENTS = gql`
  query Establishments($latitude: String!, $longitude: String!) {
    allEstablishments(latitude: $latitude, longitude: $longitude) {
      establishments {
        establishment {
          id
          name
        }
      }
    }
  }
`;

// Query with Query Variables
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

// Query Vars
// {
//   "longitude": "-74.004821",
//   "latitude": "40.742051",
//   "cuisines": ["6", "152"]
// }
