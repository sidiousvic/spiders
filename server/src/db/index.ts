import { DatabaseUtilsMap, DatabaseLayer, ModelsMap } from "../types";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
import pgm from "node-pg-migrate";

const PG_USER = process.env.PG_USER;
const PG_DATABASE = process.env.PG_DATABASE;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = Number(process.env.PG_PORT);

const DatabaseUtils: DatabaseUtilsMap = {
  async runMigrations(pgm) {
    console.log("🔧 Running migrations...");
    await pgm({
      databaseUrl: `postgres://${PG_USER}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`,
      migrationsTable: "spiders_migrations",
      dir: __dirname + "/migrations",
      direction: "up",
      count: 2,
    });
  },
  async buildModels(pool) {
    console.log("🔨 Building database models...");

    const documents = {
      query: (text: string) => {
        return pool.query(text);
      },
    };

    const models: ModelsMap = {
      users: {
        async findUser(user) {
          for (let [table, value] of Object.entries(user)) {
            const { rows } = await documents.query(
              `SELECT * FROM users WHERE ${table} = '${value}'`
            );
            let [user] = rows;
            if (user) return user;
            return {};
          }
        },
      },
    };

    return models;
  },
  async connectDatabase(runMigrations, buildModels) {
    console.log("🔋 Connecting to database...");

    await runMigrations(pgm);

    const pool = new Pool({
      user: PG_USER,
      host: PG_HOST,
      database: PG_DATABASE,
      port: Number(PG_PORT),
    });

    const models = buildModels(pool);

    return models;
  },
};

const databaseLayer: DatabaseLayer = { ...DatabaseUtils };

export default databaseLayer;
