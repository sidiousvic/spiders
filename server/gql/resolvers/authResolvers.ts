import { AuthResolvers } from "@spiders";
import { AuthenticationError } from "apollo-server";
import { auth } from "../auth";

const { authenticated, generateToken, verifyLogin } = auth;

const authResolvers: AuthResolvers = {
  Query: {
    me: authenticated((_, __, { authedUser }) => authedUser),
  },
  Mutation: {
    async signIn(_, { input: login }, { database }) {
      const user = await database.findUser(login);
      if (!user) throw new AuthenticationError("User not found.");
      const verified = verifyLogin(login, user);
      if (!verified) throw new AuthenticationError("Wrong login.");
      const token = generateToken(user);
      return { token, user };
    },
    async signUp(/*_, { input: login }, { database }*/) {
      // const user = await database.registerUser(login);
    },
  },
};

export { authResolvers };
