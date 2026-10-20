import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Drifting aerosol/dust field — the medium the virion floats in. */
export default function ParticleField({ count = 700, spread = 16 }) {
  const ref = useRef()

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.7
      speeds[i] = 0.05 + Math.random() * 0.18
    }
    return { positions, speeds }
  }, [count, spread])

  const sprite = useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    grad.addColorStop(0, 'rgba(180,255,190,1)')
    grad.addColorStop(0.35, 'rgba(57,255,20,0.55)')
    grad.addColorStop(1, 'rgba(57,255,20,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  useFrame((state, delta) => {
    const geo = ref.current
    if (!geo) return
    const arr = geo.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta
      if (arr[i * 3 + 1] > spread / 2) arr[i * 3 + 1] = -spread / 2
    }
    geo.geometry.attributes.position.needsUpdate = true
    geo.rotation.y = state.clock.elapsedTime * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        map={sprite}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.75}
      />
    </points>
  )
}
