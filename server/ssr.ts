import Spiders from "../ui/Spiders/Spiders";
import express from "express";

const SpidersUI = Spiders();

function launchSSRServer() {
  const app = express();
  app.get("/", async (_, res) => {
    const serverRenderedHTML = html();
    res.send(`<!DOCTYPE html>${serverRenderedHTML}`);
  });

  app.listen(9992, () => {
    console.log(`🧪 SSR Spiders is now running @ 9992!`);
  });

  function html() {
    return `<html lang="en">
          <head>
            <title>Spiders, a Web Engineering Log.</title>
            <meta
              name="description"
              content="A weblog for web engineers. Web weaving (programming), www infrastructure, application architecture, and design with your healthy dose of aliens, pizza and punk rock."
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="styles.css" />
          </head>
          <body>
            <div id="spiders">
              ${SpidersUI}
            </div>
            <script defer src="ui.js"></script>
          </body>
        </html>`;
  }
}

export default launchSSRServer;
