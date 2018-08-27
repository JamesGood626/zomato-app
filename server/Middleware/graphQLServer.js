const app = require("../app");
const { ApolloServer, gql } = require("apollo-server-express");
const queryTypeDef = require("../GraphQLAPI");
const categoryTypeDefs = require("../GraphQLAPI/Categories/Schema/categoryType");
const cuisineTypeDefs = require("../GraphQLAPI/Cuisines/Schema/cuisineType");
const establishmentTypeDefs = require("../GraphQLAPI/Establishments/Schema/establishmentType");
const restaurantSearchTypeDefs = require("../GraphQLAPI/RestaurantSearch/Schema/restaurantSearchType");
const categoryResolvers = require("../GraphQLAPI/Categories/Schema/resolvers");
const cuisineResolvers = require("../GraphQLAPI/Cuisines/Schema/resolvers");
const establishmentResolvers = require("../GraphQLAPI/Establishments/Schema/resolvers");
const restaurantSearchResolvers = require("../GraphQLAPI/RestaurantSearch/Schema/resolvers");

const typeDefs = [
  queryTypeDef,
  categoryTypeDefs,
  cuisineTypeDefs,
  establishmentTypeDefs,
  restaurantSearchTypeDefs
];
const resolvers = [
  categoryResolvers,
  cuisineResolvers,
  establishmentResolvers,
  restaurantSearchResolvers
];

const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    headers: req.headers
  })
});

graphQLServer.applyMiddleware({ app });

module.exports = graphQLServer;
