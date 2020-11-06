import path from "path";

const migrationsPath = path.resolve("server", "db", "migrations");

const dbConfig = {
  poolConfig: {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: Number(process.env.PG_PORT),
  },
  migrationsConfig: {
    databaseUrl: process.env.DATABASE_URL,
    migrationsTable: "pgmigrations",
    dir: migrationsPath,
    direction: "up",
    count: 9999,
  },
};

export { dbConfig };
