import { Role, PostResolvers } from "spiders";
import { UserInputError } from "apollo-server";
import { auth } from "../auth";

const { authorized } = auth;

const postResolvers: PostResolvers = {
  Query: {
    async findPosts(_, __, { models }) {
      const posts = await models.Post.find();
      return posts;
    },
  },
  Mutation: {
    addPost: authorized(async (_, { input: post }, { models }) => {
      const addedPost = await models.Post.add(post);
      return {
        message: "Web successfully woven!",
        resource: addedPost,
      };
    }, Role.DARKLORD),
    async deletePost(_, { input: { id } }, { models }) {
      const deletedPost = await models.Post.delete(id);
      if (!deletedPost) throw new UserInputError("Post does not exist.");
      return {
        message: "Web successfully unraveled!",
        resource: deletedPost,
      };
    },
    async updatePost(_, { input: partialPostWithId }, { models }) {
      const updatedPost = await models.Post.update(partialPostWithId);
      return {
        message: "Web successfully rewoven!",
        resource: updatedPost,
      };
    },
  },
  Post: {
    async user({ userId }, _, { models }) {
      return models.User.find({ id: userId });
    },
  },
};

export { postResolvers };
