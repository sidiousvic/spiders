import { gql } from "apollo-server";

const userTypeDefs = gql`
  type User {
    id: String!
    username: String!
    email: String!
    password: String!
    role: Role!
    joinDate: Date!
    posts: [Post]!
  }
`;
export { userTypeDefs };
