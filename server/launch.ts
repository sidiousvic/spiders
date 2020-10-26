import { graphQLLayer } from "./gql";
import { SpidersDatabase } from "./db";
import { launchApolloServer } from "./apollo";
import { launchDeployServer } from "./deploy";

const { schema, auth, ctx } = graphQLLayer;

async function launchSpidersServers() {
  await launchDeployServer();
  await launchApolloServer(new SpidersDatabase(), {
    schema,
    auth,
    ctx,
  });
}

launchSpidersServers();
