import { GraphQLResolveInfo, GraphQLSchema } from "graphql";
import { Request } from "express";

export const enum Role {
  DARKLORD = "DARKLORD",
  GUEST = "GUEST",
}
export type User = {
  userId: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  joinDate: Date;
};

export type Post = {
  postId: string;
  title: string;
  author: string;
  tags: string;
  body: string;
  raw: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  published: boolean;
  publishedAt: Date;
};

export interface DeletedPost extends Post {
  deletedAt: Date;
}

export type AuthUser = {
  token: string;
  user: User;
};

export type VerifiedUser = {
  userId: string;
  role: Role;
  iat: number;
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

export interface PostUpdateResponse<Resource> {
  message: string;
  resource: Resource;
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

export interface UserResolvers {
  Query: {};
  Mutation: {};
  User: {
    posts: Resolver<Promise<Post[]>>;
  };
}

export interface PostResolvers {
  Query: {
    findPosts: Resolver<Promise<Post[]>>;
    findDeletedPosts: Resolver<Promise<DeletedPost[]>>;
  };
  Mutation: {
    addPost: Resolver<Promise<PostUpdateResponse<Post>>, Partial<Post>>;
    deletePosts: Resolver<Promise<PostUpdateResponse<Post[]>>>;
    deletePost: Resolver<
      Promise<PostUpdateResponse<Partial<Post>>>,
      Require<Post, "postId">
    >;
    updatePost: Resolver<
      Promise<PostUpdateResponse<Post>>,
      Require<Post, "postId">
    >;
  };
  Post: {
    user: Resolver<Promise<User>>;
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

export type isVerified = boolean;
export interface JWTTokenSignees {
  userId: string;
  role: Role;
}

export interface Auth {
  generateToken: (signees: JWTTokenSignees) => string;
  getUserFromToken: (token: string) => VerifiedUser;
  verifySignin: (signin: UserSignIn, user: User) => isVerified;
  authenticated: (resolver: Resolver<User>) => Resolver<User>;
  authorized: <Resource, Input>(
    resolver: Resolver<Resource, Input>,
    role: Role
  ) => Resolver<Resource, Input>;
}

export interface UserAuth {
  user: Require<User, "username" | "role">;
  token: string;
}

export interface UserModel {
  find: (partialUser: Partial<User>) => Promise<User>;
  add: (partialUser: Partial<User>) => Promise<User>;
}

export interface PostModel {
  find: () => Promise<Post[]>;
  findDeleted: () => Promise<DeletedPost[]>;
  findByUser: (partialUserWithId: Require<User, "userId">) => Promise<Post[]>;
  add: (partialPost: Partial<Post>) => Promise<Post>;
  update: (partialPostWithId: Require<Post, "postId">) => Promise<Post>;
  deleteAll: () => Promise<Post[]>;
  delete: (postId: string) => Promise<Post>;
}

export interface Models {
  User: UserModel;
  Post: PostModel;
}

export interface Context {
  models: Models;
  auth?: Auth;
  authedUser: User;
}

export interface ApolloContext {
  computeContext: (req: Request, database: any, auth: Auth) => Promise<Context>;
}

export interface ApolloConfig {
  schema: GraphQLSchema;
  auth: Auth;
}

export interface GraphQLConfig {
  apolloConfig: ApolloConfig;
  port: number;
  uri: string;
}

export interface WebhooksConfig {
  githubUsername: string;
  port: number;
  uri: string;
}

export type Unrequired<Type, OptionalKeys extends keyof Type> = Omit<
  Type,
  OptionalKeys
> &
  Partial<Type>;

export type Require<Type, RequiredKeys extends keyof Type> = Partial<Type> &
  Required<Pick<Type, RequiredKeys>>;
