import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import graphqlLayer from "./graphql";
import SpidersDatabase from "./db";
import GraphQL from "../@types/server/graphql";

const env = process.env.NODE_ENV;

const graphqlServerUri =
  env === "development"
    ? "http://localhost:9991"
    : "https://sidiousvic.dev/spiders/graphql";

async function launchApolloServer(
  database: SpidersDatabase,
  { typeDefs, resolvers, auth, utils: { computeContext } }: GraphQL.Layer
) {
  await database.connect();

  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers,
    async context({ req }) {
      return await computeContext(req, database, auth);
    },
  });

  server.listen({ port: 9991 }).then(() => {
    console.log(`🚀 Apollo Server launched @ ${graphqlServerUri}`);
  });
}

launchApolloServer(new SpidersDatabase(), graphqlLayer);
