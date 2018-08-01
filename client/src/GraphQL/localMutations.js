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
      categoryIDList
      cuisineIDList
      establishmentID
      radius
    }
  }
`;
