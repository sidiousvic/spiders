exports.up = async (pgm) => {
  await pgm.createTable("posts", {
    id: "id",
    title: { type: "varchar(255)", notNull: true },
    author: { type: "varchar(255)", notNull: true },
    tags: { type: "varchar(255)", notNull: true },
    body: { type: "text", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    user_id: { type: "id", notNull: true, references: "users" },
    published: { type: "boolean", notNull: true },
    published_at: { type: "timestamp", notNull: true },
  });
};
