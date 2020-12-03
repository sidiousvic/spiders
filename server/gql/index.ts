import { Request } from "express";
import { ApolloServer } from "apollo-server";
import { GraphQLConfig, Models, User } from "@spiders";

async function GraphQLServer(
  models: Models,
  { apolloConfig: { schema, auth }, uri, port }: GraphQLConfig
) {
  const apolloServer = new ApolloServer({
    schema,
    async context({ req }: { req: Request }) {
      const token = req.headers.authorization;
      let authedUser = {} as User;
      if (token) {
        const { userId } = auth.getUserFromToken(token);
        authedUser = await models.User.find({ userId });
      }
      return { models, authedUser };
    },
  });

  await apolloServer.listen({ port });

  console.log(`🧬 Apollo GraphQL server live @ ${uri}`);
}

export { GraphQLServer };
