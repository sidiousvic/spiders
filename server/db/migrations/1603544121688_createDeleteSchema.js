export function up(pgm) {
  pgm.sql(`
  CREATE SCHEMA
  IF NOT EXISTS deleted;`);
}

export function down(pgm) {
  pgm.sql(`
  DROP SCHEMA 
  IF EXISTS deleted;`);
}
