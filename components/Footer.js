// components/Footer.js
'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <footer 
      className="footer"
      style={{
        background: 'linear-gradient(to top, #000, rgba(10, 10, 10, 0.95))',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: isMobile ? '3rem 1.5rem 2rem' : '4rem 3rem 2rem'
      }}
    >
      <div 
        className="footer-content"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr 1fr 1fr',
          gap: isMobile ? '2.5rem' : '3rem',
          marginBottom: isMobile ? '2.5rem' : '3rem'
        }}
      >
        <motion.div
          className="footer-logo"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span 
            className="logo"
            style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #D4AF37, #FFE55C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              marginBottom: '0.75rem'
            }}
          >
            AQ
          </span>
          <p style={{
            color: '#B0B0B0',
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight: '1.6',
            marginBottom: '1rem'
          }}>
            Video Editor & Storyteller
          </p>
          <p style={{
            color: '#808080',
            fontSize: isMobile ? '0.85rem' : '0.9rem',
            lineHeight: '1.6'
          }}>
            Transforming ideas into compelling visual narratives that inspire and engage.
          </p>
        </motion.div>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h4 style={{
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Navigation
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {['Home', 'Showreel', 'Portfolio', 'About'].map((item, index) => (
              <li key={item}>
                <motion.a 
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ x: 5, color: '#D4AF37' }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: '#B0B0B0',
                    textDecoration: 'none',
                    fontSize: isMobile ? '0.9rem' : '0.95rem',
                    display: 'inline-block',
                    transition: 'color 0.3s ease',
                    touchAction: 'manipulation'
                  }}
                >
                  {item}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 style={{
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Services
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {['Video Editing', 'Color Grading', 'Sound Design', 'Motion Graphics'].map((item, index) => (
              <li key={item}>
                <motion.a 
                  href="#services"
                  whileHover={{ x: 5, color: '#D4AF37' }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: '#B0B0B0',
                    textDecoration: 'none',
                    fontSize: isMobile ? '0.9rem' : '0.95rem',
                    display: 'inline-block',
                    transition: 'color 0.3s ease',
                    touchAction: 'manipulation'
                  }}
                >
                  {item}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 style={{
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Connect
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {[
              { name: 'Instagram', url: 'https://www.instagram.com/gentil_quentin/' },
              { name: 'YouTube', url: 'https://www.youtube.com/@gentilquentin' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/alain-quentin-rurangirwa-ineza-b057002b7/' }
            ].map((item, index) => (
              <li key={item.name}>
                <motion.a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, color: '#D4AF37' }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: '#B0B0B0',
                    textDecoration: 'none',
                    fontSize: isMobile ? '0.9rem' : '0.95rem',
                    display: 'inline-block',
                    transition: 'color 0.3s ease',
                    touchAction: 'manipulation'
                  }}
                >
                  {item.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          paddingTop: isMobile ? '2rem' : '2.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          textAlign: 'center'
        }}
      >
        <p style={{
          color: '#808080',
          fontSize: isMobile ? '0.85rem' : '0.9rem',
          marginBottom: '0.5rem'
        }}>
          &copy; 2025 Alain Quentin. All rights reserved.
        </p>
        <p style={{
          color: '#606060',
          fontSize: isMobile ? '0.8rem' : '0.85rem',
          fontStyle: 'italic'
        }}>
          Crafted with passion for visual storytelling.
        </p>
      </motion.div>
    </footer>
  )
}