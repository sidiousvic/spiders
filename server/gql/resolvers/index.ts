import { Resolvers } from "spiders";
import { authResolvers } from "./authResolvers";
import { postResolvers } from "./postResolvers";
import { userResolvers } from "./userResolvers";

const resolvers: Resolvers = {
  Query: {
    ...authResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...postResolvers.Mutation,
  },
  Post: { ...postResolvers.Post },
  User: { ...userResolvers.User },
  Date,
};

export { resolvers };
