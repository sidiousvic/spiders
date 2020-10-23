import { DocumentNode } from "graphql";
import { gql } from "apollo-server";

const typeDefs: DocumentNode = gql`
  scalar Date
  scalar Resource

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

  input AddPostInput {
    userId: Int!
    author: String!
    title: String!
    body: String!
    tags: String!
  }

  input DeletePostInput {
    id: Int!
  }

  input UpdatePostInput {
    id: Int!
    userId: Int
    title: String
    author: String
    body: String
    tags: String
    createdAt: Date
    updatedAt: Date
    published: Boolean
    publishedAt: Date
  }

  type Post {
    id: String!
    userId: Int!
    title: String!
    author: String!
    body: String!
    tags: String!
    createdAt: Date!
    updatedAt: Date!
    published: Boolean!
    publishedAt: Date!
  }

  type Query {
    me: User!
    findPosts: [Post]
  }

  type MutationResponse {
    message: String!
    resource: Resource!
  }

  type Mutation {
    signIn(input: UserLogin!): AuthUser!
    addPost(input: AddPostInput!): MutationResponse!
    deletePost(input: DeletePostInput!): MutationResponse!
    updatePost(input: UpdatePostInput!): MutationResponse!
  }
`;

export { typeDefs };
