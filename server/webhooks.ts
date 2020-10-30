import express from "express";
const Webhooks = express();
import u from "util";
const exec = u.promisify(require("child_process").exec);
const githubUsername = "sidiousvic";

Webhooks.use(express.json());

async function launchWebhooksServer() {
  Webhooks.use(function timelog(_, __, next) {
    console.log(
      `🎣  Deploy webhook @ ${new Date().toLocaleDateString("ja-JP", {
        timeZone: "Japan",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })} JST`
    );
    next();
  });

  Webhooks.get("/webhooks", (_, res) => {
    res.send("<h1></h1>");
  });

  Webhooks.post("/webhooks/deploy", function triggerDeploy(req, res) {
    const {
      sender: { login },
      ref,
    } = req.body;
    console.log(`Push by ${login} ⇀ ${ref.replace("refs/heads/", "")}`);
    if (ref.indexOf("prod") > -1 && login === githubUsername) {
      console.log(`🔩 Triggering spiders deploy...`);
      deploy();
      res.status(200).send("✅ Deploy has been triggered. ");
    } else res.status(500).send("😵 Deploy was not triggered. ");
  });

  Webhooks.post("/webhooks/nginx", function triggerNginxReload(req, res) {
    const {
      sender: { login },
      ref,
    } = req.body;
    console.log(`Push by ${login} ⇀ ${ref.replace("refs/heads/", "")}`);
    if (ref.indexOf("prod") > -1 && login === githubUsername) {
      console.log(`🤖 Triggering nginx reload...`);
      nginxReload();
      res.status(200).send("✅ Deploy has been triggered. ");
    } else res.status(500).send("😵 Deploy was not triggered. ");
  });

  const port = 9992;

  Webhooks.listen(port, () => {
    console.log(`⚙️  Deployment server listening @ port ${port}!`);
  });

  async function deploy() {
    console.log(`⛓  Running deploy script...`);
    await exec("/var/www/spiders/deploy.sh");
  }

  async function nginxReload() {
    console.log(`⛓  Running nginx reload script...`);
    await exec("/var/www/spiders/nginxReload.sh");
  }
}

export { launchWebhooksServer };
