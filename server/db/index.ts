import { Pool } from "pg";
import pgm from "node-pg-migrate";
import { PostModeler, UserModeler } from "./models";

async function SpidersDatabase({ poolConfig, migrationsConfig }) {
  console.log("🔋 Connecting to database...");
  const pool = new Pool(poolConfig);

  console.log("🐪 Running migrations...");
  await pgm(migrationsConfig);

  return {
    models: {
      Post: PostModeler(pool),
      User: UserModeler(pool),
    },
  };
}

export { SpidersDatabase };
