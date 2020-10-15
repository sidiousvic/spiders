import GraphQL from "../../@types/server/graphql";

const utils: GraphQL.Utils = {
  async computeContext(req, database, auth) {
    const token = req.headers.authorization;
    const { getUserIdFromToken } = auth;
    let authedUser = {} as GraphQL.TypeDefs.User;
    if (token) {
      const id = getUserIdFromToken(token as string);
      authedUser = await database.findUser({ id });
      console.log(authedUser);
    }
    return { database, auth, authedUser };
  },
};

export default utils;
