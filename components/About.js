import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [isMobile, setIsMobile] = useState(false)
  const statsRef = useRef([])

  const stats = [
    { number: 250, label: "Projects Completed", suffix: "+" },
    { number: 50, label: "Happy Clients", suffix: "+" },
    { number: 3, label: "Years Experience", suffix: "+" }
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (inView) {
      statsRef.current.forEach((stat, index) => {
        gsap.fromTo(stat, 
          { innerText: 0 },
          {
            innerText: stats[index].number,
            duration: 2,
            delay: index * 0.2,
            ease: "power2.out",
            snap: { innerText: 1 },
            onUpdate: function() {
              stat.innerText = Math.ceil(this.targets()[0].innerText) + stats[index].suffix
            }
          }
        )
      })
    }
  }, [inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="section about-section" id="about" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 5vw, 4rem)',
          padding: isMobile ? '0 1rem' : '0'
        }}
      >
        About Me
      </motion.h2>

      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 1.5rem' : '0 2rem'
        }}
      >
        <motion.div 
          className="about-image" 
          variants={itemVariants}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: isMobile ? '100%' : '500px',
            margin: isMobile ? '0 auto' : '0',
            order: isMobile ? -1 : 0
          }}
        >
          <img 
            src="https://rentals-app-bucket.s3.eu-north-1.amazonaws.com/DSC00016.jpeg" 
            alt="Alain Quentin"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              display: 'block'
            }}
          />
          {!isMobile && (
            <motion.div
              className="image-overlay"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: '2rem'
              }}
            >
              <div className="overlay-content">
                <p style={{
                  color: '#D4AF37',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                  "Every frame tells a story"
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          className="about-content" 
          variants={itemVariants}
          style={{
            padding: isMobile ? '0' : '0'
          }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#fff',
              lineHeight: '1.2'
            }}
          >
            Crafting Stories Through Film
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              color: '#B0B0B0',
              lineHeight: '1.8',
              marginBottom: '1.5rem',
              fontSize: isMobile ? '1rem' : '1.1rem'
            }}
          >
            With over 3 years of experience in video editing, I've had the privilege of working with some of the world's most recognized brands and talented filmmakers. My passion lies in transforming raw footage into compelling narratives that resonate with audiences.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              color: '#B0B0B0',
              lineHeight: '1.8',
              marginBottom: '2rem',
              fontSize: isMobile ? '1rem' : '1.1rem'
            }}
          >
            I specialize in commercial advertising, documentary filmmaking, highlights and impact stories, bringing a unique blend of technical expertise and creative vision to every project. My work has been featured in international film festivals and has garnered millions of views across digital platforms.
          </motion.p>

          <motion.div
            className="skills-container"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h4 style={{
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#fff'
            }}>
              Expertise
            </h4>
            <div 
              className="skills-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: isMobile ? '0.75rem' : '1rem'
              }}
            >
              {['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects','Blender',"Adobe Animate", 'Photoshop', 'Lightroom', 'Media Encoder'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  whileHover={!isMobile ? { scale: 1.05, backgroundColor: "#D4AF37" } : {}}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: isMobile ? '0.6rem 0.8rem' : '0.8rem 1.2rem',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '12px',
                    color: '#D4AF37',
                    fontSize: isMobile ? '0.75rem' : '0.9rem',
                    fontWeight: '600',
                    textAlign: 'center',
                    cursor: 'default',
                    transition: 'all 0.3s ease',
                    touchAction: 'manipulation'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="stats-grid"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '1.5rem' : '3rem',
          maxWidth: '1000px',
          margin: '4rem auto 0',
          padding: isMobile ? '0 1.5rem' : '0 2rem'
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-item"
            whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            style={{
              textAlign: 'center',
              padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(0, 212, 255, 0.05))',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '24px',
              cursor: 'default',
              touchAction: 'manipulation'
            }}
          >
            <div 
              ref={el => statsRef.current[index] = el}
              className="stat-number"
              style={{
                fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(3rem, 5vw, 5rem)',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #D4AF37, #FFE55C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}
            >
              0{stat.suffix}
            </div>
            <p style={{
              color: '#B0B0B0',
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              fontWeight: '500',
              margin: 0
            }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}