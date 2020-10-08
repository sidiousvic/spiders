import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
import pgm from "node-pg-migrate";

const PG_USER = process.env.PG_USER;
const PG_DATABASE = process.env.PG_DATABASE;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = Number(process.env.PG_PORT);

class SpidersDatabase {
  pool?: Pool;

  public async findUser(login: any) {
    const {
      rows: [user],
    } = await this.pool!.query(
      `SELECT * FROM users WHERE username = '${login.username}'`
    );
    if (user) return user;
  }

  public async addPost(post: any) {
    await this.pool!.query(
      `INSERT INTO posts (title, author, tags, body, updated_at, user_id, published, published_at) 
      VALUES (
          '${post.title}',
          '${post.author}',
          '${post.tags}',
          '${post.body}',
          to_timestamp(${Number(post.updatedAt) / 1000}),
          '${post.userId}',
          '${post.published}',
          to_timestamp(${Number(post.publishedAt) / 1000})
        )`
    );
  }

  private async migrate() {
    console.log("🐪 Running migrations...");
    await pgm({
      databaseUrl: `postgres://${PG_USER}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`,
      migrationsTable: "spiders_migrations",
      dir: __dirname + "/migrations",
      direction: "up",
      count: 9999,
    });
  }

  public async connect() {
    console.log("🔋 Connecting to database...");
    await this.migrate();
    this.pool = new Pool({
      user: PG_USER,
      host: PG_HOST,
      database: PG_DATABASE,
      port: Number(PG_PORT),
    });
  }
}

export default SpidersDatabase;

// const SpidersDB: SpidersDatabase = {
//   models: {},
//   async migrate() {
//     console.log("🔧 Running migrations...");
//     await pgm({
//       databaseUrl: `postgres://${PG_USER}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`,
//       migrationsTable: "spiders_migrations",
//       dir: __dirname + "/migrations",
//       direction: "up",
//       count: 9999,
//     });
//   },
//   async model() {
//     console.log("🔨 Building database models...");

//     const models: SpidersDatabase.Models = {
//       users: {
//         async findUser(login) {
//           const {
//             rows: [user],
//           } = await pool.query(
//             `SELECT * FROM users WHERE username = '${login.username}'`
//           );
//           if (user) return user;
//         },
//       },
//       posts: {
//         async addPost(post) {
//           await pool.query(
//             `INSERT INTO posts (title, author, tags, body, updated_at, user_id, published, published_at)
//             VALUES (
//                 '${post.title}',
//                 '${post.author}',
//                 '${post.tags}',
//                 '${post.body}',
//                 to_timestamp(${Number(post.updatedAt) / 1000}),
//                 '${post.userId}',
//                 '${post.published}',
//                 to_timestamp(${Number(post.publishedAt) / 1000})
//               )`
//           );
//         },
//       },
//     };
//     return models;
//   },
//   async connect() {
//     console.log("🔋 Connecting to database...");

//     await SpidersDB.migrate();

//     const pool = new Pool({
//       user: PG_USER,
//       host: PG_HOST,
//       database: PG_DATABASE,
//       port: Number(PG_PORT),
//     });

//     const models = await SpidersDB.model(pool);

//     return models;
//   },
// };

// export default SpidersDatabase;
