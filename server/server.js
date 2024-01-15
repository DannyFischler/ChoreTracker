const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Import path module
const PORT = process.env.PORT || 3001;
const { typeDefs, resolvers } = require("./schemas");

const app = express();
const db = require("./config/connection");

const server = new ApolloServer({ typeDefs, resolvers });

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to MongoDB
db.once("open", () => {
  console.log("Connected to MongoDB");

  // Start the Apollo Server
  async function startApolloServer() {
    await server.start();

    // Apply Apollo middleware
    server.applyMiddleware({ app, path: "/graphql" });

    // Static files for production
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../client/dist")));

      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
      });
    }

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  }

  // Call the async function to start the Apollo Server
  startApolloServer();
});
