import GraphQL from "../../@types/graphql";
import { AuthenticationError, IResolvers } from "apollo-server";
import auth from "./auth";
const { authenticated } = auth;

const resolvers: GraphQL.Resolvers = {
  Query: {
    me: authenticated((_, __, { authedUser }) => authedUser),
  },
  Mutation: {
    async signin(_, { input: login }, { auth, database }) {
      const user = await database.findUser(login);
      if (!user) throw new AuthenticationError("User not found.");
      const verified = auth.verifyLogin(login, user);
      if (!verified) throw new AuthenticationError("Wrong login.");
      const token = auth.generateToken(user);
      return { token, user };
    },
    async addPost(_, { input: post }, { database }) {
      await database.addPost(post);
      return "Web successfully woven!";
    },
  },
};

export default resolvers;
