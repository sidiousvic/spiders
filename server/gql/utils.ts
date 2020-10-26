import { Utils, User } from "@spiders";
import { auth } from "./auth";

const { getUserFromToken } = auth;

const utils: Utils = {
  async computeContext(req, database) {
    const token = req.headers.authorization;
    let authedUser = {} as User;
    if (token) {
      const { id } = getUserFromToken(token);
      authedUser = await database.User.find({ id });
    }
    return { database, authedUser };
  },
};

export { utils };
