import { Pool } from "pg";
import { RunnerOption, Migration } from "node-pg-migrate";
import { DocumentNode, GraphQLResolveInfo } from "graphql";
import { Request } from "apollo-server";
import e from "express";

// schema
enum Role {
  DARKLORD = "DARKLORD",
  GUEST = "GUEST",
}

type User = {
  id: string;
  username: string;
  password: string;
  role: Role;
};

type Post = {
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

type AuthUser = {
  token: string;
  user: User;
};

type UserLogin = {
  username: string;
  password: string;
};

type Query = {
  me: Resolver<User>;
};

// graphql
type GraphqlLayer = {
  typeDefs: DocumentNode;
  resolvers: ResolverLayer;
  auth: AuthLayer;
  context: ContextLayer;
};

// db
type PostgresMigrator = (options: RunnerOption) => Promise<RunMigration[]>;

type DatabaseMigrator = (pgm: PostgresMigrator) => Promise<void>;

type DatabaseModeler = (pool: Pool) => Promise<ModelsMap>;

type DatabaseConnector = (
  migrate: DatabaseMigrator,
  model: DatabaseModeler
) => Promise<ModelsMap>;

type DatabaseUtilsMap = {
  runMigrations: DatabaseMigrator;
  buildModels: DatabaseModeler;
  connectDatabase: DatabaseConnector;
};

type DatabaseLayer = Layer<DatabaseUtilsMap>;

// models
type UserModelsMap = {
  findUser: (user: Partial<User>) => Promise<User>;
};

type PostsModelsMap = {
  addPost: (post: Partial<Post>) => Promise<void>;
};

type ModelsMap = {
  users: UserModelsMap;
  posts: PostsModelsMap;
};

type ModelLayer = Layer<ModelsMap>;

// middleware
type Middleware<T> = (nextResolver: Resolver<T>) => Resolver<T>;

type MiddlewareWithArgs<T, U = any> = (
  nextResolver: Resolver<T>,
  middlewareArgs: MiddlewareArgs<U>
) => Resolver<Resolver>;

// resolvers
type Resolver<T, U = any> = (
  parent: any,
  args: ResolverArgs<U>,
  ctx: ResolverContext,
  info: GraphQLResolveInfo
) => T;

type QueryMap = {
  me: Resolver<User>;
};

type MutationMap = {
  signin: Resolver<Promise<AuthUser>, UserLogin>;
  addPost: Resolver<Promise<string>>;
};

type ResolverMap = {
  Query: QueryMap;
  Mutation: MutationMap;
};

type ResolverLayer = Layer<ResolverMap>;

type ResolverArgs<T> = {
  input: T;
};

type ResolverContext = {
  models: ModelLayer;
  auth: AuthLayer;
  authedUser?: User;
};

// auth
type ID = string | number;

type isVerified = boolean;

type JWTTokenSignees = {
  id: string;
  role: Role;
};

type AuthUtilsMap = {
  generateToken: (signees: JWTTokenSignees) => string;
  getUserIdFromToken: (token: string) => User["id"];
  verifyLogin: (login: UserLogin, user: User) => isVerified;
};

type AuthMiddlewareMap = {
  authenticated: Middleware<User>;
  authorized: MiddlewareWithArgs<User, Role>;
};

type AuthLayer = Layer<AuthUtilsMap & AuthMiddlewareMap>;

// context
type ContextUtilsMap = {
  computeContext: (
    req: e.Request,
    models: ModelsMap,
    auth: Layer<AuthMiddlewareMap & AuthUtilsMap>
  ) => Promise<ResolverContext>;
};

type ContextLayer = Layer<ContextUtilsMap>;

// utility
type Layer<S> = {
  [T in keyof S]: S[T];
};
