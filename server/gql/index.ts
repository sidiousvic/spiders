import { GraphQLLayer } from "spiders";
import { ctx } from "./ctx";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { auth } from "./auth";
import { makeExecutableSchema } from "apollo-server";

const graphQLLayer: GraphQLLayer = {
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  auth,
  ctx,
};

export { graphQLLayer };
