// app/page.js
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

// Dynamic imports for better performance
const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false })
const Hero = dynamic(() => import('../components/Hero'), { ssr: false })
const Showreel = dynamic(() => import('../components/Showreel'), { ssr: false })
const Portfolio = dynamic(() => import('../components/Portfolio'), { ssr: false })
const Process = dynamic(() => import('../components/Process'), { ssr: false })
const About = dynamic(() => import('../components/About'), { ssr: false })
const Services = dynamic(() => import('../components/Services'), { ssr: false })
const Contact = dynamic(() => import('../components/Contact'), { ssr: false })
const Footer = dynamic(() => import('../components/Footer'), { ssr: false })
const Loader = dynamic(() => import('../components/Loader'), { ssr: false })
const SmoothScrollProvider = dynamic(() => import('../components/SmoothScrollProvider'), { ssr: false })

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    const handleMouseMove = (e) => {
      if (typeof window !== 'undefined') {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1
        })
      }
    }

    let ticking = false
    const optimizedMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e)
          ticking = false
        })
        ticking = true
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', optimizedMouseMove, { passive: true })
    }

    return () => {
      clearTimeout(timer)
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', optimizedMouseMove)
      }
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SmoothScrollProvider>
      <main className="portfolio-main">
        {/* Animated Background */}
        <div className="animated-background" />
        
        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="main-content"
            >
              <Navbar />
              <Hero />
              <Showreel />
              <Portfolio />
              <Process />
              <About />
              <Services />
              <Contact />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </SmoothScrollProvider>
  )
}