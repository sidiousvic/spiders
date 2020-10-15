const mockPost =  {
            id: "",
            title: "Launching an Apollo Server",
            author: "", 
            body: `<p>
            Sometimes it's useful to initialize processes in your pipeline
            by wrapping them in a function. In here, we're connecting to a
            database, and then initializing a server with Apollo. We also
            compute the context for resolvers depending on whether the user
            is authenticated or not; that logic, however, is abstracted
            somewhere else. I enjoy the declarative style of calling a
            <code>launchSpidersServer</code> function in the end, akin to
            turning the key in your car.
          </p>
          <pre class="language-typescript">
      <code id="code">
launchSSRServer();

async function launchSpidersServer(
  database: SpidersDatabase,
  { typeDefs, resolvers, auth, utils: { computeContext } }: GraphQL.Layer) {

  await database.connect();

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers: resolvers, 
    async context({ req }) {
      return await computeContext(req, database, auth);
    }),
  });
  

  server.listen({ port: 9991 }).then(() => {
    console.log(\`🚀 Apollo Server launched @ \${graphqlServerUri}\`);
  });
}

launchSpidersServer(new SpidersDatabase(), graphqlLayer);
      </code>
    </pre>
          <p>
            I think of my internal services as uniform APIs. With
            Typescript, the tools to design interfaces that communicate
            seamlessly with each other are there. For each layer of my
            stack—from the database, to the middle end GraphQL (including
            authentication middleware) we create API layers which expose
            methods and helpers related in funcionality with one another.</p>
            `,
            "tags": "pancakes, yeahboy",
            "updated_at": new Date().toISOString,
            "user_id": 0,
            "published": true,
            "published_at": new Date().toISOString
        }

        export default mockPost;