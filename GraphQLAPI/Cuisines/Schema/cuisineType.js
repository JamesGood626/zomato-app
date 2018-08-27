const { gql } = require("apollo-server-express");

const CuisineTypeDef = gql`
  type CuisinesNormalized {
    cuisines: [Cuisines!]!
  }

  type Cuisines {
    cuisine: Cuisine!
  }

  type Cuisine {
    cuisine_id: Int!
    cuisine_name: String!
  }
`;

module.exports = CuisineTypeDef;

// Shape
// {
// "cuisines": [
//     {
//       "cuisine": {
//         "cuisine_id": 6,
//         "cuisine_name": "Afghani"
//       }
//     },
//     {
//       "cuisine": {
//         "cuisine_id": 152,
//         "cuisine_name": "African"
//       }
//     },
//     {
//       "cuisine": {
//         "cuisine_id": 1,
//         "cuisine_name": "American"
//       }
//     }
// ]
// }
