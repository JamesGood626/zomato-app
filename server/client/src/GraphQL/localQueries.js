import gql from "graphql-tag";

export const getSearchParameters = gql`
  query {
    searchParameters @client {
      categories
      cuisines
      establishment
      radius
    }
  }
`;

export const getMapPosition = gql`
  query {
    mapPosition @client {
      latitude
      longitude
    }
  }
`;
