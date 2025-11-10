// components/Navbar.js
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleResize = () => {
      checkMobile()
      if (window.innerWidth > 768) {
        setMobileMenu(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenu])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Showreel', href: '#showreel' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled 
            ? 'rgba(10, 10, 10, 0.95)' 
            : 'rgba(10, 10, 10, 0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid transparent',
          transition: 'all 0.3s ease',
          padding: isMobile ? '1rem 1.5rem' : '1.5rem 3rem'
        }}
      >
        <div 
          className="nav-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          <motion.a
            href="#home"
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: '700',
              color: '#D4AF37',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #D4AF37, #FFE55C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
              zIndex: 1001
            }}
          >
            AQ
          </motion.a>

          {/* Desktop Navigation */}
          <ul 
            className="nav-links desktop"
            style={{
              display: isMobile ? 'none' : 'flex',
              listStyle: 'none',
              gap: '2rem',
              margin: 0,
              padding: 0,
              alignItems: 'center'
            }}
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.a
                  href={item.href}
                  whileHover={{ y: -2, color: '#D4AF37' }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {item.name}
                </motion.a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Hamburger Button */}
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
            whileTap={{ scale: 0.9 }}
            style={{
              display: isMobile ? 'flex' : 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '44px',
              height: '44px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              gap: '6px',
              zIndex: 1001,
              position: 'relative'
            }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{
                rotate: mobileMenu ? 45 : 0,
                y: mobileMenu ? 8 : 0,
                backgroundColor: mobileMenu ? '#D4AF37' : '#fff'
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '28px',
                height: '3px',
                background: '#fff',
                borderRadius: '3px',
                transformOrigin: 'center'
              }}
            />
            <motion.span
              animate={{
                opacity: mobileMenu ? 0 : 1,
                scale: mobileMenu ? 0 : 1
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '28px',
                height: '3px',
                background: '#fff',
                borderRadius: '3px'
              }}
            />
            <motion.span
              animate={{
                rotate: mobileMenu ? -45 : 0,
                y: mobileMenu ? -8 : 0,
                backgroundColor: mobileMenu ? '#D4AF37' : '#fff'
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '28px',
                height: '3px',
                background: '#fff',
                borderRadius: '3px',
                transformOrigin: 'center'
              }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 999
              }}
              onClick={() => setMobileMenu(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring',
                damping: 30,
                stiffness: 300
              }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '85%',
                maxWidth: '400px',
                background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.98), rgba(10, 10, 10, 0.98))',
                backdropFilter: 'blur(20px)',
                zIndex: 1000,
                padding: '6rem 2rem 2rem',
                overflowY: 'auto',
                boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.5)'
              }}
            >
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.4,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    onClick={() => setMobileMenu(false)}
                    whileTap={{ scale: 0.95, x: 10 }}
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      padding: '1.25rem 1.5rem',
                      borderRadius: '15px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      touchAction: 'manipulation'
                    }}
                  >
                    <span>{item.name}</span>
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      style={{ fontSize: '1.2rem', color: '#D4AF37' }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                ))}
              </nav>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <p style={{
                  color: '#808080',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  lineHeight: '1.6'
                }}>
                  Video Editor & Storyteller
                </p>
                <motion.a
                  href="#contact"
                  onClick={() => setMobileMenu(false)}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'block',
                    marginTop: '1.5rem',
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #D4AF37, #FFE55C)',
                    color: '#000',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: '700',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    touchAction: 'manipulation'
                  }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}