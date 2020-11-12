import { gql } from "apollo-server";

const userTypeDefs = gql`
  type User {
    userId: String!
    username: String!
    email: String!
    password: String!
    role: Role!
    joinDate: Date!
    posts: [Post]!
  }
`;
export { userTypeDefs };
