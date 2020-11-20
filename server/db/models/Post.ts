import { Post, DeletedPost, PostModel, Require, User } from "spiders";
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
      post_id as "postId",
      user_id as "userId",
      updated_at as "updatedAt",
      created_at as "createdAt",
      published_at as "publishedAt",
      deleted_at as "deletedAt"
      FROM posts
      `);
      return foundPosts;
    },

    async findDeleted(): Promise<DeletedPost[]> {
      const {
        rows: [...foundPosts],
      } = await pool.query(`
      SELECT *,
      post_id as "postId",
      user_id as "userId",
      updated_at as "updatedAt",
      created_at as "createdAt",
      published_at as "publishedAt",
      deleted_at as "deletedAt"
      FROM deleted.posts
      `);
      return foundPosts;
    },

    async findByUser({ userId }: Require<User, "userId">): Promise<Post[]> {
      const {
        rows: [...foundPosts],
      } = await pool.query(`
      SELECT * FROM
      (
        SELECT *,
        post_id as "postId",
        user_id as "userId",
        updated_at as "updatedAt",
        created_at as "createdAt",
        published_at as "publishedAt"
        FROM posts
      ) as post
      WHERE user_id = ${userId}`);
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
          raw,
          created_at, 
          updated_at, 
          user_id, 
          published) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
        [
          post.title,
          post.author,
          post.tags,
          post.body,
          post.raw,
          new Date().toISOString(),
          new Date().toISOString(),
          post.userId,
          false,
        ]
      );

      return addedPost as Post;
    },

    async update(post: Require<Post, "postId">): Promise<Post> {
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
      WHERE post_id = '${post.postId}'
      RETURNING *
      `,
        values
      );
      return updatedPost as Post;
    },

    async deleteAll(): Promise<Post[]> {
      await pool.query(`
      INSERT INTO deleted.posts 
      SELECT * FROM posts;
      UPDATE deleted.posts
      SET    deleted_at = NOW()
      `);

      const { rows: deletedPosts } = await pool.query(`
      DELETE FROM posts
      RETURNING *
      `);
      return deletedPosts as Post[];
    },

    async delete(postId: string): Promise<Post> {
      await pool.query(`
      INSERT INTO deleted.posts 
      SELECT * FROM posts
      WHERE posts.post_id = '${postId}';
      UPDATE deleted.posts
      SET    deleted_at = NOW()
      `);

      const {
        rows: [deletedPost],
      } = await pool.query(`
      DELETE FROM posts 
      WHERE post_id = '${postId}'
      RETURNING *
      `);
      return deletedPost as Post;
    },
  };
}

export { PostModeler };
