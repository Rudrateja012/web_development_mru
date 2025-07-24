import React, { useState, useRef, useEffect } from 'react'

const FeatureShowcase = ({ 
  features, 
  activeFeature, 
  onFeatureClick, 
  onFeatureUpdate, 
  theme, 
  isEditing,
  className = '' 
}) => {
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [expandedFeature, setExpandedFeature] = useState(null)
  const detailsRef = useRef(null)

  useEffect(() => {
    if (activeFeature && detailsRef.current) {
      detailsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }
  }, [activeFeature])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'var(--success)'
      case 'beta':
        return 'var(--warning)'
      case 'development':
        return 'var(--accent-primary)'
      case 'planning':
        return 'var(--text-muted)'
      default:
        return 'var(--text-secondary)'
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return '✅'
      case 'beta':
        return '🧪'
      case 'development':
        return '🚧'
      case 'planning':
        return '📋'
      default:
        return '⚡'
    }
  }

  const handleFeatureEdit = (featureId, field, value) => {
    if (isEditing) {
      onFeatureUpdate(featureId, { [field]: value })
    }
  }

  const toggleExpanded = (featureId) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId)
  }

  const handleDemoClick = (demoUrl, e) => {
    e.stopPropagation()
    if (demoUrl && demoUrl !== '#') {
      // Navigate to demo
      window.location.href = demoUrl
    }
  }

  const handleGithubClick = (githubUrl, e) => {
    e.stopPropagation()
    if (githubUrl && githubUrl !== '#') {
      window.open(githubUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section 
      className={`feature-showcase ${className}`}
      style={{
        marginBottom: 'var(--spacing-xl)'
      }}
      aria-labelledby="features-heading"
    >
      <h2 
        id="features-heading"
        style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-lg)',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        🚀 Feature Showcase
      </h2>

      {features.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--spacing-xl)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius-lg)',
            color: 'var(--text-muted)'
          }}
          role="status"
        >
          <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>🔍</div>
          <h3 style={{ margin: '0 0 var(--spacing-sm) 0', color: 'var(--text-secondary)' }}>
            No features found
          </h3>
          <p style={{ margin: 0 }}>
            Try adjusting your search terms or browse all features
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'var(--spacing-lg)',
            marginBottom: activeFeature ? 'var(--spacing-xl)' : 0
          }}
        >
          {features.map((feature, index) => (
            <article
              key={feature.id}
              style={{
                background: 'var(--bg-secondary)',
                border: activeFeature === feature.id 
                  ? '2px solid var(--accent-primary)' 
                  : '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-lg)',
                padding: 'var(--spacing-lg)',
                boxShadow: hoveredFeature === feature.id 
                  ? 'var(--shadow-xl)' 
                  : 'var(--shadow-md)',
                transition: 'var(--transition)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transform: hoveredFeature === feature.id 
                  ? 'translateY(-4px) scale(1.02)' 
                  : 'translateY(0) scale(1)'
              }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
              onClick={() => onFeatureClick(feature.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onFeatureClick(feature.id)
                }
              }}
              tabIndex="0"
              role="button"
              aria-expanded={activeFeature === feature.id}
              aria-describedby={`feature-${feature.id}-desc`}
            >
              {/* Status Indicator */}
              <div
                style={{
                  position: 'absolute',
                  top: 'var(--spacing-sm)',
                  right: 'var(--spacing-sm)',
                  background: getStatusColor(feature.status),
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
                aria-label={`Status: ${feature.status}`}
              >
                <span>{getStatusIcon(feature.status)}</span>
                {feature.status}
              </div>

              {/* Feature Icon */}
              <div
                style={{
                  fontSize: '3rem',
                  marginBottom: 'var(--spacing-md)',
                  textAlign: 'center',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                }}
                aria-hidden="true"
              >
                {feature.icon}
              </div>

              {/* Feature Title */}
              {isEditing ? (
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => handleFeatureEdit(feature.id, 'title', e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    background: 'transparent',
                    border: '2px dashed var(--border-color)',
                    borderRadius: 'var(--border-radius)',
                    padding: 'var(--spacing-xs)',
                    color: 'var(--text-primary)',
                    width: '100%',
                    marginBottom: 'var(--spacing-md)',
                    fontFamily: 'inherit'
                  }}
                  aria-label="Edit feature title"
                />
              ) : (
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    margin: '0 0 var(--spacing-md) 0',
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}
                >
                  {feature.title}
                </h3>
              )}

              {/* Feature Description */}
              {isEditing ? (
                <textarea
                  value={feature.description}
                  onChange={(e) => handleFeatureEdit(feature.id, 'description', e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: '1rem',
                    background: 'transparent',
                    border: '2px dashed var(--border-color)',
                    borderRadius: 'var(--border-radius)',
                    padding: 'var(--spacing-sm)',
                    color: 'var(--text-secondary)',
                    width: '100%',
                    minHeight: '4rem',
                    resize: 'vertical',
                    marginBottom: 'var(--spacing-md)',
                    fontFamily: 'inherit',
                    lineHeight: '1.6'
                  }}
                  aria-label="Edit feature description"
                />
              ) : (
                <p
                  id={`feature-${feature.id}-desc`}
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: '0 0 var(--spacing-md) 0'
                  }}
                >
                  {feature.description}
                </p>
              )}

              {/* Progress Bar */}
              <div
                style={{
                  marginBottom: 'var(--spacing-md)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-xs)',
                    fontSize: '0.875rem'
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                    Completion
                  </span>
                  <span style={{ 
                    color: 'var(--text-primary)', 
                    fontWeight: '700',
                    fontFamily: '"SF Mono", "Monaco", "Consolas", monospace'
                  }}>
                    {feature.completion}%
                  </span>
                </div>
                <div
                  style={{
                    background: 'var(--bg-tertiary)',
                    borderRadius: '0.5rem',
                    height: '8px',
                    overflow: 'hidden'
                  }}
                  role="progressbar"
                  aria-valuenow={feature.completion}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label={`${feature.title} completion progress`}
                >
                  <div
                    style={{
                      background: `linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))`,
                      height: '100%',
                      width: `${feature.completion}%`,
                      transition: 'width 0.6s ease-out',
                      borderRadius: '0.5rem'
                    }}
                  />
                </div>
              </div>

              {/* Technologies */}
              <div
                style={{
                  marginBottom: 'var(--spacing-md)'
                }}
              >
                <h4
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    margin: '0 0 var(--spacing-xs) 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Technologies
                </h4>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--spacing-xs)'
                  }}
                >
                  {feature.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      style={{
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        border: '1px solid var(--border-color)',
                        transition: 'var(--transition)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {feature.highlights && feature.highlights.length > 0 && (
                <div
                  style={{
                    marginBottom: 'var(--spacing-md)'
                  }}
                >
                  <h4
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: 'var(--text-secondary)',
                      margin: '0 0 var(--spacing-xs) 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Key Features
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: 'none'
                    }}
                  >
                    {feature.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlightIndex}
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          marginBottom: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-xs)'
                        }}
                      >
                        <span style={{ color: 'var(--success)', fontSize: '0.75rem' }}>●</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-sm)',
                  marginTop: 'auto'
                }}
              >
                <button
                  onClick={(e) => handleDemoClick(feature.demoUrl, e)}
                  disabled={!feature.demoUrl || feature.demoUrl === '#'}
                  style={{
                    flex: 1,
                    background: feature.demoUrl && feature.demoUrl !== '#' 
                      ? 'var(--accent-primary)' 
                      : 'var(--bg-tertiary)',
                    color: feature.demoUrl && feature.demoUrl !== '#' 
                      ? 'white' 
                      : 'var(--text-muted)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius)',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: feature.demoUrl && feature.demoUrl !== '#' 
                      ? 'pointer' 
                      : 'not-allowed',
                    transition: 'var(--transition)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => {
                    if (feature.demoUrl && feature.demoUrl !== '#') {
                      e.target.style.background = 'var(--accent-secondary)'
                      e.target.style.transform = 'translateY(-1px)'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (feature.demoUrl && feature.demoUrl !== '#') {
                      e.target.style.background = 'var(--accent-primary)'
                      e.target.style.transform = 'translateY(0)'
                    }
                  }}
                  aria-label={`View ${feature.title} demo`}
                >
                  🚀 Demo
                </button>

                <button
                  onClick={(e) => handleGithubClick(feature.githubUrl, e)}
                  disabled={!feature.githubUrl || feature.githubUrl === '#'}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius)',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: feature.githubUrl && feature.githubUrl !== '#' 
                      ? 'pointer' 
                      : 'not-allowed',
                    transition: 'var(--transition)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: feature.githubUrl && feature.githubUrl !== '#' ? 1 : 0.5
                  }}
                  onMouseOver={(e) => {
                    if (feature.githubUrl && feature.githubUrl !== '#') {
                      e.target.style.background = 'var(--bg-tertiary)'
                      e.target.style.transform = 'translateY(-1px)'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (feature.githubUrl && feature.githubUrl !== '#') {
                      e.target.style.background = 'transparent'
                      e.target.style.transform = 'translateY(0)'
                    }
                  }}
                  aria-label={`View ${feature.title} source code`}
                >
                  💻 Code
                </button>
              </div>

              {/* Expand Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleExpanded(feature.id)
                }}
                style={{
                  position: 'absolute',
                  bottom: 'var(--spacing-sm)',
                  right: 'var(--spacing-sm)',
                  background: expandedFeature === feature.id 
                    ? 'var(--accent-primary)' 
                    : 'var(--bg-tertiary)',
                  color: expandedFeature === feature.id ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '50%',
                  width: '2rem',
                  height: '2rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.1)'
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)'
                }}
                aria-label={expandedFeature === feature.id ? 'Collapse details' : 'Expand details'}
              >
                {expandedFeature === feature.id ? '▲' : '▼'}
              </button>

              {/* Expanded Details */}
              {expandedFeature === feature.id && (
                <div
                  style={{
                    marginTop: 'var(--spacing-lg)',
                    padding: 'var(--spacing-md)',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--spacing-sm)'
                    }}
                  >
                    📋 Detailed Information
                  </h4>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6'
                    }}
                  >
                    <p>
                      This feature represents a core component of the Employee Management System,
                      showcasing modern web development practices and user-centered design principles.
                    </p>
                    <p style={{ margin: '0.5rem 0' }}>
                      <strong>Implementation Details:</strong> Built with React functional components,
                      utilizing hooks for state management and context for data sharing across the application.
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Performance:</strong> Optimized for fast rendering and smooth user interactions
                      with lazy loading and code splitting techniques.
                    </p>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Feature Detail Modal/Expanded View */}
      {activeFeature && (
        <div
          ref={detailsRef}
          style={{
            background: 'var(--bg-secondary)',
            border: '2px solid var(--accent-primary)',
            borderRadius: 'var(--border-radius-lg)',
            padding: 'var(--spacing-xl)',
            boxShadow: 'var(--shadow-xl)',
            marginTop: 'var(--spacing-xl)',
            animation: 'slideInUp 0.3s ease-out'
          }}
          role="dialog"
          aria-labelledby="feature-detail-title"
          aria-modal="true"
        >
          {(() => {
            const feature = features.find(f => f.id === activeFeature)
            if (!feature) return null

            return (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-lg)'
                  }}
                >
                  <h3
                    id="feature-detail-title"
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-sm)'
                    }}
                  >
                    <span style={{ fontSize: '2rem' }}>{feature.icon}</span>
                    {feature.title}
                  </h3>

                  <button
                    onClick={() => onFeatureClick(null)}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '50%',
                      width: '2.5rem',
                      height: '2.5rem',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: 'var(--text-primary)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'var(--error)'
                      e.target.style.color = 'white'
                      e.target.style.transform = 'scale(1.1)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'var(--bg-tertiary)'
                      e.target.style.color = 'var(--text-primary)'
                      e.target.style.transform = 'scale(1)'
                    }}
                    aria-label="Close feature details"
                  >
                    ✕
                  </button>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--spacing-lg)'
                  }}
                >
                  <div>
                    <h4 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '600', 
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--spacing-md)'
                    }}>
                      📄 Description
                    </h4>
                    <p style={{ 
                      fontSize: '1rem', 
                      color: 'var(--text-secondary)', 
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {feature.description}
                    </p>
                  </div>

                  <div>
                    <h4 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '600', 
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--spacing-md)'
                    }}>
                      🛠️ Technology Stack
                    </h4>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 'var(--spacing-sm)' 
                    }}>
                      {feature.technologies.map((tech, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'var(--accent-primary)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--border-radius)',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )
          })()}
        </div>
      )}
    </section>
  )
}

export default FeatureShowcase
