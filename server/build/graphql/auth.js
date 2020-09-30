"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret = process.env.SECRET;
var auth = {
    generateToken: function (_a) {
        var id = _a.id, role = _a.role;
        return jsonwebtoken_1.default.sign({ id: id, role: role }, secret);
    },
    getUserFromToken: function (token) {
        try {
            var user = jsonwebtoken_1.default.verify(token, secret);
            var id = user.id;
            return id;
        }
        catch (e) {
            return null;
        }
    },
    verifyLogin: function (login, user) {
        var usernameMatches = login.username === user.username;
        var passwordMatches = login.password === user.password;
        return usernameMatches && passwordMatches;
    },
    authenticated: function (next) {
        return function (root, args, context, info) {
            if (!context.user)
                throw new apollo_server_1.AuthenticationError("User is not authenticated.");
            return next(root, args, context, info);
        };
    },
    authorized: function (role, next) {
        return function (root, args, context, info) {
            if (context.user.role !== role)
                throw new apollo_server_1.AuthenticationError("User is not authenticated.");
            return next(root, args, context, info);
        };
    },
};
exports.default = auth;
