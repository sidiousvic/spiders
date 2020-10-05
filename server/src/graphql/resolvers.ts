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
      if (!user) throw new AuthenticationError("User not found.");
      const verified = auth.verifyLogin(login, user);
      if (!verified) throw new AuthenticationError("Wrong login.");
      const token = auth.generateToken(user);
      return { token, user };
    },
    async addPost(_, { input: post }, { models }) {
      await models.posts.addPost(post);
      return "Web successfully woven!";
    },
  },
};

export default resolvers;
