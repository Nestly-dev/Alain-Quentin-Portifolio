// components/Services.js
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  const services = [
    {
      icon: "✂️",
      title: "Video Editing",
      description: "Professional video editing for commercials, documentaries, music videos, and corporate content using industry-standard software.",
      features: ["Narrative Structure", "Pacing & Rhythm", "Transitions", "Multi-cam Editing"]
    },
    {
      icon: "🎨",
      title: "Color Grading",
      description: "Cinematic color correction and grading to enhance the visual storytelling and create the perfect mood for your project.",
      features: ["Color Correction", "Creative Grading", "Look Development", "HDR Mastering"]
    },
    {
      icon: "🎵",
      title: "Sound Design",
      description: "Professional audio post-production including mixing, sound effects, and music composition to bring your visuals to life.",
      features: ["Audio Mixing", "SFX Design", "Music Composition", "Dialogue Enhancement"]
    },
    {
      icon: "🎬",
      title: "Motion Graphics",
      description: "Eye-catching motion graphics and visual effects to add professional polish and enhance storytelling impact.",
      features: ["2D Animation", "Typography", "VFX Compositing", "Brand Integration"]
    },
    {
      icon: "📹",
      title: "Content Strategy",
      description: "Strategic consultation for video content creation, from concept development to platform optimization.",
      features: ["Content Planning", "Platform Optimization", "Audience Analysis", "Performance Metrics"]
    },
    {
      icon: "⚡",
      title: "Fast Turnaround",
      description: "Rush projects and tight deadlines are my specialty. Quality work delivered when you need it most.",
      features: ["24-48hr Delivery", "Priority Support", "Real-time Updates", "Flexible Scheduling"]
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

      <motion.div
        className="services-grid"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            variants={itemVariants}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(212, 175, 55, 0.15)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="service-icon"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              {service.icon}
            </motion.div>
            
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            
            <motion.div
              className="service-features"
              initial={{ opacity: 0, height: 0 }}
              whileHover={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <ul>
                {service.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ delay: featureIndex * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.button
              className="service-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}