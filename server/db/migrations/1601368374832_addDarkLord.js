exports.up = async (pgm) => {
  await pgm.sql(
    `INSERT INTO users (id, username, email, password, role) VALUES (9,'sidiousvic', 'sidiousvic@gmail.com', 'spiders99nine', 'DARKLORD') ON CONFLICT DO NOTHING;`
  );
};

exports.down = async (pgm) => {
  pgm.sql(`DELETE FROM users WHERE username = 'sidiousvic';`);
};
