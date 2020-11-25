module.exports.up = async function up(pgm) {
  await pgm.sql(`
  CREATE SCHEMA
  IF NOT EXISTS deleted;`);
};

module.exports.down = async function down(pgm) {
  await pgm.sql(`
  DROP SCHEMA 
  IF EXISTS deleted;`);
};
