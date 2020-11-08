import express from "express";
import u from "util";
import { exec } from "child_process";

const execAsync = u.promisify(exec);
const Webhooks = express();

Webhooks.use(express.json());

async function WebhooksServer({ uri, port, githubUsername }) {
  async function deploy() {
    console.log("⛓  Running deploy script...");
    await execAsync("/var/www/spiders/deploy.sh");
  }

  async function nginxReload() {
    console.log("⛓  Running nginx reload script...");
    await execAsync("/var/www/spiders/nginxReload.sh");
  }

  Webhooks.use(function timelog(_, __, next) {
    console.log(
      `🎣 Deploy webhook @ ${new Date().toLocaleDateString("ja-JP", {
        timeZone: "Japan",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })} JST`
    );
    next();
  });

  Webhooks.get("/webhooks", (_, res) => {
    res.send("Spiders webhooks server is running! 🕷");
  });

  Webhooks.post("/webhooks/deploy", function triggerDeploy(req, res) {
    const {
      sender: { signin },
      ref,
    } = req.body;
    console.log(`Push by ${signin} ⇀ ${ref.replace("refs/heads/", "")}`);
    if (ref.indexOf("prod") > -1 && signin === githubUsername) {
      console.log("🔩 Triggering spiders deploy...");
      deploy();
      res.status(200).send("✅ Deploy has been triggered. ");
    } else res.status(500).send("😵 Deploy was not triggered. ");
  });

  Webhooks.post("/webhooks/nginx", function triggerNginxReload(req, res) {
    const {
      sender: { signin },
      ref,
    } = req.body;
    console.log(`Push by ${signin} ⇀ ${ref.replace("refs/heads/", "")}`);
    if (ref.indexOf("prod") > -1 && signin === githubUsername) {
      console.log("🤖 Triggering nginx reload...");
      nginxReload();
      res.status(200).send("✅ Deploy has been triggered. ");
    } else res.status(500).send("😵 Deploy was not triggered. ");
  });

  Webhooks.listen(port, () => {
    console.log(`⚙️  Webhooks server live @ ${uri}`);
  });
}

export { WebhooksServer };
