const app = require("./app");
const path = require("path");
const graphQLServer = require("./Middleware/graphQLServer");

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

const port = process.env.PORT || 4000;

const server = app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:4000${graphQLServer.graphqlPath}`
  )
);

module.exports = server;
