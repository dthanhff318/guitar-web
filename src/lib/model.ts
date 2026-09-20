import * as THREE from "three";

export const MODEL_URL = "/models/guitar.glb";

/**
 * The Sketchfab source is authored in centimetres and sits far off-origin.
 * Re-centre it and scale the longest axis to 1 unit so camera distances,
 * lighting and camera distances can all be expressed as plain fractions.
 */
export function normaliseModel(object: THREE.Object3D): THREE.Object3D {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const longest = Math.max(size.x, size.y, size.z) || 1;
  const scale = 1 / longest;

  // Wrap rather than mutate the cached GLTF scene: useGLTF memoises by URL, so
  // mutating in place would compound the transform on every remount.
  const root = new THREE.Group();
  const inner = new THREE.Group();
  inner.position.copy(center).multiplyScalar(-1);
  inner.add(object);
  root.add(inner);
  root.scale.setScalar(scale);

  return root;
}

/** Enable shadows and sharpen the metal response across every mesh. */
export function dressMaterials(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.castShadow = true;
    child.receiveShadow = true;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    for (const material of materials) {
      if (material instanceof THREE.MeshStandardMaterial) {
        material.envMapIntensity = 1.15;
        // Sketchfab exports often come in fully rough; tighten it so the
        // studio rim lights actually read on the hardware.
        material.roughness = Math.min(material.roughness, 0.65);
      }
    }
  });
}
