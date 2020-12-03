import { GraphQLConfig } from "@spiders";
import { makeExecutableSchema } from "apollo-server";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { auth } from "./auth";

const port = 9991;

const gqlConfig: GraphQLConfig = {
  apolloConfig: {
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    auth,
  },
  port,
  uri:
    process.env.NODE_ENV === "development"
      ? `localhost:${port}`
      : "spiders.sidiousvic.dev/graphql",
};

export { gqlConfig };
