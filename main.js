import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'

var mouseEventType = null
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

const pickPosition = {x: 0, y: 0};
clearPickPosition();
 
function getCanvasRelativePosition(event) {
  const canvas = renderer.domElement;
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * canvas.width  / rect.width,
    y: (event.clientY - rect.top ) * canvas.height / rect.height,
  };
}
 
function setPickPosition(event) {
  const pos = getCanvasRelativePosition(event);
  const canvas = renderer.domElement;
  mouseEventType = event.type
  pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
  pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
}

function selectedCube(event) {
  const pos = getCanvasRelativePosition(event);
  const canvas = renderer.domElement;
  mouseEventType = event.type;
  pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
  pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
}
 
function clearPickPosition() {
  // unlike the mouse which always has a position
  // if the user stops touching the screen we want
  // to stop picking. For now we just pick a value
  // unlikely to pick something
  pickPosition.x = -100000;
  pickPosition.y = -100000;
}
// Mobile Support
window.addEventListener('touchstart', (event) => {
  // prevent the window from scrolling
  event.preventDefault();
  setPickPosition(event.touches[0]);
}, {passive: false});
 
window.addEventListener('touchmove', (event) => {
  setPickPosition(event.touches[0]);
});
 
window.addEventListener('touchend', clearPickPosition);
window.addEventListener('click', selectedCube);
window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseover', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);

renderer.shadowMap.enabled = true
// const sceneMeshes = new THREE.Mesh[THREE.Mesh]

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)
camera.position.z = -250;
camera.position.y = window.innerHeight / 25

const pointLight = new THREE.PointLight(0xffffff)
const ambientLight = new THREE.AmbientLight(0xffffff)
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
gridHelper.position.y = -5


const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 250
controls.minDistance = 75
controls.enableDamping = true
controls.enablePan = false
controls.enableKeys = true
pointLight.position.set(20, 100, 3)
pointLight.intensity = 0.2;

scene.add(pointLight, ambientLight);

// scene.add(lightHelper, gridHelper)
var clickCount = 0

function addStar() {
  const geometry = new THREE.SphereGeometry(0.05);
  const material = new THREE.MeshStandardMaterial( {color: "white"})
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250));
  star.position.set(x, y, z)
  star.rotation.x += 0.1;
  star.layers.disable(1);
  scene.add(star)
}

Array(1000).fill().forEach(addStar)

const gradientTexture = new THREE.TextureLoader().load('gradient.jpg');
scene.background = gradientTexture
// Power BI Cube
var pbiTexture = new THREE.TextureLoader().load('Power BI.png');
const pbi = new THREE.Mesh(
  new THREE.BoxGeometry(25,25,25),
  new THREE.MeshStandardMaterial({map: pbiTexture}),
)
pbi.receiveShadow = false;
pbi.castShadow = true;
pbi.name = "Power BI Cube"
pbi.position.set(160, 150, 30)
scene.add(pbi)

// PowerShell Cube
var psTexture = new THREE.TextureLoader().load('PowerShell.png');
const ps = new THREE.Mesh(
  new THREE.BoxGeometry(25,25,25),
  new THREE.MeshStandardMaterial({map: psTexture, color: 0xffffff}),
)
ps.name = "PowerShell Cube"
ps.receiveShadow = false;
ps.castShadow = true;
ps.position.set(100, 150, 30)
scene.add(ps)

// C# Cube
var csTexture = new THREE.TextureLoader().load('CSharp.jpg');
const cs = new THREE.Mesh(
  new THREE.BoxGeometry(25,25,25),
  new THREE.MeshStandardMaterial({map: csTexture, color: 0xffffff}),
)
cs.name = "CSharp Cube"
cs.receiveShadow = false;
cs.castShadow = true;
cs.position.set(40, 150, 30)
scene.add(cs)

// C# Cube
var sqlTexture = new THREE.TextureLoader().load('SQL.png');
const sql = new THREE.Mesh(
  new THREE.BoxGeometry(25,25,25),
  new THREE.MeshStandardMaterial({map: sqlTexture, color: 0xffffff}),
)
sql.name = "SQL Cube"
sql.receiveShadow = false;
sql.castShadow = true;
sql.position.set(-80, 150, 30)
scene.add(sql)

// Profile Cube
var profTexture = new THREE.TextureLoader().load('Profile.png')
profTexture.anisotropy = 0
const prof = new THREE.Mesh(
  new THREE.BoxGeometry(25,25,25),
  new THREE.MeshStandardMaterial({map: profTexture, color: 0xffffff}),
)
prof.name = "Profile Cube"
prof.receiveShadow = false;
prof.castShadow = true;
prof.position.set(90, 80, 30)
// scene.add(prof)

