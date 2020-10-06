import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import { DatabaseLayer, GraphqlLayer } from "./types";
import databaseLayer from "./db";
import graphqlLayer from "./graphql";

async function launchApolloServer(
  { connectDatabase, buildModels, runMigrations }: DatabaseLayer,
  { typeDefs, resolvers, auth, context: { computeContext } }: GraphqlLayer
) {
  const models = await connectDatabase(runMigrations, buildModels);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    async context({ req }) {
      return await computeContext(req, models, auth);
    },
  });

  server.listen({ port: 9991 }).then(({ url }) => {
    console.log(`🚀 Apollo Server launched @ sidiousvic.dev/spiders/graphql`);
  });
}

launchApolloServer(databaseLayer, graphqlLayer);
