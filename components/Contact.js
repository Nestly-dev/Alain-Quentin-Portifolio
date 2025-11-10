// components/Contact.js - MOBILE OPTIMIZED WITH EMAILJS
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    projectType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [formStatus, setFormStatus] = useState(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      emailjs.init(publicKey)
    }
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const projectTypes = [
    { icon: "🎬", label: "Commercial", value: "commercial" },
    { icon: "📺", label: "Documentary", value: "documentary" },
    { icon: "🎵", label: "Music Video", value: "music" },
    { icon: "🎓", label: "Educational", value: "educational" },
    { icon: "✨", label: "Other", value: "other" }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        budget: formData.budget || 'Not specified',
        project_type: formData.projectType || 'Not specified',
        message: formData.message
      }

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

      const result = await emailjs.send(serviceId, templateId, templateParams)

      console.log('Email sent successfully!', result.status, result.text)
      
      setIsSubmitting(false)
      setFormStatus('success')
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          budget: '',
          projectType: '',
          message: ''
        })
        setFormStatus(null)
      }, 3000)
      
    } catch (error) {
      console.error('Email send failed:', error)
      setIsSubmitting(false)
      setFormStatus('error')
      
      alert('Failed to send message. Please try again or email directly at ialainquentin@gmail.com')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const socialLinks = [
    { name: 'Instagram', icon: '📷', url: 'https://www.instagram.com/gentil_quentin/', color: '#fc00efff' },
    { name: 'YouTube', icon: '🎥', url: 'https://www.youtube.com/@gentilquentin', color: '#ea1a1aff' },
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/alain-quentin-rurangirwa-ineza-b057002b7/', color: '#0077B5' }
  ]

  return (
    <section 
      className="section contact-section" 
      id="contact" 
      ref={ref}
      style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem'
      }}
    >
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 5vw, 4rem)'
        }}
      >
        Let's Create Something Amazing
      </motion.h2>

      <motion.p
        style={{
          textAlign: 'center',
          fontSize: isMobile ? '1.1rem' : '1.3rem',
          color: '#B0B0B0',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          lineHeight: '1.6',
          padding: isMobile ? '0 1rem' : '0'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Every great project starts with a conversation. Let's tell your story together.
      </motion.p>

      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <div 
          className="contact-content"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
            gap: isMobile ? '3rem' : '4rem',
            alignItems: 'start'
          }}
        >
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#fff'
              }}
            >
              Ready to Start Your Project?
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              style={{
                color: '#B0B0B0',
                lineHeight: '1.7',
                marginBottom: '2rem',
                fontSize: isMobile ? '0.95rem' : '1.05rem'
              }}
            >
              I'm always excited to work on new creative challenges. Whether you need a commercial, documentary, or any video content, let's discuss how we can bring your vision to life.
            </motion.p>
            
            <div className="contact-details">
              {[
                { icon: "📧", text: "ialainquentin@gmail.com", label: "Email" },
                { icon: "📱", text: "+250 783520 488", label: "Phone" },
                { icon: "📍", text: "Rwanda, Kigali", label: "Location" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="contact-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={!isMobile ? { x: 10, scale: 1.05 } : {}}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: isMobile ? '0.9rem' : '1rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '15px',
                    marginBottom: '1rem',
                    border: '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    touchAction: 'manipulation'
                  }}
                >
                  <motion.span 
                    style={{ fontSize: isMobile ? '1.3rem' : '1.5rem' }}
                    whileHover={!isMobile ? { scale: 1.2, rotate: 10 } : {}}
                  >
                    {item.icon}
                  </motion.span>
                  <div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#808080', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1px' 
                    }}>
                      {item.label}
                    </div>
                    <div style={{ 
                      color: '#fff', 
                      fontWeight: '600',
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      {item.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              style={{ marginTop: '3rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <h4 style={{ 
                fontSize: isMobile ? '0.9rem' : '1rem', 
                color: '#B0B0B0', 
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '600'
              }}>
                Connect With Me
              </h4>
              <div 
                className="social-links"
                style={{
                  display: 'flex',
                  gap: isMobile ? '0.75rem' : '1rem',
                  flexWrap: 'wrap'
                }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.1 + index * 0.1, type: "spring" }}
                    whileHover={!isMobile ? { 
                      scale: 1.15, 
                      y: -5,
                      background: social.color,
                      color: '#fff',
                      boxShadow: `0 10px 30px ${social.color}60`
                    } : {}}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: isMobile ? '0.75rem 1.25rem' : '0.9rem 1.5rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '50px',
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: isMobile ? '0.85rem' : '0.95rem',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      touchAction: 'manipulation'
                    }}
                  >
                    <span style={{ fontSize: isMobile ? '1.1rem' : '1.2rem' }}>{social.icon}</span>
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              style={{
                marginTop: '2rem',
                padding: isMobile ? '0.9rem' : '1rem',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(0, 212, 255, 0.1))',
                borderRadius: '15px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.3 }}
            >
              <motion.div
                style={{
                  width: '12px',
                  height: '12px',
                  background: '#4ADE80',
                  borderRadius: '50%',
                  boxShadow: '0 0 20px #4ADE80',
                  flexShrink: 0
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
              <span style={{ 
                color: '#B0B0B0',
                fontSize: isMobile ? '0.9rem' : '1rem'
              }}>
                Available for new projects
              </span>
            </motion.div>
          </motion.div>

          {/* Form - Continues in next part due to length */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div 
              className="form-row" 
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '1rem' : '1.5rem'
              }}
            >
              <FormField
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === 'name'}
                isMobile={isMobile}
                required
                icon="👤"
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === 'email'}
                isMobile={isMobile}
                required
                icon="✉️"
              />
            </div>

            <div 
              className="form-row"
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '1rem' : '1.5rem'
              }}
            >
              <FormField
                label="Company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                onFocus={() => setFocusedField('company')}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === 'company'}
                isMobile={isMobile}
                icon="🏢"
              />

              <FormField
                label="Budget Range"
                name="budget"
                type="select"
                value={formData.budget}
                onChange={handleChange}
                onFocus={() => setFocusedField('budget')}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === 'budget'}
                isMobile={isMobile}
                options={[
                  { value: "", label: "Select budget" },
                  { value: "200-500", label: "$200 - $500" },
                  { value: "500-1000", label: "$500 - $1000" },
                  { value: "1000-2000", label: "$1000 - $2000" },
                  { value: "2000+", label: "$2000+" }
                ]}
                icon="💰"
              />
            </div>

            {/* Project Type Selection */}
            <motion.div
              className="form-group full-width"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              style={{
                marginBottom: isMobile ? '1rem' : '1.5rem'
              }}
            >
              <label style={{ 
                marginBottom: '1rem', 
                display: 'block', 
                color: '#fff', 
                fontWeight: '600',
                fontSize: isMobile ? '0.9rem' : '1rem'
              }}>
                Project Type
              </label>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: isMobile ? '0.75rem' : '1rem'
              }}>
                {projectTypes.map((type, index) => (
                  <motion.button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, projectType: type.value })}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.05, type: "spring" }}
                    whileHover={!isMobile ? { scale: 1.05, y: -3 } : {}}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: isMobile ? '0.9rem 1rem' : '1rem 1.5rem',
                      background: formData.projectType === type.value 
                        ? 'linear-gradient(135deg, #D4AF37, #FFE55C)'
                        : 'rgba(255,255,255,0.05)',
                      border: formData.projectType === type.value
                        ? '2px solid #D4AF37'
                        : '2px solid rgba(255,255,255,0.1)',
                      borderRadius: '15px',
                      color: formData.projectType === type.value ? '#000' : '#fff',
                      cursor: 'pointer',
                      fontSize: isMobile ? '0.85rem' : '1rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s',
                      touchAction: 'manipulation'
                    }}
                  >
                    <span style={{ fontSize: isMobile ? '1.1rem' : '1.3rem' }}>{type.icon}</span>
                    <span>{type.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <FormField
              label="Project Details"
              name="message"
              type="textarea"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              isFocused={focusedField === 'message'}
              isMobile={isMobile}
              placeholder="Tell me about your project, timeline, and vision..."
              required
              rows={6}
              icon="📝"
            />

            <motion.button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || formStatus === 'success'}
              whileHover={!isMobile ? { scale: 1.02, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.4)" } : {}}
              whileTap={{ scale: 0.98 }}
              animate={isSubmitting ? { opacity: 0.7 } : { opacity: 1 }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                padding: isMobile ? '1.1rem 2rem' : '1.3rem 2.5rem',
                background: 'linear-gradient(135deg, #D4AF37, #FFE55C)',
                color: '#000',
                border: 'none',
                borderRadius: '50px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: '700',
                cursor: isSubmitting || formStatus === 'success' ? 'not-allowed' : 'pointer',
                touchAction: 'manipulation'
              }}
            >
              {/* Button Background Animation */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transform: 'translateX(-100%)'
                }}
                animate={isSubmitting ? {
                  transform: ['translateX(-100%)', 'translateX(100%)']
                } : {}}
                transition={{
                  duration: 1,
                  repeat: isSubmitting ? Infinity : 0
                }}
              />

              <span style={{ position: 'relative', zIndex: 1 }}>
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="spinner"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{
                        display: 'inline-block',
                        width: '18px',
                        height: '18px',
                        border: '2px solid rgba(0,0,0,0.3)',
                        borderTop: '2px solid #000',
                        borderRadius: '50%'
                      }}
                    />
                    <span style={{ marginLeft: '0.5rem' }}>Sending...</span>
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      ✓
                    </motion.span>
                    <span style={{ marginLeft: '0.5rem' }}>Message Sent!</span>
                  </>
                ) : (
                  <>
                    Send Message
                    <motion.span
                      className="btn-arrow"
                      style={{ display: 'inline-block', marginLeft: '0.5rem' }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </span>
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  style={{
                    padding: '1rem',
                    background: 'rgba(74, 222, 128, 0.1)',
                    border: '1px solid rgba(74, 222, 128, 0.3)',
                    borderRadius: '15px',
                    color: '#4ADE80',
                    textAlign: 'center',
                    marginTop: '1rem',
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}
                >
                  Thanks for reaching out! I'll get back to you within 24 hours.
                </motion.div>
              )}
              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  style={{
                    padding: '1rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '15px',
                    color: '#EF4444',
                    textAlign: 'center',
                    marginTop: '1rem',
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}
                >
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}

// Enhanced Form Field Component
function FormField({ 
  label, 
  name, 
  type, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  isFocused, 
  isMobile,
  required, 
  placeholder, 
  options, 
  rows,
  icon 
}) {
  return (
    <motion.div
      className={`form-group ${type === 'textarea' ? 'full-width' : ''}`}
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      style={{
        marginBottom: isMobile ? '1rem' : '1.5rem'
      }}
    >
      <motion.label 
        htmlFor={name}
        animate={{
          color: isFocused ? '#D4AF37' : '#fff',
          scale: isFocused ? 1.02 : 1
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem',
          fontSize: isMobile ? '0.9rem' : '1rem',
          fontWeight: '600'
        }}
      >
        <span>{icon}</span>
        <span>{label} {required && <span style={{ color: '#EF4444' }}>*</span>}</span>
      </motion.label>

      {type === 'select' ? (
        <motion.select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          animate={{
            borderColor: isFocused ? '#D4AF37' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isFocused ? '0 0 25px rgba(212, 175, 55, 0.2)' : 'none'
          }}
          style={{
            width: '100%',
            padding: isMobile ? '1rem' : '1.2rem',
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,255,255,0.1)',
            borderRadius: '15px',
            color: '#fff',
            fontSize: isMobile ? '0.95rem' : '1rem',
            outline: 'none',
            cursor: 'pointer',
            touchAction: 'manipulation'
          }}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} style={{ background: '#1a1a1a', color: '#fff' }}>
              {opt.label}
            </option>
          ))}
        </motion.select>
      ) : type === 'textarea' ? (
        <motion.textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          animate={{
            borderColor: isFocused ? '#D4AF37' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isFocused ? '0 0 25px rgba(212, 175, 55, 0.2)' : 'none'
          }}
          style={{
            width: '100%',
            padding: isMobile ? '1rem' : '1.2rem',
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,255,255,0.1)',
            borderRadius: '15px',
            color: '#fff',
            fontSize: isMobile ? '0.95rem' : '1rem',
            outline: 'none',
            resize: 'vertical',
            minHeight: isMobile ? '100px' : '120px',
            touchAction: 'manipulation'
          }}
        />
      ) : (
        <motion.input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          animate={{
            borderColor: isFocused ? '#D4AF37' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isFocused ? '0 0 25px rgba(212, 175, 55, 0.2)' : 'none'
          }}
          style={{
            width: '100%',
            padding: isMobile ? '1rem' : '1.2rem',
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,255,255,0.1)',
            borderRadius: '15px',
            color: '#fff',
            fontSize: isMobile ? '0.95rem' : '1rem',
            outline: 'none',
            touchAction: 'manipulation'
          }}
        />
      )}
    </motion.div>
  )
}