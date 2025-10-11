// components/Process.js
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Process() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  const processSteps = [
    {
      icon: "🎬",
      title: "Pre-Production",
      description: "Script analysis, storyboarding, and planning the editing workflow before touching any footage."
    },
    {
      icon: "✂️",
      title: "Rough Cut",
      description: "Assembly editing to establish the basic structure and narrative flow of the project."
    },
    {
      icon: "🎨",
      title: "Fine Cut",
      description: "Detailed editing with precise timing, transitions, and emotional beats to perfect the story."
    },
    {
      icon: "🎵",
      title: "Sound Design",
      description: "Audio mixing, sound effects, and music composition to enhance the emotional impact."
    },
    {
      icon: "🌈",
      title: "Color Grading",
      description: "Professional color correction and grading to achieve the perfect cinematic look."
    },
    {
      icon: "📤",
      title: "Final Delivery",
      description: "Exporting in multiple formats optimized for different platforms and use cases."
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
            whileHover={{ 
              y: -10, 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(212, 175, 55, 0.2)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="process-icon"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              {step.icon}
            </motion.div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            
            <motion.div
              className="step-number"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}