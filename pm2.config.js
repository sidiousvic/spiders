module.exports = {
  apps: [
    {
      name: "spiders",
      script: "server/index.js",
      node_args: "-r dotenv/config",
    },
  ],
};
