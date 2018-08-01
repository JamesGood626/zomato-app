import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { ApolloProvider } from "react-apollo";
import Main from "./Main";

// NOTE: In the blog post that I sent to myself, the guy
// adds the API key to the header on the client side.
// I'm currently setting that on the serverside, but I think
// it's better to go that route instead.
console.log("http link: ", HttpLink);

const cache = new InMemoryCache();
const zomatoGraphQLAPI = new HttpLink({ uri: "http://localhost:3000/graphql" });

// Add lat and lon here too?
const defaultState = {
  searchParameters: {
    __typename: "SearchParameters",
    categoryIDList: [],
    cuisineIDList: [],
    establishmentID: null,
    radius: null
  }
};

const stateLink = withClientState({
  cache,
  defaults: defaultState
});

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, zomatoGraphQLAPI]),
  cache
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
