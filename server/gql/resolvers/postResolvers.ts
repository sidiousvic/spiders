import { Role, PostResolvers } from "@types/spiders";
import { UserInputError } from "apollo-server";
import { auth } from "../auth";

const { authorized } = auth;

const postResolvers: PostResolvers = {
  Query: {
    async findPosts(_, __, { database }) {
      const posts = await database.Post.find();
      return posts;
    },
  },
  Mutation: {
    addPost: authorized(async (_, { input: post }, { database }) => {
      const addedPost = await database.Post.add(post);
      return {
        message: `Web successfully woven!`,
        resource: addedPost,
      };
    }, Role.DARKLORD),
    async deletePost(_, { input: { id } }, { database }) {
      const deletedPost = await database.Post.delete(id);
      if (!deletedPost)
        throw new UserInputError("Unable to delete nonexistent post.");
      return {
        message: `Web successfully unraveled!`,
        resource: deletedPost,
      };
    },
    async updatePost(_, { input: partialPostWithId }, { database }) {
      const updatedPost = await database.Post.update(partialPostWithId);
      return {
        message: `Web successfully rewoven!`,
        resource: updatedPost,
      };
    },
  },
};

export { postResolvers };
