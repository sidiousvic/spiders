import { GraphQLLayer } from "../../types";
import { utils } from "./utils";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { auth } from "./auth";

const graphQLLayer: GraphQLLayer = {
  typeDefs,
  resolvers,
  auth,
  utils,
};

export { graphQLLayer };
