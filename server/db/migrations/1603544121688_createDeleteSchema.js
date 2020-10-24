exports.up = (pgm) => {
  pgm.sql(`CREATE SCHEMA deleted;`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP SCHEMA deleted;`);
};
