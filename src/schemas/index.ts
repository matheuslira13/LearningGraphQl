export const typeDefs = `#graphql
  input UserInput {
    name: String!
    email: String!
  }

  type User {
    id: Int
    name: String!
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(data: UserInput!): User
  }

  type Subscription {
    userListening: User!
  }
`;
