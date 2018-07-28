const app = require("./app");
const graphQLServer = require("./Middleware/graphQLServer");

const server = app.listen({ port: 4000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:4000${graphQLServer.graphqlPath}`
  )
);

module.exports = server;
