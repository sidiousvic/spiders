import typeDefs from "./schema";
import resolvers from "./resolvers";
import auth from "./auth";
import context from "./context";
import { GraphqlLayer } from "src/types";

const graphqlLayer: GraphqlLayer = {
  typeDefs,
  resolvers,
  auth,
  context,
};

export default graphqlLayer;
