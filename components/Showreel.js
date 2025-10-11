// components/Showreel.js
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

export default function Showreel() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [activeVideo, setActiveVideo] = useState(null)

  const videos = [
    {
      id: 1,
      title: "Commercial Showreel 2025",
      description: "A collection of my best commercial work featuring brands like Nike, Apple, and Mercedes-Benz.",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop",
      category: "Commercial"
    },
    {
      id: 2,
      title: "Documentary Portfolio",
      description: "Emotional storytelling through documentary filmmaking and narrative editing.",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop",
      category: "Documentary"
    },
    {
      id: 3,
      title: "Documentary Portf",
      description: "Emotional storytelling through documentary filmmaking and narrative editing.",
      thumbnail: "https://rentals-app-bucket.s3.eu-north-1.amazonaws.com/1744716416997-pexels-tomfisk-2435296.jpg",
      category: "Documentary"
    }
  ]

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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="section showreel-section" id="showreel" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Featured Showreel
      </motion.h2>

      <motion.div
        className="showreel-grid"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className="video-card"
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            onHoverStart={() => setActiveVideo(video.id)}
            onHoverEnd={() => setActiveVideo(null)}
          >
            <div className="video-thumbnail-container">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="video-thumbnail"
              />
              
              <motion.div
                className="video-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: activeVideo === video.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="play-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.div>
              </motion.div>

              <div className="video-category">{video.category}</div>
            </div>

            <motion.div
              className="video-info"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: activeVideo === video.id ? 0 : 20,
                opacity: activeVideo === video.id ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}