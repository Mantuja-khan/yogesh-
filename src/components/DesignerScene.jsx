import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { portfolio } from "@/lib/portfolioData";

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

function CameraRig({ pointer }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0.2, 0));

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.current.x * 1.5, 0.045);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      0.35 + pointer.current.y * 0.6,
      0.045,
    );
    look.current.set(pointer.current.x * 0.4, 0.15 + pointer.current.y * 0.2, 0);
    camera.lookAt(look.current);
  });

  return null;
}

// Side floating slots: Strictly placed on left and right flanks.
// Center (x: -2.6 to +2.6) is left open for the centered character mascot and typography.
const SIDE_SLOTS = [
  // Left side floating cards
  { x: -3.35, y: 0.35, z: -0.3, rotY: 0.22, rotX: 0.04, rotZ: 0.02 },
  { x: -4.55, y: -0.55, z: -1.1, rotY: 0.32, rotX: -0.06, rotZ: -0.03 },
  // Right side floating cards
  { x: 3.35, y: 0.35, z: -0.3, rotY: -0.22, rotX: 0.04, rotZ: -0.02 },
  { x: 4.55, y: -0.55, z: -1.1, rotY: -0.32, rotX: -0.06, rotZ: 0.03 },
];

function WorkFrame({ project, slot, index, pointer }) {
  const mesh = useRef(null);
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const map = loader.load(project.image);
    map.colorSpace = THREE.SRGBColorSpace;
    map.generateMipmaps = true;
    map.minFilter = THREE.LinearMipmapLinearFilter;
    return map;
  }, [project.image]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    // Organic floating idle
    const floatY = Math.sin(t * 0.75 + index * 1.3) * 0.14;
    const floatX = Math.cos(t * 0.6 + index * 0.9) * 0.07;

    // Interactive mouse move response: moves actively with the mouse
    const pointerInfluence = 0.35 + (index % 2) * 0.12;
    mesh.current.position.x = slot.x + floatX + pointer.current.x * pointerInfluence;
    mesh.current.position.y = slot.y + floatY - pointer.current.y * 0.26;
    mesh.current.position.z = slot.z + pointer.current.y * 0.22;

    // Interactive 3D tilt with mouse parallax
    mesh.current.rotation.y =
      slot.rotY + Math.sin(t * 0.25 + index) * 0.08 + pointer.current.x * 0.26;
    mesh.current.rotation.x =
      slot.rotX + Math.cos(t * 0.2 + index) * 0.06 - pointer.current.y * 0.2;
    mesh.current.rotation.z = slot.rotZ;
  });

  return (
    <group ref={mesh} position={[slot.x, slot.y, slot.z]}>
      {/* Front project board */}
      <mesh castShadow receiveShadow>
        <planeGeometry args={[1.45, 1.85]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.25}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Backplate / frame bevel */}
      <mesh position={[0, 0, -0.012]}>
        <planeGeometry args={[1.48, 1.88]} />
        <meshBasicMaterial color="#1a1714" />
      </mesh>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 6, 5]} intensity={1.8} color="#fff6e8" />
      <pointLight position={[-4, 2, 3]} intensity={25} color="#ff6b3d" distance={15} />
      <pointLight position={[3.5, -1, 2]} intensity={22} color="#7ad7ff" distance={14} />
      <pointLight position={[0, 3, 4]} intensity={18} color="#f2c14e" distance={12} />
    </>
  );
}

function DesignerWorld({ pointer }) {
  const group = useRef(null);
  const tilt = useRef({ x: 0, y: 0 });

  useFrame(() => {
    tilt.current.x = THREE.MathUtils.lerp(tilt.current.x, pointer.current.x, 0.06);
    tilt.current.y = THREE.MathUtils.lerp(tilt.current.y, pointer.current.y, 0.06);
    if (!group.current) return;
    group.current.rotation.y = tilt.current.x * 0.28;
    group.current.rotation.x = -tilt.current.y * 0.16;
  });

  return (
    <group ref={group}>
      <SceneLights />
      <Sparkles
        count={120}
        scale={[12, 7, 8]}
        size={2.6}
        speed={0.5}
        color="#fff6d6"
        opacity={0.7}
      />

      {/* Side project cards only (No center card, no circular rings) */}
      {SIDE_SLOTS.map((slot, index) => {
        const project = portfolio.projects[index % portfolio.projects.length];
        if (!project) return null;
        return (
          <WorkFrame
            key={`${project.id}-${index}`}
            project={project}
            slot={slot}
            index={index}
            pointer={pointer}
          />
        );
      })}
    </group>
  );
}

export default function DesignerScene() {
  const pointer = usePointer();

  return (
    <Canvas
      className="designer-canvas"
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.4, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#090807"]} />
      <fog attach="fog" args={["#090807", 10, 26]} />
      <CameraRig pointer={pointer} />
      <DesignerWorld pointer={pointer} />
    </Canvas>
  );
}
