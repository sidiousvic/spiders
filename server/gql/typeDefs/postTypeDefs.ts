import { gql } from "apollo-server";

const postTypeDefs = gql`
  input AddPostInput {
    userId: String!
    author: String!
    title: String!
    body: String!
    tags: String!
  }

  input DeletePostInput {
    postId: String!
  }

  input UpdatePostInput {
    postId: String!
    userId: String
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
    postId: String!
    user: User!
    title: String!
    author: String!
    body: String!
    tags: String!
    createdAt: Date!
    updatedAt: Date!
    published: Boolean!
    publishedAt: Date
  }

  type DeletedPost {
    postId: String!
    user: User!
    title: String!
    author: String!
    body: String!
    tags: String!
    createdAt: Date!
    updatedAt: Date!
    published: Boolean!
    publishedAt: Date
    deletedAt: String!
  }

  extend type Query {
    findPosts: [Post]
    findDeletedPosts: [DeletedPost]
  }

  type PostUpdateResponse {
    message: String!
    resource: Resource!
  }

  extend type Mutation {
    addPost(input: AddPostInput!): PostUpdateResponse!
    deletePost(input: DeletePostInput!): PostUpdateResponse!
    updatePost(input: UpdatePostInput!): PostUpdateResponse!
  }
`;
export { postTypeDefs };
