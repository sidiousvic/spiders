export function logGraphQLErrors(errors: any) {
  for (let error of errors)
    console.error(`GraphQL response error: ${error.message}`);
}
