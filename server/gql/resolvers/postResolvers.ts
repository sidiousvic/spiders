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
    async findDeletedPosts(_, __, { models }) {
      const posts = await models.Post.findDeleted();
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
    deletePosts: authorized(async (_, __, { models }) => {
      const deletedPosts = await models.Post.deleteAll();
      if (!deletedPosts.length) throw new UserInputError("No webs to burn.");
      return {
        message: "Webs successfully burned!",
        resource: deletedPosts,
      };
    }, Role.DARKLORD),
    deletePost: authorized(async (_, { input: { postId } }, { models }) => {
      const deletedPost = await models.Post.delete(postId);
      if (!deletedPost) throw new UserInputError("Post does not exist.");
      return {
        message: "Web successfully unraveled!",
        resource: deletedPost,
      };
    }, Role.DARKLORD),
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
      return models.User.find({ userId });
    },
  },
};

export { postResolvers };
