import { AuthResolvers } from "@spiders";
import { AuthenticationError } from "apollo-server";
import { sign } from "jsonwebtoken";
import { auth } from "../auth";

const { authenticated, generateToken, verifyLogin } = auth;

const authResolvers: AuthResolvers = {
  Query: {
    me: authenticated((_, __, { authedUser }) => authedUser),
  },
  Mutation: {
    async signIn(_, { input: signInInput }, { database }) {
      const user = await database.findUser(signInInput);
      if (!user) throw new AuthenticationError("User not found.");
      const verified = verifyLogin(signInInput, user);
      if (!verified) throw new AuthenticationError("Wrong login.");
      const token = generateToken(user);
      return { token, user };
    },
    async signUp(_, { input: signUpInput }, { database }) {
      const user = await database.signUp(signUpInput);
      if (!user) throw new AuthenticationError("Unable to sign up user.");
      // user.joinDate = (user as any).created_at;
      return user;
    },
  },
};

export { authResolvers };
