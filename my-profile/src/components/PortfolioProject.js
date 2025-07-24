import React, { Component } from 'react'
import ProjectHeader from './portfolio/ProjectHeader'
import ProjectStats from './portfolio/ProjectStats'
import FeatureShowcase from './portfolio/FeatureShowcase'
import TechStack from './portfolio/TechStack'
import ProjectInteractions from './portfolio/ProjectInteractions'
import ThemeProvider from './portfolio/ThemeProvider'

class PortfolioProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: localStorage.getItem('portfolioTheme') || 'dark',
      isEditing: false,
      searchTerm: '',
      activeFeature: null,
      stats: {
        totalUsers: 1247,
        activeProjects: 23,
        completedTasks: 856,
        satisfaction: 98.5,
        uptime: 99.9,
        responses: '2.3s'
      },
      features: [
        {
          id: 1,
          icon: '👥',
          title: 'Employee Management',
          description: 'Comprehensive workforce management with real-time tracking, performance analytics, and automated workflows.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
          status: 'Active',
          completion: 95,
          demoUrl: '/showemps',
          githubUrl: '#',
          highlights: ['Real-time updates', 'Role-based access', 'Performance tracking']
        },
        {
          id: 2,
          icon: '🔐',
          title: 'Authentication System',
          description: 'Secure multi-factor authentication with JWT tokens, session management, and role-based authorization.',
          technologies: ['JWT', 'bcrypt', 'OAuth2', 'Redis'],
          status: 'Active',
          completion: 100,
          demoUrl: '/login',
          githubUrl: '#',
          highlights: ['JWT Security', 'Multi-factor auth', 'Session persistence']
        },
        {
          id: 3,
          icon: '📊',
          title: 'Analytics Dashboard',
          description: 'Real-time data visualization with interactive charts, KPI tracking, and automated reporting.',
          technologies: ['Chart.js', 'D3.js', 'WebSocket', 'Redis'],
          status: 'Active',
          completion: 88,
          demoUrl: '/dashboard',
          githubUrl: '#',
          highlights: ['Real-time charts', 'Custom KPIs', 'Export reports']
        },
        {
          id: 4,
          icon: '🛍️',
          title: 'Product Management',
          description: 'Inventory management system with search functionality, category filtering, and order tracking.',
          technologies: ['React Hooks', 'Context API', 'LocalStorage', 'CSS Grid'],
          status: 'Active',
          completion: 92,
          demoUrl: '/products',
          githubUrl: '#',
          highlights: ['Search & filter', 'Inventory tracking', 'Order management']
        },
        {
          id: 5,
          icon: '🎨',
          title: 'Theme System',
          description: 'Dynamic theme switching with dark/light modes, custom color schemes, and accessibility features.',
          technologies: ['CSS Variables', 'Context API', 'LocalStorage', 'ARIA'],
          status: 'Beta',
          completion: 75,
          demoUrl: '#',
          githubUrl: '#',
          highlights: ['Dynamic themes', 'Accessibility', 'User preferences']
        }
      ],
      projectMetrics: {
        codeLines: '12,500+',
        components: '25+',
        testCoverage: '94%',
        performance: 'A+',
        accessibility: 'AA'
      }
    }
  }

  componentDidMount() {
    // Apply saved theme
    this.applyTheme(this.state.theme)
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', this.handleKeyboardShortcuts)
    
    // Animate elements on load
    setTimeout(() => {
      this.setState({ isLoaded: true })
    }, 300)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyboardShortcuts)
  }

  handleKeyboardShortcuts = (e) => {
    // Toggle theme with Ctrl+T
    if (e.ctrlKey && e.key === 't') {
      e.preventDefault()
      this.toggleTheme()
    }
    
    // Toggle editing mode with Ctrl+E
    if (e.ctrlKey && e.key === 'e') {
      e.preventDefault()
      this.toggleEditMode()
    }
    
    // Clear search with Escape
    if (e.key === 'Escape') {
      this.setState({ searchTerm: '', activeFeature: null })
    }
  }

  toggleTheme = () => {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark'
    this.setState({ theme: newTheme })
    localStorage.setItem('portfolioTheme', newTheme)
    this.applyTheme(newTheme)
  }

  applyTheme = (theme) => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '#0f172a')
      root.style.setProperty('--bg-secondary', '#1e293b')
      root.style.setProperty('--bg-tertiary', '#334155')
      root.style.setProperty('--text-primary', '#f8fafc')
      root.style.setProperty('--text-secondary', '#cbd5e1')
      root.style.setProperty('--text-muted', '#94a3b8')
      root.style.setProperty('--border-color', '#475569')
      root.style.setProperty('--accent-primary', '#3b82f6')
      root.style.setProperty('--accent-secondary', '#8b5cf6')
      root.style.setProperty('--success', '#10b981')
      root.style.setProperty('--warning', '#f59e0b')
      root.style.setProperty('--error', '#ef4444')
    } else {
      root.style.setProperty('--bg-primary', '#ffffff')
      root.style.setProperty('--bg-secondary', '#f8fafc')
      root.style.setProperty('--bg-tertiary', '#e2e8f0')
      root.style.setProperty('--text-primary', '#1e293b')
      root.style.setProperty('--text-secondary', '#475569')
      root.style.setProperty('--text-muted', '#64748b')
      root.style.setProperty('--border-color', '#cbd5e1')
      root.style.setProperty('--accent-primary', '#3b82f6')
      root.style.setProperty('--accent-secondary', '#8b5cf6')
      root.style.setProperty('--success', '#059669')
      root.style.setProperty('--warning', '#d97706')
      root.style.setProperty('--error', '#dc2626')
    }
  }

  toggleEditMode = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }))
  }

  handleSearch = (searchTerm) => {
    this.setState({ searchTerm })
  }

  handleFeatureClick = (featureId) => {
    this.setState({ activeFeature: featureId })
  }

  updateFeature = (featureId, updates) => {
    this.setState(prevState => ({
      features: prevState.features.map(feature =>
        feature.id === featureId ? { ...feature, ...updates } : feature
      )
    }))
  }

  filteredFeatures = () => {
    const { features, searchTerm } = this.state
    if (!searchTerm) return features
    
    return features.filter(feature =>
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.technologies.some(tech => 
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  render() {
    const { 
      theme, 
      isEditing, 
      searchTerm, 
      activeFeature, 
      stats, 
      projectMetrics,
      isLoaded 
    } = this.state

    const filteredFeatures = this.filteredFeatures()

    return (
      <ThemeProvider theme={theme}>
        <div 
          className={`portfolio-project ${theme}`}
          style={{
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            minHeight: '100vh',
            padding: '2rem',
            transition: 'all 0.3s ease',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
          }}
          role="main"
          aria-label="Employee Management System Portfolio Project"
        >
          {/* Global Styles */}
          <style jsx>{`
            .portfolio-project {
              --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
              --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
              --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
              --border-radius: 0.75rem;
              --border-radius-lg: 1rem;
              --spacing-xs: 0.5rem;
              --spacing-sm: 1rem;
              --spacing-md: 1.5rem;
              --spacing-lg: 2rem;
              --spacing-xl: 3rem;
            }
            
            .portfolio-project * {
              box-sizing: border-box;
            }
            
            .portfolio-project .animate-in {
              animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              opacity: 0;
              transform: translateY(20px);
            }
            
            @keyframes slideInUp {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .portfolio-project .stagger-1 { animation-delay: 0.1s; }
            .portfolio-project .stagger-2 { animation-delay: 0.2s; }
            .portfolio-project .stagger-3 { animation-delay: 0.3s; }
            .portfolio-project .stagger-4 { animation-delay: 0.4s; }
            
            .portfolio-project .hover-scale {
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            
            .portfolio-project .hover-scale:hover {
              transform: translateY(-2px) scale(1.02);
              box-shadow: var(--shadow-xl);
            }
            
            .portfolio-project .focus-visible:focus-visible {
              outline: 2px solid var(--accent-primary);
              outline-offset: 2px;
              border-radius: var(--border-radius);
            }
            
            @media (prefers-reduced-motion: reduce) {
              .portfolio-project * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
          `}</style>

          {/* Project Header */}
          <ProjectHeader
            title="Employee Management System"
            subtitle="Full-Stack React Application with Modern Architecture"
            theme={theme}
            isEditing={isEditing}
            onThemeToggle={this.toggleTheme}
            onEditToggle={this.toggleEditMode}
            className={isLoaded ? 'animate-in' : ''}
          />

          {/* Project Stats */}
          <ProjectStats
            stats={stats}
            metrics={projectMetrics}
            theme={theme}
            className={isLoaded ? 'animate-in stagger-1' : ''}
          />

          {/* Search and Interactions */}
          <ProjectInteractions
            searchTerm={searchTerm}
            onSearch={this.handleSearch}
            theme={theme}
            isEditing={isEditing}
            featuresCount={filteredFeatures.length}
            className={isLoaded ? 'animate-in stagger-2' : ''}
          />

          {/* Feature Showcase */}
          <FeatureShowcase
            features={filteredFeatures}
            activeFeature={activeFeature}
            onFeatureClick={this.handleFeatureClick}
            onFeatureUpdate={this.updateFeature}
            theme={theme}
            isEditing={isEditing}
            className={isLoaded ? 'animate-in stagger-3' : ''}
          />

          {/* Tech Stack */}
          <TechStack
            features={this.state.features}
            theme={theme}
            className={isLoaded ? 'animate-in stagger-4' : ''}
          />

          {/* Keyboard Shortcuts Help */}
          <div
            style={{
              position: 'fixed',
              bottom: '1rem',
              right: '1rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius)',
              padding: '0.75rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              boxShadow: 'var(--shadow-md)',
              opacity: 0.8,
              transition: 'var(--transition)',
              zIndex: 1000
            }}
            role="complementary"
            aria-label="Keyboard shortcuts"
          >
            <div>🎨 Ctrl+T: Toggle Theme</div>
            <div>✏️ Ctrl+E: Edit Mode</div>
            <div>🔍 Esc: Clear Search</div>
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

export default PortfolioProject
