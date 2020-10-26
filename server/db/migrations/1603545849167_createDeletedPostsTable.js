exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE 
    IF NOT EXISTS deleted.posts (
        deleted_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
        LIKE posts INCLUDING ALL
    );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS deleted.posts;`);
};