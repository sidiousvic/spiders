import { graphQLLayer } from "./gql";
import { SpidersDatabase } from "./db";
import launchApolloServer from "./apollo";
import launchWebhooksServer from "./webhooks";

const { typeDefs, resolvers, auth, utils } = graphQLLayer;

async function launchSpidersServers() {
  await launchWebhooksServer();
  await launchApolloServer(new SpidersDatabase(), {
    typeDefs,
    resolvers,
    auth,
    utils,
  });
}

launchSpidersServers();
