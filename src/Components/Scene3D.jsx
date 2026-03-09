import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ══════════════════════════════════════════════
   Visibility-aware Canvas wrapper
   Mounts canvas only when section is near viewport
   ══════════════════════════════════════════════ */
function VisibleCanvas({ children, className, style, ...props }) {
  const containerRef = useRef();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldRender(true);
      },
      { rootMargin: '200px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={style}>
      {shouldRender && (
        <Canvas
          gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
          dpr={[1, 1.5]}
          frameloop="always"
          {...props}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}

const SLATE = '#64748B';
const SLATE_LIGHT = '#94a3b8';
const DARK = '#1a1a2e';

/* ══════════════════════════════════════════════
   ABOUT — Orbiting atoms around a nucleus
   ══════════════════════════════════════════════ */
function OrbitingAtom({ radius, speed, tilt, size = 0.06 }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
  });

  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 12, 12]} />
        <meshBasicMaterial color={SLATE} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function OrbitPath({ radius, tilt, segments = 64 }) {
  const geo = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius, segments]);

  return (
    <line geometry={geo} rotation={tilt}>
      <lineBasicMaterial color={SLATE_LIGHT} transparent opacity={0.1} />
    </line>
  );
}

function AboutScene() {
  const nucleusRef = useRef();

  const nucleusEdges = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(0.4, 0);
    return new THREE.EdgesGeometry(geo);
  }, []);

  useFrame((_, delta) => {
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y += delta * 0.2;
      nucleusRef.current.rotation.x += delta * 0.1;
    }
  });

  const orbits = [
    { radius: 1.2, speed: 0.5, tilt: [0.3, 0, 0.2] },
    { radius: 1.6, speed: 0.35, tilt: [1.2, 0.5, 0] },
    { radius: 2.0, speed: 0.25, tilt: [0.6, -0.3, 0.8] },
  ];

  return (
    <>
      {/* Nucleus */}
      <group ref={nucleusRef}>
        <lineSegments geometry={nucleusEdges}>
          <lineBasicMaterial color={DARK} transparent opacity={0.15} />
        </lineSegments>
        <mesh>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color={SLATE} transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Orbital paths + electrons */}
      {orbits.map((o, i) => (
        <React.Fragment key={i}>
          <OrbitPath radius={o.radius} tilt={o.tilt} />
          <OrbitingAtom {...o} />
        </React.Fragment>
      ))}
    </>
  );
}

/* ══════════════════════════════════════════════
   EXPERIENCE — DNA double helix
   ══════════════════════════════════════════════ */
