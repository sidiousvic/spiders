exports.up = async (pgm) => {
  await pgm.createTable("posts", {
    id: "id",
    title: { type: "varchar(255)", notNull: true },
    author: { type: "varchar(255)", notNull: true },
    tags: { type: "varchar(255)", notNull: true },
    body: { type: "text", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    userId: { type: "id", notNull: true, references: "users" },
    published: { type: "boolean", notNull: true },
    publishedAt: { type: "timestamp", notNull: true },
  });
};
