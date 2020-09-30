import { gql } from "apollo-server";

const typeDefs = gql`
  enum Role {
    DARKLORD
    GUEST
  }

  type User {
    id: ID!
    username: String!
    password: String!
    role: Role!
  }

  type AuthUser {
    token: String!
    user: User!
  }

  input Login {
    username: String!
    password: String!
  }

  type Query {
    me: User!
  }

  type Mutation {
    signin(login: Login!): AuthUser!
  }
`;

export default typeDefs;
