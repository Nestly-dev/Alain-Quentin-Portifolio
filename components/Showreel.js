// components/Showreel.js - APPLE-INSPIRED DESIGN
'use client'

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useRef } from 'react'

export default function Showreel() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const autoPlayIntervalRef = useRef(null)

  const videos = [
    {
      id: 1,
      title: "Executive Interviews",
      description: "Authentic conversations capturing leadership insights and personal journeys.",
      thumbnail: "https://img.youtube.com/vi/4RZ6bBRSIFo/maxresdefault.jpg",
      videoId: "4RZ6bBRSIFo",
      category: "Interviews",
      color: "#FF6B6B",
      gradient: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
      duration: "45 min",
      featured: true
    },
    {
      id: 2,
      title: "Brand Campaign",
      description: "High-impact commercial storytelling that transforms brand perception.",
      thumbnail: "https://img.youtube.com/vi/jd1MplcMhQQ/maxresdefault.jpg",
      videoId: "jd1MplcMhQQ",
      category: "Commercial",
      color: "#4ECDC4",
      gradient: "linear-gradient(135deg, #4ECDC4, #44A08D)",
      duration: "2 min",
      featured: true
    },
    {
      id: 3,
      title: "Product Innovation",
      description: "Cinematic showcase merging technology with storytelling excellence.",
      thumbnail: "https://img.youtube.com/vi/KEtG2RcmrM0/maxresdefault.jpg",
      videoId: "KEtG2RcmrM0",
      category: "Product",
      color: "#95E1D3",
      gradient: "linear-gradient(135deg, #95E1D3, #6DD5FA)",
      duration: "3 min",
      featured: true
    },
    {
      id: 4,
      title: "Impact Stories",
      description: "Compelling narratives that inspire change and create meaningful connections.",
      thumbnail: "https://img.youtube.com/vi/lm8zA2RYg7Y/maxresdefault.jpg",
      videoId: "lm8zA2RYg7Y",
      category: "Documentary",
      color: "#F38181",
      gradient: "linear-gradient(135deg, #F38181, #FCE38A)",
      duration: "28 min",
      featured: true
    },
    {
      id: 5,
      title: "Educational Content",
      description: "Engaging course material designed for maximum learning impact.",
      thumbnail: "https://img.youtube.com/vi/skwQ20BQ-eo/maxresdefault.jpg",
      videoId: "skwQ20BQ-eo",
      category: "Education",
      color: "#FFD93D",
      gradient: "linear-gradient(135deg, #FFD93D, #6BCF7F)",
      duration: "15 min",
      featured: false
    },
    {
      id: 6,
      title: "Event Highlights",
      description: "Capturing the energy and emotion of unforgettable moments.",
      thumbnail: "https://img.youtube.com/vi/19X9x1mN7nI/maxresdefault.jpg",
      videoId: "19X9x1mN7nI",
      category: "Events",
      color: "#AA96DA",
      gradient: "linear-gradient(135deg, #AA96DA, #FCBAD3)",
      duration: "8 min",
      featured: false
    }
  ]

  const featuredVideos = videos.filter(v => v.featured)

  // Auto-play with progress tracking
  useEffect(() => {
    if (isAutoPlaying && featuredVideos.length > 1) {
      const interval = 50 // Update every 50ms
      const totalDuration = 6000 // 6 seconds per slide
      let elapsed = 0

      autoPlayIntervalRef.current = setInterval(() => {
        elapsed += interval
        setProgress((elapsed / totalDuration) * 100)

        if (elapsed >= totalDuration) {
          setCurrentSlide(prev => (prev + 1) % featuredVideos.length)
          elapsed = 0
          setProgress(0)
        }
      }, interval)
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [isAutoPlaying, currentSlide, featuredVideos.length])

  const handleVideoClick = (video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
    setIsAutoPlaying(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedVideo(null), 300)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setProgress(0)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredVideos.length)
    setProgress(0)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length)
    setProgress(0)
    setIsAutoPlaying(false)
  }

  return (
    <section className="section showreel-section" id="showreel" ref={ref}>
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
        <motion.h2 className="section-title" style={{ marginBottom: '1rem' }}>
          Featured Showreel
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
          My most impactful work, curated for you.
        </motion.p>
      </motion.div>

      {/* Hero Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          position: 'relative',
          maxWidth: '1400px',
          margin: '0 auto 5rem',
          borderRadius: '24px',
          overflow: 'hidden',
          background: '#000',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
            style={{
              position: 'relative',
              cursor: 'pointer',
              aspectRatio: '16/9'
            }}
            onClick={() => handleVideoClick(featuredVideos[currentSlide])}
          >
            {/* Image */}
            <img
              src={featuredVideos[currentSlide].thumbnail}
              alt={featuredVideos[currentSlide].title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />

            {/* Gradient Overlays */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
            }} />

            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: featuredVideos[currentSlide].gradient,
                opacity: 0.15,
                mixBlendMode: 'overlay'
              }}
            />

            {/* Content */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '3rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '2rem'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ flex: 1 }}
              >
                <motion.div
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: `${featuredVideos[currentSlide].color}20`,
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '1rem',
                    color: featuredVideos[currentSlide].color,
                    border: `1px solid ${featuredVideos[currentSlide].color}40`
                  }}
                >
                  {featuredVideos[currentSlide].category}
                </motion.div>

                <h3 style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  lineHeight: '1.1',
                  color: '#fff'
                }}>
                  {featuredVideos[currentSlide].title}
                </h3>

                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  color: 'rgba(255,255,255,0.8)',
                  maxWidth: '600px',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}>
                  {featuredVideos[currentSlide].description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '1.2rem 2.5rem',
                    background: 'rgba(255,255,255,0.95)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 10px 30px rgba(255,255,255,0.2)'
                  }}
                >
                  <span style={{
                    width: 0,
                    height: 0,
                    borderLeft: '12px solid currentColor',
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    marginLeft: '4px'
                  }} />
                  <span>Watch Now</span>
                  <span style={{ 
                    fontSize: '0.85rem',
                    opacity: 0.6
                  }}>
                    {featuredVideos[currentSlide].duration}
                  </span>
                </motion.button>
              </motion.div>

              {/* Slide Indicators */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                {featuredVideos.map((video, index) => (
                  <motion.button
                    key={video.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      goToSlide(index)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: index === currentSlide ? '50px' : '12px',
                      height: '12px',
                      borderRadius: '6px',
                      background: index === currentSlide 
                        ? '#fff'
                        : 'rgba(255,255,255,0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {index === currentSlide && isAutoPlaying && (
                      <motion.div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          background: featuredVideos[currentSlide].color,
                          borderRadius: '6px'
                        }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.05, ease: 'linear' }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                prevSlide()
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                left: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              ←
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                nextSlide()
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                right: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              →
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Video Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <h3 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#fff'
        }}>
          All Projects
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
          padding: '0 1rem'
        }}>
          {videos.map((video, index) => (
            <AppleVideoCard
              key={video.id}
              video={video}
              index={index}
              onClick={() => handleVideoClick(video)}
            />
          ))}
        </div>
      </motion.div>

      {/* Apple Video Modal */}
      {selectedVideo && (
        <AppleVideoModal
          isOpen={isModalOpen}
          video={selectedVideo}
          onClose={closeModal}
        />
      )}
    </section>
  )
}

