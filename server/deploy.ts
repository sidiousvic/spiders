import express from "express";
const Deploy = express();
import u from "util";
const exec = u.promisify(require("child_process").exec);
const githubUsername = "sidiousvic";

Deploy.use(express.json());

async function launchDeployServer() {
  Deploy.use(function timelog(req, _, next) {
    const { path: reqUrl } = req;
    const {
      sender,
      ref: [branch],
    } = req.body;
    console.log(
      "Deploy webhook @",
      reqUrl,
      `On push to ${branch} by ${sender}`,
      new Date().toLocaleDateString("ja-JP", {
        timeZone: "Japan",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
    next();
  });

  Deploy.post("/deploy", function triggerDeploy(req, res) {
    const { sender, ref } = req.body;
    if (ref.indexOf("prod") > -1 && sender.login === githubUsername) {
      console.log(`🔩 Triggering spiders deploy...`);
      deploy();
      res.status(200).send("✅ Deploy has been triggered. ");
    } else res.status(500).send("😵 Deploy was not triggered. ");
  });

  const port = 9992;

  Deploy.listen(port, () => {
    console.log(`⚙️  Deployment server listening @ port ${port}!`);
  });

  async function deploy() {
    const deployScript = "sudo -u sidiousvic ./deploy.sh";
    await exec(deployScript);
  }
}

export { launchDeployServer };
