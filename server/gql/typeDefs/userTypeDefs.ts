import { gql } from "apollo-server";
const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: Role!
    joinDate: Date!
  }
`;
export { userTypeDefs };
