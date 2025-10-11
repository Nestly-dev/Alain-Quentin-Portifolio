// components/Portfolio.js
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

export default function Portfolio() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = ['all', 'interviews', 'courses', 'commercial', 'travel', 'podcast']

  const projects = [
    {
      id: 1,
      title: "Nike Campaign",
      category: "commercial",
      image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=300&fit=crop",
      description: "High-energy commercial showcasing Nike's latest athletic wear collection"
    },
    {
      id: 2,
      title: "Ocean Stories",
      category: "documentary",
      image: "https://images.unsplash.com/photo-1533628635777-112b2239b1c7?w=400&h=300&fit=crop",
      description: "Environmental documentary about ocean conservation"
    },
    {
      id: 3,
      title: "Wanderlust",
      category: "travel",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      description: "Travel documentary exploring remote destinations"
    },
    {
      id: 4,
      title: "Electric Dreams",
      category: "music",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      description: "Futuristic music video with stunning visual effects"
    },
    {
      id: 5,
      title: "Apple Innovation",
      category: "commercial",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      description: "Product launch video for Apple's latest technology"
    },
    {
      id: 6,
      title: "Mountain Calling",
      category: "travel",
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop",
      description: "Adventure film capturing the spirit of mountain climbing"
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <section className="section portfolio-section" id="portfolio" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Portfolio
      </motion.h2>

      <motion.div
        className="portfolio-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filters.map(filter => (
          <motion.button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="portfolio-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              className="portfolio-item"
              variants={itemVariants}
              layout
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="portfolio-image-container">
                <img src={project.image} alt={project.title} />
                <motion.div
                  className="portfolio-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="portfolio-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <motion.button
                      className="view-project-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Project
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}