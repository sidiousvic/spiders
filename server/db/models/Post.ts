import { Post, PostModel, Require } from "spiders";
import { Pool } from "pg";
// eslint-disable-next-line camelcase
import { camelTo_snake } from "../utils";

function PostModeler(pool: Pool): PostModel {
  return {
    async find(): Promise<Post[]> {
      const {
        rows: [...foundPosts],
      } = await pool.query(`
      SELECT *,
      user_id as "userId",
      updated_at as "updatedAt",
      created_at as "createdAt",
      published_at as "publishedAt"
      FROM posts`);
      return foundPosts;
    },

    async findByUser({ id }): Promise<Post[]> {
      const {
        rows: [...foundPosts],
      } = await pool.query(`
      SELECT * FROM
      (
        SELECT *,
        user_id as "userId",
        updated_at as "updatedAt",
        created_at as "createdAt",
        published_at as "publishedAt"
        FROM posts
      ) as post
      WHERE user_id = ${id}`);
      return foundPosts;
    },

    async add(post: Partial<Post>): Promise<Post> {
      const {
        rows: [addedPost],
      } = await pool.query(
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

      return addedPost as Post;
    },

    async update(post: Require<Post, "id">): Promise<Post> {
      const params: string = Object.keys(post)
        .map((column, i) => {
          return `${camelTo_snake(column)} = $${i + 1}`;
        })
        .join(", ");

      const values = Object.values(post);

      const {
        rows: [updatedPost],
      } = await pool.query(
        `
      UPDATE posts 
      SET ${params}, updated_at = current_timestamp
      WHERE id = ${post.id}
      RETURNING *
      `,
        values
      );
      return updatedPost as Post;
    },

    async delete(id: string): Promise<Post> {
      await pool.query(`
      INSERT INTO deleted.posts 
      SELECT NOW() AS deleted_at, * FROM posts
      WHERE posts.id = '${id}'
      `);

      const {
        rows: [deletedPost],
      } = await pool.query(`
      DELETE FROM posts 
      WHERE id = '${id}'
      RETURNING *
      `);
      return deletedPost as Post;
    },
  };
}

export { PostModeler };
