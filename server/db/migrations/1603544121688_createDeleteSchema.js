exports.up = (pgm) => {
  pgm.sql(`
  CREATE SCHEMA
  IF NOT EXISTS deleted;`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP SCHEMA IF EXISTS deleted;`);
};
