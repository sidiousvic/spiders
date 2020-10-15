import dotenv from "dotenv";
dotenv.config();

import graphqlLayer from "./graphql";
import SpidersDatabase from "./db";
import launchApolloServer from "./apollo";
import launchWebhooksServer from "./webhooks";

async function launchSpidersServers() {
  await launchWebhooksServer();
  await launchApolloServer(new SpidersDatabase(), graphqlLayer);
}

launchSpidersServers();
