"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { TOUCH } from "three";
import {
  AdaptiveDpr,
  ContactShadows,
  Lightformer,
  Environment,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import { GuitarModel } from "./GuitarModel";
import { ScrollCamera } from "./ScrollCamera";

function SceneLoader() {
  const { progress, active } = useProgress();
  if (!active && progress >= 100) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center bg-void/85 backdrop-blur-sm">
      <div className="w-56 text-center">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-ember-400">
          Đang tải
        </p>
        <div className="mt-3 h-px w-full overflow-hidden bg-smoke">
          <div
            className="h-full bg-gradient-to-r from-ember-700 to-ember-400 transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 font-mono text-[0.7rem] text-muted">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}

/**
 * OrbitControls forces `touch-action: none` on the canvas, which blocks touch
 * scrolling at the CSS layer regardless of the `touches` mapping. Restore
 * vertical panning so one finger still scrolls the page.
 */
function RestoreTouchScroll() {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const el = gl.domElement;
    const apply = () => {
      if (el.style.touchAction !== "pan-y") el.style.touchAction = "pan-y";
    };

    apply();

    // OrbitControls re-asserts `touch-action: none` whenever it reconnects,
    // so watch the attribute rather than setting it once on mount.
    const observer = new MutationObserver(apply);
    observer.observe(el, { attributes: true, attributeFilter: ["style"] });

    return () => observer.disconnect();
  }, [gl]);

  return null;
}

type GuitarSceneProps = {
  /** Hero scroll progress in [0, 1], updated imperatively by the parent. */
  progressRef: React.RefObject<number>;
};

export function GuitarScene({ progressRef }: GuitarSceneProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Any manual orbit hands control to the user until they release.
  const handleStart = useCallback(() => setIsDragging(true), []);
  const handleEnd = useCallback(() => setIsDragging(false), []);

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, -0.15, 3.1], fov: 35, near: 0.05, far: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#dfe9e4"]} />
        <fog attach="fog" args={["#dfe9e4", 4, 12]} />

        {/* Key light with a warm ember bias, plus a cool rim for separation. */}
        <spotLight
          position={[2.5, 3.5, 3]}
          angle={0.6}
          penumbra={1}
          intensity={55}
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
        />
        <directionalLight position={[-3, 2, 2]} intensity={1.6} color="#e8f4ef" />
        <ambientLight intensity={1.1} />

        {/* Sit the instrument low in frame; the headline occupies the top. */}
        <group position={[0, -0.22, 0]}>
        <Suspense fallback={null}>
          {/* Self-contained studio rig: no CDN HDRI, so the scene never waits
              on (or fails because of) an external asset. */}
          <Environment resolution={256} frames={1}>
            <Lightformer
              form="rect"
              intensity={3}
              color="#ffffff"
              position={[2, 3, 3]}
              scale={[6, 6, 1]}
              target={[0, 0, 0]}
            />
            <Lightformer
              form="rect"
              intensity={2}
              color="#eaf5f0"
              position={[-4, 1, 1]}
              scale={[6, 6, 1]}
              target={[0, 0, 0]}
            />
            <Lightformer
              form="rect"
              intensity={1.2}
              color="#ffffff"
              position={[0, -3, 2]}
              scale={[8, 4, 1]}
              target={[0, 0, 0]}
            />
          </Environment>
          <GuitarModel sway={!isDragging} />

          <ContactShadows
            position={[0, -0.45, 0]}
            opacity={0.32}
            scale={5}
            blur={3.2}
            far={1.6}
            color="#1d2b25"
          />
        </Suspense>
        </group>

        <ScrollCamera progressRef={progressRef} enabled={!isDragging} />

        <OrbitControls
          makeDefault
          target={[0, -0.22, 0]}
          enablePan={false}
          // Wheel events must reach the page: the hero scroll drives the
          // camera, so trapping them here would block scrolling entirely.
          enableZoom={false}
          minPolarAngle={Math.PI * 0.12}
          maxPolarAngle={Math.PI * 0.88}
          rotateSpeed={0.6}
          dampingFactor={0.08}
          // One finger scrolls the page; two fingers rotate the instrument.
          touches={{ ONE: undefined, TWO: TOUCH.DOLLY_ROTATE }}
          onStart={handleStart}
          onEnd={handleEnd}
        />

        <RestoreTouchScroll />

        <AdaptiveDpr pixelated />
      </Canvas>

      <SceneLoader />
    </div>
  );
}
