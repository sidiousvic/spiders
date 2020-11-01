import { GraphQLLayer } from "spiders";
import { Request } from "express";
import { ApolloServer } from "apollo-server";
import { SpidersDatabase } from "./db";

const env = process.env.NODE_ENV;
const graphQLPort = 9991;

const graphqlServerUri =
  env === "development"
    ? `localhost:${graphQLPort}`
    : "spiders.sidiousvic.dev/graphql";

async function launchApolloServer(
  database: SpidersDatabase,
  { schema, auth, ctx: { computeContext } }: GraphQLLayer
) {
  await database.connect();

  const server = new ApolloServer({
    schema,
    async context({ req }: { req: Request }) {
      return await computeContext(req, database, auth);
    },
  });

  server.listen({ port: graphQLPort }).then(() => {
    console.log(`🧬 GraphQL server live @ ${graphqlServerUri}`);
    console.log(`🚀 ↑ Powered by Apollo`);
  });
}

export { launchApolloServer };
