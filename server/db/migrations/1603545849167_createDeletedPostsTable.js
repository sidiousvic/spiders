export async function up(pgm) {
  await pgm.sql(`
    CREATE TABLE 
    IF NOT EXISTS deleted.posts (
        LIKE posts INCLUDING ALL
    );
    `);
}

export async function down(pgm) {
  await pgm.sql(`
  DROP TABLE 
  IF EXISTS deleted.posts;`);
}
