import express from "express";
const Deploy = express();
import spawn from "await-spawn";
const githubUsername = "sidiousvic";

Deploy.use(express.json());

async function launchDeployServer() {
  Deploy.use(function timelog(_, __, next) {
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

  Deploy.post("/deploy", function triggerDeploy(req, res) {
    const {
      sender: { login },
      ref,
    } = req.body;
    console.log(`Push from ${login} ⇀  ${ref.replace("refs/heads/", "")}`);
    if (ref.indexOf("prod") > -1 && login === githubUsername) {
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
    console.log(`⛓  Running deploy script...`);
    const deployCommands = [
      "npm run deploy",
      "scp spiders.nginx  /etc/nginx/sites-available/spiders.conf",
      "nginx -s reload",
    ];
    for (const command of deployCommands) {
      try {
        const bl = await spawn(command);
        console.log(bl.toString());
      } catch (e) {
        console.error(e.stderr.toString());
      }
    }
  }
}

export { launchDeployServer };
