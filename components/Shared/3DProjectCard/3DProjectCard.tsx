import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  index: number;
}

function ProjectCube({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [rotation, setRotation] = useState([0, 0, 0]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isHovered) {
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.3;
      } else {
        meshRef.current.rotation.x += delta * 0.1;
        meshRef.current.rotation.y += delta * 0.2;
      }
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={isHovered ? 0.5 : 0.2}
      floatIntensity={isHovered ? 1 : 0.5}
    >
      <RoundedBox
        ref={meshRef}
        args={[2, 2, 2]}
        radius={0.1}
        smoothness={4}
        scale={isHovered ? 1.2 : 1}
      >
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.8}
          roughness={0.2}
          emissive="#22d3ee"
          emissiveIntensity={isHovered ? 0.3 : 0.1}
        />
      </RoundedBox>

      {/* Particles around the cube */}
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 3;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 1.5,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </Float>
  );
}

export default function ThreeDProjectCard({
  title,
  description,
  tech,
  link,
  index,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative bg-gradient-to-br from-AAhover/50 to-MobileNavBarColor/50 rounded-2xl overflow-hidden border border-AAborder/50 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas */}
      <div className="relative h-64 overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          className="cursor-pointer"
        >
          <ambientLight args={[undefined, 0.5]} />
          <spotLight args={[undefined, 1, 0, 0.15, 1]} position={[10, 10, 10]} />
          <pointLight args={[undefined, 0.5]} position={[-10, -10, -10]} />
          <ProjectCube isHovered={isHovered} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!isHovered}
            autoRotateSpeed={2}
          />
        </Canvas>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-AAhover via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-AAtext group-hover:text-AAsecondary transition-colors">
          {title}
        </h3>

        <p className="text-sm text-AAsubtext leading-relaxed">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((item, i) => (
            <motion.span
              key={item}
              className="text-xs px-3 py-1 rounded-full bg-AAsecondary/10 text-AAsecondary border border-AAsecondary/30"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {item}
            </motion.span>
          ))}
        </div>

        {/* View Project Button */}
        {link && (
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-AAaccent hover:text-AAsecondary transition-colors group/link"
            whileHover={{ x: 5 }}
          >
            View Project
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </motion.svg>
          </motion.a>
        )}
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-AAsecondary/0 via-AAsecondary/5 to-AAaccent/0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
