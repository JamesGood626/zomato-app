import gql from "graphql-tag";

export const getSearchParameters = gql`
  query {
    searchParameters @client {
      categoryIDList
      cuisineIDList
      establishmentID
      radius
    }
  }
`;
