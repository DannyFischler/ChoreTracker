const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3001;
const { typeDefs, resolvers } = require("./schemas");

const app = express();
const db = require("./config/connection");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: false, // Persisted queries explicitly turned off
});

app.use(cors());
app.use(express.json());

db.once("open", () => {
  console.log("Connected to MongoDB");

  async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../client/dist")));

      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
      });
    }

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  }

  startApolloServer();
});
