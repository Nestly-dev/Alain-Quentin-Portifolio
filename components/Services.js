// components/Services.js - ENHANCED VERSION
'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      icon: "✂️",
      title: "Video Editing",
      description: "Professional video editing for commercials, documentaries, music videos, and corporate content using industry-standard software.",
      features: ["Narrative Structure", "Pacing & Rhythm", "Transitions", "Multi-cam Editing"],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#667eea",
      story: "Every frame matters. I craft narratives that captivate from the first second to the last."
    },
    {
      icon: "🎨",
      title: "Color Grading",
      description: "Cinematic color correction and grading to enhance the visual storytelling and create the perfect mood for your project.",
      features: ["Color Correction", "Creative Grading", "Look Development", "HDR Mastering"],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      color: "#f093fb",
      story: "Color is emotion. I paint with light to evoke the feelings your story demands."
    },
    {
      icon: "🎵",
      title: "Sound Design",
      description: "Professional audio post-production including mixing, sound effects, and music composition to bring your visuals to life.",
      features: ["Audio Mixing", "SFX Design", "Music Composition", "Dialogue Enhancement"],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      color: "#4facfe",
      story: "Sound completes the vision. I create audio landscapes that immerse your audience."
    },
    {
      icon: "🎬",
      title: "Motion Graphics",
      description: "Eye-catching motion graphics and visual effects to add professional polish and enhance storytelling impact.",
      features: ["2D Animation", "Typography", "VFX Compositing", "Brand Integration"],
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      color: "#43e97b",
      story: "Motion brings energy. I design animated elements that enhance your message without overpowering it."
    },
    {
      icon: "📹",
      title: "Content Strategy",
      description: "Strategic consultation for video content creation, from concept development to platform optimization.",
      features: ["Content Planning", "Platform Optimization", "Audience Analysis", "Performance Metrics"],
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      color: "#fa709a",
      story: "Strategy drives success. I help you plan content that resonates and converts."
    },
    {
      icon: "⚡",
      title: "Fast Turnaround",
      description: "Rush projects and tight deadlines are my specialty. Quality work delivered when you need it most.",
      features: ["24-48hr Delivery", "Priority Support", "Real-time Updates", "Flexible Scheduling"],
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      color: "#fcb69f",
      story: "Speed without compromise. I deliver excellence even under the tightest deadlines."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="section services-section" id="services" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Services
      </motion.h2>

      <motion.p
        style={{
          textAlign: 'center',
          fontSize: '1.3rem',
          color: '#B0B0B0',
          maxWidth: '700px',
          margin: '0 auto 4rem',
          lineHeight: '1.6'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Comprehensive video production services tailored to bring your vision to life
      </motion.p>

      <motion.div
        className="services-grid"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            index={index}
            variants={itemVariants}
            isSelected={selectedService === index}
            onClick={() => setSelectedService(selectedService === index ? null : index)}
          />
        ))}
      </motion.div>
    </section>
  )
}

