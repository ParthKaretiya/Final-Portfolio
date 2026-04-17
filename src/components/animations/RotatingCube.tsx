import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RotatingCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={50} color="#FF3366" />
      <pointLight position={[-10, -10, -10]} intensity={50} color="#00C9FF" />
      
      <mesh ref={meshRef}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial 
          color="#0A0A0A" 
          emissive="#1A1A1A"
          roughness={0.1}
          metalness={0.8}
        />
        {/* Simple wireframe as a fallback for Edges */}
        <mesh>
          <boxGeometry args={[2.51, 2.51, 2.51]} />
          <meshBasicMaterial color="#FF3366" wireframe />
        </mesh>
      </mesh>
    </group>
  );
};

export default RotatingCube;
