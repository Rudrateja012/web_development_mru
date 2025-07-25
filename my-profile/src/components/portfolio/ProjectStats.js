import React, { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'

const ProjectStats = ({ projects, filteredProjects, theme }) => {
  const { theme: themeConfig } = useTheme()
  const [animatedStats, setAnimatedStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    totalStars: 0,
    totalViews: 0,
    featuredProjects: 0
  })
  const [showDetails, setShowDetails] = useState(false)

  // Calculate stats
  const stats = {
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    inProgressProjects: projects.filter(p => p.status === 'in-progress').length,
    totalStars: projects.reduce((sum, p) => sum + (p.metrics?.stars || 0), 0),
    totalViews: projects.reduce((sum, p) => sum + (p.metrics?.views || 0), 0),
    totalDownloads: projects.reduce((sum, p) => sum + (p.metrics?.downloads || 0), 0),
    featuredProjects: projects.filter(p => p.featured).length,
    averageRating: projects.length > 0 ? (projects.reduce((sum, p) => sum + (p.metrics?.stars || 0), 0) / projects.length).toFixed(1) : 0,
    mostUsedTechnology: getMostUsedTechnology(projects),
    recentActivity: getRecentActivity(projects)
  }

  // Filtered stats
  const filteredStats = {
    showing: filteredProjects.length,
    hidden: projects.length - filteredProjects.length
  }

  // Animation effect for stats
  useEffect(() => {
    const currentStats = {
      totalProjects: projects.length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      inProgressProjects: projects.filter(p => p.status === 'in-progress').length,
      totalStars: projects.reduce((sum, p) => sum + (p.metrics?.stars || 0), 0),
      totalViews: projects.reduce((sum, p) => sum + (p.metrics?.views || 0), 0),
      featuredProjects: projects.filter(p => p.featured).length
    }

    const duration = 1000 // 1 second
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        totalProjects: Math.floor(currentStats.totalProjects * progress),
        completedProjects: Math.floor(currentStats.completedProjects * progress),
        inProgressProjects: Math.floor(currentStats.inProgressProjects * progress),
        totalStars: Math.floor(currentStats.totalStars * progress),
        totalViews: Math.floor(currentStats.totalViews * progress),
        featuredProjects: Math.floor(currentStats.featuredProjects * progress)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedStats(currentStats)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [projects])

  // Helper functions
  function getMostUsedTechnology(projects) {
    const techCount = {}
    projects.forEach(project => {
      project.technologies?.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1
      })
    })
    
    return Object.entries(techCount).reduce((a, b) => 
      techCount[a[0]] > techCount[b[0]] ? a : b, ['None', 0]
    )[0]
  }

  function getRecentActivity(projects) {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    
    return projects.filter(project => {
      const projectDate = new Date(project.startDate || project.endDate)
      return projectDate >= thirtyDaysAgo
    }).length
  }

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  function getCompletionRate() {
    if (stats.totalProjects === 0) return 0
    return Math.round((stats.completedProjects / stats.totalProjects) * 100)
  }

  return (
    <div style={containerStyles()}>
      {/* Main Stats Grid */}
      <div style={statsGridStyles()}>
        {/* Total Projects */}
        <div style={statCardStyles()} className="stat-card">
          <div style={statIconStyles('#667eea')}>
            <span style={{ fontSize: '24px' }}>📊</span>
          </div>
          <div style={statContentStyles()}>
            <h3 style={statNumberStyles()}>{animatedStats.totalProjects}</h3>
            <p style={statLabelStyles()}>Total Projects</p>
            <div style={statSubtextStyles()}>
              {filteredStats.showing} showing
              {filteredStats.hidden > 0 && `, ${filteredStats.hidden} filtered`}
            </div>
          </div>
        </div>

        {/* Completed Projects */}
        <div style={statCardStyles()} className="stat-card">
          <div style={statIconStyles(themeConfig.success)}>
            <span style={{ fontSize: '24px' }}>✅</span>
          </div>
          <div style={statContentStyles()}>
            <h3 style={statNumberStyles()}>{animatedStats.completedProjects}</h3>
            <p style={statLabelStyles()}>Completed</p>
            <div style={statSubtextStyles()}>
              {getCompletionRate()}% completion rate
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div style={statCardStyles()} className="stat-card">
          <div style={statIconStyles(themeConfig.warning)}>
            <span style={{ fontSize: '24px' }}>🚧</span>
          </div>
          <div style={statContentStyles()}>
            <h3 style={statNumberStyles()}>{animatedStats.inProgressProjects}</h3>
            <p style={statLabelStyles()}>In Progress</p>
            <div style={statSubtextStyles()}>
              Active development
            </div>
          </div>
        </div>

        {/* Total Stars */}
        <div style={statCardStyles()} className="stat-card">
          <div style={statIconStyles('#f093fb')}>
            <span style={{ fontSize: '24px' }}>⭐</span>
          </div>
          <div style={statContentStyles()}>
            <h3 style={statNumberStyles()}>{formatNumber(animatedStats.totalStars)}</h3>
            <p style={statLabelStyles()}>Stars</p>
            <div style={statSubtextStyles()}>
              {stats.averageRating} avg rating
            </div>
          </div>
        </div>

        {/* Total Views */}
        <div style={statCardStyles()} className="stat-card">
          <div style={statIconStyles('#764ba2')}>
            <span style={{ fontSize: '24px' }}>👀</span>
          </div>
          <div style={statContentStyles()}>
            <h3 style={statNumberStyles()}>{formatNumber(stats.totalViews)}</h3>
            <p style={statLabelStyles()}>Views</p>
            <div style={statSubtextStyles()}>
              Total project views
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div style={statCardStyles()} className="stat-card">
          <div style={statIconStyles('#ed8936')}>
            <span style={{ fontSize: '24px' }}>🌟</span>
          </div>
          <div style={statContentStyles()}>
            <h3 style={statNumberStyles()}>{animatedStats.featuredProjects}</h3>
            <p style={statLabelStyles()}>Featured</p>
            <div style={statSubtextStyles()}>
              Highlighted projects
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div style={progressSectionStyles()}>
        <h3 style={progressTitleStyles()}>📈 Project Progress Overview</h3>
        
        {/* Completion Progress Bar */}
        <div style={progressBarContainerStyles()}>
          <div style={progressBarLabelStyles()}>
            <span>Overall Completion</span>
            <span style={progressPercentageStyles()}>{getCompletionRate()}%</span>
          </div>
          <div style={progressBarStyles()}>
            <div 
              style={progressBarFillStyles(getCompletionRate())}
              className="progress-fill"
            />
          </div>
        </div>

        {/* Status Distribution */}
        <div style={statusDistributionStyles()}>
          <div style={statusItemStyles()}>
            <div style={statusDotStyles(themeConfig.success)} />
            <span style={statusLabelStyles()}>Completed ({stats.completedProjects})</span>
          </div>
          <div style={statusItemStyles()}>
            <div style={statusDotStyles(themeConfig.warning)} />
            <span style={statusLabelStyles()}>In Progress ({stats.inProgressProjects})</span>
          </div>
          <div style={statusItemStyles()}>
            <div style={statusDotStyles(themeConfig.info)} />
            <span style={statusLabelStyles()}>Planning ({stats.totalProjects - stats.completedProjects - stats.inProgressProjects})</span>
          </div>
        </div>
      </div>

      {/* Detailed Stats Toggle */}
      <div style={detailsToggleContainerStyles()}>
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={detailsToggleStyles()}
          className="details-toggle"
        >
          <span>📋</span>
          <span>{showDetails ? 'Hide' : 'Show'} Details</span>
          <span style={toggleIconStyles(showDetails)}>
            {showDetails ? '▲' : '▼'}
          </span>
        </button>
      </div>

      {/* Extended Details */}
      {showDetails && (
        <div style={extendedDetailsStyles()} className="extended-details">
          <div style={detailsGridStyles()}>
            {/* Technology Stats */}
            <div style={detailCardStyles()}>
              <h4 style={detailTitleStyles()}>🛠️ Technology</h4>
              <div style={detailContentStyles()}>
                <div style={detailItemStyles()}>
                  <span style={detailLabelStyles()}>Most Used:</span>
                  <span style={detailValueStyles()}>{stats.mostUsedTechnology}</span>
                </div>
                <div style={detailItemStyles()}>
                  <span style={detailLabelStyles()}>Total Downloads:</span>
                  <span style={detailValueStyles()}>{formatNumber(stats.totalDownloads)}</span>
                </div>
                <div style={detailItemStyles()}>
                  <span style={detailLabelStyles()}>Recent Activity:</span>
                  <span style={detailValueStyles()}>{stats.recentActivity} projects this month</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div style={detailCardStyles()}>
              <h4 style={detailTitleStyles()}>📊 Performance</h4>
              <div style={detailContentStyles()}>
                <div style={detailItemStyles()}>
                  <span style={detailLabelStyles()}>Avg Stars per Project:</span>
                  <span style={detailValueStyles()}>{stats.averageRating}</span>
                </div>
                <div style={detailItemStyles()}>
                  <span style={detailLabelStyles()}>Total Engagement:</span>
                  <span style={detailValueStyles()}>{formatNumber(stats.totalStars + stats.totalViews)}</span>
                </div>
                <div style={detailItemStyles()}>
                  <span style={detailLabelStyles()}>Success Rate:</span>
                  <span style={detailValueStyles()}>{getCompletionRate()}%</span>
                </div>
              </div>
            </div>
          </div>
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

  function statsGridStyles() {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    }
  }

  function statCardStyles() {
    return {
      background: themeConfig.glassmorphism,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '16px',
      padding: '20px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }
  }

  function statIconStyles(color) {
    return {
      width: '48px',
      height: '48px',
      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 4px 20px ${color}20`,
      flexShrink: 0
    }
  }

  function statContentStyles() {
    return {
      flex: 1,
      minWidth: 0
    }
  }

  function statNumberStyles() {
    return {
      margin: 0,
      fontSize: '32px',
      fontWeight: '700',
      color: themeConfig.text,
      lineHeight: '1.2',
      marginBottom: '4px'
    }
  }

  function statLabelStyles() {
    return {
      margin: 0,
      fontSize: '14px',
      fontWeight: '600',
      color: themeConfig.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '8px'
    }
  }

  function statSubtextStyles() {
    return {
      fontSize: '12px',
      color: themeConfig.textMuted,
      fontStyle: 'italic'
    }
  }

  function progressSectionStyles() {
    return {
      marginBottom: '24px'
    }
  }

  function progressTitleStyles() {
    return {
      margin: '0 0 16px 0',
      fontSize: '18px',
      fontWeight: '600',
      color: themeConfig.text,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }

  function progressBarContainerStyles() {
    return {
      marginBottom: '16px'
    }
  }

  function progressBarLabelStyles() {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: themeConfig.textSecondary
    }
  }

  function progressPercentageStyles() {
    return {
      color: themeConfig.primary,
      fontWeight: '600'
    }
  }

  function progressBarStyles() {
    return {
      width: '100%',
      height: '8px',
      background: themeConfig.border,
      borderRadius: '4px',
      overflow: 'hidden'
    }
  }

  function progressBarFillStyles(percentage) {
    return {
      height: '100%',
      width: `${percentage}%`,
      background: themeConfig.gradient,
      borderRadius: '4px',
      transition: 'width 1s ease-out',
      animation: 'progressGlow 2s ease-in-out infinite'
    }
  }

  function statusDistributionStyles() {
    return {
      display: 'flex',
      gap: '24px',
      flexWrap: 'wrap'
    }
  }

  function statusItemStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }

  function statusDotStyles(color) {
    return {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: color,
      flexShrink: 0
    }
  }

  function statusLabelStyles() {
    return {
      fontSize: '14px',
      color: themeConfig.textSecondary,
      fontWeight: '500'
    }
  }

  function detailsToggleContainerStyles() {
    return {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: showDetails ? '24px' : '0'
    }
  }

  function detailsToggleStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 24px',
      background: themeConfig.glassmorphism,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '12px',
      color: themeConfig.text,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  function toggleIconStyles(isOpen) {
    return {
      fontSize: '12px',
      transition: 'transform 0.3s ease',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
    }
  }

  function extendedDetailsStyles() {
    return {
      background: themeConfig.surfaceAlt,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '16px',
      padding: '20px',
      animation: 'slideDown 0.3s ease-out'
    }
  }

  function detailsGridStyles() {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px'
    }
  }

  function detailCardStyles() {
    return {
      background: themeConfig.glassmorphism,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '12px',
      padding: '16px'
    }
  }

  function detailTitleStyles() {
    return {
      margin: '0 0 16px 0',
      fontSize: '16px',
      fontWeight: '600',
      color: themeConfig.text,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }

  function detailContentStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }

  function detailItemStyles() {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }

  function detailLabelStyles() {
    return {
      fontSize: '14px',
      color: themeConfig.textSecondary,
      fontWeight: '500'
    }
  }

  function detailValueStyles() {
    return {
      fontSize: '14px',
      color: themeConfig.text,
      fontWeight: '600'
    }
  }

  function getCustomStyles() {
    return `
      /* Hover effects */
      .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: ${themeConfig.shadow};
        border-color: ${themeConfig.primary}40;
      }

      .details-toggle:hover {
        background: ${themeConfig.primary}20;
        border-color: ${themeConfig.primary};
        transform: translateY(-1px);
      }

      /* Animations */
      @keyframes progressGlow {
        0%, 100% { 
          box-shadow: 0 0 10px ${themeConfig.primary}40; 
        }
        50% { 
          box-shadow: 0 0 20px ${themeConfig.primary}60; 
        }
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

      @keyframes countUp {
        from { 
          transform: scale(0.8);
          opacity: 0;
        }
        to { 
          transform: scale(1);
          opacity: 1;
        }
      }

      .stat-card h3 {
        animation: countUp 0.6s ease-out;
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .stats-grid {
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
        }

        .stat-card {
          padding: 16px;
          gap: 12px;
        }

        .stat-number {
          font-size: 24px !important;
        }

        .status-distribution {
          flex-direction: column;
          gap: 12px;
        }

        .details-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 480px) {
        .container {
          padding: 16px;
        }

        .stats-grid {
          grid-template-columns: 1fr 1fr;
        }

        .stat-icon {
          width: 40px !important;
          height: 40px !important;
        }

        .stat-icon span {
          font-size: 20px !important;
        }
      }

      /* Accessibility */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transition: none !important;
        }
      }

      /* High contrast mode */
      @media (prefers-contrast: high) {
        .stat-card {
          border-width: 2px;
        }
      }
    `
  }
}

export default ProjectStats
