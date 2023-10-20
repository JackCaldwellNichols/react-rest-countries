/* eslint-disable react/no-unknown-property */
import { useLoader, useFrame } from "@react-three/fiber";
import earthMap from "../assets/8k_earth_daymap.jpg";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";

const Earth = () => {
  const [colorMap] = useLoader(TextureLoader, [earthMap]);

  const earthRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 15;
  });

  return (
    <>
      <ambientLight intensity={2} />
      <pointLight
        color="#f6f3ea"
        position={[2, 0, 2]}
        intensity={1.2}
        shadow={true}
      />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={3}
        saturation={0}
        fade={true}
      />
      <mesh ref={earthRef}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshPhongMaterial specularMap={earthMap} />
        <meshStandardMaterial map={colorMap} metalness={0.4} roughness={0.6} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.6}
          rotateSpeed={0.6}
        />
      </mesh>
    </>
  );
};

export default Earth;
