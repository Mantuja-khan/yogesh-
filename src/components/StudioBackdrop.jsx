import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function SceneRig({ pointer }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.current.x * 0.6, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.current.y * 0.4, 0.04);
  });
  return null;
}

export default function StudioBackdrop() {
  const pointer = usePointer();

  return (
    <Canvas
      className="page-3d-canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <SceneRig pointer={pointer} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} color="#fff6e5" />
      <pointLight position={[2.5, 1.5, 2.5]} intensity={25} color="#ff6b3d" distance={12} />
      <pointLight position={[-2.5, -1, 1.5]} intensity={20} color="#4fc3f7" distance={12} />
      <pointLight position={[0, 2, 1]} intensity={16} color="#f2c14e" distance={10} />

      {/* Atmospheric depth particles without any circular rings or orb sculptures */}
      <Sparkles
        count={90}
        scale={[12, 5, 6]}
        size={2.4}
        speed={0.45}
        color="#fff5d9"
        opacity={0.65}
      />
    </Canvas>
  );
}
