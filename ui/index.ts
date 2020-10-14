import Spiders from "./Spiders/Spiders";
import "./styles.css";
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "prismjs/components/prism-typescript";
const env = process.env.NODE_ENV;

Prism.highlightAll();

const SpidersUI = Spiders();

document.body.innerHTML = SpidersUI;
