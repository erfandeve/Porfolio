import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/* A double helix with base pairs — used as a decorative but accurate motif. */
function Helix({ turns = 4, height = 5.6, radius = 0.85, rungs = 28 }) {
  const group = useRef()

  const { strandA, strandB, pairs } = useMemo(() => {
    const makeStrand = (offset) => {
      const pts = []
      for (let i = 0; i <= 220; i++) {
        const t = i / 220
        const a = t * Math.PI * 2 * turns + offset
        pts.push(new THREE.Vector3(Math.cos(a) * radius, (t - 0.5) * height, Math.sin(a) * radius))
      }
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 260, 0.048, 8, false)
    }
    const pairList = []
    for (let i = 0; i < rungs; i++) {
      const t = i / (rungs - 1)
      const a = t * Math.PI * 2 * turns
      const y = (t - 0.5) * height
      const p1 = new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius)
      const p2 = new THREE.Vector3(Math.cos(a + Math.PI) * radius, y, Math.sin(a + Math.PI) * radius)
      const mid = p1.clone().add(p2).multiplyScalar(0.5)
      const dir = p2.clone().sub(p1)
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
      pairList.push({ mid, quat, len: dir.length(), warm: i % 3 === 0 })
    }
    return { strandA: makeStrand(0), strandB: makeStrand(Math.PI), pairs: pairList }
  }, [turns, height, radius, rungs])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.28
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15
  })

  return (
    <group ref={group} rotation={[0.18, 0, 0.12]}>
      <mesh geometry={strandA}>
        <meshStandardMaterial color="#0b3d2e" emissive="#39ff14" emissiveIntensity={1.5} roughness={0.35} />
      </mesh>
      <mesh geometry={strandB}>
        <meshStandardMaterial color="#0b3d2e" emissive="#00ffa3" emissiveIntensity={1.4} roughness={0.35} />
      </mesh>
      {pairs.map((p, i) => (
        <mesh key={i} position={p.mid} quaternion={p.quat}>
          <cylinderGeometry args={[0.022, 0.022, p.len, 6]} />
          <meshStandardMaterial
            color={p.warm ? '#b6ff3b' : '#7cff9d'}
            emissive={p.warm ? '#b6ff3b' : '#39ff14'}
            emissiveIntensity={1.1}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function HelixScene() {
  const [compact, setCompact] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 900px)').matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const on = (e) => setCompact(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8.6], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.35} color="#7cff9d" />
      <pointLight position={[4, 4, 5]} intensity={40} color="#39ff14" distance={18} />
      <pointLight position={[-4, -3, 2]} intensity={26} color="#00ffa3" distance={16} />
      <Suspense fallback={null}>
        <group scale={compact ? 0.74 : 0.86}>
          <Helix />
        </group>
      </Suspense>
      <EffectComposer disableNormalPass>
        <Bloom intensity={0.7} luminanceThreshold={0.2} luminanceSmoothing={0.3} mipmapBlur radius={0.65} />
      </EffectComposer>
    </Canvas>
  )
}
