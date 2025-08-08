import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function HoloMaterial({ pointer }) {
  const materialRef = useRef();
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_color1: { value: new THREE.Color('#00d1ff') },
      u_color2: { value: new THREE.Color('#ff9f43') },
    }),
    []
  );

  useFrame((state) => {
    uniforms.u_time.value = state.clock.getElapsedTime();
    if (pointer.current) uniforms.u_mouse.value.lerp(pointer.current, 0.12);
  });

  return (
    <shaderMaterial
      ref={materialRef}
      transparent
      depthWrite={false}
      blending={THREE.AdditiveBlending}
      uniforms={uniforms}
      vertexShader={`
        varying vec3 vNormalW;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vNormalW = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `}
      fragmentShader={`
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        varying vec3 vNormalW;
        varying vec2 vUv;
        void main() {
          float scan = sin((vUv.y + u_time * 0.5) * 60.0) * 0.08;
          float fresnel = pow(1.0 - abs(dot(normalize(vNormalW), vec3(0.0, 0.0, 1.0))), 2.0);
          float dx = vUv.x - u_mouse.x;
          float dy = vUv.y - u_mouse.y;
          float dist = sqrt(dx*dx + dy*dy);
          float hotspot = smoothstep(0.35, 0.0, dist);
          vec3 color = mix(u_color1, u_color2, vUv.y);
          vec3 glow = color * (fresnel * 0.9 + hotspot * 0.6 + scan);
          gl_FragColor = vec4(glow, 0.35);
        }
      `}
    />
  );
}

function SpinningSphere({ pointer }) {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0025;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
  });
  return (
    <mesh ref={meshRef} scale={[1.2, 1.2, 1.2]}>
      <icosahedronGeometry args={[1, 5]} />
      <HoloMaterial pointer={pointer} />
    </mesh>
  );
}

export default function HoloSphere() {
  const pointer = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth;
      const ny = 1 - e.clientY / window.innerHeight;
      pointer.current.set(nx, ny);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 3] }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.2} />
        <SpinningSphere pointer={pointer} />
      </Canvas>
    </div>
  );
}
