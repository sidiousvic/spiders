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
  email: string;
  password: string;
  role: Role;
  joinDate: Date;
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
export type UserSignIn = {
  username: string;
  password: string;
};
export type UserSignUp = {
  username: string;
  email: string;
  password: string;
  role: Role;
};
export type Query = {
  me: Resolver<User>;
};
export type Resolver<Resource, Input = {}> = (
  parent: any,
  args: { input: Input },
  ctx: Context,
  info: GraphQLResolveInfo
) => Resource;

export interface MutationResponse<Resource> {
  message: string;
  resource: Resource;
}

export interface X {
  [key: string]: any;
}

export interface AuthResolvers {
  Query: {
    me: Resolver<User>;
  };
  Mutation: {
    signIn: Resolver<Promise<AuthUser>, UserSignIn>;
    signUp: Resolver<Promise<User>, UserSignUp>;
  };
}

export interface UserResolvers {}

export interface PostResolvers {
  Query: {
    findPosts: Resolver<Promise<Post[]>>;
  };
  Mutation: {
    addPost: Resolver<Promise<MutationResponse<Post>>, Partial<Post>>;
    deletePost: Resolver<
      Promise<MutationResponse<Partial<Post>>>,
      Require<Post, "id">
    >;
    updatePost: Resolver<Promise<MutationResponse<Post>>, Require<Post, "id">>;
  };
}

interface ScalarResolvers {
  Date: typeof Date;
}

export type Resolvers = {
  [key: string]: any;
} & AuthResolvers &
  UserResolvers &
  PostResolvers &
  ScalarResolvers;

export type ID = string;
export type isVerified = boolean;
export interface JWTTokenSignees {
  id: string;
  role: Role;
}

export interface Auth {
  generateToken: (signees: JWTTokenSignees) => string;
  getUserIdFromToken: (token: string) => ID;
  verifyLogin: (login: UserSignIn, user: User) => isVerified;
  authenticated: (resolver: Resolver<User>) => Resolver<User>;
  authorized: <Resource, Input>(
    resolver: Resolver<Resource, Input>,
    role: Role
  ) => Resolver<Resource, Input>;
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

export type Unrequired<Type, OptionalKeys extends keyof Type> = Omit<
  Type,
  OptionalKeys
> &
  Partial<Type>;

export type Require<Type, RequiredKeys extends keyof Type> = Partial<Type> &
  Required<Pick<Type, RequiredKeys>>;
