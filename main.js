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
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Hacer el fondo del canvas transparente
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Habilitar sombras
document.body.appendChild(renderer.domElement);

// Cargar la textura
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("../texture.jpg"); // Cambia esta ruta a la ubicación de tu textura

// Geometría y material del cubo
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  // Cambiar a MeshStandardMaterial para sombras
  map: texture,
  side: THREE.DoubleSide,
});
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true; // El cubo proyecta sombra
cube.position.y = 0.1;
scene.add(cube);

// Añadir una fuente de luz
const light = new THREE.PointLight(0xffffff, 1.5, 100);
light.position.set(5, 5, 5);
light.castShadow = true; // La luz puede proyectar sombras
scene.add(light);

// Añadir un plano para recibir sombras
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 }); // Material para recibir sombra
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.8;
plane.receiveShadow = true; // El plano recibe sombras
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

  // Convertir la posición del ratón a coordenadas del espacio 3D
  const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);

  // Calcular la dirección desde la cámara hacia el vector del ratón
  const direction = vector.sub(camera.position).normalize();

  // Crear un punto objetivo en la dirección del ratón
  const targetPosition = camera.position.clone().add(direction);

  // Orientar la cara del cubo para que mire hacia el objetivo
  targetQuaternion.setFromRotationMatrix(
    new THREE.Matrix4().lookAt(cube.position, targetPosition, camera.up)
  );

  // Interpolar la rotación del cubo
  cube.quaternion.slerp(targetQuaternion, lerpFactor);

  renderer.render(scene, camera);
}

animate();
