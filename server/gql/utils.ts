import { SpidersDatabase } from "../db";
import { Utils, Context, User } from "../../types";
import { auth } from "./auth";

const { getUserIdFromToken } = auth;

const utils: Utils = {
  async computeContext(req: any, database: SpidersDatabase): Promise<Context> {
    const token = req.headers.authorization;
    let authedUser = {} as User;
    if (token) {
      const id = getUserIdFromToken(token as string);
      authedUser = await database.findUser({ id });
    }
    return { database, authedUser };
  },
};

export { utils };
