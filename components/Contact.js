// components/Contact.js - WITH EMAILJS INTEGRATION (USING ENV VARIABLES)
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
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

  // Initialize EmailJS on component mount
  useEffect(() => {
    // Initialize with public key from environment variable
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      emailjs.init(publicKey)
    }
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
      // Prepare the template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        budget: formData.budget || 'Not specified',
        project_type: formData.projectType || 'Not specified',
        message: formData.message
      }

      // Get EmailJS credentials from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      )

      console.log('Email sent successfully!', result.status, result.text)
      
      setIsSubmitting(false)
      setFormStatus('success')
      
      // Reset form after success
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
      
      // Show error message to user
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
    { name: 'Instagram', icon: '📷', url: 'https://www.instagram.com/gentil_quentin/', color: '#E4405F' },
    { name: 'YouTube', icon: '🎥', url: 'https://www.youtube.com/@gentilquentin', color: '#1AB7EA' },
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/alain-quentin-rurangirwa-ineza-b057002b7/', color: '#0077B5' }
  ]

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Let's Create Something Amazing
      </motion.h2>

      {/* Animated subtitle */}
      <motion.p
        style={{
          textAlign: 'center',
          fontSize: '1.3rem',
          color: '#B0B0B0',
          maxWidth: '600px',
          margin: '0 auto 4rem',
          lineHeight: '1.6'
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
      >
        <div className="contact-content">
          {/* Enhanced Contact Info */}
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
            >
              Ready to Start Your Project?
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
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
                  whileHover={{ x: 10, scale: 1.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '15px',
                    marginBottom: '1rem',
                    border: '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer'
                  }}
                >
                  <motion.span 
                    style={{ fontSize: '1.5rem' }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {item.icon}
                  </motion.span>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#808080', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {item.label}
                    </div>
                    <div style={{ color: '#fff', fontWeight: '600' }}>
                      {item.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Social Links */}
            <motion.div
              style={{ marginTop: '3rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <h4 style={{ 
                fontSize: '1rem', 
                color: '#B0B0B0', 
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '600'
              }}>
                Connect With Me
              </h4>
              <div className="social-links">
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
                    whileHover={{ 
                      scale: 1.15, 
                      y: -5,
                      background: social.color,
                      color: '#fff',
                      boxShadow: `0 10px 30px ${social.color}60`
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>{social.icon}</span>
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              style={{
                marginTop: '2rem',
                padding: '1rem',
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
                  boxShadow: '0 0 20px #4ADE80'
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
              <span style={{ color: '#B0B0B0' }}>
                Available for new projects
              </span>
            </motion.div>
          </motion.div>

          {/* Enhanced Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="form-row">
              <FormField
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === 'name'}
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
                required
                icon="✉️"
              />
            </div>

            <div className="form-row">
              <FormField
                label="Company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                onFocus={() => setFocusedField('company')}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === 'company'}
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
                options={[
                  { value: "", label: "Select budget" },
                  { value: "5k-10k", label: "$5k - $10k" },
                  { value: "10k-25k", label: "$10k - $25k" },
                  { value: "25k-50k", label: "$25k - $50k" },
                  { value: "50k+", label: "$50k+" }
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
            >
              <label style={{ marginBottom: '1rem', display: 'block', color: '#fff', fontWeight: '600' }}>
                Project Type
              </label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {projectTypes.map((type, index) => (
                  <motion.button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, projectType: type.value })}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.05, type: "spring" }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '1rem 1.5rem',
                      background: formData.projectType === type.value 
                        ? 'linear-gradient(135deg, #D4AF37, #FFE55C)'
                        : 'rgba(255,255,255,0.05)',
                      border: formData.projectType === type.value
                        ? '2px solid #D4AF37'
                        : '2px solid rgba(255,255,255,0.1)',
                      borderRadius: '15px',
                      color: formData.projectType === type.value ? '#000' : '#fff',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s'
                    }}
                  >
                    <span style={{ fontSize: '1.3rem' }}>{type.icon}</span>
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
              placeholder="Tell me about your project, timeline, and vision..."
              required
              rows={6}
              icon="📝"
            />

            <motion.button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || formStatus === 'success'}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              animate={isSubmitting ? { opacity: 0.7 } : { opacity: 1 }}
              style={{
                position: 'relative',
                overflow: 'hidden'
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
                        width: '20px',
                        height: '20px',
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

            {/* Success Message */}
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
                    marginTop: '1rem'
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
                    marginTop: '1rem'
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
  required, 
  placeholder, 
  options, 
  rows,
  icon 
}) {
  return (
    <motion.div
      className={`form-group ${type === 'textarea' ? 'full-width' : ''}`}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.label 
        htmlFor={name}
        animate={{
          color: isFocused ? '#D4AF37' : '#fff',
          scale: isFocused ? 1.05 : 1
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <span>{icon}</span>
        <span>{label} {required && '*'}</span>
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
            padding: '1.2rem',
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,255,255,0.1)',
            borderRadius: '15px',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            cursor: 'pointer'
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
            padding: '1.2rem',
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,255,255,0.1)',
            borderRadius: '15px',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            resize: 'vertical',
            minHeight: '120px'
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
            padding: '1.2rem',
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,255,255,0.1)',
            borderRadius: '15px',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      )}
    </motion.div>
  )
}