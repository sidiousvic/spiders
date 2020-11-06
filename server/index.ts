import { SpidersDatabase } from "./db";
import { GraphQLServer } from "./gql";
import { WebhooksServer } from "./webhooks";
import { serverConfig } from "./config";
import { dbConfig } from "./db/config";

const { gqlConfig, webhooksConfig } = serverConfig;

async function launchSpidersServers() {
  const { models } = await SpidersDatabase(dbConfig);
  await GraphQLServer(models, gqlConfig);
  await WebhooksServer(webhooksConfig);
}

launchSpidersServers();
