"use client";

import { Suspense, useRef, useEffect, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  ContactShadows,
  OrbitControls,
  Center,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/watch.glb");

// Mutable bus — zero React re-renders on color change
export const colorBus = {
  dial:     "#111318",
  case:     "#c0c0c0",
  material: "steel",
  dirty:    false,
};

// Per-material PBR properties
const MAT_PROPS: Record<string, { metalness: number; roughness: number; envMapIntensity: number }> = {
  steel: { metalness: 0.95, roughness: 0.12, envMapIntensity: 2.5 },
  pvd:   { metalness: 0.80, roughness: 0.20, envMapIntensity: 1.8 },
  gold:  { metalness: 0.90, roughness: 0.08, envMapIntensity: 3.0 },
};

function WatchModel() {
  const { scene } = useGLTF("/watch.glb");
  const groupRef = useRef<THREE.Group>(null);
  const meshes   = useRef<THREE.Mesh[]>([]);
  const isDragging = useRef(false);

  useEffect(() => {
    const list: THREE.Mesh[] = [];
    scene.traverse((c) => {
      if (c instanceof THREE.Mesh) {
        // Clone material so we can mutate without affecting the cached original
        if (Array.isArray(c.material)) {
          c.material = c.material.map((m) => m.clone());
        } else {
          c.material = c.material.clone();
        }
        list.push(c);
      }
    });
    meshes.current = list;
    colorBus.dirty = true;
  }, [scene]);

  const scale = (() => {
    const box = new THREE.Box3().setFromObject(scene);
    const s   = new THREE.Vector3();
    box.getSize(s);
    const m = Math.max(s.x, s.y, s.z);
    return m > 0 ? 2 / m : 1;
  })();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth y-axis turntable — pauses while user drags
    if (!isDragging.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }

    // Gentle float
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;

    // Live clock hands
    const now  = new Date();
    const hrs  = now.getHours() % 12 + now.getMinutes() / 60;
    const mins = now.getMinutes() + now.getSeconds() / 60;
    meshes.current.forEach((mesh) => {
      const n = mesh.name.toLowerCase();
      if (n.includes("hour"))   mesh.rotation.z = -(hrs  / 12) * Math.PI * 2;
      if (n.includes("minute")) mesh.rotation.z = -(mins / 60) * Math.PI * 2;
    });

    // Apply colorBus changes
    if (!colorBus.dirty) return;
    colorBus.dirty = false;

    const dialC  = new THREE.Color(colorBus.dial);
    const caseC  = new THREE.Color(colorBus.case);
    const props  = MAT_PROPS[colorBus.material] ?? MAT_PROPS.steel;

    meshes.current.forEach((mesh) => {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((mat) => {
        if (!(mat instanceof THREE.MeshStandardMaterial)) return;
        const name = mesh.name.toLowerCase();
        if (name.includes("dial") || name.includes("face") || name.includes("clock")) {
          mat.color.set(dialC);
          mat.metalness        = 0.3;
          mat.roughness        = 0.5;
          mat.envMapIntensity  = 1.0;
        } else {
          mat.color.set(caseC);
          mat.metalness        = props.metalness;
          mat.roughness        = props.roughness;
          mat.envMapIntensity  = props.envMapIntensity;
        }
        mat.needsUpdate = true;
      });
    });
  });

  return (
    <Center>
      <group
        ref={groupRef}
        scale={scale}
        rotation={[-Math.PI / 2 + 0.35, 0, 0]}
        onPointerDown={() => { isDragging.current = true; }}
        onPointerUp={()   => { isDragging.current = false; }}
        onPointerLeave={()=> { isDragging.current = false; }}
      >
        <primitive object={scene} />
      </group>
    </Center>
  );
}

function Fallback() {
  return (
    <mesh>
      <cylinderGeometry args={[1, 1, 0.3, 64]} />
      <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.1} />
    </mesh>
  );
}

export default memo(function WatchScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 4.5], fov: 36 }}
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: "transparent" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
      }}
    >
      {/* HDRI environment — city preset gives the best metallic reflections */}
      <Environment preset="city" />

      {/* Key light — warm gold from upper left */}
      <directionalLight
        position={[-3, 5, 3]}
        intensity={3}
        color="#e8c96b"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      {/* Fill light — cool from right */}
      <directionalLight position={[4, 2, -2]} intensity={1.5} color="#a0b4c8" />
      {/* Rim light — behind */}
      <directionalLight position={[0, 3, -5]} intensity={2} color="#ffffff" />
      {/* Ambient */}
      <ambientLight intensity={0.4} />

      <Suspense fallback={<Fallback />}>
        <WatchModel />
      </Suspense>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.5}
        scale={6}
        blur={3}
        far={3}
        color="#000000"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
        dampingFactor={0.08}
        enableDamping
      />
    </Canvas>
  );
}, () => true);
