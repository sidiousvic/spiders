export async function up(pgm) {
  await pgm.sql(
    `INSERT INTO users (
      id, username, email, password, role
      ) 
    VALUES (
      9,'sidiousvic', 'sidiousvic@gmail.com', '999', 'DARKLORD'
      ) 
    ON CONFLICT DO NOTHING;`
  );
}

export async function down(pgm) {
  pgm.sql(`
  DELETE FROM users 
  WHERE username = 'sidiousvic';`);
}
