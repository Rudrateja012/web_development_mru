import React, { useState, useEffect } from 'react'

const ProjectStats = ({ stats, metrics, theme, className = '' }) => {
  const [animatedStats, setAnimatedStats] = useState({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Animate numbers
    const timeouts = []
    Object.entries(stats).forEach(([key, value], index) => {
      const timeout = setTimeout(() => {
        if (typeof value === 'number') {
          animateNumber(key, 0, value, 1000)
        }
      }, index * 200)
      timeouts.push(timeout)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [stats])

  const animateNumber = (key, start, end, duration) => {
    const startTime = Date.now()
    const update = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + (end - start) * easeOutQuart)
      
      setAnimatedStats(prev => ({ ...prev, [key]: current }))
      
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }
    requestAnimationFrame(update)
  }

  const formatStatValue = (key, value) => {
    const animatedValue = animatedStats[key] ?? value
    
    switch (key) {
      case 'totalUsers':
        return animatedValue.toLocaleString()
      case 'satisfaction':
        return `${animatedValue}%`
      case 'uptime':
        return `${animatedValue}%`
      default:
        return typeof animatedValue === 'number' ? animatedValue.toLocaleString() : animatedValue
    }
  }

  const statConfigs = [
    {
      key: 'totalUsers',
      label: 'Active Users',
      icon: '👥',
      color: 'var(--success)',
      description: 'Registered users actively using the system'
    },
    {
      key: 'activeProjects',
      label: 'Projects',
      icon: '🎯',
      color: 'var(--accent-primary)',
      description: 'Currently active projects in development'
    },
    {
      key: 'completedTasks',
      label: 'Tasks Done',
      icon: '✅',
      color: 'var(--warning)',
      description: 'Successfully completed tasks and milestones'
    },
    {
      key: 'satisfaction',
      label: 'Satisfaction',
      icon: '⭐',
      color: 'var(--accent-secondary)',
      description: 'User satisfaction rating based on feedback'
    },
    {
      key: 'uptime',
      label: 'Uptime',
      icon: '🚀',
      color: 'var(--success)',
      description: 'System availability and reliability score'
    },
    {
      key: 'responses',
      label: 'Avg Response',
      icon: '⚡',
      color: 'var(--accent-primary)',
      description: 'Average API response time'
    }
  ]

  const metricConfigs = [
    {
      key: 'codeLines',
      label: 'Lines of Code',
      icon: '📝',
      color: 'var(--text-secondary)'
    },
    {
      key: 'components',
      label: 'Components',
      icon: '🧩',
      color: 'var(--text-secondary)'
    },
    {
      key: 'testCoverage',
      label: 'Test Coverage',
      icon: '🧪',
      color: 'var(--success)'
    },
    {
      key: 'performance',
      label: 'Performance',
      icon: '⚡',
      color: 'var(--warning)'
    },
    {
      key: 'accessibility',
      label: 'Accessibility',
      icon: '♿',
      color: 'var(--accent-primary)'
    }
  ]

  return (
    <section 
      className={`project-stats ${className}`}
      style={{
        marginBottom: 'var(--spacing-xl)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      role="region"
      aria-labelledby="stats-heading"
    >
      <h2 
        id="stats-heading"
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
        📊 Project Analytics
      </h2>

      {/* Main Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-xl)'
        }}
      >
        {statConfigs.map((config, index) => (
          <div
            key={config.key}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-lg)',
              padding: 'var(--spacing-lg)',
              boxShadow: 'var(--shadow-md)',
              transition: 'var(--transition)',
              position: 'relative',
              overflow: 'hidden',
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${index * 0.1}s`
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
              e.currentTarget.style.boxShadow = 'var(--shadow-xl)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = 'var(--shadow-md)'
            }}
            role="article"
            aria-labelledby={`stat-${config.key}-label`}
          >
            {/* Background accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                background: config.color,
                opacity: 0.8
              }}
              aria-hidden="true"
            />

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
              <span 
                style={{ 
                  fontSize: '2rem', 
                  marginRight: 'var(--spacing-sm)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
                aria-hidden="true"
              >
                {config.icon}
              </span>
              <div style={{ flex: 1 }}>
                <h3
                  id={`stat-${config.key}-label`}
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: 0
                  }}
                >
                  {config.label}
                </h3>
              </div>
            </div>

            <div
              style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: config.color,
                marginBottom: 'var(--spacing-xs)',
                fontFamily: '"SF Mono", "Monaco", "Consolas", monospace'
              }}
              aria-describedby={`stat-${config.key}-desc`}
            >
              {formatStatValue(config.key, stats[config.key])}
            </div>

            <p
              id={`stat-${config.key}-desc`}
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                margin: 0,
                lineHeight: '1.4'
              }}
            >
              {config.description}
            </p>

            {/* Progress bar for percentage values */}
            {(config.key === 'satisfaction' || config.key === 'uptime') && (
              <div
                style={{
                  marginTop: 'var(--spacing-sm)',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '0.25rem',
                  height: '4px',
                  overflow: 'hidden'
                }}
                role="progressbar"
                aria-valuenow={stats[config.key]}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`${config.label} progress`}
              >
                <div
                  style={{
                    background: `linear-gradient(90deg, ${config.color}, ${config.color}dd)`,
                    height: '100%',
                    width: `${animatedStats[config.key] || 0}%`,
                    transition: 'width 1s ease-out',
                    borderRadius: '0.25rem'
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Project Metrics */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--spacing-lg)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-md)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-xs)'
          }}
        >
          🔧 Technical Metrics
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'var(--spacing-md)',
            textAlign: 'center'
          }}
        >
          {metricConfigs.map((config, index) => (
            <div
              key={config.key}
              style={{
                padding: 'var(--spacing-md)',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)',
                transition: 'var(--transition)',
                transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${0.5 + index * 0.05}s`
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--bg-tertiary)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--bg-primary)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <div
                style={{
                  fontSize: '1.5rem',
                  marginBottom: 'var(--spacing-xs)'
                }}
                aria-hidden="true"
              >
                {config.icon}
              </div>
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: config.color,
                  marginBottom: '0.25rem'
                }}
              >
                {metrics[config.key]}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {config.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectStats
