import { UserResolvers } from "@spiders";

/** @todo */
const userResolvers: UserResolvers = {
  Query: {},
  Mutation: {},
  User: {
    posts: (user, _, { models }) => {
      return models.Post.findByUser(user);
    },
  },
};

export { userResolvers };
