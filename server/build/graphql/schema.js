"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  enum Role {\n    DARKLORD\n    GUEST\n  }\n\n  type User {\n    id: ID!\n    username: String!\n    password: String!\n    role: Role!\n  }\n\n  type AuthUser {\n    token: String!\n    user: User!\n  }\n\n  input Login {\n    username: String!\n    password: String!\n  }\n\n  type Query {\n    me: User!\n  }\n\n  type Mutation {\n    signin(login: Login!): AuthUser!\n  }\n"], ["\n  enum Role {\n    DARKLORD\n    GUEST\n  }\n\n  type User {\n    id: ID!\n    username: String!\n    password: String!\n    role: Role!\n  }\n\n  type AuthUser {\n    token: String!\n    user: User!\n  }\n\n  input Login {\n    username: String!\n    password: String!\n  }\n\n  type Query {\n    me: User!\n  }\n\n  type Mutation {\n    signin(login: Login!): AuthUser!\n  }\n"])));
exports.default = typeDefs;
var templateObject_1;
