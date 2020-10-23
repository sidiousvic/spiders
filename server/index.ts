import { graphQLLayer } from "./gql";
import { SpidersDatabase } from "./db";
import launchApolloServer from "./apollo";
import launchWebhooksServer from "./webhooks";
import { makeExecutableSchema } from "apollo-server";

const { schema, auth, utils } = graphQLLayer;

async function launchSpidersServers() {
  await launchWebhooksServer();
  await launchApolloServer(new SpidersDatabase(), {
    schema,
    auth,
    utils,
  });
}

launchSpidersServers();
