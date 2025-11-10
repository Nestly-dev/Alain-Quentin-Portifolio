import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const sectionRef = useRef(null)
  const [activeWord, setActiveWord] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)
  
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 400])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX / innerWidth - 0.5) * 30)
      mouseY.set((clientY / innerHeight - 0.5) * 30)
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    const interval = setInterval(() => {
      setActiveWord(prev => (prev + 1) % 3)
    }, 3000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  const rotatingWords = ['Storyteller', 'Creator', 'Editor', 'Filmmaker']

  return (
    <section className="hero" id="home" ref={sectionRef}>
      {/* Apple-Style Video Background */}
      <motion.div 
        className="hero-video-container"
        style={{ scale: videoScale }}
      >
        <motion.video 
          className="hero-video"
          autoPlay 
          muted 
          loop 
          playsInline
          style={{ opacity: videoOpacity }}
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9a1c1e5&profile_id=165" type="video/mp4" />
        </motion.video>
        
        <div className="hero-overlay" />
        
        {/* Apple-Style Gradient Orbs */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '15%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(0, 113, 227, 0.25) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }}
          animate={{
            x: smoothMouseX,
            y: smoothMouseY,
            scale: [1, 1.1, 1]
          }}
          transition={{ scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '15%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(175, 82, 222, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(90px)',
            pointerEvents: 'none'
          }}
          animate={{
            x: useTransform(smoothMouseX, x => -x * 0.7),
            y: useTransform(smoothMouseY, y => -y * 0.7),
            scale: [1, 1.15, 1]
          }}
          transition={{ scale: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="hero-content"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Apple-Style Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '0.15em',
            color: '#9CA3AF',
            textTransform: 'uppercase',
            marginBottom: '2rem'
          }}
        >
          Video Editor
        </motion.div>

        {/* Massive Apple-Style Title */}
        <div style={{ perspective: 1000, marginBottom: '2rem' }}>
          <motion.h1 className="hero-title">
            {['ALAIN', 'QUENTIN'].map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                className="hero-title-line"
                initial={{ opacity: 0, y: 120, rotateX: 30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 1.4,
                  delay: 0.5 + wordIndex * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                {word.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.7 + wordIndex * 0.15 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{
                      y: -12,
                      scale: 1.1,
                      color: '#0071E3',
                      textShadow: '0 20px 40px rgba(0, 113, 227, 0.5)',
                      transition: { duration: 0.2, ease: 'easeOut' }
                    }}
                    style={{
                      display: 'inline-block',
                      transformStyle: 'preserve-3d',
                      cursor: 'default'
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Apple-Style Rotating Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            minHeight: '3rem'
          }}
        >
          <span style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontWeight: '500',
            color: '#D1D5DB',
            letterSpacing: '0.02em'
          }}>
            Video Editor &
          </span>
          <div style={{
            position: 'relative',
            width: 'clamp(140px, 15vw, 200px)',
            height: '3rem',
            overflow: 'hidden'
          }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeWord}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #0071E3, #AF52DE, #FF2D55)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  whiteSpace: 'nowrap'
                }}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {rotatingWords[activeWord]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Apple-Style CTA Buttons */}
        <motion.div
          className="hero-cta-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <motion.a
            href="#showreel"
            className="hero-cta"
            whileHover={{ 
              scale: 1.05
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: '#0071E3',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 113, 227, 0.3)'
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>View My Work</span>
            <motion.span
              style={{ position: 'relative', zIndex: 2 }}
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
            
            {/* Shimmer Effect */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                zIndex: 1
              }}
              animate={{
                left: ['−100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut'
              }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ 
              scale: 1.05,
              borderColor: '#0071E3',
              color: '#0071E3'
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              color: '#fff',
              padding: '1.2rem 2.5rem',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '60px',
              fontSize: '1.2rem',
              fontWeight: '600',
              textDecoration: 'none',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <span>Get In Touch</span>
          </motion.a>
        </motion.div>


      </motion.div>

      {/* Apple-Style Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 2.8 }}
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          style={{
            width: '24px',
            height: '40px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '8px',
            marginBottom: '0.5rem'
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            style={{
              width: '3px',
              height: '8px',
              background: '#fff',
              borderRadius: '2px'
            }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.span
          style={{
            fontSize: '0.75rem',
            color: '#9CA3AF',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>
      </motion.div>

      {/* Subtle Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            pointerEvents: 'none'
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut"
          }}
        />
      ))}
    </section>
  )
}