exports.up = async (pgm) => {
  await pgm.createTable("users", {
    id: "id",
    username: { type: "varchar(50)", notNull: true },
    password: { type: "varchar(50)", notNull: true },
    role: { type: "varchar(50)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};
