import { GraphQLLayer } from "@spiders";
import { Request } from "express";
import { ApolloServer } from "apollo-server";
import { SpidersDatabase } from "./db";

const env = process.env.NODE_ENV;

const graphqlServerUri =
  env === "development"
    ? "http://localhost:9991"
    : "https://spiders.sidiousvic.dev/graphql";

export default async function launchApolloServer(
  database: SpidersDatabase,
  { schema, auth, utils: { computeContext } }: GraphQLLayer
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
