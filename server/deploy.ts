import express from "express";
const Deploy = express();
import u from "util";
const exec = u.promisify(require("child_process").exec);
const githubUsername = "sidiousvic";

Deploy.use(express.json());

async function launchDeployServer() {
  Deploy.use(function timelog(req, _, next) {
    const { path: reqUrl } = req;
    console.log("Deploy webhook @", reqUrl, new Date().toLocaleString());
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
    const deployScript = "sh ./deploy.sh";
    await exec(deployScript);
  }
}

export { launchDeployServer };
