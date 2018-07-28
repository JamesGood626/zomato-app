const { gql } = require("apollo-server-express");

const EstablishmentTypeDef = gql`
  type EstablishmentsNormalized {
    establishments: [Establishments!]!
  }

  type Establishments {
    establishment: Establishment!
  }

  type Establishment {
    id: Int!
    name: String!
  }
`;

module.exports = EstablishmentTypeDef;

// Shape
// {
//   "establishments": [
//     {
//       "establishment": {
//         "id": 21,
//         "name": "Quick Bites"
//       }
//     },
//     {
//       "establishment": {
//         "id": 271,
//         "name": "Sandwich Shop"
//       }
//     },
//     {
//       "establishment": {
//         "id": 1,
//         "name": "Café"
//       }
//     },
//     {
//       "establishment": {
//         "id": 281,
//         "name": "Fast Food"
//       }
//     },
//     {
//       "establishment": {
//         "id": 7,
//         "name": "Bar"
//       }
//     },
//     {
//       "establishment": {
//         "id": 16,
//         "name": "Casual Dining"
//       }
//     },
//     {
//       "establishment": {
//         "id": 24,
//         "name": "Deli"
//       }
//     },
//     {
//       "establishment": {
//         "id": 31,
//         "name": "Bakery"
//       }
//     },
//     {
//       "establishment": {
//         "id": 18,
//         "name": "Fine Dining"
//       }
//     },
//     {
//       "establishment": {
//         "id": 275,
//         "name": "Pizzeria"
//       }
//     },
//     {
//       "establishment": {
//         "id": 101,
//         "name": "Diner"
//       }
//     },
//     {
//       "establishment": {
//         "id": 5,
//         "name": "Lounge"
//       }
//     },
//     {
//       "establishment": {
//         "id": 278,
//         "name": "Wine Bar"
//       }
//     },
//     {
//       "establishment": {
//         "id": 6,
//         "name": "Pub"
//       }
//     },
//     {
//       "establishment": {
//         "id": 286,
//         "name": "Coffee Shop"
//       }
//     },
//     {
//       "establishment": {
//         "id": 23,
//         "name": "Dessert Parlour"
//       }
//     },
//     {
//       "establishment": {
//         "id": 8,
//         "name": "Club"
//       }
//     },
//     {
//       "establishment": {
//         "id": 91,
//         "name": "Bistro"
//       }
//     },
//     {
//       "establishment": {
//         "id": 285,
//         "name": "Fast Casual"
//       }
//     },
//     {
//       "establishment": {
//         "id": 283,
//         "name": "Brewery"
//       }
//     },
//     {
//       "establishment": {
//         "id": 284,
//         "name": "Juice Bar"
//       }
//     },
//     {
//       "establishment": {
//         "id": 20,
//         "name": "Food Court"
//       }
//     },
//     {
//       "establishment": {
//         "id": 295,
//         "name": "Noodle Shop"
//       }
//     },
//     {
//       "establishment": {
//         "id": 292,
//         "name": "Beer Garden"
//       }
//     },
//     {
//       "establishment": {
//         "id": 282,
//         "name": "Taqueria"
//       }
//     },
//     {
//       "establishment": {
//         "id": 272,
//         "name": "Cocktail Bar"
//       }
//     },
//     {
//       "establishment": {
//         "id": 291,
//         "name": "Sweet Shop"
//       }
//     },
//     {
//       "establishment": {
//         "id": 81,
//         "name": "Food Truck"
//       }
//     },
//     {
//       "establishment": {
//         "id": 294,
//         "name": "Izakaya"
//       }
//     },
//     {
//       "establishment": {
//         "id": 161,
//         "name": "Microbrewery"
//       }
//     },
//     {
//       "establishment": {
//         "id": 290,
//         "name": "Vineyard"
//       }
//     },
//     {
//       "establishment": {
//         "id": 293,
//         "name": "Shack"
//       }
//     },
//     {
//       "establishment": {
//         "id": 41,
//         "name": "Beverage Shop"
//       }
//     }
//   ]
// }
