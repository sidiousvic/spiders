import typeDefs from "./schema";
import resolvers from "./resolvers";
import auth from "./auth";
import utils from "./utils";
import GraphQL from "../../@types/graphql";

const graphqlLayer: GraphQL.Layer = {
  typeDefs,
  resolvers,
  auth,
  utils,
};

export default graphqlLayer;
