module.exports.up = async function up(pgm) {
  await pgm.sql(`
    CREATE TABLE 
    IF NOT EXISTS deleted.posts (
        LIKE posts INCLUDING ALL
    );
    `);
};

module.exports.down = async function down(pgm) {
  await pgm.sql(`
  DROP TABLE 
  IF EXISTS deleted.posts;`);
};
