const { gql } = require("apollo-server-express");

const queryTypeDef = gql`
  input SearchRestaurantInput {
    latitude: String!
    longitude: String!
    categories: [String]
    cuisines: [String]
    establishment: String
    radius: String
  }

  type Query {
    allCategories: CategoriesNormalized
    allCuisines(latitude: String, longitude: String): CuisinesNormalized
    allEstablishments(
      latitude: String
      longitude: String
    ): EstablishmentsNormalized
    allRestaurants(input: SearchRestaurantInput): RestaurantSearch
  }
`;

module.exports = queryTypeDef;
