// components/Portfolio.js
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

export default function Portfolio() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [activeFilter, setActiveFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const filters = ['all', 'interviews', 'commercial', 'impact stories', 'travel', 'podcast', 'courses', 'storytelling']

  const projects = [
    // Interviews
    { id: 1, title: "Interview Series - Episode 1", category: "interviews", videoId: "4RZ6bBRSIFo", thumbnail: "https://img.youtube.com/vi/4RZ6bBRSIFo/maxresdefault.jpg", description: "In-depth conversation exploring unique perspectives" },
    { id: 2, title: "Interview Series - Episode 2", category: "interviews", videoId: "qfUnJw7ksW0", thumbnail: "https://img.youtube.com/vi/qfUnJw7ksW0/maxresdefault.jpg", description: "Candid discussion with industry leaders" },
    { id: 3, title: "Interview Series - Episode 3", category: "interviews", videoId: "WMOgmg9hsLw", thumbnail: "https://img.youtube.com/vi/WMOgmg9hsLw/maxresdefault.jpg", description: "Inspiring stories of success and resilience" },
    { id: 4, title: "Interview Series - Episode 4", category: "interviews", videoId: "ZW80Rfh9sFQ", thumbnail: "https://img.youtube.com/vi/ZW80Rfh9sFQ/maxresdefault.jpg", description: "Expert insights and professional wisdom" },
    { id: 5, title: "Interview Series - Episode 5", category: "interviews", videoId: "sHQjujWaaBc", thumbnail: "https://img.youtube.com/vi/sHQjujWaaBc/maxresdefault.jpg", description: "Authentic conversations that matter" },
    
    // Commercial
    { id: 6, title: "Commercial Campaign 1", category: "commercial", videoId: "lm8zA2RYg7Y", thumbnail: "https://img.youtube.com/vi/lm8zA2RYg7Y/maxresdefault.jpg", description: "Brand storytelling with cinematic flair" },
    { id: 7, title: "Commercial Campaign 2", category: "commercial", videoId: "jd1MplcMhQQ", thumbnail: "https://img.youtube.com/vi/jd1MplcMhQQ/maxresdefault.jpg", description: "High-impact product showcase" },
    { id: 8, title: "Commercial Campaign 3", category: "commercial", videoId: "0zKqljHDa68", thumbnail: "https://img.youtube.com/vi/0zKqljHDa68/maxresdefault.jpg", description: "Creative advertising excellence" },
    { id: 9, title: "Commercial Campaign 4", category: "commercial", videoId: "KEtG2RcmrM0", thumbnail: "https://img.youtube.com/vi/KEtG2RcmrM0/maxresdefault.jpg", description: "Dynamic brand experience" },
    
    // Impact Stories
    { id: 10, title: "Impact Story 1", category: "impact stories", videoId: "I3ZQ_znSmrE", thumbnail: "https://img.youtube.com/vi/I3ZQ_znSmrE/maxresdefault.jpg", description: "Stories that inspire change" },
    { id: 11, title: "Impact Story 2", category: "impact stories", videoId: "lm8zA2RYg7Y", thumbnail: "https://img.youtube.com/vi/lm8zA2RYg7Y/maxresdefault.jpg", description: "Making a difference through film" },
    { id: 12, title: "Impact Story 3", category: "impact stories", videoId: "r0XNVKOkqpw", thumbnail: "https://img.youtube.com/vi/r0XNVKOkqpw/maxresdefault.jpg", description: "Powerful narratives of transformation" },
    
    // Travel
    { id: 13, title: "Travel Vlog - Destination 1", category: "travel", videoId: "yYowFOea3jM", thumbnail: "https://img.youtube.com/vi/yYowFOea3jM/maxresdefault.jpg", description: "Exploring breathtaking locations" },
    { id: 14, title: "Travel Vlog - Destination 2", category: "travel", videoId: "dih3H0F55JI", thumbnail: "https://img.youtube.com/vi/dih3H0F55JI/maxresdefault.jpg", description: "Adventure and discovery" },
    { id: 15, title: "Travel Vlog - Destination 3", category: "travel", videoId: "QRjotW2RCsw", thumbnail: "https://img.youtube.com/vi/QRjotW2RCsw/maxresdefault.jpg", description: "Cultural immersion experiences" },
    { id: 16, title: "Travel Vlog - Destination 4", category: "travel", videoId: "--EEIb7CmUM", thumbnail: "https://img.youtube.com/vi/--EEIb7CmUM/maxresdefault.jpg", description: "Hidden gems and local stories" },
    { id: 17, title: "Travel Vlog - Destination 5", category: "travel", videoId: "RItFieXDUUg", thumbnail: "https://img.youtube.com/vi/RItFieXDUUg/maxresdefault.jpg", description: "Journey through stunning landscapes" },
    
    // Podcast
    { id: 18, title: "Podcast Episode 1", category: "podcast", videoId: "AzT2o76d1uA", thumbnail: "https://img.youtube.com/vi/AzT2o76d1uA/maxresdefault.jpg", description: "Engaging conversations and insights" },
    { id: 19, title: "Podcast Episode 2", category: "podcast", videoId: "_feIT4BaFiI", thumbnail: "https://img.youtube.com/vi/_feIT4BaFiI/maxresdefault.jpg", description: "Deep dive into trending topics" },
    
    // Courses
    { id: 20, title: "Course Module 1", category: "courses", videoId: "skwQ20BQ-eo", thumbnail: "https://img.youtube.com/vi/skwQ20BQ-eo/maxresdefault.jpg", description: "Educational excellence delivered" },
    { id: 21, title: "Course Module 2", category: "courses", videoId: "WDPRxsHBoes", thumbnail: "https://img.youtube.com/vi/WDPRxsHBoes/maxresdefault.jpg", description: "Expert teaching and training" },
    { id: 22, title: "Course Module 3", category: "courses", videoId: "78Z9ZLRkR4E", thumbnail: "https://img.youtube.com/vi/78Z9ZLRkR4E/maxresdefault.jpg", description: "Interactive learning experience" },
    { id: 23, title: "Course Module 4", category: "courses", videoId: "A0X5E6JmE2E", thumbnail: "https://img.youtube.com/vi/A0X5E6JmE2E/maxresdefault.jpg", description: "Professional development content" },
    { id: 24, title: "Course Module 5", category: "courses", videoId: "hWa2DuM41bk", thumbnail: "https://img.youtube.com/vi/hWa2DuM41bk/maxresdefault.jpg", description: "Skill-building tutorials" },
    { id: 25, title: "Course Module 6", category: "courses", videoId: "Jqe6jUx1GVs", thumbnail: "https://img.youtube.com/vi/Jqe6jUx1GVs/maxresdefault.jpg", description: "Advanced training sessions" },
    { id: 26, title: "Course Module 7", category: "courses", videoId: "oeRU3DB_cAc", thumbnail: "https://img.youtube.com/vi/oeRU3DB_cAc/maxresdefault.jpg", description: "Comprehensive course material" },
    { id: 27, title: "Course Module 8", category: "courses", videoId: "Sa4XjyrPNuI", thumbnail: "https://img.youtube.com/vi/Sa4XjyrPNuI/maxresdefault.jpg", description: "Step-by-step instruction" },
    { id: 28, title: "Course Module 9", category: "courses", videoId: "L3XaNjvG5cI", thumbnail: "https://img.youtube.com/vi/L3XaNjvG5cI/maxresdefault.jpg", description: "Mastery-level content" },
    { id: 29, title: "Course Module 10", category: "courses", videoId: "IPjMPs_c5DQ", thumbnail: "https://img.youtube.com/vi/IPjMPs_c5DQ/maxresdefault.jpg", description: "Complete learning pathway" },
    
    // Storytelling
    { id: 30, title: "Storytelling Project 1", category: "storytelling", videoId: "wzgox6SxOuQ", thumbnail: "https://img.youtube.com/vi/wzgox6SxOuQ/maxresdefault.jpg", description: "Compelling narrative filmmaking" },
    { id: 31, title: "Storytelling Project 2", category: "storytelling", videoId: "pFNrJZCjLN8", thumbnail: "https://img.youtube.com/vi/pFNrJZCjLN8/maxresdefault.jpg", description: "Emotional story arcs" },
    { id: 32, title: "Storytelling Project 3", category: "storytelling", videoId: "yYowFOea3jM", thumbnail: "https://img.youtube.com/vi/yYowFOea3jM/maxresdefault.jpg", description: "Visual storytelling mastery" },
    { id: 33, title: "Storytelling Project 4", category: "storytelling", videoId: "Dbte1SRqpEk", thumbnail: "https://img.youtube.com/vi/Dbte1SRqpEk/maxresdefault.jpg", description: "Cinematic narratives" }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const handleVideoClick = (project) => {
    setSelectedVideo(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)
  }

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
              onClick={() => handleVideoClick(project)}
            >
              <div className="portfolio-image-container">
                <img src={project.thumbnail} alt={project.title} />
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
                      Watch Video
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <motion.div
          className="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="modal-info">
              <h3>{selectedVideo.title}</h3>
              <p>{selectedVideo.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        .video-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 2rem;
        }

        .modal-content {
          width: 100%;
          max-width: 1200px;
          background: var(--darker-bg);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          background: rgba(212, 175, 55, 0.9);
          border: none;
          border-radius: 50%;
          color: var(--dark-bg);
          font-size: 2rem;
          cursor: pointer;
          z-index: 10001;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: var(--primary-gold);
          transform: rotate(90deg);
        }

        .video-wrapper {
          width: 100%;
          padding-bottom: 56.25%;
          position: relative;
          background: #000;
        }

        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .modal-info {
          padding: 2rem;
        }

        .modal-info h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: var(--primary-gold);
        }

        .modal-info p {
          color: var(--text-gray);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .video-modal {
            padding: 1rem;
          }

          .modal-info {
            padding: 1.5rem;
          }

          .modal-info h3 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </section>
  )
}