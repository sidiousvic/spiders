import { Resolvers } from "../../types";
import { AuthenticationError } from "apollo-server";
import { auth } from "./auth";

const { authenticated, generateToken, verifyLogin } = auth;

const resolvers: Resolvers = {
  Query: {
    me: authenticated((_, __, { authedUser }) => authedUser),
    async findPosts(_, __, { database }) {
      const posts = await database.findPosts();
      return posts;
    },
  },
  Mutation: {
    async signin(_, { input: login }, { database }) {
      const user = await database.findUser(login);
      if (!user) throw new AuthenticationError("User not found.");
      const verified = verifyLogin(login, user);
      if (!verified) throw new AuthenticationError("Wrong login.");
      const token = generateToken(user);
      return { token, user };
    },
    async addPost(_, { input: post }, { database }) {
      const addedPost = await database.addPost(post);
      return {
        message: `Web successfully woven!`,
        resource: addedPost,
      };
    },
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
