const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String
    savedChores: [Chore]
  }

  type Auth {
    token: String
    user: User

  }
  
  type Chore {
    id: ID!
    chore_name: String!
    amount: Float
    isCompleted: Boolean
    user: User 
  }

  type Query {
    users: [User]
    chores: [Chore]
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    CreateChildAccount(username: String!, password: String!): User
    updateChore(id: ID!, chore_name: String, amount: Float, isCompleted: Boolean): Chore
    deleteChore(id: ID!): Chore
    login(username: String!, password: String!): Auth
    saveChore(chore_name: String!, amount: Float): User

  }
`;

module.exports = typeDefs;
