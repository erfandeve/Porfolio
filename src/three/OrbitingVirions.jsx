import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Small satellite virions orbiting the main particle. */
export default function OrbitingVirions({ count = 7 }) {
  const group = useRef()
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 3.2 + Math.random() * 2.6,
        speed: 0.12 + Math.random() * 0.22,
        phase: (i / count) * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 1.1,
        y: (Math.random() - 0.5) * 3.4,
        size: 0.1 + Math.random() * 0.13,
      })),
    [count],
  )
  const meshes = useRef([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    seeds.forEach((s, i) => {
      const m = meshes.current[i]
      if (!m) return
      const a = t * s.speed + s.phase
      m.position.set(Math.cos(a) * s.radius, s.y + Math.sin(a * 1.4) * 0.5, Math.sin(a) * s.radius * Math.cos(s.tilt))
      m.rotation.x += 0.006
      m.rotation.y += 0.009
    })
    if (group.current) group.current.rotation.y = t * 0.03
  })

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh key={i} ref={(el) => (meshes.current[i] = el)} scale={s.size}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#0b3d2e"
            emissive="#39ff14"
            emissiveIntensity={1.6}
            roughness={0.3}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}
