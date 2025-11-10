// components/Portfolio.js - APPLE-INSPIRED DESIGN
'use client'

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

export default function Portfolio() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)

  const filters = [
    { id: 'all', label: 'All Work', icon: '◉' },
    { id: 'interviews', label: 'Interviews', icon: '🎤' },
    { id: 'commercial', label: 'Commercial', icon: '📺' },
    { id: 'impact stories', label: 'Impact', icon: '💫' },
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'podcast', label: 'Podcast', icon: '🎙️' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'storytelling', label: 'Stories', icon: '🎬' }
  ]

  const projects = [
    {
      id: 1,
      title: "World Class Interviews",
      category: "interviews",
      videoId: "4RZ6bBRSIFo",
      thumbnail: "https://img.youtube.com/vi/4RZ6bBRSIFo/maxresdefault.jpg",
      description: "Authentic conversations capturing the human side of leadership",
      story: "Every leader has a journey. This series unveils the personal stories behind professional success.",
      color: "#FF6B6B",
      gradient: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
      tags: ["Documentary", "Corporate", "Interview"],
      duration: "3 min",
      year: "2025"
    },
    {
      id: 2,
      title: "Chronicles Commercial",
      category: "commercial",
      videoId: "jd1MplcMhQQ",
      thumbnail: "https://img.youtube.com/vi/jd1MplcMhQQ/maxresdefault.jpg",
      description: "High-impact storytelling that transforms brand perception",
      story: "Great brands don't just sell products—they tell stories that resonate across generations.",
      color: "#4ECDC4",
      gradient: "linear-gradient(135deg, #4ECDC4, #44A08D)",
      tags: ["Commercial", "Branding", "Narrative"],
      duration: "2 min",
      year: "2024"
    },
    {
      id: 3,
      title: "Chronicles New Entrance",
      category: "commercial",
      videoId: "KEtG2RcmrM0",
      thumbnail: "https://img.youtube.com/vi/KEtG2RcmrM0/maxresdefault.jpg",
      description: "Cinematic showcase of cutting-edge technology",
      story: "Innovation deserves more than a launch—it deserves a legacy.",
      color: "#95E1D3",
      gradient: "linear-gradient(135deg, #95E1D3, #6DD5FA)",
      tags: ["Tech", "Product", "Launch"],
      duration: "3 min",
      year: "2024"
    },
    {
      id: 4,
      title: "Breaking New Barries",
      category: "impact stories",
      videoId: "lm8zA2RYg7Y",
      thumbnail: "https://img.youtube.com/vi/lm8zA2RYg7Y/maxresdefault.jpg",
      description: "Stories that inspire change and create connections",
      story: "Real change begins with real stories. These are the voices that move communities.",
      color: "#F38181",
      gradient: "linear-gradient(135deg, #F38181, #FCE38A)",
      tags: ["Social Impact", "Documentary", "NGO"],
      duration: "2 min",
      year: "2024"
    },
    {
      id: 5,
      title: "Cultural Exploration Series",
      category: "travel",
      videoId: "vZEWaw2dzsw",
      thumbnail: "https://img.youtube.com/vi/vZEWaw2dzsw/maxresdefault.jpg",
      description: "Discovering hidden narratives across the globe",
      story: "Travel isn't about destinations—it's about the stories we collect.",
      color: "#AA96DA",
      gradient: "linear-gradient(135deg, #AA96DA, #FCBAD3)",
      tags: ["Travel", "Culture", "Documentary"],
      duration: "52 min",
      year: "2023"
    },
    {
      id: 6,
      title: "Industry Insights Podcast",
      category: "podcast",
      videoId: "AzT2o76d1uA",
      thumbnail: "https://img.youtube.com/vi/AzT2o76d1uA/maxresdefault.jpg",
      description: "Conversations that shape tomorrow's thinking",
      story: "Ideas have power. These conversations explore the innovations shaping our future.",
      color: "#FCBAD3",
      gradient: "linear-gradient(135deg, #FCBAD3, #FFFFD2)",
      tags: ["Podcast", "Insights", "Leadership"],
      duration: "1 hr",
      year: "2025"
    },
    {
      id: 7,
      title: "Creative Masterclass",
      category: "courses",
      videoId: "skwQ20BQ-eo",
      thumbnail: "https://img.youtube.com/vi/skwQ20BQ-eo/maxresdefault.jpg",
      description: "Educational content that transforms learning",
      story: "Teaching is the ultimate form of storytelling.",
      color: "#FFD93D",
      gradient: "linear-gradient(135deg, #FFD93D, #6BCF7F)",
      tags: ["Education", "Tutorial", "Skills"],
      duration: "4 min",
      year: "2024"
    },
    {
      id: 8,
      title: "Cinematic Storytelling",
      category: "storytelling",
      videoId: "wzgox6SxOuQ",
      thumbnail: "https://img.youtube.com/vi/wzgox6SxOuQ/maxresdefault.jpg",
      description: "Long-form narratives that demand attention",
      story: "Some stories can't be rushed. This is cinema in its truest form.",
      color: "#A8D8EA",
      gradient: "linear-gradient(135deg, #A8D8EA, #C2E9FB)",
      tags: ["Narrative", "Cinema", "Long-form"],
      duration: "5-10 min",
      year: "2023"
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const openVideo = (project) => {
    setSelectedVideo(project)
    setIsModalOpen(true)
  }

  const closeVideo = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedVideo(null), 300)
  }

  return (
    <section className="section portfolio-section" id="portfolio" ref={ref}>
      {/* Apple-Style Header */}
      <motion.div
        style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="section-title"
          style={{
            marginBottom: '1rem'
          }}
        >
          Portfolio
        </motion.h2>
        <motion.p
          style={{
            fontSize: '1.5rem',
            color: '#B0B0B0',
            maxWidth: '700px',
            margin: '0 auto',
            fontWeight: '300'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Stories that move, inspire, and transform.
        </motion.p>
      </motion.div>

      {/* Apple-Style Filter Bar */}
      <motion.div
        style={{
          position: 'sticky',
          top: '80px',
          zIndex: 100,
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem 2rem',
          borderRadius: '20px',
          marginBottom: '3rem',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          padding: '0.5rem 0'
        }}>
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.8rem 1.5rem',
                background: activeFilter === filter.id
                  ? 'rgba(212, 175, 55, 0.15)'
                  : 'rgba(255,255,255,0.05)',
                border: activeFilter === filter.id
                  ? '2px solid #D4AF37'
                  : '2px solid transparent',
                borderRadius: '50px',
                color: activeFilter === filter.id ? '#D4AF37' : '#B0B0B0',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{filter.icon}</span>
              <span>{filter.label}</span>
              {activeFilter === filter.id && (
                <motion.span
                  layoutId="activeFilter"
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#D4AF37',
                    display: 'inline-block'
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Apple-Style Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '2rem',
            padding: '0 1rem'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProjects.map((project, index) => (
            <AppleCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => openVideo(project)}
              isHovered={hoveredCard === project.id}
              onHover={() => setHoveredCard(project.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Apple-Style Video Modal */}
      {selectedVideo && (
        <AppleVideoModal
          isOpen={isModalOpen}
          video={selectedVideo}
          onClose={closeVideo}
        />
      )}
    </section>
  )
}

// Apple-Style Card Component
function AppleCard({ project, index, onClick, isHovered, onHover, onLeave }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'rgba(20,20,20,0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 60px ${project.color}30`,
        borderColor: `${project.color}40`
      }}
    >
      {/* Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%',
        overflow: 'hidden',
        background: '#000'
      }}>
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          onLoad={() => setImageLoaded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: imageLoaded ? 'none' : 'blur(20px)',
            transition: 'all 0.6s ease'
          }}
          animate={{
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient Overlay */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, ${project.color}60, transparent 60%)`,
            opacity: 0
          }}
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Play Button */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <motion.div
            style={{
              width: 0,
              height: 0,
              borderLeft: '18px solid #000',
              borderTop: '12px solid transparent',
              borderBottom: '12px solid transparent',
              marginLeft: '4px'
            }}
            animate={{
              scale: isHovered ? [1, 1.1, 1] : 1
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          />
        </motion.div>

        {/* Duration Badge */}
        <motion.div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: '0.5rem 1rem',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#fff'
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          {project.duration}
        </motion.div>
      </div>

      {/* Content */}
      <div style={{
        padding: '1.5rem',
        position: 'relative'
      }}>
        {/* Category Badge */}
        <motion.div
          style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            background: `${project.color}20`,
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1rem',
            color: project.color,
            border: `1px solid ${project.color}40`
          }}
        >
          {project.category}
        </motion.div>

        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '0.5rem',
          color: '#fff',
          lineHeight: '1.3'
        }}>
          {project.title}
        </h3>

        <p style={{
          color: '#B0B0B0',
          fontSize: '0.95rem',
          lineHeight: '1.5',
          marginBottom: '1rem'
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1rem'
        }}>
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              style={{
                padding: '0.3rem 0.8rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                fontSize: '0.75rem',
                color: '#808080',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Watch CTA */}
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: project.color,
            fontSize: '0.95rem',
            fontWeight: '600'
          }}
          animate={{
            x: isHovered ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <span>Watch Now</span>
          <motion.span
            animate={{
              x: isHovered ? [0, 5, 0] : 0
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Apple-Style Video Modal
function AppleVideoModal({ isOpen, video, onClose }) {
  if (!video) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(40px)',
              zIndex: 10000
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            overflow: 'auto'
          }}>
            <motion.div
              style={{
                width: '100%',
                maxWidth: '1400px',
                background: '#000',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: `0 0 100px ${video.color}40`
              }}
              initial={{ scale: 0.9, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 100 }}
              transition={{ 
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '300'
                }}
                whileHover={{ 
                  scale: 1.1,
                  background: 'rgba(255,255,255,0.25)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                ×
              </motion.button>

              {/* Video */}
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                background: '#000'
              }}>
                <iframe
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Info Section */}
              <div style={{
                padding: '2.5rem',
                background: `linear-gradient(to bottom, #000, ${video.color}10)`
              }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: video.gradient,
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: '#000'
                    }}>
                      {video.category}
                    </span>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      color: '#B0B0B0'
                    }}>
                      {video.duration}
                    </span>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      color: '#B0B0B0'
                    }}>
                      {video.year}
                    </span>
                  </div>

                  <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#fff',
                    lineHeight: '1.2'
                  }}>
                    {video.title}
                  </h2>

                  <p style={{
                    fontSize: '1.2rem',
                    color: '#B0B0B0',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem'
                  }}>
                    {video.description}
                  </p>

                  <blockquote style={{
                    borderLeft: `4px solid ${video.color}`,
                    paddingLeft: '1.5rem',
                    fontStyle: 'italic',
                    color: video.color,
                    fontSize: '1.1rem',
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                  }}>
                    "{video.story}"
                  </blockquote>

                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap'
                  }}>
                    {video.tags.map((tag, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        whileHover={{
                          scale: 1.05,
                          background: `${video.color}20`,
                          borderColor: video.color
                        }}
                        style={{
                          padding: '0.6rem 1.2rem',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          color: '#B0B0B0',
                          cursor: 'default',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}