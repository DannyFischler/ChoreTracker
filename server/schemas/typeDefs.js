const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String
    children: [User]
  }

  type Chore {
    id: ID!
    parent_id: ID!
    chore_name: String!
    amount: Float
    date_approved: String
    date_completed: String
    parent_comments: String
    child_comments: String
  }

  type Query {
    users: [User]
    chores: [Chore]
    chore(id: ID!): Chore
  }

  type Mutation {
    addUser(username: String!, email: String): User
    createChore(parent_id: ID!, chore_name: String!, amount: Float): Chore
    updateChore(id: ID!, date_approved: String, date_completed: String, parent_comments: String, child_comments: String): Chore
    deleteChore(id: ID!): Chore
    login(username: String!, password: String!): String
  }
`;

module.exports = typeDefs;
