const { gql } = require("apollo-server-express");

const RestaurantSearchTypeDef = gql`
  type RestaurantSearch {
    results_found: Int!
    results_start: Int!
    results_shown: Int!
    restaurants: [RestaurantNormalized!]!
  }

  type RestaurantNormalized {
    restaurant: Restaurant!
  }

  type Restaurant {
    R: R!
    id: String!
    name: String!
    location: Location!
    average_cost_for_two: Int!
    user_rating: UserRating!
    menu_url: String!
  }

  type R {
    res_id: Int!
  }

  type Location {
    address: String!
    city: String!
    city_id: Int!
    latitude: String!
    longitude: String!
    zipcode: String!
    country_id: Int!
  }

  type UserRating {
    aggregate_rating: String!
    votes: String!
  }
`;

// NOTE: id in type Restaurant is also the res_id that's on type R
// Might nix city_id in type Location

module.exports = RestaurantSearchTypeDef;
