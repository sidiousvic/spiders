import { DocumentNode, GraphQLResolveInfo } from "graphql";
import { Request } from "express";
import { SpidersDatabase } from "./server/db";

export enum Role {
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
  id: number;
  title: string;
  author: string;
  tags: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  published: boolean;
  publishedAt: Date;
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
export type Resolver<T, U = {}> = (
  parent: any,
  args: { input: U },
  ctx: Context,
  info: GraphQLResolveInfo
) => T;

export interface MutationResponse<T> {
  message: string;
  resource: T;
}

export interface Resolvers {
  [key: string]: any;
  Query: {
    me: Resolver<User>;
    findPosts: Resolver<Promise<Post[]>>;
  };
  Mutation: {
    signin: Resolver<Promise<AuthUser>, UserLogin>;
    addPost: Resolver<
      Promise<MutationResponse<Partial<Post>>>,
      Require<Post, "id">
    >;
    deletePost: Resolver<
      Promise<MutationResponse<Partial<Post>>>,
      Require<Post, "id">
    >;
    updatePost: Resolver<
      Promise<MutationResponse<Partial<Post>>>,
      Require<Post, "id">
    >;
  };
}
export type ID = string;
export type isVerified = boolean;
export interface JWTTokenSignees {
  id: string;
  role: Role;
}

export interface Auth {
  generateToken: (signees: JWTTokenSignees) => string;
  getUserIdFromToken: (token: string) => ID;
  verifyLogin: (login: UserLogin, user: User) => isVerified;
  authenticated: (resolver: Resolver<User>) => Resolver<User>;
  authorized: (resolver: Resolver<User>, role: Role) => Resolver<User>;
}

export interface Context {
  database: SpidersDatabase;
  auth?: Auth;
  authedUser: User;
}

export interface Utils {
  computeContext: (
    req: Request,
    database: SpidersDatabase,
    auth: Auth
  ) => Promise<Context>;
}

export interface GraphQLLayer {
  typeDefs: DocumentNode;
  resolvers: Resolvers;
  auth: Auth;
  utils: Utils;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type Require<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;
