import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Fibonacci sphere — even distribution of glycoprotein spikes over the capsid. */
function fibonacciPoints(count, radius) {
  const pts = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius))
  }
  return pts
}

const fresnelVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vPosW = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const fresnelFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  uniform float uTime;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosW);
    float rim = pow(1.0 - clamp(dot(normalize(vNormalW), viewDir), 0.0, 1.0), uPower);
    float pulse = 0.86 + 0.14 * sin(uTime * 1.4);
    gl_FragColor = vec4(uColor * rim * uIntensity * pulse, rim * 0.55);
  }
`

function Envelope({ radius = 1.85, color = '#39ff14' }) {
  const mat = useRef()
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uPower: { value: 3.6 },
      uIntensity: { value: 0.55 },
      uTime: { value: 0 },
    }),
    [color],
  )
  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime
  })
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={fresnelVertex}
        fragmentShader={fresnelFragment}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* Glycoprotein spikes: instanced stems + instanced heads, oriented along the surface normal. */
function Spikes({ count = 88, radius = 1.5, quality = 'high' }) {
  const stems = useRef()
  const heads = useRef()
  const points = useMemo(() => fibonacciPoints(count, radius), [count, radius])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), [])

  useFrame(({ clock }) => {
    if (!stems.current || !heads.current) return
    const t = clock.elapsedTime
    points.forEach((p, i) => {
      const wobble = 1 + Math.sin(t * 1.6 + i * 0.7) * 0.045
      const dir = p.clone().normalize()
      const stemLen = 0.42 * wobble

      dummy.position.copy(dir).multiplyScalar(radius + stemLen / 2)
      dummy.quaternion.setFromUnitVectors(up, dir)
      dummy.scale.set(1, wobble, 1)
      dummy.updateMatrix()
      stems.current.setMatrixAt(i, dummy.matrix)

      dummy.position.copy(dir).multiplyScalar(radius + stemLen + 0.055)
      dummy.scale.setScalar(wobble)
      dummy.updateMatrix()
      heads.current.setMatrixAt(i, dummy.matrix)
    })
    stems.current.instanceMatrix.needsUpdate = true
    heads.current.instanceMatrix.needsUpdate = true
  })

  const seg = quality === 'high' ? 8 : 5

  return (
    <group>
      <instancedMesh ref={stems} args={[undefined, undefined, count]} frustumCulled={false}>
        <cylinderGeometry args={[0.021, 0.034, 0.42, seg]} />
        <meshStandardMaterial
          color="#0f5c2c"
          emissive="#39ff14"
          emissiveIntensity={0.75}
          roughness={0.35}
          metalness={0.2}
        />
      </instancedMesh>
      <instancedMesh ref={heads} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[0.072, seg + 4, seg + 2]} />
        <meshStandardMaterial
          color="#7cff9d"
          emissive="#39ff14"
          emissiveIntensity={2.4}
          roughness={0.2}
          metalness={0.1}
        />
      </instancedMesh>
    </group>
  )
}

/* Single-stranded RNA genome coiled inside the capsid. */
function Genome({ radius = 0.95 }) {
  const ref = useRef()
  const geometry = useMemo(() => {
    const pts = []
    const turns = 8
    const steps = 240
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const angle = t * Math.PI * 2 * turns
      const r = radius * (0.3 + 0.7 * Math.sin(t * Math.PI))
      pts.push(new THREE.Vector3(Math.cos(angle) * r, (t - 0.5) * radius * 1.85, Math.sin(angle) * r))
    }
    const curve = new THREE.CatmullRomCurve3(pts)
    return new THREE.TubeGeometry(curve, 360, 0.022, 7, false)
  }, [radius])

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.34
  })

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial color="#b6ff3b" emissive="#b6ff3b" emissiveIntensity={1.6} roughness={0.4} />
    </mesh>
  )
}

/* Capsid: icosahedral shell rendered as a glowing lattice plus a faint solid core. */
function Capsid({ radius = 1.5 }) {
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(radius, 2)), [radius])
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[radius, 2]} />
        <meshPhysicalMaterial
          color="#062e1a"
          emissive="#0d3a20"
          transparent
          opacity={0.34}
          roughness={0.25}
          metalness={0.35}
          flatShading
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#39ff14" transparent opacity={0.55} />
      </lineSegments>
      <mesh scale={0.985}>
        <icosahedronGeometry args={[radius, 1]} />
        <meshBasicMaterial color="#39ff14" wireframe transparent opacity={0.16} />
      </mesh>
    </group>
  )
}

export default function Virion({ scale = 1, quality = 'high', pointer }) {
  const group = useRef()

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.16
    group.current.rotation.x += delta * 0.05
    const target = pointer?.current
    if (target) {
      group.current.position.x += (target.x * 0.32 - group.current.position.x) * 0.04
      group.current.position.y += (-target.y * 0.24 - group.current.position.y) * 0.04
    }
    group.current.position.y += Math.sin(state.clock.elapsedTime * 0.7) * 0.0012
  })

  return (
    <group ref={group} scale={scale}>
      <Capsid radius={1.5} />
      <Genome radius={1.02} />
      <Spikes count={quality === 'high' ? 88 : 46} radius={1.5} quality={quality} />
      <Envelope radius={1.92} />
      <pointLight position={[0, 0, 0]} intensity={4} distance={5} color="#39ff14" />
    </group>
  )
}
