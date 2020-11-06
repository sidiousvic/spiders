// eslint-disable-next-line camelcase
export function camelTo_snake(string: string) {
  const result = string.replace(/([A-Z])/g, " $1");
  return result.split(" ").join("_").toLowerCase();
}
