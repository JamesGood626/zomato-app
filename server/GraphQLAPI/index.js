const { gql } = require("apollo-server-express");

const queryTypeDef = gql`
  type Query {
    allCategories: CategoriesNormalized
    allCuisines(latitude: String, longitude: String): CuisinesNormalized
    allEstablishments(
      latitude: String
      longitude: String
    ): EstablishmentsNormalized
    allRestaurants(
      latitude: String!
      longitude: String!
      cuisines: [String]
      categories: [String]
      establishment: String
      radius: String
    ): RestaurantSearch
  }
`;

module.exports = queryTypeDef;
