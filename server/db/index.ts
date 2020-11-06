import { Pool } from "pg";
import pgm from "node-pg-migrate";
import { PostModel } from "./models/Post";
import { UserModel } from "./models/User";

async function SpidersDatabase({ poolConfig, migrationsConfig }) {
  console.log("🔋 Connecting to database...");
  const pool = new Pool(poolConfig);

  console.log("🐪 Running migrations...");
  await pgm(migrationsConfig);

  return {
    models: {
      Post: PostModel(pool),
      User: UserModel(pool),
    },
  };
}

export { SpidersDatabase };
