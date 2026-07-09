'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useScroll, useSpring, useMotionValue } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { fragmentShader, vertexShader } from './shaders';

function WebGLPixelGrid({ scrollSpring }: { scrollSpring: any }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0, 0) }
  }), [size]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uScroll.value = scrollSpring.get();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

export function PixelFieldScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.0001
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(1.0 - (e.clientY / window.innerHeight));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] bg-[#090909] z-0">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#090909]">
        <Canvas 
          camera={{ position: [0, 0, 1] }}
          gl={{ antialias: false, alpha: true }}
          dpr={[1, 2]} 
        >
          <WebGLPixelGrid scrollSpring={scrollSpring} />
        </Canvas>
      </div>
    </div>
  );
}
