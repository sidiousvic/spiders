import { Utils, User } from "@spiders";
import { auth } from "./auth";

const { getUserIdFromToken } = auth;

const utils: Utils = {
  async computeContext(req, database) {
    const token = req.headers.authorization;
    let authedUser = {} as User;
    if (token) {
      const id = getUserIdFromToken(token);
      authedUser = await database.findUser({ id });
    }
    return { database, authedUser };
  },
};

export { utils };
