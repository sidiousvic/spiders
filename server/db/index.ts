import { Require, User, Post } from "types";
import { camelTo_snake } from "./utils";
import { Pool } from "pg";
import path from "path";
import pgm from "node-pg-migrate";

const migrationsPath = path.resolve("server", "db", "migrations");

class SpidersDatabase {
  pool?: Pool;
  config = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: Number(process.env.PG_PORT),
    url: `postgres://${process.env.PG_USER}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`,
  };

  public async findUser({ id }: Partial<User>): Promise<User> {
    const {
      rows: [user],
    } = await this.pool.query(`SELECT * FROM users WHERE id = '${id}'`);
    return user;
  }

  public async findPosts(): Promise<Post[]> {
    const {
      rows: [...posts],
    } = await this.pool!.query(`
    SELECT *,
    updated_at as "updatedAt",
    created_at as "createdAt",
    published_at as "publishedAt"
    FROM posts`);
    return posts;
  }

  public async addPost(
    post: Require<Post, "id">
  ): Promise<Require<Post, "id">> {
    const {
      rows: [addedPost],
    } = await this.pool!.query(
      `INSERT INTO posts 
       (title, 
        author, 
        tags, 
        body, 
        created_at, 
        updated_at, 
        user_id, 
        published) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
      [
        post.title,
        post.author,
        post.tags,
        post.body,
        new Date().toISOString(),
        new Date().toISOString(),
        post.userId,
        false,
      ]
    );

    return addedPost;
  }

  public async updatePost(
    post: Require<Post, "id">
  ): Promise<Require<Post, "id">> {
    const params: string = Object.keys(post)
      .map((column, i) => {
        return `${camelTo_snake(column)} = $${i + 1}`;
      })
      .join(", ");

    const values = Object.values(post);

    const {
      rows: [updatedPost],
    } = await this.pool!.query(
      `
    UPDATE posts 
    SET ${params}, updated_at = current_timestamp
    WHERE id = ${post.id}
    RETURNING *
    `,
      values
    );

    return updatedPost;
  }

  public async deletePost(postId: number): Promise<number> {
    const {
      rows: [deletedPost],
    } = await this.pool!.query(`
    DELETE FROM posts 
    WHERE id = '${postId}'
    RETURNING *
    `);
    return deletedPost;
  }

  private async migrate(): Promise<void> {
    console.log("🐪 Running migrations...");
    await pgm({
      databaseUrl: this.config.url,
      migrationsTable: "migrations",
      dir: migrationsPath,
      direction: "up",
      count: 9999,
    });
  }

  public async connect(): Promise<void> {
    console.log("🔋 Connecting to database...");
    await this.migrate();
    this.pool = new Pool(this.config);
  }
}

export { SpidersDatabase };
