import { ContextLayer, User } from "../types";

const context: ContextLayer = {
  async computeContext(req, models, auth) {
    const token = req.headers.authorization;
    const { getUserIdFromToken } = auth;
    const { users } = models;
    if (token) {
      const id = getUserIdFromToken(token as string);
      const authedUser = await users.findUser({ id });
      return { models, auth, authedUser };
    }
    return { models, auth };
  },
};

export default context;
