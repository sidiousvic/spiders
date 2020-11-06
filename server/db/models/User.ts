import { User, UserModel } from "spiders";
import { Pool } from "pg";

function UserModeler(pool: Pool): UserModel {
  return {
    async find({ id, username }: Partial<User>): Promise<User> {
      const {
        rows: [user],
      } = await pool.query(`
      SELECT *,
      created_at as "joinDate"
      FROM users 
      WHERE ${id ? "id" : "username"} = '${id || username}'
      `);
      return user as User;
    },

    async add({ username, email, password }: Partial<User>): Promise<User> {
      const {
        rows: [signedUpUser],
      } = await pool.query(
        `INSERT INTO users 
          (username, 
            email, 
            password) 
          VALUES ($1, $2, $3)
          RETURNING *,
          created_at as "joinDate"
          `,
        [username, email, password]
      );
      return signedUpUser as User;
    },
  };
}

export { UserModeler };
