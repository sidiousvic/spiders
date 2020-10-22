import {
  Auth,
  JWTTokenSignees,
  User,
  UserLogin,
  isVerified,
  Resolver,
  Role,
  ID,
} from "../../types";
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

const auth: Auth = {
  generateToken({ id, role }: JWTTokenSignees): string {
    return jwt.sign({ id, role }, secret);
  },

  getUserIdFromToken(token: string): ID {
    try {
      const user = jwt.verify(token, secret);
      const { id } = user as User;
      return id;
    } catch {
      return "";
    }
  },

  verifyLogin(login: UserLogin, user: User): isVerified {
    const usernameMatches = login.username === user.username;
    const passwordMatches = login.password === user.password;
    return usernameMatches && passwordMatches;
  },

  authenticated(resolver: Resolver<User>): Resolver<User> {
    return (parent, args, ctx, info) => {
      const { authedUser } = ctx;
      if (!authedUser)
        throw new AuthenticationError("User is not authenticated.");
      return resolver(parent, args, ctx, info);
    };
  },

  authorized(resolver: Resolver<User>, role: Role): Resolver<User> {
    return (parent, args, ctx, info) => {
      const { authedUser } = ctx;
      if (authedUser && authedUser.role !== role)
        throw new AuthenticationError("User is not authorized.");
      else return resolver(parent, args, ctx, info);
    };
  },
};

export { auth };
