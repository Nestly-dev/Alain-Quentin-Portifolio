// components/Showreel.js
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

export default function Showreel() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [activeVideo, setActiveVideo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const videos = [
    {
      id: 1,
      title: "Interviews",
      description: "Professional interview content capturing authentic stories and perspectives.",
      thumbnail: "https://img.youtube.com/vi/4RZ6bBRSIFo/maxresdefault.jpg",
      videoId: "4RZ6bBRSIFo",
      category: "Interviews"
    },
    {
      id: 2,
      title: "Commercial - Brand Story",
      description: "High-impact commercial storytelling that drives engagement and results.",
      thumbnail: "https://img.youtube.com/vi/jd1MplcMhQQ/maxresdefault.jpg",
      videoId: "jd1MplcMhQQ",
      category: "Commercial"
    },
    {
      id: 3,
      title: "Commercial - Product Launch",
      description: "Dynamic product showcase with cinematic visual appeal.",
      thumbnail: "https://img.youtube.com/vi/KEtG2RcmrM0/maxresdefault.jpg",
      videoId: "KEtG2RcmrM0",
      category: "Commercial"
    },
    {
      id: 4,
      title: "Event Highlights",
      description: "Capturing the energy and emotion of memorable events.",
      thumbnail: "https://img.youtube.com/vi/19X9x1mN7nI/maxresdefault.jpg",
      videoId: "19X9x1mN7nI",
      category: "Highlights"
    },
    {
      id: 5,
      title: "Educational Course Content",
      description: "Engaging educational content designed for maximum learning impact.",
      thumbnail: "https://img.youtube.com/vi/skwQ20BQ-eo/maxresdefault.jpg",
      videoId: "skwQ20BQ-eo",
      category: "Courses"
    },
    {
      id: 6,
      title: "Impact Story",
      description: "Compelling narratives that inspire change and create meaningful connections.",
      thumbnail: "https://img.youtube.com/vi/lm8zA2RYg7Y/maxresdefault.jpg",
      videoId: "lm8zA2RYg7Y",
      category: "Impact Story"
    }
  ]

  const handleVideoClick = (video) => {
    setSelectedVideo(video)
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
            onClick={() => handleVideoClick(video)}
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