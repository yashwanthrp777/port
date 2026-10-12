import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Sparkles } from 'lucide-react'
import { playSwitchSound } from './audio.js'

export default function LampRoom({ lit, onToggle, onSkip, muted, onToggleMute }) {
  const [pullDist, setPullDist] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [flickering, setFlickering] = useState(false)
  const [sparks, setSparks] = useState([])
  const dragStartY = useRef(0)
  const currentPull = useRef(0)
  const animFrame = useRef(null)

  const TRIGGER_DIST = 52
  const MAX_PULL = 90

  // Trigger realistic switch activation with Edison filament flicker
  const triggerSwitch = useCallback(() => {
    playSwitchSound(muted)
    if (navigator.vibrate) {
      try {
        navigator.vibrate([25, 35, 20])
      } catch {}
    }

    // Realistic filament electric spark shower
    const newSparks = Array.from({ length: 28 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 90,
      y: Math.random() * 80 - 15,
      scale: Math.random() * 0.9 + 0.4,
      duration: Math.random() * 0.45 + 0.35,
    }))
    setSparks(newSparks)
    setTimeout(() => setSparks([]), 850)

    // Edison bulb in-rush current flicker
    setFlickering(true)
    setTimeout(() => setFlickering(false), 380)

    onToggle()
  }, [muted, onToggle])

  // Elastic thread spring-back animation
  const releaseSpring = useCallback(() => {
    setIsDragging(false)
    let vel = 0
    let pos = currentPull.current

    const step = () => {
      const force = -pos * 0.32
      vel = (vel + force) * 0.7
      pos += vel

      if (Math.abs(pos) < 0.5 && Math.abs(vel) < 0.5) {
        setPullDist(0)
        currentPull.current = 0
        return
      }

      setPullDist(pos)
      currentPull.current = pos
      animFrame.current = requestAnimationFrame(step)
    }

    cancelAnimationFrame(animFrame.current)
    animFrame.current = requestAnimationFrame(step)
  }, [])

  // Pointer drag for mouse and iPhone/Android touch
  const handlePointerDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    dragStartY.current = e.clientY || (e.touches && e.touches[0].clientY) || 0
    cancelAnimationFrame(animFrame.current)
  }

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging) return
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0
      const delta = Math.max(0, clientY - dragStartY.current)
      const clamped = Math.min(MAX_PULL, delta)
      currentPull.current = clamped
      setPullDist(clamped)

      if (clamped >= TRIGGER_DIST) {
        setIsDragging(false)
        triggerSwitch()
        releaseSpring()
      }
    },
    [isDragging, triggerSwitch, releaseSpring]
  )

  const handlePointerUp = useCallback(() => {
    if (isDragging) {
      if (currentPull.current >= TRIGGER_DIST) {
        triggerSwitch()
      } else if (currentPull.current < 10) {
        // Direct tap on the thread handle: snap pull & trigger
        setPullDist(TRIGGER_DIST)
        currentPull.current = TRIGGER_DIST
        setTimeout(() => {
          triggerSwitch()
          releaseSpring()
        }, 120)
        return
      }
      releaseSpring()
    }
  }, [isDragging, triggerSwitch, releaseSpring])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
      window.addEventListener('touchmove', handlePointerMove, { passive: false })
      window.addEventListener('touchend', handlePointerUp)
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('touchend', handlePointerUp)
    }
  }, [isDragging, handlePointerMove, handlePointerUp])

  // Thread geometry calculation
  const baseCordLen = 145
  const activeCordLen = baseCordLen + pullDist

  return (
    <main className={`real-room ${lit ? 'lit-on' : 'pitch-dark'} ${flickering ? 'flickering' : ''}`} id="room">
      {/* 100% Pitch Black Background - Only lights up when lit */}
      <div className="pitch-black-layer" />

      {/* Realistic Volumetric Warm Light Cone - ZERO opacity when unlit */}
      <div className={`realistic-light-cone ${lit ? 'cone-active' : ''}`} id="lightCone">
        <div className="cone-core" />
        <div className="cone-ambient-glow" />
        <div className="floor-light-spot" />
      </div>

      {/* Realistic Vintage Pendant Lamp & Hanging Thread */}
      <div className="realistic-lamp-rig">
        {/* Ceiling Mount */}
        <div className="ceiling-canopy" />
        {/* Braided Vintage Cable */}
        <div className="braided-cable" />

        {/* Lamp Shade & Socket Assembly */}
        <div className="shade-assembly">
          {/* Solid Steel & Brass Industrial Shade */}
          <div className="matte-shade">
            <div className="shade-brass-cap" />
            <div className="shade-inner-reflector" />
            <div className="shade-gold-rim" />
          </div>

          {/* Filament Bulb with Realistic Incandescent Glow */}
          <div className={`incandescent-bulb ${lit ? 'illuminated' : ''}`}>
            <div className="glass-reflection" />
            <div className="coiled-filament" />
            <div className="incandescent-aura" />
          </div>

          {/* Spark Eruption */}
          {sparks.map((s) => (
            <span
              key={s.id}
              className="realistic-spark"
              style={{
                '--sx': `${s.x}px`,
                '--sy': `${s.y}px`,
                '--scale': s.scale,
                '--dur': `${s.duration}s`,
              }}
            />
          ))}

          {/* Interactive Hanging Thread / Cord with Physics */}
          <div
            className="hanging-thread-system"
            onPointerDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            title="Pull the thread to switch on the light"
          >
            <svg
              className="thread-svg"
              width="24"
              height={activeCordLen + 30}
              viewBox={`0 0 24 ${activeCordLen + 30}`}
            >
              <defs>
                <linearGradient id="goldThread" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd875" />
                  <stop offset="50%" stopColor="#dca842" />
                  <stop offset="100%" stopColor="#8a6119" />
                </linearGradient>
              </defs>
              {/* Elastic Braided Thread Line */}
              <line
                x1="12"
                y1="0"
                x2="12"
                y2={activeCordLen}
                stroke="url(#goldThread)"
                strokeWidth={isDragging ? 2.8 : 2.2}
                strokeDasharray="3, 1.5"
              />
            </svg>

            {/* Weighted Brass Tear-drop Bell Pull */}
            <div
              className={`thread-handle ${isDragging ? 'dragging' : ''}`}
              style={{ transform: `translate3d(0, ${pullDist}px, 0)` }}
            >
              <div className="thread-bell">
                <span className="bell-highlight" />
              </div>
              <div className="thread-tassel" />
              {/* Subtle guide pulse when room is dark */}
              {!lit && <span className="thread-pulse-ring" />}
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric UI Controls & Guidance */}
      <div className="room-overlay-ui">
        {/* Top Controls */}
        <div className="dark-top-nav">
          <div className="room-status-tag">
            <span className={`status-indicator ${lit ? 'lit' : 'dark'}`} />
            <span>{lit ? 'Room Illuminated' : 'Pitch Black Mode'}</span>
          </div>

          <div className="nav-btn-group">
            <button
              className="ghost-circle-btn"
              onClick={onToggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <button className="ghost-pill-btn" onClick={onSkip}>
              Skip Intro
            </button>
          </div>
        </div>

        {/* Realistic Call To Action */}
        <AnimatePresence>
          {!lit && (
            <motion.div
              className="dark-intro-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <p className="dim-eyebrow">
                <Sparkles size={14} className="amber-sparkle" />
                <span>PULL THE THREAD TO REVEAL</span>
              </p>
              <h1 className="dim-heading">
                DARKNESS INTO <span className="gold-shimmer">LIGHT.</span>
              </h1>
              <p className="dim-subtext">
                Drag down or tap the hanging thread to switch on the room light.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Revealed explore CTA */}
        <AnimatePresence>
          {lit && (
            <motion.div
              className="revealed-cta-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <button className="golden-enter-btn" onClick={onSkip}>
                Enter Yashwanth's Portfolio →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
