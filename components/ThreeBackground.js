// components/ThreeBackground.js
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function ParticleField({ mousePosition }) {
  const ref = useRef()
  
  const particles = useMemo(() => {
    const temp = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3
      temp[i3] = (Math.random() - 0.5) * 50
      temp[i3 + 1] = (Math.random() - 0.5) * 50
      temp[i3 + 2] = (Math.random() - 0.5) * 50
    }
    return temp
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.075
      ref.current.position.x = mousePosition.x * 2
      ref.current.position.y = mousePosition.y * 2
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#D4AF37"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function FloatingShapes({ mousePosition }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1 + mousePosition.y * 0.5
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15 + mousePosition.x * 0.5
    }
  })

  const shapes = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      ],
      id: i
    }))
  }, [])

  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        <mesh key={shape.id} position={shape.position}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color="#00D4FF"
            transparent
            opacity={0.1}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}

function AnimatedSphere({ mousePosition }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5 + mousePosition.x * 3
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 3 + mousePosition.y * 3
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#D4AF37"
        transparent
        opacity={0.05}
        wireframe
      />
    </mesh>
  )
}

export default function ThreeBackground({ mousePosition }) {
  return (
    <div className="three-background">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none'
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#00D4FF" />
        
        <ParticleField mousePosition={mousePosition} />
        <FloatingShapes mousePosition={mousePosition} />
        <AnimatedSphere mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}