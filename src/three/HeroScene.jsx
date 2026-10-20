import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import Virion from './Virion'
import ParticleField from './ParticleField'
import OrbitingVirions from './OrbitingVirions'

function useIsCompact() {
  const [compact, setCompact] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 820px)').matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)')
    const on = (e) => setCompact(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return compact
}

export default function HeroScene({ rtl = false }) {
  const compact = useIsCompact()
  const pointer = useRef(new THREE.Vector2(0, 0))
  const [degraded, setDegraded] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Push the virion to the side opposite the text column.
  const offsetX = compact ? 0 : rtl ? -3.7 : 3.7
  const offsetY = compact ? 2.9 : 0.15
  const scale = compact ? 0.62 : 0.86

  return (
    <Canvas
      className="hero-canvas"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      dpr={[1, compact ? 1.4 : 1.85]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 10.5], fov: 42 }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <PerformanceMonitor onDecline={() => setDegraded(true)} />
      <AdaptiveDpr pixelated />
      <color attach="background" args={['#03100a']} />
      <fog attach="fog" args={['#03100a', 11, 24]} />

      <ambientLight intensity={0.28} color="#7cff9d" />
      <directionalLight position={[5, 6, 5]} intensity={1.5} color="#b6ff3b" />
      <pointLight position={[-6, -3, -4]} intensity={26} color="#00ffa3" distance={22} />
      <spotLight position={[0, 8, 4]} angle={0.7} penumbra={1} intensity={30} color="#39ff14" distance={26} />

      <Suspense fallback={null}>
        <group position={[offsetX, offsetY, 0]}>
          <Virion scale={scale} quality={compact || degraded ? 'low' : 'high'} pointer={pointer} />
          {!compact && !degraded && <OrbitingVirions count={6} />}
        </group>
        <ParticleField count={compact || degraded ? 260 : 700} spread={17} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        rotateSpeed={0.45}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.55}
      />

      {!degraded && (
        <EffectComposer disableNormalPass>
          <Bloom
            intensity={compact ? 0.6 : 0.85}
            luminanceThreshold={0.26}
            luminanceSmoothing={0.32}
            mipmapBlur
            radius={0.72}
          />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0006, 0.0009]} />
          <Vignette eskil={false} offset={0.22} darkness={0.85} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
