import { GraphQLLayer } from "@spiders";
import { Request } from "express";
import { ApolloServer } from "apollo-server";
import { SpidersDatabase } from "./db";

const env = process.env.NODE_ENV;

const graphqlServerUri =
  env === "development" ? "localhost:9991" : "spiders.sidiousvic.dev/graphql";

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

  server.listen({ port: 9991 }).then(() => {
    console.log(`🚀 Apollo Server launched @ ${graphqlServerUri}`);
  });
}

export { launchApolloServer };
