import { Post, Require } from "@types/spiders";
import { Pool } from "pg";
import { camelTo_snake } from "../utils";

function PostModel(pool: Pool) {
  return {
    async find(): Promise<Post[]> {
      const {
        rows: [...foundPosts],
      } = await pool.query(`
      SELECT *,
      updated_at as "updatedAt",
      created_at as "createdAt",
      published_at as "publishedAt"
      FROM posts`);
      return foundPosts;
    },

    async add(postToAdd: Partial<Post>): Promise<Post> {
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
          postToAdd.title,
          postToAdd.author,
          postToAdd.tags,
          postToAdd.body,
          new Date().toISOString(),
          new Date().toISOString(),
          postToAdd.userId,
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

    async delete(postId: string): Promise<Post> {
      await pool.query(`
      INSERT INTO deleted.posts 
      SELECT NOW() AS deleted_at, * FROM posts
      WHERE posts.id = '${postId}'
      `);

      const {
        rows: [deletedPost],
      } = await pool.query(`
      DELETE FROM posts 
      WHERE id = '${postId}'
      RETURNING *
      `);
      return deletedPost as Post;
    },
  };
}

export { PostModel };
