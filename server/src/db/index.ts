import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";
import pgm from "node-pg-migrate";

const PG_USER = process.env.PG_USER;
const PG_DATABASE = process.env.PG_DATABASE;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = Number(process.env.PG_PORT);

async function runMigrations() {
  console.log("🔧 Running migrations...");

  await pgm({
    databaseUrl: `postgres://${PG_USER}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`,
    migrationsTable: "spiders_migrations",
    dir: __dirname + "/migrations",
    direction: "up",
    count: 2,
  });
}

async function buildDatabaseModels(pool: any) {
  console.log("🔨 Building database models...");

  const documents = {
    query: (text: any) => {
      return pool.query(text);
    },
  };

  const models = {
    users: {
      async findUser(query: any) {
        for (let [table, value] of Object.entries(query)) {
          const { rows } = await documents.query(
            `SELECT * FROM users WHERE ${table} = '${value}'`
          );
          let [user] = rows;
          if (user) return user;
        }
      },
    },
  };

  return models;
}

async function connectToDatabase() {
  console.log("🔋 Connecting to database...");

  await runMigrations();

  const pool = new Pool({
    user: PG_USER,
    host: PG_HOST,
    database: PG_DATABASE,
    port: Number(PG_PORT),
  });

  const database = { models: await buildDatabaseModels(pool) };

  return database;
}

export default connectToDatabase;
