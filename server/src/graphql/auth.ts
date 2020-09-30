import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET!;

const auth = {
  generateToken({ id, role }: any) {
    return jwt.sign({ id, role }, secret);
  },
  getUserFromToken(token: string) {
    try {
      const user = jwt.verify(token, secret);
      const { id } = user as any;
      return id;
    } catch (e) {
      return null;
    }
  },
  verifyLogin(login: any, user: any) {
    const usernameMatches = login.username === user.username;
    const passwordMatches = login.password === user.password;
    return usernameMatches && passwordMatches;
  },
  authenticated(next: Function) {
    return (root: any, args: any, context: any, info: any) => {
      if (!context.user)
        throw new AuthenticationError("User is not authenticated.");
      return next(root, args, context, info);
    };
  },
  authorized(role: string, next: Function) {
    return (root: any, args: any, context: any, info: any) => {
      if (context.user.role !== role)
        throw new AuthenticationError("User is not authenticated.");
      return next(root, args, context, info);
    };
  },
};

export default auth;
