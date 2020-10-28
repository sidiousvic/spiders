import express from "express";
const Deploy = express();
import u from "util";
const exec = u.promisify(require("child_process").exec);
const githubUsername = "sidiousvic";

Deploy.use(express.json());

async function launchDeployServer() {
  Deploy.use(function timelog(req, _, next) {
    const {
      sender: { login },
      ref,
    } = req.body;
    console.log(
      `Deploy webhook @ \n${login} ⇀  ${ref.replace("refs/heads/", "")}`,
      `\n${new Date().toLocaleDateString("ja-JP", {
        timeZone: "Japan",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}`
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
    console.log(`⛓ Running deploy script...`);
    const { stdout, stderr } = await exec("/var/www/spiders/deploy.sh");
    if (stderr) console.error(`Error during deploy script: ${stderr}`);
    console.log(stdout);
  }
}

export { launchDeployServer };
