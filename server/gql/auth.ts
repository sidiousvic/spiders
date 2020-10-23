import { Auth, User } from "@spiders";
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

const auth: Auth = {
  generateToken({ id, role }) {
    return jwt.sign({ id, role }, secret);
  },

  getUserIdFromToken(token) {
    try {
      const user = jwt.verify(token, secret) as User;
      const { id } = user;
      return id;
    } catch (err) {
      throw new AuthenticationError(err);
    }
  },

  verifyLogin(login, user) {
    const usernameMatches = login.username === user.username;
    const passwordMatches = login.password === user.password;
    return usernameMatches && passwordMatches;
  },

  authenticated(resolver) {
    return (parent, args, ctx, info) => {
      const { authedUser } = ctx;
      if (!authedUser)
        throw new AuthenticationError("User is not authenticated.");
      return resolver(parent, args, ctx, info);
    };
  },

  authorized(resolver, role) {
    return (parent, args, ctx, info) => {
      const { authedUser } = ctx;
      if (authedUser && authedUser.role !== role)
        throw new AuthenticationError("User is not authorized.");
      else return resolver(parent, args, ctx, info);
    };
  },
};

export { auth };
