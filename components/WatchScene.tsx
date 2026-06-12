"use client";

import { Suspense, useRef, useEffect, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ContactShadows, OrbitControls, Center } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/watch.glb");

// Mutable bus updated by ProductStage, read by useFrame — zero React re-renders
export const colorBus = { dial: "#111318", case: "#c0c0c0", dirty: false };

function WatchModel() {
  const { scene } = useGLTF("/watch.glb");
  const ref = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const list: THREE.Mesh[] = [];
    scene.traverse((c) => { if (c instanceof THREE.Mesh) list.push(c); });
    meshes.current = list;
    colorBus.dirty = true; // force initial colour apply
  }, [scene]);

  const scale = (() => {
    const box = new THREE.Box3().setFromObject(scene);
    const s = new THREE.Vector3();
    box.getSize(s);
    const m = Math.max(s.x, s.y, s.z);
    return m > 0 ? 2 / m : 1;
  })();

  useFrame((state) => {
    if (!ref.current) return;

    // Slow auto-rotate + float
    ref.current.rotation.z += 0.004;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.06;

    // Live clock — drive any mesh named "hour_hand" / "minute_hand"
    const now = new Date();
    const hrs  = now.getHours() % 12 + now.getMinutes() / 60;
    const mins = now.getMinutes() + now.getSeconds() / 60;
    const hourAngle   = -(hrs  / 12) * Math.PI * 2;
    const minuteAngle = -(mins / 60) * Math.PI * 2;
    meshes.current.forEach((mesh) => {
      const n = mesh.name.toLowerCase();
      if (n.includes("hour_hand")   || n.includes("hour hand"))   mesh.rotation.z = hourAngle;
      if (n.includes("minute_hand") || n.includes("minute hand")) mesh.rotation.z = minuteAngle;
    });

    if (!colorBus.dirty) return;
    colorBus.dirty = false;

    const dialC = new THREE.Color(colorBus.dial);
    const caseC = new THREE.Color(colorBus.case);

    meshes.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat?.color) return;
      const name = mesh.name.toLowerCase();
      if (name.includes("dial") || name.includes("face")) {
        mat.color.set(dialC);
      } else {
        mat.color.set(caseC);
        mat.metalness = colorBus.case === "#1a1a1a" ? 0.7 : 0.95;
        mat.roughness  = colorBus.case === "#c9a853" ? 0.2 : 0.15;
      }
      mat.needsUpdate = true;
    });
  });

  return (
    <Center>
      <group ref={ref} scale={scale} rotation={[-Math.PI / 2 + 0.4, 0, 0]}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

function Fallback() {
  return (
    <mesh>
      <cylinderGeometry args={[1, 1, 0.3, 64]} />
      <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
    </mesh>
  );
}

// Canvas never re-renders — colours flow through colorBus
export default memo(function WatchScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 4], fov: 38 }}
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
      }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 6, 5]} intensity={4} castShadow />
      <directionalLight position={[-4, 2, 2]} intensity={2.5} color="#c9a853" />
      <directionalLight position={[0, 4, -4]} intensity={1.5} />

      <Suspense fallback={<Fallback />}>
        <WatchModel />
      </Suspense>

      <ContactShadows position={[0, -1.6, 0]} opacity={0.4} scale={5} blur={2.5} far={3} />

      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
}, () => true); // canvas never re-renders; colours go through colorBus
