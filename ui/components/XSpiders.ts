import {
  LitElement as X,
  html,
  property,
  customElement,
  query,
} from "lit-element";
import { StateValue } from "xstate";
import * as THREE from "three";
// @ts-ignore
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
// @ts-ignore
import SidiousSkullModel from "./skull.obj";
import { XSpidersCSS } from "../css/XSpidersCSS";
import { UniversalCSS } from "../css/UniversalCSS";

@customElement("x-spiders")
class XSpiders extends X {
  @property() x: string = "";
  @query("#main") main;
  static styles = [UniversalCSS, XSpidersCSS];

  firstUpdated() {
    this.renderSkull();
  }

  renderRoute(route: StateValue) {
    switch (route) {
      case "/":
        return html`<x-main></x-main>`;
      default:
        return html``;
    }
  }

  renderSkull() {
    const windowSize = {
      w: window.innerWidth,
      h: window.innerHeight,
    };
    let mouse = { x: windowSize.w, y: windowSize.h };
    function onDocumentMouseMove(e: MouseEvent) {
      mouse = {
        x: (e.clientX - windowSize.w / 2) / 2,
        y: (e.clientY - windowSize.h / 2) / 2,
      };
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const loader = new OBJLoader();
    loader.load(
      SidiousSkullModel,

      // ONLOAD
      function load(obj) {
        // eslint-disable-next-line array-callback-return
        obj.children.map((child): void => {
          console.log(child);

          // eslint-disable-next-line no-param-reassign
          (child as THREE.Mesh).material = new THREE.MeshPhongMaterial({
            color: 0x000000,
          });
        });
        scene.add(obj);
      },

      // ONPROGRESS
      function onProgress(xhr) {
        // eslint-disable-next-line prefer-template
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },

      // ONERROR
      function onError(err) {
        console.error(`ERROR LOADING ${SidiousSkullModel} 🚨`, err);
      }
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: false,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xff1d53, 1);
    this.main.appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0x432342, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    camera.position.z = 5;

    const light1 = new THREE.PointLight(0x4934eb, 2.5);
    scene.add(light1);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      // look @ mouse
      window.removeEventListener("mousemove", onDocumentMouseMove);
      window.addEventListener("mousemove", onDocumentMouseMove);
      camera.position.y = (mouse.y - camera.position.z) * 0.06;
      camera.position.x = (-mouse.x - camera.position.z) * 0.04;
      camera.lookAt(scene.position);
    }
    animate();
  }

  render() {
    return html`<main id="main"><h1>JUST DO SH*T</h1></main>`;
  }
}

export { XSpiders };
