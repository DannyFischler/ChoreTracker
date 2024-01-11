const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String
    children: [Child]
  }

  type Child {
    id: ID!
    username: String!

  }
  type AddUserResponse {
    token: String
    user: User
  }
  
  type Chore {
    id: ID!
    chore_name: String!
    amount: Float
    isCompleted: Boolean
  }

  type Query {
    users: [User]
    chores: [Chore]
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): AddUserResponse
    CreateChildAccount(username: String!, password: String!): User
    updateChore(id: ID!, chore_name: String, amount: Float, isCompleted: Boolean): Chore
    deleteChore(id: ID!): Chore
    login(username: String!, password: String!): String
    saveChore(chore_name: String!, amount: Float): Chore

  }
`;

module.exports = typeDefs;