function HelixScene() {
  const groupRef = useRef();
  const strand1Ref = useRef();
  const strand2Ref = useRef();
  const rungsRef = useRef();

  const { strand1Geo, strand2Geo, rungsGeo } = useMemo(() => {
    const pts1 = [];
    const pts2 = [];
    const rungs = [];
    const segments = 80;
    const height = 6;
    const radius = 0.8;

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 4;
      const y = (i / segments) * height - height / 2;
      pts1.push(new THREE.Vector3(Math.cos(t) * radius, y, Math.sin(t) * radius));
      pts2.push(new THREE.Vector3(Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius));

      // Rungs every few segments
      if (i % 5 === 0 && i > 0 && i < segments) {
        rungs.push(
          new THREE.Vector3(Math.cos(t) * radius, y, Math.sin(t) * radius),
          new THREE.Vector3(Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius)
        );
      }
    }

    return {
      strand1Geo: new THREE.BufferGeometry().setFromPoints(pts1),
      strand2Geo: new THREE.BufferGeometry().setFromPoints(pts2),
      rungsGeo: new THREE.BufferGeometry().setFromPoints(rungs),
    };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <line ref={strand1Ref} geometry={strand1Geo}>
        <lineBasicMaterial color={SLATE} transparent opacity={0.2} />
      </line>
      <line ref={strand2Ref} geometry={strand2Geo}>
        <lineBasicMaterial color={SLATE} transparent opacity={0.2} />
      </line>
      <lineSegments ref={rungsRef} geometry={rungsGeo}>
        <lineBasicMaterial color={SLATE_LIGHT} transparent opacity={0.1} />
      </lineSegments>

      {/* Nodes at rung connection points */}
      {useMemo(() => {
        const nodes = [];
        const segments = 80;
        const height = 6;
        const radius = 0.8;
        for (let i = 0; i <= segments; i += 5) {
          if (i === 0 || i === segments) continue;
          const t = (i / segments) * Math.PI * 4;
          const y = (i / segments) * height - height / 2;
          nodes.push(
            <mesh key={`a${i}`} position={[Math.cos(t) * radius, y, Math.sin(t) * radius]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color={SLATE} transparent opacity={0.35} />
            </mesh>,
            <mesh key={`b${i}`} position={[Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color={SLATE} transparent opacity={0.35} />
            </mesh>
          );
        }
        return nodes;
      }, [])}
    </group>
  );
}

/* ══════════════════════════════════════════════
   WORKS — Floating connected cubes
   ══════════════════════════════════════════════ */
function FloatingCube({ position, size = 0.3, speed }) {
  const ref = useRef();
  const edges = useMemo(() => {
    const geo = new THREE.BoxGeometry(size, size, size);
    return new THREE.EdgesGeometry(geo);
  }, [size]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.15;
    ref.current.rotation.x = t * speed * 0.3;
    ref.current.rotation.y = t * speed * 0.2;
  });

  return (
    <group ref={ref} position={position}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={SLATE} transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

function WorksScene() {
  const groupRef = useRef();

  const cubes = useMemo(() => [
    { position: [-1.2, 0.8, 0], size: 0.4, speed: 0.3 },
    { position: [0.8, -0.5, -0.5], size: 0.55, speed: 0.25 },
    { position: [1.5, 0.6, 0.3], size: 0.3, speed: 0.4 },
    { position: [-0.5, -1.0, 0.5], size: 0.35, speed: 0.35 },
    { position: [0.2, 1.2, -0.3], size: 0.25, speed: 0.45 },
    { position: [-1.5, -0.3, -0.2], size: 0.28, speed: 0.32 },
  ], []);

  // Connection lines between cubes
  const connectionGeo = useMemo(() => {
    const pts = [];
    const pairs = [[0, 1], [1, 2], [2, 4], [3, 5], [0, 3], [4, 1]];
    for (const [a, b] of pairs) {
      pts.push(
        new THREE.Vector3(...cubes[a].position),
        new THREE.Vector3(...cubes[b].position)
      );
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [cubes]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={groupRef}>
      {cubes.map((c, i) => (
        <FloatingCube key={i} {...c} />
      ))}
      <lineSegments geometry={connectionGeo}>
        <lineBasicMaterial color={SLATE_LIGHT} transparent opacity={0.06} />
      </lineSegments>
    </group>
  );
}

/* ══════════════════════════════════════════════
   CONTACT — Torus knot (connection/linking)
   ══════════════════════════════════════════════ */
function ContactScene() {
  const knotRef = useRef();
  const ringRef = useRef();

  const knotEdges = useMemo(() => {
    const geo = new THREE.TorusKnotGeometry(1, 0.3, 100, 8, 2, 3);
    return new THREE.EdgesGeometry(geo);
  }, []);

  const ringEdges = useMemo(() => {
    const geo = new THREE.TorusGeometry(1.8, 0.02, 8, 64);
    return new THREE.EdgesGeometry(geo);
  }, []);

  useFrame((_, delta) => {
    if (knotRef.current) {
      knotRef.current.rotation.y += delta * 0.1;
      knotRef.current.rotation.x += delta * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y -= delta * 0.06;
      ringRef.current.rotation.z += delta * 0.03;
    }
  });

  return (
    <>
      <group ref={knotRef}>
        <lineSegments geometry={knotEdges}>
          <lineBasicMaterial color={SLATE} transparent opacity={0.12} />
        </lineSegments>
      </group>
      <group ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <lineSegments geometry={ringEdges}>
          <lineBasicMaterial color={SLATE_LIGHT} transparent opacity={0.08} />
        </lineSegments>
      </group>
    </>
  );
}

/* ══════════════════════════════════════════════
   Exported section scenes
   ══════════════════════════════════════════════ */
export function AboutScene3D() {
  return (
    <VisibleCanvas
      className="section-3d-bg"
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <AboutScene />
    </VisibleCanvas>
  );
}

export function ExperienceScene3D() {
  return (
    <VisibleCanvas
      className="section-3d-bg section-3d-bg--experience"
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <HelixScene />
    </VisibleCanvas>
  );
}

export function WorksScene3D() {
  return (
    <VisibleCanvas
      className="section-3d-bg section-3d-bg--works"
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <WorksScene />
    </VisibleCanvas>
  );
}

export function ContactScene3D() {
  return (
    <VisibleCanvas
      className="section-3d-bg section-3d-bg--contact"
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <ContactScene />
    </VisibleCanvas>
  );
}
