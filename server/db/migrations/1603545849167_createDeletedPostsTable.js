export function up(pgm) {
  pgm.sql(`
    CREATE TABLE 
    IF NOT EXISTS deleted.posts (
        deleted_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
        LIKE posts INCLUDING ALL
    );
    `);
}

export function down(pgm) {
  pgm.sql(`
  DROP TABLE 
  IF EXISTS deleted.posts;`);
}
