import { PgLiteral } from "node-pg-migrate";

export async function up(pgm) {
  await pgm.createTable(
    "posts",
    {
      post_id: {
        type: "uuid",
        default: new PgLiteral("uuid_generate_v4()"),
        notNull: true,
        primaryKey: true,
      },
      title: { type: "varchar(255)", notNull: true },
      author: { type: "varchar(255)", notNull: true },
      tags: { type: "varchar(255)", notNull: true },
      body: { type: "text", notNull: true },
      created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
      updated_at: {
        type: "timestamptz",
        default: pgm.func("current_timestamp"),
      },
      user_id: { type: "uuid", notNull: true, references: "users" },
      published: { type: "boolean", notNull: true },
      published_at: { type: "timestamp" },
      deleted_at: { type: "timestamp" },
    },
    {
      ifNotExists: true,
    }
  );
}
