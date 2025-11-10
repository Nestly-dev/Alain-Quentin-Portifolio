// components/Process.js - ENHANCED VERSION
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

export default function Process() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [activeStep, setActiveStep] = useState(null)

  const processSteps = [
    {
      icon: "🎬",
      title: "Pre-Production",
      description: "Script analysis, storyboarding, and planning the editing workflow before touching any footage.",
      details: "Understanding your vision is where every great project begins. I analyze scripts, create storyboards, and develop a comprehensive editing strategy.",
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      timeline: "1-2 days"
    },
    {
      icon: "✂️",
      title: "Rough Cut",
      description: "Assembly editing to establish the basic structure and narrative flow of the project.",
      details: "Building the foundation by selecting the best takes, establishing rhythm, and creating the initial story structure that brings your vision to life.",
      color: "#f093fb",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      timeline: "1-2 days"
    },
    {
      icon: "🎨",
      title: "Fine Cut",
      description: "Detailed editing with precise timing, transitions, and emotional beats to perfect the story.",
      details: "Refining every frame with perfected timing, seamless transitions, and sculpting emotional moments that resonate with audiences.",
      color: "#4facfe",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      timeline: "1-2 days"
    },
    {
      icon: "🎵",
      title: "Sound Design",
      description: "Audio mixing, sound effects, and music composition to enhance the emotional impact.",
      details: "Sound completes the vision with dialogue mixing, effect design, and music integration that amplifies every emotion.",
      color: "#43e97b",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      timeline: "1 day"
    },
    {
      icon: "🌈",
      title: "Color Grading",
      description: "Professional color correction and grading to achieve the perfect cinematic look.",
      details: "Painting with light through color correction for consistency and creative grading to establish mood and atmosphere.",
      color: "#fa709a",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      timeline: "1 day"
    },
    {
      icon: "📤",
      title: "Final Delivery",
      description: "Exporting in multiple formats optimized for different platforms and use cases.",
      details: "Delivering excellence by exporting in all required formats, optimized for every platform from cinema to social media.",
      color: "#ffecd2",
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      timeline: "1 day"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="section process-section" id="process" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        My Process
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
        A systematic approach to transforming raw footage into compelling stories
      </motion.p>

      <motion.div
        className="process-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {processSteps.map((step, index) => (
          <motion.div
            key={index}
            className="process-step"
            variants={itemVariants}
            onClick={() => setActiveStep(activeStep === index ? null : index)}
            whileHover={{ 
              y: -10, 
              scale: 1.05,
              boxShadow: `0 25px 50px ${step.color}30`
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'relative',
              cursor: 'pointer',
              background: 'var(--gradient-dark)',
              borderRadius: '25px',
              padding: '3rem 2rem',
              border: activeStep === index ? `2px solid ${step.color}` : '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden'
            }}
          >
            {/* Background Gradient */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: step.gradient,
                opacity: 0,
                transition: 'opacity 0.4s'
              }}
              animate={{
                opacity: activeStep === index ? 0.05 : 0
              }}
            />

            {/* Icon */}
            <motion.div
              className="process-icon"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: step.gradient,
                margin: '0 auto 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                position: 'relative',
                zIndex: 2,
                boxShadow: `0 20px 40px ${step.color}40`
              }}
              whileHover={{ 
                rotate: 360,
                scale: 1.2
              }}
              transition={{ duration: 0.6 }}
            >
              {step.icon}
              
              {/* Pulse Ring */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: -5,
                  borderRadius: '50%',
                  border: `3px solid ${step.color}`,
                  opacity: 0
                }}
                animate={activeStep === index ? {
                  scale: [1, 1.3, 1.3],
                  opacity: [0.8, 0, 0]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: activeStep === index ? Infinity : 0
                }}
              />
            </motion.div>

            {/* Title */}
            <motion.h3
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: activeStep === index ? step.color : '#fff',
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                transition: 'color 0.3s'
              }}
            >
              {step.title}
            </motion.h3>

            {/* Timeline Badge */}
            <motion.div
              style={{
                display: 'inline-block',
                padding: '0.4rem 1rem',
                background: `${step.color}20`,
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                color: step.color,
                marginBottom: '1rem',
                border: `1px solid ${step.color}40`,
                position: 'relative',
                zIndex: 2
              }}
            >
              ⏱ {step.timeline}
            </motion.div>

            {/* Description */}
            <motion.p
              style={{
                color: '#B0B0B0',
                lineHeight: '1.7',
                marginBottom: '1rem',
                position: 'relative',
                zIndex: 2,
                textAlign: 'center'
              }}
            >
              {step.description}
            </motion.p>

            {/* Expandable Details */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: activeStep === index ? 'auto' : 0,
                opacity: activeStep === index ? 1 : 0
              }}
              transition={{ duration: 0.4 }}
              style={{
                overflow: 'hidden',
                position: 'relative',
                zIndex: 2
              }}
            >
              <motion.div
                style={{
                  padding: '1rem',
                  background: 'rgba(0,0,0,0.3)',
                  borderLeft: `3px solid ${step.color}`,
                  borderRadius: '8px',
                  marginTop: '1rem',
                  fontStyle: 'italic',
                  color: '#D4AF37'
                }}
              >
                {step.details}
              </motion.div>
            </motion.div>

            {/* Expand/Collapse Indicator */}
            <motion.div
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                color: step.color,
                fontSize: '0.9rem',
                fontWeight: '600',
                position: 'relative',
                zIndex: 2
              }}
            >
              <span>{activeStep === index ? 'Less' : 'More'} Details</span>
              <motion.span
                animate={{
                  rotate: activeStep === index ? 180 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </motion.div>

            {/* Step Number Badge */}
            <motion.div
              className="step-number"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${step.color}20, transparent)`,
                border: `2px solid ${step.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: '700',
                color: step.color,
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
                background: step.gradient,
                opacity: 0.1,
                borderRadius: '25px 0 25px 0',
                zIndex: 1
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}