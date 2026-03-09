import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SLATE = '#64748B';
const SLATE_LIGHT = '#94a3b8';
const DARK = '#1a1a2e';

/* ── Rotating wireframe polyhedron at the center ── */
function CoreShape() {
  const groupRef = useRef();

  const outerEdges = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.1, 1);
    return new THREE.EdgesGeometry(geo);
  }, []);

  const innerEdges = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(0.55, 0);
    return new THREE.EdgesGeometry(geo);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x += delta * 0.06;
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={outerEdges}>
        <lineBasicMaterial color={SLATE} transparent opacity={0.18} />
      </lineSegments>
      <group rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <lineSegments geometry={innerEdges}>
          <lineBasicMaterial color={DARK} transparent opacity={0.12} />
        </lineSegments>
      </group>
    </group>
  );
}

/* ── Constellation of floating connected nodes ── */
function ConstellationNodes({ count = 28, radius = 3.2 }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const { positions, velocities, connections } = useMemo(() => {
    const pos = [];
    const vel = [];
    for (let i = 0; i < count; i++) {
      // Distribute in a soft sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.4 + Math.random() * 0.6);
      pos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      // Slow drift velocities
      vel.push(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008
      );
    }

    // Pre-calculate connections (pairs within a threshold)
    const conn = [];
    const threshold = radius * 0.55;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < threshold) {
          conn.push(i, j);
        }
      }
    }
    return {
      positions: new Float32Array(pos),
      velocities: vel,
      connections: conn,
    };
  }, [count, radius]);

  const linePositions = useMemo(
    () => new Float32Array(connections.length * 3),
    [connections]
  );

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posArr = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    // Animate node drift
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      posArr[idx] += velocities[idx] + Math.sin(time * 0.3 + i) * 0.001;
      posArr[idx + 1] += velocities[idx + 1] + Math.cos(time * 0.25 + i) * 0.001;
      posArr[idx + 2] += velocities[idx + 2];

      // Soft boundary — pull back toward center
      const dist = Math.sqrt(
        posArr[idx] ** 2 + posArr[idx + 1] ** 2 + posArr[idx + 2] ** 2
      );
      if (dist > radius) {
        const pull = 0.002;
        posArr[idx] -= posArr[idx] * pull;
        posArr[idx + 1] -= posArr[idx + 1] * pull;
        posArr[idx + 2] -= posArr[idx + 2] * pull;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update line positions to match node positions
    if (linesRef.current) {
      const lineArr = linesRef.current.geometry.attributes.position.array;
      for (let c = 0; c < connections.length; c += 2) {
        const a = connections[c] * 3;
        const b = connections[c + 1] * 3;
        const li = c * 3;
        lineArr[li] = posArr[a];
        lineArr[li + 1] = posArr[a + 1];
        lineArr[li + 2] = posArr[a + 2];
        lineArr[li + 3] = posArr[b];
        lineArr[li + 4] = posArr[b + 1];
        lineArr[li + 5] = posArr[b + 2];
      }
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={SLATE}
          size={0.04}
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={SLATE_LIGHT} transparent opacity={0.08} />
      </lineSegments>
    </group>
  );
}

/* ── Slow orbital ring ── */
function OrbitalRing({ radius: r = 2, segments = 80, tilt = [0, 0, 0] }) {
  const ref = useRef();

  const geo = useMemo(() => {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [r, segments]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <line ref={ref} geometry={geo} rotation={tilt}>
      <lineBasicMaterial color={SLATE} transparent opacity={0.07} />
    </line>
  );
}

/* ── Scene root ── */
const HeroScene = ({ reducedMotion }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <CoreShape />
      <ConstellationNodes />
      <OrbitalRing radius={2.0} tilt={[Math.PI / 3, 0, Math.PI / 8]} />
      <OrbitalRing radius={2.6} tilt={[Math.PI / 2.5, Math.PI / 6, 0]} />
    </Canvas>
  );
};

export default HeroScene;
