import { AuthMiddlewareMap, AuthUtilsMap, User, AuthLayer } from "src/types";
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET!;

const authUtils: AuthUtilsMap = {
  generateToken({ id, role }) {
    return jwt.sign({ id, role }, secret);
  },
  getUserIdFromToken(token) {
    try {
      const user = jwt.verify(token, secret);
      const { id } = user as User;
      return id;
    } catch {
      return "";
    }
  },
  verifyLogin(login, user) {
    const usernameMatches = login.username === user.username;
    const passwordMatches = login.password === user.password;
    console.log(login, user);
    return usernameMatches && passwordMatches;
  },
};

const authMiddlewares: AuthMiddlewareMap = {
  authenticated(nextResolver) {
    return (parent, args, ctx, info) => {
      const { authedUser } = ctx;
      if (!authedUser)
        throw new AuthenticationError("User is not authenticated.");
      return nextResolver(parent, args, ctx, info);
    };
  },
  authorized(nextResolver, { role }) {
    return (parent, args, ctx, info) => {
      const { authedUser } = ctx;
      if (authedUser && authedUser.role !== role)
        throw new AuthenticationError("User is not authenticated.");
      else return nextResolver(parent, args, ctx, info);
    };
  },
};

const auth: AuthLayer = {
  ...authUtils,
  ...authMiddlewares,
};

export default auth;
