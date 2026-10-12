import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const MAX_PULL = 1.1, TRIGGER = 0.6

// Short synthesized switch click (no audio asset needed).
export function click(muted) {
  if (muted) return
  try {
    const c = new (window.AudioContext || window.webkitAudioContext)(), o = c.createOscillator(), g = c.createGain()
    o.type = 'square'; o.frequency.value = 180; g.gain.setValueAtTime(0.15, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.06)
    o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + 0.07)
  } catch {}
}

// PullCord: drag handle with pointer capture; cord stretches with `pull`; spring-back on release.
function PullCord({ pull, onTrigger }) {
  const handle = useRef(), cord = useRef(), drag = useRef(false), vel = useRef(0)
  useFrame((_, dt) => {
    if (!drag.current) { // damped spring toward 0
      vel.current += (-pull.current * 60 - vel.current * 5) * dt
      pull.current += vel.current * dt
    }
    const p = THREE.MathUtils.clamp(pull.current, -0.15, MAX_PULL)
    const len = 1.2 + p
    cord.current.scale.y = len; cord.current.position.y = -len / 2
    handle.current.position.y = -len - 0.08
  })
  return (
    <group position={[0.55, 0, 0]}>
      <mesh ref={cord}><cylinderGeometry args={[0.012, 0.012, 1, 6]} /><meshStandardMaterial color="#888" metalness={0.8} roughness={0.4} /></mesh>
      <mesh ref={handle}
        onPointerOver={() => (document.body.style.cursor = 'grab')} onPointerOut={() => (document.body.style.cursor = '')}
        onPointerDown={(e) => { e.stopPropagation(); e.target.setPointerCapture(e.pointerId); drag.current = true; vel.current = 0; document.body.style.cursor = 'grabbing' }}
        onPointerMove={(e) => { if (drag.current) pull.current = THREE.MathUtils.clamp(pull.current - e.nativeEvent.movementY * 0.006, 0, MAX_PULL) }}
        onPointerUp={(e) => { drag.current = false; document.body.style.cursor = ''; if (pull.current > TRIGGER) onTrigger() }}>
        <capsuleGeometry args={[0.06, 0.12, 6, 12]} /><meshStandardMaterial color="#c9a45c" metalness={1} roughness={0.25} />
      </mesh>
    </group>
  )
}

function Particles({ lit, count }) {
  const ref = useRef()
  const pos = useMemo(() => Float32Array.from({ length: count * 3 }, (_, i) => (i % 3 === 1 ? Math.random() * -3 : (Math.random() - 0.5) * 2.5)), [count])
  useFrame((s, dt) => {
    const a = ref.current.geometry.attributes.position
    for (let i = 0; i < count; i++) { a.array[i * 3 + 1] -= dt * 0.08; if (a.array[i * 3 + 1] < -3) a.array[i * 3 + 1] = 0 }
    a.needsUpdate = true
    ref.current.material.opacity = THREE.MathUtils.lerp(ref.current.material.opacity, lit ? 0.7 : 0, 0.03)
  })
  return <points ref={ref} position={[0, 0.3, 0]}><bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} /></bufferGeometry>
    <pointsMaterial size={0.02} color="#ffd98a" transparent opacity={0} depthWrite={false} /></points>
}

function Rig({ lit, reduced, small }) {
  const lamp = useRef(), glow = useRef(), spot = useRef(), pt = useRef(), cone = useRef(), pull = useRef(0)
  const set = useRef(null)
  useEffect(() => { set.current = pull }, [])
  useFrame((s, dt) => {
    const t = s.clock.elapsedTime, k = 1 - Math.pow(0.04, dt)
    // Gentle swing, plus a kick proportional to pull.
    lamp.current.rotation.z = (reduced ? 0 : Math.sin(t * 0.9) * 0.015) + pull.current * 0.04 * Math.sin(t * 6)
    const I = lit ? 1 : 0
    pt.current.intensity = THREE.MathUtils.lerp(pt.current.intensity, I * 6, k * 0.6)
    spot.current.intensity = THREE.MathUtils.lerp(spot.current.intensity, I * 40, k * 0.6)
    glow.current.material.emissiveIntensity = THREE.MathUtils.lerp(glow.current.material.emissiveIntensity, I * 4, k)
    cone.current.material.opacity = THREE.MathUtils.lerp(cone.current.material.opacity, I * 0.12, k)
    // Cinematic push-in toward the lit area.
    s.camera.position.z = THREE.MathUtils.lerp(s.camera.position.z, lit ? 3.6 : 6.2, k * 0.5)
    s.camera.position.y = THREE.MathUtils.lerp(s.camera.position.y, lit ? -0.6 : 0, k * 0.5)
    s.camera.position.x = THREE.MathUtils.lerp(s.camera.position.x, reduced ? 0 : s.pointer.x * 0.25, 0.04) // subtle parallax
    s.camera.lookAt(0, lit ? -0.8 : 0.2, 0)
  })
  return (
    <group>
      <ambientLight intensity={0.05} />
      <group ref={lamp} position={[0, 3, 0]}>
        <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.2, 0.2, 0.08, 20]} /><meshStandardMaterial color="#222" metalness={0.8} roughness={0.5} /></mesh>
        <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.012, 0.012, 1.4, 6]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[0, -0.05, 0]}><coneGeometry args={[0.55, 0.5, 40, 1, true]} /><meshStandardMaterial color="#1c1c1c" metalness={0.9} roughness={0.35} side={THREE.DoubleSide} /></mesh>
        <mesh ref={glow} position={[0, -0.15, 0]}><sphereGeometry args={[0.16, 24, 16]} /><meshStandardMaterial color="#ffd48a" emissive="#ffb347" emissiveIntensity={0} /></mesh>
        <pointLight ref={pt} position={[0, -0.3, 0]} color="#ffb85c" distance={9} intensity={0} />
        <spotLight ref={spot} position={[0, -0.2, 0]} angle={0.7} penumbra={0.9} color="#ffbf66" distance={12} intensity={0} castShadow={!small} />
        <mesh ref={cone} position={[0, -1.8, 0]}><coneGeometry args={[1.4, 3.2, 32, 1, true]} /><meshBasicMaterial color="#ffc873" transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} /></mesh>
        <PullCord pull={pull} onTrigger={() => set.current && Rig.onTrigger?.()} />
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]} receiveShadow><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#141414" roughness={0.8} /></mesh>
      <Particles lit={lit} count={small ? 40 : 120} />
    </group>
  )
}

export default function LampScene({ lit, onPull, reduced }) {
  const small = typeof window !== 'undefined' && window.innerWidth < 768
  Rig.onTrigger = onPull
  return (
    <Canvas shadows={!small} dpr={[1, small ? 1.5 : 2]} camera={{ position: [0, 0, 6.2], fov: 45 }} gl={{ antialias: !small }} style={{ touchAction: 'none' }}>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 6, 16]} />
      <Rig lit={lit} reduced={reduced} small={small} />
    </Canvas>
  )
}
