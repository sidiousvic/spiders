import { GraphQLResolveInfo, DocumentNode } from "graphql";
import e from "express";
import SpidersDatabase from "../server/db";

declare namespace GraphQL {
  export type Resolver<T, U = {}> = (
    parent: any,
    args: { input: U },
    ctx: Context,
    info: GraphQLResolveInfo
  ) => T;

  export namespace TypeDefs {
    enum Role {
      DARKLORD = "DARKLORD",
      GUEST = "GUEST",
    }

    export type User = {
      id: string;
      username: string;
      password: string;
      role: Role;
    };

    export type Post = {
      id: string;
      title: string;
      author: string;
      tags: string;
      body: string;
      createdAt: string;
      updatedAt: string;
      userId: number;
      published: boolean;
      publishedAt: string;
    };

    export type PostInput = {
      title: string;
      author: string;
      tags: string;
      body: string;
      updatedAt: string;
      userId: number;
      published: boolean;
      publishedAt: string;
    };

    export type AuthUser = {
      token: string;
      user: User;
    };

    export type UserLogin = {
      username: string;
      password: string;
    };

    export type Query = {
      me: Resolver<User>;
    };
  }

  export interface Resolvers {
    [key: string]: any;
    Query: {
      me: Resolver<TypeDefs.User>;
    };
    Mutation: {
      signin: Resolver<Promise<TypeDefs.AuthUser>, TypeDefs.UserLogin>;
      addPost: Resolver<Promise<string>>;
    };
  }

  export namespace Auth {
    export type ID = string;
    export type isVerified = boolean;
    export interface JWTTokenSignees {
      id: string;
      role: TypeDefs.Role;
    }
    export interface Layer {
      generateToken: (signees: JWTTokenSignees) => string;
      getUserIdFromToken: (token: string) => ID;
      verifyLogin: (
        login: TypeDefs.UserLogin,
        user: TypeDefs.User
      ) => isVerified;
      authenticated: (
        resolver: Resolver<TypeDefs.User>
      ) => Resolver<TypeDefs.User>;
      authorized: (
        resolver: Resolver<TypeDefs.User>,
        role: TypeDefs.Role
      ) => Resolver<TypeDefs.User>;
    }
  }

  export interface Context {
    database: SpidersDatabase;
    auth: Auth.Layer;
    authedUser: TypeDefs.User;
  }

  export interface Utils {
    computeContext: (
      req: e.Request,
      database: SpidersDatabase,
      auth: Auth.Layer
    ) => Promise<Context>;
  }

  export interface Layer {
    typeDefs: DocumentNode;
    resolvers: Resolvers;
    auth: Auth.Layer;
    utils: Utils;
  }
}

export default GraphQL;
