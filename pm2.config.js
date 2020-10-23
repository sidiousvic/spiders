module.exports = {
  apps: [
    {
      name: "spiders",
      script: "server/index.js",
      node_args: "-r tsconfig-paths/register -r dotenv/config",
    },
  ],
};
