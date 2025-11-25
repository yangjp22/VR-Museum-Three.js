// 目标：初始化 three.js 基础环境
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";


export let scene, camera, renderer, css3dRenderer, controls;

(function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
})();


(function createControls() {
    controls = new OrbitControls(camera, renderer.domElement);
})();

(function createAxesHelper() {
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
})();

(function resizeRender() {
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    })
})();

(function create3dRenderer() {
    css3dRenderer = new CSS3DRenderer();
    css3dRenderer.setSize(window.innerWidth, window.innerHeight);
    css3dRenderer.domElement.style.position = "fixed";
    css3dRenderer.domElement.style.left = 0;
    css3dRenderer.domElement.style.top = 0;
    css3dRenderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(css3dRenderer.domElement);
})();


(function renderLoop() {
    renderer.render(scene, camera);
    controls.update();
    css3dRenderer.render(scene, camera);
    requestAnimationFrame(renderLoop);
})();
