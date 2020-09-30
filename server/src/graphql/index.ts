import typeDefs from "./schema";
import resolvers from "./resolvers";
import auth from "./auth";

const graphqlLayer = {
  typeDefs,
  resolvers,
  auth,
};

export default graphqlLayer;
