import gql from "graphql-tag";

const updateSearchParametersTypes = gql`
  input CategoryInput {
    index: String!
    value: [String!]!
  }

  input CuisineInput {
    index: String!
    value: [String!]!
  }

  input EstablishmentInput {
    index: String!
    value: String!
  }

  input RadiusInput {
    index: String!
    value: String!
  }

  union UpdateSearchParametersInput = CategoryInput | CuisineInput
`;

export const updateSearchParameters = gql`
  mutation updateSearchParameters($input: UpdateSearchParametersInput) {
    updateSearchParameters(input: $input) @client {
      categories
      cuisines
      establishment
      radius
    }
  }
`;

export const updateMapPosition = gql`
  mutation updateMapPosition($latitude: Float!, $longitude: Float!) {
    updateMapPosition(latitude: $latitude, longitude: $longitude) @client {
      latitude
      longitude
    }
  }
`;
