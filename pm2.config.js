module.exports = {
  apps: [
    {
      name: "spiders",
      script: "server/index.js",
      node_args: "--require dotenv/config --require tsconfig-paths/register ",
    },
  ],
};
