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
      count: 9999,
    });
  },
  async buildModels(pool) {
    console.log("🔨 Building database models...");

    const models: ModelsMap = {
      users: {
        async findUser(login) {
          const {
            rows: [user],
          } = await pool.query(
            `SELECT * FROM users WHERE username = '${login.username}'`
          );
          if (user) return user;
        },
      },
      posts: {
        async addPost(post) {
          await pool.query(
            `INSERT INTO posts (title, author, tags, body, updated_at, user_id, published, published_at) 
            VALUES (
                '${post.title}',
                '${post.author}',
                '${post.tags}',
                '${post.body}',
                '${post.updatedAt}',
                '${post.userId}',
                '${post.published}',
                '${post.publishedAt}'
              )`
          );
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
