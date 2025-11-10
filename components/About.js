import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const statsRef = useRef([])

  const stats = [
    { number: 250, label: "Projects Completed", suffix: "+" },
    { number: 50, label: "Happy Clients", suffix: "+" },
    { number: 3, label: "Years Experience", suffix: "+" }
  ]

  useEffect(() => {
    if (inView) {
      statsRef.current.forEach((stat, index) => {
        gsap.fromTo(stat, 
          { innerText: 0 },
          {
            innerText: stats[index].number,
            duration: 2,
            delay: index * 0.2,
            ease: "power2.out",
            snap: { innerText: 1 },
            onUpdate: function() {
              stat.innerText = Math.ceil(this.targets()[0].innerText) + stats[index].suffix
            }
          }
        )
      })
    }
  }, [inView])

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="section about-section" id="about" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        About Me
      </motion.h2>

      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="about-image" variants={itemVariants}>
          <img src="https://rentals-app-bucket.s3.eu-north-1.amazonaws.com/DSC00016.jpeg" alt="Alain Quentin" />
          <motion.div
            className="image-overlay"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overlay-content">
              <p>"Every frame tells a story"</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="about-content" variants={itemVariants}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Crafting Stories Through Film
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            With over 3 years of experience in video editing, I've had the privilege of working with some of the world's most recognized brands and talented filmmakers. My passion lies in transforming raw footage into compelling narratives that resonate with audiences.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            I specialize in commercial advertising, documentary filmmaking, highlights and impact stories, bringing a unique blend of technical expertise and creative vision to every project. My work has been featured in international film festivals and has garnered millions of views across digital platforms.
          </motion.p>

          <motion.div
            className="skills-container"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h4>Expertise</h4>
            <div className="skills-grid">
              {['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects','Blender',"Adobe Animate", 'Photoshop', 'Lightroom', 'Media Encoder'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#D4AF37" }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="stats-grid"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-item"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              ref={el => statsRef.current[index] = el}
              className="stat-number"
            >
              0{stat.suffix}
            </div>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}