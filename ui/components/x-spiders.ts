import { themeService, themeMachine } from "../machines/themeMachine";

import {
  LitElement as X,
  html,
  property,
  customElement,
  css,
} from "lit-element";
import "./x-posts";
import "./x-navbar";

@customElement("x-spiders")
export class XSpiders extends X {
  @property() name: string = "World";
  @property() editorPost = {
    id: "",
    title: "",
    author: "",
    body: "",
    tags: "",
  };

  @property() theme = themeMachine.initialState.value;

  firstUpdated() {
    themeService
      .onTransition((state) => {
        this.theme = state.value;
      })
      .start();
  }

  static styles = [
    css`
      :host {
        width: 100%;
      }

      #spiders {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-radius: 2px;
        background: var(--background);
        color: #ddd;
        transition: ease-in-out 0.3s;
        height: fit-content;
        min-height: 96vh;
        overflow: none;
      }

      :root {
        --dev-pastel: rgba(255, 78, 181, 0.8);
        --spiders-gray: rgb(17, 20, 28);
        --spiders-mint: rgba(0, 255, 170, 0.8);
        --spiders-purple: rgb(83, 67, 255);
        --spiders-blue: rgb(0, 102, 255);
        --spiders-bone: rgb(235, 230, 230);
      }

      *::selection {
        background: var(--spiders-blue-light);
      }

      *::-moz-selection {
        background: var(--spiders-blue-light);
      }

      .dark {
        --background: var(--spiders-gray);
        --foreground: var(--spiders-bone);
        --accent: var(--spiders-purple);
        --accentGradient: var(--spiders-blue);
      }

      .light {
        --background: var(--spiders-bone);
        --foreground: var(--spiders-gray);
        --accent: var(--spiders-purple);
        --accentGradient: var(--spiders-blue);
      }

      :root:hover {
        --dev-pastel: none;
      }

      #content {
        width: 100%;
        margin-top: 3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      }
    `,
  ];

  render() {
    return html` <div post=${this.editorPost} id="spiders" class=${this.theme}>
      <x-navbar></x-navbar>
      <div id="content">
        <x-posts theme=${this.theme}></x-posts>
      </div>
    </div>`;
  }
}
