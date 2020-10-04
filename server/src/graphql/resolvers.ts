import { AuthenticationError } from "apollo-server";
import { ResolverMap, User } from "src/types";
import auth from "./auth";

const { authenticated } = auth;

const resolvers: ResolverMap = {
  Query: {
    me: authenticated((_, __, { authedUser }) => authedUser as User),
  },
  Mutation: {
    async signin(_, { input: login }, { auth, models }) {
      const user = await models.users.findUser(login);
      const verified = auth.verifyLogin(login, user);
      if (!verified) throw new AuthenticationError("Wrong login.");
      const token = auth.generateToken(user);
      return { token, user };
    },
  },
};

export default resolvers;
