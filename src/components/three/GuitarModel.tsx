"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { MODEL_URL, dressMaterials, normaliseModel } from "@/lib/model";

/**
 * Resting pose: the instrument lies near-horizontal with a slight upward rake,
 * body to the left and headstock to the right.
 */
const REST_TILT = Math.PI * 0.42;

/** Pitch about X that rakes the soundboard toward the camera. */
const FACE_PITCH = THREE.MathUtils.degToRad(-40);

/** Yaw about Y that turns the face round rather than leaving it edge-on. */
const FACE_YAW = THREE.MathUtils.degToRad(-70);

/** Peak sway either side of the resting pose (~7°). */
const SWAY_AMPLITUDE = THREE.MathUtils.degToRad(7);

/** One full left-right-left cycle every ~6s. */
const SWAY_PERIOD = 6;

type GuitarModelProps = {
  /** Gentle idle sway; suspended while the user is dragging. */
  sway?: boolean;
};

export function GuitarModel({ sway = true }: GuitarModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const swayRef = useRef<THREE.Group>(null);

  // CSS `prefers-reduced-motion` cannot reach WebGL, so honour it here too.
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setReduceMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const normalised = useMemo(() => {
    const clone = scene.clone(true);
    dressMaterials(clone);
    return normaliseModel(clone);
  }, [scene]);

  useFrame((state) => {
    const group = swayRef.current;
    if (!group) return;

    // Ease the sway out rather than snapping to zero when the user grabs it.
    const target =
      sway && !reduceMotion
        ? Math.sin((state.clock.elapsedTime / SWAY_PERIOD) * Math.PI * 2) *
          SWAY_AMPLITUDE
        : 0;

    // Rock around Z so the instrument tips like a pendulum, rather than
    // turning away from the camera as a Y-axis spin would.
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, target, 0.06);
  });

  return (
    /* Outer group owns the fixed resting pose; the inner one sways, so the
       idle motion never fights the tilt. */
    <group rotation={[0, 0, REST_TILT]}>
      <group ref={swayRef}>
        {/* Pitch back then yaw round so the soundboard presents to the
            camera rather than edge-on. */}
        <group rotation={[FACE_PITCH, FACE_YAW, 0]}>
          <primitive object={normalised} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
