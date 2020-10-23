import { gql } from "apollo-server";
const authTypeDefs = gql`
  type AuthUser {
    token: String!
    user: User!
  }

  input UserSignIn {
    username: String!
    password: String!
  }

  input UserSignUp {
    username: String!
    email: String!
    password: String!
  }

  extend type Query {
    me: User!
  }

  extend type Mutation {
    signIn(input: UserSignIn!): AuthUser!
    signUp(input: UserSignUp!): User!
  }
`;
export { authTypeDefs };