// Apple-Style Video Card
function AppleVideoCard({ video, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'rgba(20,20,20,0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 60px ${video.color}30`,
        borderColor: `${video.color}40`
      }}
    >
      {/* Thumbnail */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%',
        overflow: 'hidden',
        background: '#000'
      }}>
        <motion.img
          src={video.thumbnail}
          alt={video.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
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
            background: video.gradient,
            opacity: 0,
            mixBlendMode: 'overlay'
          }}
          animate={{
            opacity: isHovered ? 0.3 : 0
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
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "backOut" }}
        >
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '16px solid #000',
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            marginLeft: '4px'
          }} />
        </motion.div>

        {/* Duration Badge */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.4rem 0.8rem',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#fff'
        }}>
          {video.duration}
        </div>

        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          padding: '0.4rem 0.8rem',
          background: `${video.color}20`,
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          fontSize: '0.75rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: video.color,
          border: `1px solid ${video.color}40`
        }}>
          {video.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <h4 style={{
          fontSize: '1.3rem',
          fontWeight: '700',
          marginBottom: '0.5rem',
          color: '#fff',
          lineHeight: '1.3'
        }}>
          {video.title}
        </h4>

        <p style={{
          color: '#B0B0B0',
          fontSize: '0.9rem',
          lineHeight: '1.5'
        }}>
          {video.description}
        </p>
      </div>
    </motion.div>
  )
}

// Apple Video Modal
function AppleVideoModal({ isOpen, video, onClose }) {
  if (!video) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              onClick={(e) => e.stopPropagation()}
            >
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
                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.25)' }}
                whileTap={{ scale: 0.95 }}
              >
                ×
              </motion.button>

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
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: video.gradient,
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '1.5rem',
                    color: '#000'
                  }}>
                    {video.category}
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
                    lineHeight: '1.6'
                  }}>
                    {video.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}