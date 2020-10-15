import express from "express";
const Webhooks = express();
import u from "util";
const exec = u.promisify(require("child_process").exec);
const githubUsername = "sidiousvic";

export default async function launchWebhooksServer() {
  Webhooks.use(function timelog(req, _, next) {
    const { path: reqUrl } = req;
    console.log("Webhook @", reqUrl, new Date().toLocaleString());
    next();
  });

  Webhooks.get("/webhooks", (_, res) => {
    res.send("🕷🕸🎣");
  });

  Webhooks.post("/webhooks/build", function triggerDeploy(req, res) {
    const { sender, ref } = req.body;
    if (ref.indexOf("prod") > -1 && sender.login === githubUsername) {
      console.log(`🔩 Triggering spiders deploy...`);
      deploy();
      res.status(200).send("🔧 Deploy has been triggered. ");
    } else res.status(500).send("😵 Deploy was not triggered. ");
  });

  const port = 9992;

  Webhooks.listen(port, () => {
    console.log(`🎣 Webhooks listening @ port ${port}`);
  });

  async function deploy() {
    const deployScript = "sh ./deploy.sh";
    await exec(deployScript);
  }
}
