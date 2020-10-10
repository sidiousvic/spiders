import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import fetch from "cross-fetch";
import ReactDOM from "react-dom/server";
import { StaticRouter } from "react-router";
import Express from "express";
import Spiders from "../ui/Spiders/Spiders";
import { getDataFromTree } from "@apollo/client/react/ssr";

const env = process.env.NODE_ENV;

const graphqlServerUri =
  env === "development"
    ? "http://localhost:9991"
    : "https://sidiousvic.dev/spiders/graphql";

const app = Express();

app.use("/", (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      fetch,
      uri: graphqlServerUri,
      credentials: "same-origin",
      headers: {
        cookie: req.header("Cookie"),
      },
    }),
    cache: new InMemoryCache(),
  });

  const context = {};

  const SpidersUI = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Spiders />
      </StaticRouter>
    </ApolloProvider>
  );

  getDataFromTree(SpidersUI).then(() => {
    const content = ReactDOM.renderToString(SpidersUI);
    const initialState = client.extract();
    const html = ReactDOM.renderToStaticMarkup(
      <Html content={content} state={initialState} />
    );
    res.status(200);
    res.send(`<!DOCTYPE html>\n${html}`);
    res.end();
  });
});

app.listen(9992, () =>
  console.log(`🧪 SSR React is now running @ ${graphqlServerUri}`)
);

function Html({ content, state }: { content: string; state: any }) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div id="spiders" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              "\\u003c"
            )};`,
          }}
        />
      </body>
    </html>
  );
}
