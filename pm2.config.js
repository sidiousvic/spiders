module.exports = {
  apps: [
    {
      name: "spiders",
      watch: true,
      env: {
        NODE_ENV: "deployment",
      },
      script: "./server/index.js",
      node_args: "--require dotenv/config --require tsconfig-paths/register",
    },
  ],
};