// Python Cube
var pyTexture = new THREE.TextureLoader().load('Python.png');
const py = new THREE.Mesh(
  new THREE.BoxGeometry(25,25,25),
  new THREE.MeshStandardMaterial({map: pyTexture, color: 0xffffff}),
)
py.name = "CSharp Cube"
py.receiveShadow = false;
py.castShadow = true;
py.position.set(-20, 150, 30)
scene.add(py)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

var rotationEffect = 0.01;
var targetScale = {x: 2, y: 2, z: 2}
// PBI TWEEN
var targetPosition = {x: -window.innerWidth / 20, y: window.innerHeight / 25, z: pbi.position.z - 5}
var scaleTween = new TWEEN.Tween( pbi.scale )
.to( targetScale )
.easing( TWEEN.Easing.Quintic.In )
var moveTween = new TWEEN.Tween( pbi.position )
.to( targetPosition )
.easing( TWEEN.Easing.Cubic.InOut )
.delay(500)
// PS TWEEN
var targetPosition = {x: -window.innerWidth / 20, y: window.innerHeight / 25, z: ps.position.z - 5}
var scaleTweenPS = new TWEEN.Tween( ps.scale )
.to( targetScale )
.easing( TWEEN.Easing.Quintic.In )
var moveTweenPS = new TWEEN.Tween( ps.position )
.to( targetPosition )
.easing( TWEEN.Easing.Cubic.InOut )
.delay(500)

// Cube Drop Tweens
var targetPositionDrop = {x: pbi.position.x, y: 0, z: pbi.position.z}
var pbiDrop = new TWEEN.Tween( pbi.position )
.to( targetPositionDrop )
.easing(TWEEN.Easing.Elastic.InOut)
.delay(500)
// Cube Drop PS Tween
var targetPositionDropPS = {x: ps.position.x, y: 0, z: ps.position.z}
var psDrop = new TWEEN.Tween( ps.position )
.to( targetPositionDropPS )
.easing(TWEEN.Easing.Elastic.InOut)
.delay(1000)
// Cube Drop CS Tween
var targetPositionDropCS = {x: cs.position.x, y: 0, z: cs.position.z}
var csDrop = new TWEEN.Tween( cs.position )
.to( targetPositionDropCS )
.easing(TWEEN.Easing.Elastic.InOut)
.delay(1500)
// Cube Drop PY Tween
var targetPositionDropPY = {x: py.position.x, y: 0, z: py.position.z}
var pyDrop = new TWEEN.Tween( py.position )
.to( targetPositionDropPY )
.easing(TWEEN.Easing.Elastic.InOut)
.delay(2000)
// Cube Drop SQL Tween
var targetPositionDropSQL = {x: sql.position.x, y: 0, z: sql.position.z}
var sqlDrop = new TWEEN.Tween( sql.position )
.to( targetPositionDropSQL )
.easing(TWEEN.Easing.Elastic.InOut)
.delay(2500)

pbiDrop.start();
psDrop.start();
csDrop.start();
pyDrop.start();
sqlDrop.start();

class PickHelper {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
  }
  pick(normalizedPosition, scene, camera, time) {
    // restore the color if there is a picked object
    if (this.pickedObject) {
      this.pickedObject = undefined;
    }
    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(scene.children);
    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      this.pickedObject = intersectedObjects[0].object;
     //  console.log(this.pickedObject.name)
      if (this.pickedObject.name == "Power BI Cube")
      {
        
         if (pbi.scale.x == 1 && mouseEventType == "click"){
            pbi.rotation.x = 0
            pbi.rotation.y = 0
            pbi.rotation.z = 0
            console.log("Clicked Power BI Cube")
            scaleTween.start();
            moveTween.start();
            rotationEffect = 0.005
         }
      }
      if (this.pickedObject.name == "PowerShell Cube")
      {
         if (ps.scale.x == 1 && mouseEventType == "click"){
            controls.autoRotate = false;
            ps.rotation.x = 0
            ps.rotation.y = 0
            ps.rotation.z = 0
            console.log("Clicked PowerShell Cube")
            scaleTweenPS.start();
            moveTweenPS.start();
            rotationEffect = 0.005
         }
      }
    }
    else {

    }
  }
}

const pickHelper = new PickHelper();

function animate(time) {
  time *= 0.001; 
  window.requestAnimationFrame(animate);
  pickHelper.pick(pickPosition, scene, camera, time);
  pbi.rotation.y += rotationEffect
  ps.rotation.y += rotationEffect
  cs.rotation.y += rotationEffect
  py.rotation.y += rotationEffect
  sql.rotation.y += rotationEffect;
  TWEEN.update()
  controls.update();
  renderer.render(scene, camera);
}

animate()

