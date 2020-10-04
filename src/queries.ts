export const signinQuery = (username: string, password: string) => `
mutation {
  signin(input: {username: "${username}", password: "${password}"}) {
    token
  }
}
`;
