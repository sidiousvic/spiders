exports.up = async (pgm) => {
  await pgm.sql(
    `INSERT INTO users (id, username, password, role) VALUES (9,'sidiousvic', 'spiders99nine', 'DARKLORD');`
  );
};

exports.down = async (pgm) => {
  pgm.sql(`DELETE FROM users WHERE username = 'sidiousvic';`);
};
