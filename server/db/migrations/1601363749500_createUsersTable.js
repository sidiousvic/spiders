const { PgLiteral } = require("node-pg-migrate");

module.exports.up = async function up(pgm) {
  await pgm.createExtension("uuid-ossp", {
    ifNotExists: true,
    schema: "public",
  });

  await pgm.createTable(
    "users",
    {
      user_id: {
        type: "uuid",
        default: new PgLiteral("uuid_generate_v4()"),
        notNull: true,
        primaryKey: true,
      },
      email: { type: "varchar(50)", notNull: true, unique: true },
      username: { type: "varchar(50)", notNull: true, unique: true },
      password: { type: "varchar(50)", notNull: true },
      role: {
        type: "varchar(50)",
        notNull: true,
        default: "GUEST",
      },
      created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    },
    {
      ifNotExists: true,
    }
  );
};
