import { render, hydrate } from "react-dom";
import React from "react";
import Spiders from "./Spiders/Spiders";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import Prism from "prismjs";
import "./spiders.code.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/components/prism-typescript";

Prism.highlightAll();

const env = process.env.NODE_ENV;

const graphqlServerUri =
  env === "development"
    ? "http://localhost:9991"
    : "https://sidiousvic.dev/spiders/graphql";

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    fetch,
    uri: graphqlServerUri,
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

const SpidersUI = (
  <ApolloProvider client={client}>
    <BrowserRouter basename="/">
      <Spiders />
    </BrowserRouter>
  </ApolloProvider>
);

switch (env) {
  case "production":
    hydrate(SpidersUI, document.getElementById("spiders"));
  case "development":
    render(SpidersUI, document.getElementById("spiders"));
}
