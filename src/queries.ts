export const signinQuery = (username: string, password: string) => `
mutation {
  signin(login: {username: "${username}", password: "${password}"}) {
    token
  }
}
`;
