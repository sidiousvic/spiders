import { css } from "lit-element";

export const spidersCodeStyles = css`
  /* Spiders Code */
  /* by @sidiousvic */

  .dark {
    --code-foreground: var(--spiders-bone);
    --code-background: var(--spiders-gray-light);
    --border: var(--spiders-blue-light);
    --keyword: var(--spiders-purple-light);
    --function: var(--spiders-blue-light);
    --string: var(--spiders-mint-light);
  }

  .light {
    --code-foreground: var(--spiders-gray);
    --code-background: var(--spiders-bone-dark);
    --border: var(--spiders-blue);
    --keyword: var(--spiders-purple);
    --function: var(--spiders-blue-dark);
    --string: var(--spiders-pastel-dark);
  }

  pre,
  code {
    font-family: Dank Mono;
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
    white-space: pre;
    white-space: pre-wrap;
    word-wrap: normal;
    font-family: Dank Mono;
    font-size: 14px;
    color: var(--code-foreground);
    text-shadow: none;
    cursor: crosshair;
  }

  pre > code[class*="language-"] {
    font-size: 1em;
  }

  pre[class*="language-"],
  :not(pre) > code[class*="language-"] {
    background: var(--code-background);
  }

  pre[class*="language-"] {
    margin: 20px;
    padding: 30px;
    border-radius: 8px;
    border: 1px dashed var(--border);
    overflow: auto;
    position: relative;
  }

  pre[class*="language-"] code {
    white-space: pre;
    display: block;
  }

  :not(pre) > code[class*="language-"] {
    padding: 0.15em 0.2em 0.05em;
    border-radius: 0.3em;
    border: 0.13em solid #7a6652;
    box-shadow: 1px 1px 0.3em -0.1em #000 inset;
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
    color: #bebec5;
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
