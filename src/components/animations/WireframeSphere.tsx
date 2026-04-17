import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

const WireframeSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.2;
      ring1Ref.current.rotation.x += delta * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.15;
      ring2Ref.current.rotation.y += delta * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.25;
    }
  });

  return (
    <group scale={1.2}>
      {/* Central Core Sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshBasicMaterial 
            color="#00C9FF" 
            wireframe 
            transparent 
            opacity={0.15} 
          />
        </mesh>
        
        {/* Glow Sphere */}
        <mesh scale={0.9}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial 
            color="#00C9FF" 
            transparent 
            opacity={0.05} 
          />
        </mesh>
      </Float>

      {/* Orbiting Rings */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.2, 0.005, 16, 100]} />
          <meshBasicMaterial color="#00C9FF" transparent opacity={0.3} />
        </mesh>
        {/* Small glowing points on ring */}
        <mesh position={[2.2, 0, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00C9FF" />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[2.6, 0.005, 16, 100]} />
          <meshBasicMaterial color="#7000FF" transparent opacity={0.2} />
        </mesh>
        <mesh position={[-2.6, 0, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#7000FF" />
        </mesh>
      </group>

      <group ref={ring3Ref} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[3, 0.003, 16, 100]} />
          <meshBasicMaterial color="#00C9FF" transparent opacity={0.1} />
        </mesh>
      </group>

      {/* Ambient and Point Lights for the Scene */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00C9FF" />
    </group>
  );
};

export default WireframeSphere;
