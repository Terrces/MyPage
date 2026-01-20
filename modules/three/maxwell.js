import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

let container = document.querySelector(".three");
let width = container.clientWidth || window.innerWidth;
let height = container.clientHeight || window.innerHeight;    

//animations 
const modelAnimationsAmplitude = 0.02;
const animationsSpeed = 4;

const fov = 45;
const aspect = 2;
const near = 0.1;
const far = 100;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// models
const loader = new FBXLoader();
// light
const light = new THREE.AmbientLight( new THREE.Color("rgb(255, 255, 255)") );
const directionalLight = new THREE.DirectionalLight( new THREE.Color("rgb(255, 255, 255)"), 2 );

function windowResized(){
    width = container.clientWidth || container.innerWidth;
    height = container.clientHeight || container.innerHeight;
    renderer.setSize(width, height);
}

window.addEventListener("resize", () => windowResized())

function loadTexture(path){
    let textureloader = new THREE.TextureLoader();
    let texture = textureloader.load( path );
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

scene.background = new THREE.Texture();

camera.position.set(0, 0, 0);

const maxwellObject = await loader.loadAsync( 'models/Maxwell.fbx' );

const maxwellMaterials = [
    new THREE.MeshStandardMaterial({color:new THREE.Color("rgb(255,255,255)"), map:loadTexture('Files/dingus_nowhiskers.jpg'),fog:true}),
    new THREE.MeshStandardMaterial({color:new THREE.Color("rgb(255,255,255)"), map:loadTexture('Files/dingus_whiskers.tga.png'),fog:true}),
]
maxwellObject.position.x = 8;
maxwellObject.position.y = -4.5;
maxwellObject.position.z = -14;
maxwellObject.scale.set(0.001, 0.001, 0.001);
maxwellObject.traverse((child) => {
    if (!child.isMesh) return;
    if (child.material.length) {
        child.material[0] = maxwellMaterials[0];
        child.material[1] = maxwellMaterials[1];
        child.material.needsUpdate = true;
    }
});

scene.add( directionalLight, light, maxwellObject );

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
container.appendChild(renderer.domElement);

function animate(time) {
    
    const t = time * 0.001;
   
    maxwellObject.position.y = maxwellObject.position.y + Math.sin(t * animationsSpeed) * modelAnimationsAmplitude;

    maxwellObject.rotation.y = -0.001 * time;
    renderer.render(scene, camera);
}