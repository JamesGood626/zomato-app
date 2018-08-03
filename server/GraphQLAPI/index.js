const { gql } = require("apollo-server-express");

const queryTypeDef = gql`
  input SearchRestaurantInput {
    latitude: Float!
    longitude: Float!
    categories: [String]
    cuisines: [String]
    establishment: String
    radius: String
  }

  type Query {
    allCategories: CategoriesNormalized
    allCuisines(latitude: Float, longitude: Float): CuisinesNormalized
    allEstablishments(
      latitude: Float!
      longitude: Float!
    ): EstablishmentsNormalized
    allRestaurants(input: SearchRestaurantInput): RestaurantSearch
  }
`;

module.exports = queryTypeDef;
