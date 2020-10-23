import { Role, Resolvers } from "@spiders";
import { AuthenticationError } from "apollo-server";
import { auth } from "./auth";

const { authenticated, authorized, generateToken, verifyLogin } = auth;

const resolvers: Resolvers = {
  Query: {
    me: authenticated((_, __, { authedUser }) => authedUser),
    async findPosts(_, __, { database }) {
      const posts = await database.findPosts();
      return posts;
    },
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
    addPost: authorized(async (_, { input: post }, { database }) => {
      const addedPost = await database.addPost(post);
      return {
        message: `Web successfully woven!`,
        resource: addedPost,
      };
    }, Role.DARKLORD),
    async deletePost(_, { input: { id } }, { database }) {
      await database.deletePost(id);
      return {
        message: `Web successfully unraveled!`,
        resource: { id },
      };
    },
    async updatePost(_, { input: partialPostWithId }, { database }) {
      const updatedPost = await database.updatePost(partialPostWithId);
      return {
        message: `Web successfully rewoven!`,
        resource: updatedPost,
      };
    },
  },
  Date: Date,
};

export { resolvers };
