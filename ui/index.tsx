import ReactDOM from "react-dom";
import React from "react";
import Spiders from "./Spiders/Spiders";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

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

ReactDOM.render(SpidersUI, document.getElementById("spiders"));
