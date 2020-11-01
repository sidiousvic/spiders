import { graphQLLayer } from "./gql";
import { SpidersDatabase } from "./db";
import { launchApolloServer } from "./apollo";
import { launchWebhooksServer } from "./webhooks";

const { schema, auth, ctx } = graphQLLayer;

async function launchSpidersServers() {
  await launchWebhooksServer();
  await launchApolloServer(new SpidersDatabase(), {
    schema,
    auth,
    ctx,
  });
}

launchSpidersServers();
