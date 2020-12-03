import { AuthResolvers, User } from "@spiders";
import { AuthenticationError, UserInputError } from "apollo-server";
import { auth } from "../auth";

const { authenticated, generateToken, verifySignin } = auth;

const authResolvers: AuthResolvers = {
  Query: {
    me: authenticated((_, __, { authedUser }) => authedUser),
  },
  Mutation: {
    async signIn(_, { input: signInInput }, { models }) {
      const user = await models.User.find(signInInput);
      if (!user) throw new AuthenticationError("User not found.");
      const verified = verifySignin(signInInput, user);
      if (!verified) throw new AuthenticationError("Wrong signin.");
      const token = generateToken(user);
      return { token, user };
    },
    async signUp(_, { input: signUpInput }, { models }) {
      let user = {};
      try {
        user = await models.User.add(signUpInput);
      } catch ({ code }) {
        if (code === "23505") throw new UserInputError("User already exists.");
      }
      if (!user) throw new AuthenticationError("Unable to sign up user.");
      return user as User;
    },
  },
};

export { authResolvers };
