import { Auth, VerifiedUser } from "spiders";
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

const auth: Auth = {
  generateToken({ id, role }) {
    return jwt.sign({ id, role }, secret);
  },
  getUserFromToken(token) {
    try {
      const user = jwt.verify(token, secret) as VerifiedUser;
      return user;
    } catch (err) {
      throw new AuthenticationError(err);
    }
  },
  verifySignin(signin, user) {
    const usernameMatches = signin.username === user.username;
    const passwordMatches = signin.password === user.password;
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
