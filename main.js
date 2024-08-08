// Escena
const scene = new THREE.Scene();

// Cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

// Renderizador
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Cargar la textura
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("../texture.jpg");
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.position.y = 0.1;
scene.add(cube);

// Añadir una fuente de luz
const light = new THREE.PointLight(0xffffff, 1.5, 100);
light.position.set(5, 5, 5);
light.castShadow = true;
scene.add(light);

// Añadir un plano para recibir sombras
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.8;
plane.receiveShadow = true;
scene.add(plane);

// Vector para la posición del ratón
const mouse = new THREE.Vector2();
const targetQuaternion = new THREE.Quaternion();

// Función para actualizar la posición del ratón
function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Evento de movimiento del ratón
window.addEventListener("mousemove", onMouseMove, false);

const lerpFactor = 0.1;
function animate() {
  requestAnimationFrame(animate);

  const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);

  const direction = vector.sub(camera.position).normalize();

  const targetPosition = camera.position.clone().add(direction);

  targetQuaternion.setFromRotationMatrix(
    new THREE.Matrix4().lookAt(cube.position, targetPosition, camera.up)
  );

  cube.quaternion.slerp(targetQuaternion, lerpFactor);

  renderer.render(scene, camera);
}

animate();
