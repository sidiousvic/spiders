const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/schema");

const server = new ApolloServer({ typeDefs });

server.listen({ port: 9991 }).then(({ url }) => {
  console.log(`🚀 Server launched at ${url}`);
});
