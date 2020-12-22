import { css } from "lit-element";

const CodeCSS = css`
  [data-theme="dark"] {
    --keyword: var(--accent-2);
    --function: var(--accent);
    --string: var(--accent-2);
  }
  [data-theme="light"] {
    --keyword: var(--accent-2);
    --function: var(--accent);
    --string: var(--accent-2);
  }
  code {
    font-family: Wired Mono, monospace;
    color: var(--accent-2);
  }
  pre > code {
    font-family: Wired Mono, monospace;
    font-weight: 100;
    border-radius: 0px;
    font-size: 1rem;
  }
  code[class*="language-"],
  pre[class*="language-"] {
    -moz-tab-size: 2;
    -o-tab-size: 2;
    tab-size: 2;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    white-space: pre-wrap;
    word-wrap: normal;
    color: var(--foreground-2);
    text-shadow: none;
    cursor: crosshair;
  }
  pre > code[class*="language-"] {
  }
  pre[class*="language-"],
  :not(pre) > code[class*="language-"] {
    background: var(--background-2);
  }
  :not(pre) > code[class*="language-"] {
    background: none;
  }
  pre[class*="language-"] {
    padding: 1rem 2rem;
    border-radius: 0px;
    border: 0px dashed var(--border);
    overflow: auto;
    position: relative;
    overflow: scroll;
    box-shadow: 2px 2px blur;
  }
  pre[class*="language-"] code {
    white-space: pre;
    display: block;
  }
  .token.namespace {
    opacity: 0.7;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #272829;
  }
  .token.operator,
  .token.boolean,
  .token.number {
    color: var(--keyword);
  }
  .token.attr-name,
  .token.string {
    color: var(--string);
  }
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: var(--string);
  }
  .token.selector,
  .token.inserted,
  .token.function {
    color: var(--function);
  }
  .token.atrule,
  .token.attr-value,
  .token.keyword,
  .token.important,
  .token.deleted {
    color: var(--keyword);
  }
  .token.regex,
  .token.statement {
    color: #76d9e6;
  }
  .token.placeholder,
  .token.variable,
  .token.class-name {
    color: var(--function);
  }
  .token.important,
  .token.statement,
  .token.bold {
    font-weight: bold;
  }
  .token.punctuation {
    color: var(--foreground-2);
  }
  .token.entity {
    cursor: help;
  }
  .token.italic {
    font-style: italic;
  }
  code.language-markup {
    color: #f9f9f9;
  }
  code.language-markup .token.tag {
    color: #ef3b7d;
  }
  code.language-markup .token.attr-name {
    color: #ff38f5;
  }
  code.language-markup .token.attr-value {
    color: #ff38f5;
  }
  code.language-markup .token.style,
  code.language-markup .token.script {
    color: #76d9e6;
  }
  code.language-markup .token.script .token.keyword {
    color: #76d9e6;
  }
  /* Line highlight plugin */
  pre[class*="language-"][data-line] {
    position: relative;
    padding: 1em 0 1em 3em;
  }
  pre[data-line] .line-highlight {
    position: absolute;
    left: 0;
    right: 0;
    padding: 0;
    margin-top: 1em;
    background: rgba(255, 255, 255, 0.08);
    pointer-events: none;
    line-height: inherit;
    white-space: pre;
  }
  pre[data-line] .line-highlight:before,
  pre[data-line] .line-highlight[data-end]:after {
    content: attr(data-start);
    position: absolute;
    top: 0.4em;
    left: 0.6em;
    min-width: 1em;
    padding: 0.2em 0.5em;
    background-color: rgba(255, 255, 255, 0.4);
    color: black;
    font: bold 65%/1 sans-serif;
    height: 1em;
    line-height: 1em;
    text-align: center;
    border-radius: 999px;
    text-shadow: none;
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
  }
  pre[data-line] .line-highlight[data-end]:after {
    content: attr(data-end);
    top: auto;
    bottom: 0.4em;
  }
`;

export { CodeCSS };
