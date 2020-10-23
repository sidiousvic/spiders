import { gql } from "apollo-server";
const postTypeDefs = gql`
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

  extend type Query {
    findPosts: [Post]
  }

  extend type Mutation {
    addPost(input: AddPostInput!): MutationResponse!
    deletePost(input: DeletePostInput!): MutationResponse!
    updatePost(input: UpdatePostInput!): MutationResponse!
  }
`;
export { postTypeDefs };
