module.exports = {
  apps: [
    {
      name: "spiders",
      env: {
        NODE_ENV: "deployment",
      },
      daemon: false,
      script: "./server/index.js",
      node_args: "--require dotenv/config --require tsconfig-paths/register",
    },
  ],
};
