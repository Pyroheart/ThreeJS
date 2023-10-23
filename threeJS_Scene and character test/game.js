// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
scene.add(camera);

// Create the renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add a ground plane to the scene
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Add a character to the scene
const characterGeometry = new THREE.BoxGeometry(1, 2, 1);
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const character = new THREE.Mesh(characterGeometry, characterMaterial);
character.position.set(0, 1, 0);
scene.add(character);

// Move the character using the Z Q S D keys
const keyboard = {};
document.addEventListener('keydown', event => {
  keyboard[event.code] = true;
});
document.addEventListener('keyup', event => {
  keyboard[event.code] = false;
});

// Add a variable to store the character's rotation
let rotation = 0;

function animate() {
  requestAnimationFrame(animate);

  // Move the character
  if (keyboard['KeyS']) character.position.z -= 0.1;
  if (keyboard['KeyW']) character.position.z += 0.1;
  if (keyboard['KeyA']) {
    character.position.x -= 0.1;
    rotation += 0.1; // rotate the character to the left
  }
  if (keyboard['KeyD']) {
    character.position.x += 0.1;
    rotation -= 0.1; // rotate the character to the right
  }

  // Update the camera position to follow the character
  const offset = new THREE.Vector3(0, 2, -5);
  const position = character.position.clone().add(offset);
  camera.position.copy(position);

  // Set the character's rotation based on the rotation variable
  character.rotation.y = rotation;

  // Set the camera to look at the character
  camera.lookAt(character.position);

  renderer.render(scene, camera);
}
animate();
