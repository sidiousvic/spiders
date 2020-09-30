import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import graphqlLayer from "./graphql";
import connectToDatabase from "./db";

const { typeDefs, resolvers, auth } = graphqlLayer;
const { getUserFromToken } = auth;

async function launchApolloServer() {
  const db = await connectToDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    async context({ req }) {
      if (!req.headers.authorization) return { ...db, auth };
      const token = req.headers.authorization || "";
      const id = await getUserFromToken(token as string);
      const user = await db.models.users.findUser({ id });
      return { ...db, user, auth };
    },
  });

  server.listen({ port: 9991 }).then(({ url }) => {
    console.log(`🚀 Apollo Server launched @ ${url}`);
  });
}

launchApolloServer();
