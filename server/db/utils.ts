export function camelTo_snake(string: string) {
  var result = string.replace(/([A-Z])/g, " $1");
  return result.split(" ").join("_").toLowerCase();
}
