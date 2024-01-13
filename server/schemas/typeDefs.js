const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String
    savedChores: [Chore]
    parentId: String
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
    userId: String 
  }

  type Query {
    users: [User]
    chores: [Chore]
    userChores(userId: String!): [Chore]
  }
  
  type Mutation {
    addUser(username: String!, email: String, password: String!, parentId: String): Auth
    CreateChildAccount(username: String!, password: String!): User
    updateChore(id: ID!, chore_name: String, amount: Float, isCompleted: Boolean): Chore
    deleteChore(id: ID!): Chore
    login(username: String!, password: String!): Auth
    saveChore(chore_name: String!, amount: Float, userId: String): Chore
  }
`;

module.exports = typeDefs;
