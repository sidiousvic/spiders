import { Role, PostResolvers } from "@spiders";
import { auth } from "../auth";

const { authorized } = auth;

const postResolvers: PostResolvers = {
  Query: {
    async findPosts(_, __, { database }) {
      const posts = await database.findPosts();
      return posts;
    },
  },
  Mutation: {
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
};

export { postResolvers };
