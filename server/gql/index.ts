import { Request } from "express";
import { ApolloServer } from "apollo-server";
import { User } from "spiders";

async function GraphQLServer(
  models: any,
  { apolloConfig: { schema, auth }, uri, port }: any
) {
  const apolloServer = new ApolloServer({
    schema,
    async context({ req }: { req: Request }) {
      const token = req.headers.authorization;
      let authedUser = {} as User;
      if (token) {
        const { id } = auth.getUserFromToken(token);
        authedUser = await models.User.find({ id });
      }
      return { models, authedUser };
    },
  });

  await apolloServer.listen({ port });

  console.log(`🧬 Apollo GraphQL server live @ ${uri}`);
}

export { GraphQLServer };