// Enhanced Service Card with 3D Effects
function ServiceCard({ service, index, variants, isSelected, onClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e) => {
    if (!isSelected) {
      const rect = e.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.set((e.clientX - centerX) / 20)
      y.set((e.clientY - centerY) / 20)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className="service-card"
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      whileHover={{ 
        y: -15, 
        scale: 1.03,
      }}
      style={{
        perspective: 1000,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <motion.div
        style={{
          rotateX: isSelected ? 0 : rotateX,
          rotateY: isSelected ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          background: 'var(--gradient-dark)',
          borderRadius: '25px',
          padding: '3rem 2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease'
        }}
        animate={{
          boxShadow: isHovered || isSelected
            ? `0 25px 50px ${service.color}30`
            : '0 10px 40px rgba(0, 0, 0, 0.3)',
          borderColor: isHovered || isSelected
            ? `${service.color}60`
            : 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: service.gradient,
            borderRadius: '25px',
            opacity: 0,
            transition: 'opacity 0.4s'
          }}
          animate={{
            opacity: isHovered || isSelected ? 0.05 : 0
          }}
        />

        {/* Floating Icon */}
        <motion.div
          className="service-icon"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: service.gradient,
            margin: '0 auto 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            position: 'relative',
            zIndex: 2
          }}
          animate={{
            rotate: isHovered ? [0, 10, -10, 0] : 0,
            scale: isHovered ? 1.15 : 1,
            boxShadow: isHovered 
              ? `0 20px 40px ${service.color}60`
              : `0 10px 30px ${service.color}40`
          }}
          transition={{ 
            duration: 0.5,
            rotate: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          {service.icon}
          
          {/* Pulse Effect */}
          <motion.div
            style={{
              position: 'absolute',
              inset: -5,
              borderRadius: '50%',
              border: `2px solid ${service.color}`,
              opacity: 0
            }}
            animate={isHovered ? {
              scale: [1, 1.5],
              opacity: [0.8, 0]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0
            }}
          />
        </motion.div>
        
        <motion.h3
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'var(--text-light)',
            position: 'relative',
            zIndex: 2,
            textAlign: 'center'
          }}
          animate={{
            color: isHovered || isSelected ? service.color : 'var(--text-light)'
          }}
        >
          {service.title}
        </motion.h3>
        
        <motion.p
          style={{
            color: 'var(--text-gray)',
            lineHeight: '1.7',
            marginBottom: '1.5rem',
            position: 'relative',
            zIndex: 2,
            textAlign: 'center'
          }}
        >
          {service.description}
        </motion.p>

        {/* Story Quote */}
        <motion.div
          style={{
            padding: '1rem',
            background: 'rgba(0,0,0,0.3)',
            borderLeft: `3px solid ${service.color}`,
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontStyle: 'italic',
            color: '#B0B0B0',
            fontSize: '0.9rem',
            position: 'relative',
            zIndex: 2
          }}
          initial={{ opacity: 0, x: -20, height: 0 }}
          animate={{
            opacity: isSelected ? 1 : 0,
            x: isSelected ? 0 : -20,
            height: isSelected ? 'auto' : 0
          }}
        >
          "{service.story}"
        </motion.div>
        
        {/* Features List */}
        <motion.div
          className="service-features"
          style={{
            position: 'relative',
            zIndex: 2,
            overflow: 'hidden'
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isSelected ? 'auto' : 0,
            opacity: isSelected ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: '1rem 0'
          }}>
            {service.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={isSelected ? {
                  opacity: 1,
                  x: 0
                } : {
                  opacity: 0,
                  x: -20
                }}
                transition={{ 
                  delay: featureIndex * 0.1,
                  duration: 0.3
                }}
                style={{
                  padding: '0.8rem',
                  marginBottom: '0.5rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <motion.span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: service.color,
                    display: 'inline-block',
                    flexShrink: 0
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [`0 0 0px ${service.color}`, `0 0 10px ${service.color}`, `0 0 0px ${service.color}`]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: featureIndex * 0.2
                  }}
                />
                <span style={{ color: '#B0B0B0' }}>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="service-cta"
          style={{
            padding: '1rem 2rem',
            background: 'transparent',
            border: `2px solid ${service.color}`,
            borderRadius: '50px',
            color: service.color,
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            fontSize: '1rem',
            position: 'relative',
            zIndex: 2,
            overflow: 'hidden'
          }}
          whileHover={{ 
            scale: 1.05,
            background: service.color,
            color: '#000'
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            opacity: isSelected ? 1 : 0.7
          }}
        >
          <motion.span style={{ position: 'relative', zIndex: 1 }}>
            {isSelected ? 'Hide Details' : 'Learn More'}
          </motion.span>
          
          {/* Button hover effect */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: service.gradient,
              opacity: 0
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Number Badge */}
        <motion.div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${service.color}20, transparent)`,
            border: `2px solid ${service.color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: '700',
            color: service.color,
            zIndex: 3
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1, type: "spring" }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        {/* Corner Accent */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '100px',
            height: '100px',
            background: service.gradient,
            opacity: 0.1,
            borderRadius: '25px 0 25px 0',
            transition: 'opacity 0.3s'
          }}
          animate={{
            opacity: isHovered ? 0.2 : 0.1
          }}
        />
      </motion.div>
    </motion.div>
  )
}