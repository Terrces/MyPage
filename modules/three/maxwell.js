import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

let container = document.querySelector(".three");
let width = container.clientWidth || window.innerWidth;
let height = container.clientHeight || window.innerHeight;    

const fov = 45;
const aspect = width / height;
const near = 0.1;
const far = 100;

const loader = new FBXLoader();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const scene = new THREE.Scene();
const light = new THREE.AmbientLight( new THREE.Color("rgb(255, 255, 255)") );
const directionalLight = new THREE.DirectionalLight( new THREE.Color("rgb(255, 255, 255)"), 2 );

function loadTexture(path){
    let textureloader = new THREE.TextureLoader();
    let texture = textureloader.load( path );
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

window.addEventListener("resize", () =>{
    width = container.clientWidth || window.innerWidth;
    height = container.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
})

camera.position.set(0, 0, 0);

scene.background = new THREE.Texture();
scene.fog = new THREE.Fog( new THREE.Color("rgb(255, 255, 255)"), 1, 150 );


const materials = [
    new THREE.MeshStandardMaterial({color:new THREE.Color("rgb(255,255,255)"), map:loadTexture('Files/dingus_nowhiskers.jpg'),fog:true}),
    new THREE.MeshStandardMaterial({color:new THREE.Color("rgb(255,255,255)"), map:loadTexture('Files/dingus_whiskers.tga.png'),fog:true}),
]

const object = await loader.loadAsync( 'models/Maxwell.fbx' );

object.position.x = 8.5;
object.position.y = -4.8;
object.position.z = -14;
object.scale.set(0.001, 0.001, 0.001);
object.traverse((child) => {
    if (!child.isMesh) return;
    if (child.material.length) {
        child.material[0] = materials[0];
        child.material[1] = materials[1];
        child.material.needsUpdate = true;
    }
});
scene.add( directionalLight );
scene.add( light );
scene.add( object );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
container.appendChild(renderer.domElement);

const amplitude = 0.02;
const speed = 4;
object.rotation.y = -0.6;

function animate(time) {
    
    const t = time * 0.001;
   
    object.position.y = object.position.y + Math.sin(t * speed) * amplitude;

    object.rotation.y = -0.001 * time;
    renderer.render(scene, camera);
}