"use strict";
var ApolloServer = require("apollo-server").ApolloServer;
var typeDefs = require("./graphql/schema");
var server = new ApolloServer({ typeDefs: typeDefs });
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80 Server launched at " + url);
});
