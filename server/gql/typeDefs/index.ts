import { DocumentNode } from "graphql";
import { gql } from "apollo-server";
import { authTypeDefs } from "./authTypeDefs";
import { userTypeDefs } from "./userTypeDefs";
import { postTypeDefs } from "./postTypeDefs";

const typeDefs: DocumentNode[] = [
  gql`
    scalar Date
    scalar Resource

    enum Role {
      DARKLORD
      GUEST
    }

    type Query {
      _: String
    }

    type MutationResponse {
      message: String!
      resource: Resource!
    }

    type Mutation {
      _: String
    }
  `,
  authTypeDefs,
  userTypeDefs,
  postTypeDefs,
];

export { typeDefs };
