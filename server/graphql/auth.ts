import GraphQL from "../../@types/server/graphql";
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET!;

const auth: GraphQL.Auth.Layer = {
  generateToken({ id, role }) {
    return jwt.sign({ id, role }, secret);
  },
  getUserIdFromToken(token) {
    try {
      const user = jwt.verify(token, secret);
      const { id } = user as GraphQL.TypeDefs.User;
      return id;
    } catch {
      return "";
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
        throw new AuthenticationError("User is not authenticated.");
      else return resolver(parent, args, ctx, info);
    };
  },
};

export default auth;
