import { Resolvers } from "spiders";
import { authResolvers } from "./authResolvers";
import { postResolvers } from "./postResolvers";

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
  Date,
};

export { resolvers };
