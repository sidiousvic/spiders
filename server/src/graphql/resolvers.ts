import { AuthenticationError } from "apollo-server";
import auth from "./auth";

const { authenticated } = auth;

const resolvers = {
  Query: {
    me: authenticated((_: any, __: any, { user }: any) => user),
  },
  Mutation: {
    async signin(
      _: any,
      { login }: any,
      { models, auth: { generateToken, verifyLogin } }: any
    ) {
      const user = (await models.users.findUser(login)) || {};
      const verified = verifyLogin(login, user);
      if (!verified) throw new AuthenticationError("Wrong login.");
      const token = generateToken(user);
      return { token, user };
    },
  },
};

export default resolvers;
