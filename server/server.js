const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');

const app = express();

// GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
  // type defs
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world',
    // resolvers 
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

app.use(cors()); 
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/choreTracker')
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Could not connect to MongoDB', err);
  });

app.use('/api/users', userRoutes);

// middleware 
server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint is http://localhost:${PORT}${server.graphqlPath}`);
});
