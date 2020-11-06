const env = process.env.NODE_ENV;
const port = 9992;

const webhooksConfig = {
  githubUsername: "sidiousvic",
  port,
  uri:
    env === "development"
      ? `localhost:${port}`
      : "spiders.sidiousvic.dev/webhooks",
};

export { webhooksConfig };
