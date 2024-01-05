const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 3001;
const { typeDefs, resolvers } = require('./schemas');

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.use(cors()); 
  app.use(express.json()); 

  mongoose.connect('mongodb://127.0.0.1:27017/choreTracker')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

  app.listen({ port: PORT }, () => 
    console.log(`Server running on port ${PORT}\nGraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startApolloServer();

