export async function up(pgm) {
  await pgm.sql(
    `INSERT INTO users (
      username, email, password, role
      ) 
    VALUES (
      'sidiousvic', 'sidiousvic@gmail.com', '999', 'DARKLORD'
      ) 
    ON CONFLICT DO NOTHING;`
  );
}

export async function down(pgm) {
  await pgm.sql(`
  DELETE FROM users 
  WHERE username = 'sidiousvic';`);
}
