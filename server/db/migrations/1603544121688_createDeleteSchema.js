export async function up(pgm) {
  await pgm.sql(`
  CREATE SCHEMA
  IF NOT EXISTS deleted;`);
}

export async function down(pgm) {
  await pgm.sql(`
  DROP SCHEMA 
  IF EXISTS deleted;`);
}
