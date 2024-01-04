const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    # Add more fields as needed
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!): User
    # Add more mutations as needed
  }
`;

module.exports =  typeDefs;