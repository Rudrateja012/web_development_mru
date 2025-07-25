import React, { useState, useRef } from 'react'
import { useTheme } from './ThemeProvider'

const FeatureShowcase = ({
  projects,
  selectedProject,
  onProjectSelect,
  theme,
  viewMode,
  onViewModeChange
}) => {
  const { theme: themeConfig } = useTheme()
  const [hoveredProject, setHoveredProject] = useState(null)
  const [imageLoadStates, setImageLoadStates] = useState({})
  const [expandedProject, setExpandedProject] = useState(null)
  const showcaseRef = useRef(null)

  // View mode options
  const viewModes = [
    { value: 'grid', label: 'Grid', icon: '⊞' },
    { value: 'list', label: 'List', icon: '☰' },
    { value: 'card', label: 'Cards', icon: '◧' }
  ]

  // Handle image loading states
  const handleImageLoad = (projectId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [projectId]: 'loaded'
    }))
  }

  const handleImageError = (projectId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [projectId]: 'error'
    }))
  }

  // Get technology color
  const getTechColor = (tech) => {
    const colors = {
      'React': '#61dafb',
      'Node.js': '#68a063',
      'MongoDB': '#4db33d',
      'Vue.js': '#4fc08d',
      'Express': '#ffffff',
      'PostgreSQL': '#336791',
      'React Native': '#61dafb',
      'Firebase': '#ffca28',
      'Socket.io': '#010101',
      'Chart.js': '#ff6384',
      'Redux': '#764abc',
      'Expo': '#000020'
    }
    return colors[tech] || themeConfig.primary
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Ongoing'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  // Get status badge style
  const getStatusBadgeStyle = (status) => {
    const styles = {
      'completed': {
        background: `${themeConfig.success}20`,
        color: themeConfig.success,
        border: `1px solid ${themeConfig.success}40`
      },
      'in-progress': {
        background: `${themeConfig.warning}20`,
        color: themeConfig.warning,
        border: `1px solid ${themeConfig.warning}40`
      },
      'planning': {
        background: `${themeConfig.info}20`,
        color: themeConfig.info,
        border: `1px solid ${themeConfig.info}40`
      }
    }
    return styles[status] || styles.planning
  }

  // Handle project expansion
  const toggleProjectExpansion = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  return (
    <div style={containerStyles()}>
      {/* Header with View Mode Toggle */}
      <div style={headerStyles()}>
        <div>
          <h2 style={titleStyles()}>🚀 Featured Projects</h2>
          <p style={subtitleStyles()}>
            Showcasing {projects.length} innovative solutions
          </p>
        </div>
        
        <div style={viewModeToggleStyles()}>
          {viewModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => onViewModeChange(mode.value)}
              style={viewModeButtonStyles(mode.value === viewMode)}
              title={`Switch to ${mode.label} view`}
            >
              <span style={{ fontSize: '16px' }}>{mode.icon}</span>
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Showcase */}
      <div 
        ref={showcaseRef}
        style={showcaseGridStyles(viewMode)}
        className={`showcase-${viewMode}`}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            style={projectCardStyles(viewMode, index)}
            className={`project-card ${viewMode}-mode`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => onProjectSelect(project)}
          >
            {/* Project Image */}
            {viewMode !== 'list' && (
              <div style={imageContainerStyles(viewMode)}>
                {imageLoadStates[project.id] !== 'loaded' && (
                  <div style={imagePlaceholderStyles()}>
                    <span style={{ fontSize: '48px' }}>🖼️</span>
                    <p>Loading...</p>
                  </div>
                )}
                <img
                  src={project.image || '/api/placeholder/400/250'}
                  alt={project.title}
                  style={imageStyles(imageLoadStates[project.id] === 'loaded')}
                  onLoad={() => handleImageLoad(project.id)}
                  onError={() => handleImageError(project.id)}
                />
                
                {/* Featured Badge */}
                {project.featured && (
                  <div style={featuredBadgeStyles()}>
                    <span>⭐</span>
                    <span>Featured</span>
                  </div>
                )}

                {/* Status Badge */}
                <div style={{
                  ...statusBadgeStyles(),
                  ...getStatusBadgeStyle(project.status)
                }}>
                  {project.status === 'completed' && '✅'}
                  {project.status === 'in-progress' && '🚧'}
                  {project.status === 'planning' && '📋'}
                  <span style={{ marginLeft: '4px', textTransform: 'capitalize' }}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>

                {/* Hover Overlay */}
                {hoveredProject === project.id && (
                  <div style={hoverOverlayStyles()}>
                    <div style={hoverContentStyles()}>
                      <button style={actionButtonStyles()}>
                        <span>👁️</span>
                        <span>View Details</span>
                      </button>
                      {project.demo && (
                        <button 
                          style={actionButtonStyles()}
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.demo, '_blank')
                          }}
                        >
                          <span>🚀</span>
                          <span>Live Demo</span>
                        </button>
                      )}
                      {project.github && (
                        <button 
                          style={actionButtonStyles()}
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.github, '_blank')
                          }}
                        >
                          <span>💻</span>
                          <span>GitHub</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Project Content */}
            <div style={contentStyles(viewMode)}>
              {/* Header */}
              <div style={contentHeaderStyles()}>
                <h3 style={projectTitleStyles(viewMode)}>{project.title}</h3>
                {viewMode === 'list' && (
                  <div style={{
                    ...statusBadgeStyles(),
                    ...getStatusBadgeStyle(project.status),
                    position: 'static',
                    marginLeft: 'auto'
                  }}>
                    {project.status === 'completed' && '✅'}
                    {project.status === 'in-progress' && '🚧'}
                    {project.status === 'planning' && '📋'}
                    <span style={{ marginLeft: '4px', textTransform: 'capitalize' }}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p style={descriptionStyles(viewMode)}>
                {project.description}
              </p>

              {/* Technologies */}
              <div style={technologiesStyles()}>
                {project.technologies?.slice(0, viewMode === 'list' ? 4 : 6).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    style={{
                      ...techBadgeStyles(),
                      background: `${getTechColor(tech)}20`,
                      color: getTechColor(tech),
                      border: `1px solid ${getTechColor(tech)}40`
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies?.length > (viewMode === 'list' ? 4 : 6) && (
                  <span style={moreTechStyles()}>
                    +{project.technologies.length - (viewMode === 'list' ? 4 : 6)} more
                  </span>
                )}
              </div>

              {/* Metrics */}
              <div style={metricsStyles()}>
                <div style={metricItemStyles()}>
                  <span>⭐</span>
                  <span>{project.metrics?.stars || 0}</span>
                </div>
                <div style={metricItemStyles()}>
                  <span>👁️</span>
                  <span>{project.metrics?.views || 0}</span>
                </div>
                <div style={metricItemStyles()}>
                  <span>⬇️</span>
                  <span>{project.metrics?.downloads || 0}</span>
                </div>
                <div style={metricItemStyles()}>
                  <span>📅</span>
                  <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                </div>
              </div>

              {/* Expandable Details */}
              {viewMode !== 'grid' && (
                <div style={expandableDetailsStyles()}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleProjectExpansion(project.id)
                    }}
                    style={expandButtonStyles()}
                  >
                    <span>📋</span>
                    <span>{expandedProject === project.id ? 'Hide' : 'Show'} Details</span>
                    <span style={expandIconStyles(expandedProject === project.id)}>
                      {expandedProject === project.id ? '▲' : '▼'}
                    </span>
                  </button>

                  {expandedProject === project.id && (
                    <div style={expandedContentStyles()}>
                      {/* Features */}
                      {project.features && (
                        <div style={featureSectionStyles()}>
                          <h4 style={featureTitleStyles()}>✨ Key Features</h4>
                          <ul style={featureListStyles()}>
                            {project.features.map((feature, featureIndex) => (
                              <li key={featureIndex} style={featureItemStyles()}>
                                <span style={featureBulletStyles()}>▸</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Team */}
                      {project.team && project.team.length > 0 && (
                        <div style={featureSectionStyles()}>
                          <h4 style={featureTitleStyles()}>👥 Team</h4>
                          <div style={teamListStyles()}>
                            {project.team.map((member, memberIndex) => (
                              <span key={memberIndex} style={teamMemberStyles()}>
                                👤 {member}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div style={featureSectionStyles()}>
                          <h4 style={featureTitleStyles()}>🏷️ Tags</h4>
                          <div style={tagsContainerStyles()}>
                            {project.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} style={tagStyles()}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons for List/Card View */}
              {viewMode !== 'grid' && (
                <div style={actionButtonsStyles()}>
                  <button 
                    style={primaryActionButtonStyles()}
                    onClick={(e) => {
                      e.stopPropagation()
                      onProjectSelect(project)
                    }}
                  >
                    <span>👁️</span>
                    <span>View Details</span>
                  </button>
                  {project.demo && (
                    <button 
                      style={secondaryActionButtonStyles()}
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.demo, '_blank')
                      }}
                    >
                      <span>🚀</span>
                      <span>Demo</span>
                    </button>
                  )}
                  {project.github && (
                    <button 
                      style={secondaryActionButtonStyles()}
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.github, '_blank')
                      }}
                    >
                      <span>💻</span>
                      <span>Code</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div style={emptyStateStyles()}>
          <div style={emptyIconStyles()}>🔍</div>
          <h3 style={emptyTitleStyles()}>No projects found</h3>
          <p style={emptyDescriptionStyles()}>
            Try adjusting your search criteria or filters to find more projects.
          </p>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{getCustomStyles()}</style>
    </div>
  )

  // Styling functions
  function containerStyles() {
    return {
      background: themeConfig.cardBackground,
      backdropFilter: themeConfig.backdropBlur,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '20px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: themeConfig.shadowLight,
      transition: 'all 0.3s ease'
    }
  }

  function headerStyles() {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
      gap: '20px',
      flexWrap: 'wrap'
    }
  }

  function titleStyles() {
    return {
      margin: 0,
      fontSize: '28px',
      fontWeight: '700',
      background: themeConfig.gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: '1.2',
      marginBottom: '8px'
    }
  }

  function subtitleStyles() {
    return {
      margin: 0,
      fontSize: '16px',
      color: themeConfig.textSecondary,
      fontWeight: '400'
    }
  }

  function viewModeToggleStyles() {
    return {
      display: 'flex',
      gap: '8px',
      background: themeConfig.surface,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '12px',
      padding: '4px',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
    }
  }

  function viewModeButtonStyles(isActive) {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      background: isActive ? themeConfig.primary : 'transparent',
      color: isActive ? '#ffffff' : themeConfig.text,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  function showcaseGridStyles(viewMode) {
    const gridStyles = {
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
      },
      list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      },
      card: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }
    }
    return gridStyles[viewMode] || gridStyles.grid
  }

  function projectCardStyles(viewMode, index) {
    const baseStyle = {
      background: themeConfig.glassmorphism,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: viewMode === 'list' ? '12px' : '16px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
    }

    const modeStyles = {
      grid: {
        flexDirection: 'column'
      },
      list: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '16px'
      },
      card: {
        flexDirection: 'column',
        minHeight: '400px'
      }
    }

    return { ...baseStyle, ...modeStyles[viewMode] }
  }

  function imageContainerStyles(viewMode) {
    return {
      position: 'relative',
      width: viewMode === 'list' ? '200px' : '100%',
      height: viewMode === 'list' ? '120px' : '200px',
      overflow: 'hidden',
      flexShrink: 0,
      borderRadius: viewMode === 'list' ? '8px' : '0'
    }
  }

  function imagePlaceholderStyles() {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: themeConfig.surface,
      color: themeConfig.textMuted,
      fontSize: '14px',
      zIndex: 1
    }
  }

  function imageStyles(isLoaded) {
    return {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 0.3s ease'
    }
  }

  function featuredBadgeStyles() {
    return {
      position: 'absolute',
      top: '12px',
      left: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 8px',
      background: `${themeConfig.accent}20`,
      color: themeConfig.accent,
      border: `1px solid ${themeConfig.accent}40`,
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      backdropFilter: 'blur(10px)',
      zIndex: 2
    }
  }

  function statusBadgeStyles() {
    return {
      position: 'absolute',
      top: '12px',
      right: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      backdropFilter: 'blur(10px)',
      zIndex: 2
    }
  }

  function hoverOverlayStyles() {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3,
      animation: 'fadeIn 0.3s ease-out'
    }
  }

  function hoverContentStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'center'
    }
  }

  function actionButtonStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      background: themeConfig.glassmorphism,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '8px',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500',
      outline: 'none',
      backdropFilter: 'blur(10px)'
    }
  }

  function contentStyles(viewMode) {
    return {
      padding: viewMode === 'list' ? '0 0 0 16px' : '20px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }

  function contentHeaderStyles() {
    return {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '12px'
    }
  }

  function projectTitleStyles(viewMode) {
    return {
      margin: 0,
      fontSize: viewMode === 'list' ? '18px' : '20px',
      fontWeight: '600',
      color: themeConfig.text,
      lineHeight: '1.3',
      flex: 1
    }
  }

  function descriptionStyles(viewMode) {
    return {
      margin: 0,
      fontSize: '14px',
      color: themeConfig.textSecondary,
      lineHeight: '1.5',
      display: '-webkit-box',
      WebkitLineClamp: viewMode === 'list' ? 2 : 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }

  function technologiesStyles() {
    return {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px'
    }
  }

  function techBadgeStyles() {
    return {
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    }
  }

  function moreTechStyles() {
    return {
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      color: themeConfig.textMuted,
      background: themeConfig.border + '40',
      border: `1px solid ${themeConfig.border}`
    }
  }

  function metricsStyles() {
    return {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      marginTop: '8px'
    }
  }

  function metricItemStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      color: themeConfig.textMuted,
      fontWeight: '500'
    }
  }

  function expandableDetailsStyles() {
    return {
      marginTop: '12px',
      borderTop: `1px solid ${themeConfig.border}`,
      paddingTop: '12px'
    }
  }

  function expandButtonStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      width: '100%',
      padding: '8px 0',
      background: 'none',
      border: 'none',
      color: themeConfig.primary,
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      outline: 'none',
      justifyContent: 'flex-start',
      transition: 'all 0.3s ease'
    }
  }

  function expandIconStyles(isExpanded) {
    return {
      marginLeft: 'auto',
      fontSize: '12px',
      transition: 'transform 0.3s ease',
      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
    }
  }

  function expandedContentStyles() {
    return {
      marginTop: '12px',
      animation: 'slideDown 0.3s ease-out'
    }
  }

  function featureSectionStyles() {
    return {
      marginBottom: '16px'
    }
  }

  function featureTitleStyles() {
    return {
      margin: '0 0 8px 0',
      fontSize: '14px',
      fontWeight: '600',
      color: themeConfig.text,
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }

  function featureListStyles() {
    return {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    }
  }

  function featureItemStyles() {
    return {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      padding: '4px 0',
      fontSize: '13px',
      color: themeConfig.textSecondary,
      lineHeight: '1.4'
    }
  }

  function featureBulletStyles() {
    return {
      color: themeConfig.primary,
      fontWeight: '600',
      flexShrink: 0,
      marginTop: '1px'
    }
  }

  function teamListStyles() {
    return {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    }
  }

  function teamMemberStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 8px',
      background: themeConfig.glassmorphism,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '6px',
      fontSize: '12px',
      color: themeConfig.textSecondary,
      fontWeight: '500'
    }
  }

  function tagsContainerStyles() {
    return {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px'
    }
  }

  function tagStyles() {
    return {
      padding: '4px 8px',
      background: `${themeConfig.primary}20`,
      color: themeConfig.primary,
      border: `1px solid ${themeConfig.primary}40`,
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500'
    }
  }

  function actionButtonsStyles() {
    return {
      display: 'flex',
      gap: '8px',
      marginTop: '12px',
      paddingTop: '12px',
      borderTop: `1px solid ${themeConfig.border}`
    }
  }

  function primaryActionButtonStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 16px',
      background: themeConfig.primary,
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '13px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  function secondaryActionButtonStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 12px',
      background: themeConfig.glassmorphism,
      color: themeConfig.text,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '13px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  function emptyStateStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      textAlign: 'center'
    }
  }

  function emptyIconStyles() {
    return {
      fontSize: '64px',
      marginBottom: '16px',
      opacity: 0.5
    }
  }

  function emptyTitleStyles() {
    return {
      margin: '0 0 8px 0',
      fontSize: '24px',
      fontWeight: '600',
      color: themeConfig.text
    }
  }

  function emptyDescriptionStyles() {
    return {
      margin: 0,
      fontSize: '16px',
      color: themeConfig.textSecondary,
      maxWidth: '400px'
    }
  }

  function getCustomStyles() {
    return `
      /* Hover effects */
      .project-card:hover {
        transform: translateY(-4px);
        box-shadow: ${themeConfig.shadow};
        border-color: ${themeConfig.primary}40;
      }

      .grid-mode:hover .project-title {
        color: ${themeConfig.primary};
      }

      .list-mode:hover {
        background: ${themeConfig.glassmorphism};
      }

      /* View mode button hover */
      button[style*="viewModeButtonStyles"]:not([style*="background: ${themeConfig.primary}"]):hover {
        background: ${themeConfig.glassmorphism} !important;
      }

      /* Action button hovers */
      button[style*="actionButtonStyles"]:hover,
      button[style*="primaryActionButtonStyles"]:hover {
        transform: translateY(-1px);
        box-shadow: ${themeConfig.shadowLight};
      }

      button[style*="secondaryActionButtonStyles"]:hover {
        border-color: ${themeConfig.primary};
        background: ${themeConfig.primary}10;
      }

      /* Tech badge hover */
      span[style*="techBadgeStyles"]:hover {
        transform: scale(1.05);
      }

      /* Expand button hover */
      button[style*="expandButtonStyles"]:hover {
        color: ${themeConfig.primary} !important;
        padding-left: 8px;
      }

      /* Animations */
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .showcase-grid {
          grid-template-columns: 1fr !important;
        }

        .showcase-card {
          grid-template-columns: 1fr !important;
        }

        .list-mode {
          flex-direction: column !important;
        }

        .image-container {
          width: 100% !important;
          height: 200px !important;
        }

        .header {
          flex-direction: column;
          align-items: flex-start;
        }

        .view-mode-toggle {
          align-self: stretch;
        }

        .metrics {
          gap: 8px !important;
        }

        .action-buttons {
          flex-direction: column;
        }
      }

      @media (max-width: 480px) {
        .container {
          padding: 16px;
        }

        .project-card {
          margin: 0 -4px;
        }

        .content {
          padding: 16px !important;
        }

        .technologies {
          gap: 4px !important;
        }

        .view-mode-toggle button {
          flex: 1;
          justify-content: center;
        }
      }

      /* Accessibility */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transition: none !important;
        }
      }

      /* Focus styles */
      button:focus {
        outline: 2px solid ${themeConfig.primary};
        outline-offset: 2px;
      }

      .project-card:focus {
        outline: 2px solid ${themeConfig.primary};
        outline-offset: 2px;
      }
    `
  }
}

export default FeatureShowcase
