import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LampRoom from './LampRoom.jsx'
import Portfolio from './Portfolio.jsx'
import { playSwitchSound } from './audio.js'

export default function App() {
  const [lit, setLit] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [muted, setMuted] = useState(false)

  const handleToggleLamp = () => {
    const nextLit = !lit
    setLit(nextLit)

    if (nextLit && !revealed) {
      // Smoothly transition into resume portfolio after light illuminates the room
      setTimeout(() => {
        setRevealed(true)
      }, 1500)
    }
  }

  const handleSkip = () => {
    playSwitchSound(muted)
    setLit(true)
    setRevealed(true)
  }

  const handleRelight = () => {
    setRevealed(false)
    setLit(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleToggleMute = () => {
    setMuted((m) => !m)
  }

  return (
    <div className={`app-root ${lit ? 'theme-lit' : 'theme-dark'}`}>
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="room-view"
            className="room-screen-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.8 } }}
          >
            <LampRoom
              lit={lit}
              onToggle={handleToggleLamp}
              onSkip={handleSkip}
              muted={muted}
              onToggleMute={handleToggleMute}
            />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio-view"
            className="portfolio-screen-container"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <Portfolio
              onRelight={handleRelight}
              muted={muted}
              onToggleMute={handleToggleMute}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
