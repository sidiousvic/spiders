module.exports = {
  apps: [
    {
      name: "spiders",
      script: "server/index.js",
      node_args: "--require tsconfig-paths/register --require dotenv/config",
    },
  ],
};
