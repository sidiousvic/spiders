import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import { spidersStyles } from "./../spiderStyles";
import { spidersCodeStyles } from "./../spidersCodeStyles";
import { getTimeOfDayTheme, getHumanReadableDate } from "../utils";
import { LitElement as X, html, property, customElement } from "lit-element";

@customElement("x-spiders")
export default class Spiders extends X {
  @property() name = "World";
  @property() timeOfDayTheme = getTimeOfDayTheme();
  @property() theme = this.timeOfDayTheme;
  @property() lightSwitch = this.theme === "dark" ? "🌒" : "🌔";

  toggleThemes() {
    this.lightSwitch = this.lightSwitch === "🌒" ? "🌔" : "🌒";
    const themes = ["light", "dark"];
    let currThemeIdx = themes.indexOf(this.theme);
    const nextThemeIdx = ++currThemeIdx % themes.length;
    this.theme = themes[nextThemeIdx];
  }

  static styles = [spidersStyles, spidersCodeStyles];

  firstUpdated() {
    const code = this.shadowRoot?.querySelector("#code");
    (code as HTMLElement).innerHTML = Prism.highlight(
      (code as HTMLElement).innerText,
      Prism.languages.typescript,
      "typescript"
    );
  }

  render() {
    return html` <div id="theme" class=${this.theme}>
      <span id="light-switch"> ${this.lightSwitch} </span>
      <nav>
        <div id="title">
          <h1>Spiders 🕸</h1>
          <h2>A web engineering log.</h2>
        </div>
        <div id="navlinks">⌰ ⌬ ↯</div>
      </nav>
      <div id="content">
        <div id="posts">
          <div class="post">
            <h1 class="post-title">Launching your Apollo Server</h1>
            <h2 class="post-subtitle">by Vic @ ${getHumanReadableDate()}</h2>
            <div class="post-body">
              <p>
                Sometimes it's useful to initialize processes in your pipeline
                by wrapping them in a function. In here, we're connecting to a
                database, and then initializing a server with Apollo. We also
                compute the context for resolvers depending on whether the user
                is authenticated or not; that logic, however, is abstracted
                somewhere else. I enjoy the declarative style of calling a{" "}
                <code>launchSpidersServer</code> function in the end, akin to
                turning the key in your car.
              </p>
              <pre class="language-typescript">
          <code id="code">
${`

launchSSRServer();

async function launchSpidersServer(
database: SpidersDatabase,
{ typeDefs, resolvers, auth, utils: { computeContext } }: GraphQL.Layer) {

await database.connect();

const server = new ApolloServer({
typeDefs,
resolvers: resolvers,
async context({ req }) {
  return await computeContext(req, database, auth);
},
});

server.listen({ port: 9991 }).then(() => {
console.log(\`🚀 Apollo Server launched @ \${graphqlServerUri}\`);
});
}

launchSpidersServer(new SpidersDatabase(), graphqlLayer);
`}
          </code>
        </pre>
              <p>
                I think of my internal services as uniform APIs. With
                Typescript, the tools to design interfaces that communicate
                seamlessly with each other are there. For each layer of my
                stack—from the database, to the middle end GraphQL (including
                authentication middleware) we create API layers which expose
                methods and helpers related in funcionality with one another.
              </p>
            </div>
            <br />
            <sub class="tags">#pancakes #yeahboy</sub>
          </div>
        </div>
      </div>
    </div>`;
  }
}
