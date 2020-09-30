"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = __importDefault(require("./schema"));
var resolvers_1 = __importDefault(require("./resolvers"));
var auth_1 = __importDefault(require("./auth"));
var graphqlLayer = {
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    auth: auth_1.default,
};
exports.default = graphqlLayer;
