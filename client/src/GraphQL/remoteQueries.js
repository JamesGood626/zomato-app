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
  query Establishments($latitude: Float!, $longitude: Float!) {
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

const updateSearchParametersTypes = gql`
  input SearchRestaurantInput {
    latitude: Float!
    longitude: Float!
    categories: [String]
    cuisines: [String]
    establishment: String
    radius: String
  }
`;

export const SEARCH_RESTAURANTS = gql`
  query allRestaurants($input: SearchRestaurantInput) {
    allRestaurants(input: $input) {
      restaurants {
        restaurant {
          R {
            res_id
          }
          id
          name
          location {
            address
            city
            latitude
            longitude
            zipcode
          }
          average_cost_for_two
          user_rating {
            aggregate_rating
            votes
          }
          menu_url
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
