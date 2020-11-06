import { gqlConfig } from "./gql/config";
import { webhooksConfig } from "./webhooks/config";
import { dbConfig } from "./db/config";

const serverConfig = {
  dbConfig,
  gqlConfig,
  webhooksConfig,
};

export { serverConfig };
