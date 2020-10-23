exports.up = async (pgm) => {
  await pgm.createTable(
    "users",
    {
      id: "id",
      email: { type: "varchar(50)", notNull: true },
      username: { type: "varchar(50)", notNull: true },
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
