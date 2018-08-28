import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import { zomatoAPIKey, googleAPIKey } from "./Config";
// import { getSearchParameters } from "./GraphQL/localQueries";
import Main from "./Main";

// TODO:
// wtf is this -> writeToStore.js:137 Missing field updateMapPosition in {} (seeing no issues caching data)

// NOTE: In the blog post that I sent to myself, the guy
// adds the API key to the header on the client side.
// I'm currently setting that on the serverside, but I think
// it's better to go that route instead.

const zomatoKey = process.env.ZOMATO_KEY || zomatoAPIKey;
const mapKey = process.env.GOOGLE_MAPS_KEY || googleAPIKey;

const cache = new InMemoryCache();
const zomatoGraphQLAPI = new HttpLink({
  uri: "/graphql",
  headers: { zomatoKey, mapKey }
});

const defaultState = {
  mapPosition: {
    __typename: "MapPosition",
    latitude: null,
    longitude: null
  },
  searchParameters: {
    __typename: "SearchParameters",
    categories: [],
    cuisines: [],
    establishment: null,
    radius: null
  }
};

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      updateSearchParameters: (_, { input }, { cache }) => {
        const { index, value } = input;
        const query = gql`
          query GetSearchParameters {
            searchParameters @client {
              __typename
              categories
              cuisines
              establishment
              radius
            }
          }
        `;
        const previousState = cache.readQuery({ query });
        const data = {
          ...previousState,
          searchParameters: {
            ...previousState.searchParameters,
            [index]: value
          }
        };
        cache.writeData({ query, data });
      },
      updateMapPosition: (_, { latitude, longitude }, { cache }) => {
        const query = gql`
          query GetMapPosition {
            mapPosition @client {
              __typename
              latitude
              longitude
            }
          }
        `;
        const previousState = cache.readQuery({ query });
        const data = {
          ...previousState,
          mapPosition: {
            ...previousState.mapPosition,
            latitude,
            longitude
          }
        };
        cache.writeData({ query, data });
      }
    }
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, zomatoGraphQLAPI])
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    );
  }
}

export default App;
