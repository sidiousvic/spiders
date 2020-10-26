import { PostModel } from "./models/Post";
import { UserModel } from "./models/User";
import { Pool } from "pg";
import path from "path";
import pgm from "node-pg-migrate";

const migrationsPath = path.resolve("server", "db", "migrations");

class SpidersDatabase {
  pool? = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: Number(process.env.PG_PORT),
  });

  public Post = PostModel(this.pool);

  public User = UserModel(this.pool);

  private async migrate(): Promise<void> {
    console.log("🐪 Running migrations...");
    await pgm({
      databaseUrl: `postgres://${process.env.PG_USER}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`,
      migrationsTable: "pgmigrations",
      dir: migrationsPath,
      direction: "up",
      count: 9999,
    });
  }

  public async connect(): Promise<void> {
    console.log("🔋 Connecting to database...");
    await this.migrate();
  }
}

export { SpidersDatabase };
