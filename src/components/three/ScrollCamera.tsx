"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Camera keyframes the hero scroll moves through.
 * `at` is the scroll progress (0 = top of hero, 1 = hero fully scrolled).
 */
/** The model sits low in GuitarScene; orbit and look-at follow it. */
const FOCUS = new THREE.Vector3(0, -0.22, 0);

const KEYFRAMES: { at: number; position: [number, number, number] }[] = [
  { at: 0, position: [0, -0.15, 3.1] },
  { at: 0.5, position: [1.5, 0.5, 2.6] },
  { at: 1, position: [0.4, -0.5, 2.2] },
];

type ScrollCameraProps = {
  /** Live scroll progress in [0, 1]; read from a ref to avoid re-rendering. */
  progressRef: React.RefObject<number>;
  /** Suspended while the user is dragging, so orbit input wins. */
  enabled: boolean;
};

export function ScrollCamera({ progressRef, enabled }: ScrollCameraProps) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(...KEYFRAMES[0].position));

  useFrame((_, delta) => {
    if (!enabled) return;

    const p = THREE.MathUtils.clamp(progressRef.current ?? 0, 0, 1);

    // Find the segment this progress falls in and interpolate within it.
    let from = KEYFRAMES[0];
    let to = KEYFRAMES[KEYFRAMES.length - 1];
    for (let i = 0; i < KEYFRAMES.length - 1; i += 1) {
      if (p >= KEYFRAMES[i].at && p <= KEYFRAMES[i + 1].at) {
        from = KEYFRAMES[i];
        to = KEYFRAMES[i + 1];
        break;
      }
    }
    const span = to.at - from.at || 1;
    const local = (p - from.at) / span;

    target.current.set(
      THREE.MathUtils.lerp(from.position[0], to.position[0], local),
      THREE.MathUtils.lerp(from.position[1], to.position[1], local),
      THREE.MathUtils.lerp(from.position[2], to.position[2], local),
    );

    // Frame-rate independent smoothing towards the scroll target.
    const alpha = 1 - Math.pow(0.0015, delta);
    camera.position.lerp(target.current, alpha);
    camera.lookAt(FOCUS);
  });

  return null;
}
