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
    date_approved: String
    date_completed: String
    parent_comments: String
    child_comments: String
  }

  type Query {
    users: [User]
    chores: [Chore]
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): AddUserResponse
    CreateChildAccount(username: String!, password: String!): User
    updateChore(id: ID!, date_approved: String, date_completed: String, parent_comments: String, child_comments: String): Chore
    deleteChore(id: ID!): Chore
    login(username: String!, password: String!): String
    saveChore(chore_name: String!, amount: Float): Chore

  }
`;

module.exports = typeDefs;
