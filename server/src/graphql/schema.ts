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

  input UserLogin {
    username: String!
    password: String!
  }

  input Post {
    title: String!
    author: String!
    tags: String!
    body: String!
    updatedAt: String!
    userId: Int
    published: Boolean
    publishedAt: String
  }

  type Query {
    me: User!
  }

  type Mutation {
    signin(input: UserLogin!): AuthUser!
    addPost(input: Post): String
  }
`;

export default typeDefs;
