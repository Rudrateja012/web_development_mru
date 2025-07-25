import React, { Component } from 'react'
import ThemeProvider from './portfolio/ThemeProvider'
import ProjectHeader from './portfolio/ProjectHeader'
import ProjectStats from './portfolio/ProjectStats'
import FeatureShowcase from './portfolio/FeatureShowcase'
import ProjectInteractions from './portfolio/ProjectInteractions'

export default class PortfolioProject extends Component {
  constructor(props) {
    super(props)
    
    // Get saved data from localStorage
    const savedTheme = localStorage.getItem('portfolioTheme') || 'dark'
    const savedProjects = JSON.parse(localStorage.getItem('portfolioProjects')) || this.getDefaultProjects()
    const savedSettings = JSON.parse(localStorage.getItem('portfolioSettings')) || {
      autoSave: true,
      animations: true,
      notifications: true,
      sound: false
    }
    
    this.state = {
      theme: savedTheme,
      projects: savedProjects,
      filteredProjects: savedProjects,
      selectedProject: savedProjects[0] || null,
      searchTerm: '',
      filterCategory: 'all',
      sortBy: 'newest',
      isEditing: false,
      showAddModal: false,
      settings: savedSettings,
      loading: false,
      error: null,
      viewMode: 'grid', // grid, list, card
      selectedTags: [],
      showStatsModal: false,
      draggedProject: null,
      hoveredProject: null,
      undoStack: [],
      redoStack: []
    }

    // Debounce search to improve performance
    this.searchDebounceTimer = null
  }

  componentDidMount() {
    // Initialize component
    this.loadProjects()
    this.setupEventListeners()
    
    // Auto-save interval
    if (this.state.settings.autoSave) {
      this.autoSaveInterval = setInterval(() => {
        this.saveToLocalStorage()
      }, 30000) // Save every 30 seconds
    }
  }

  componentWillUnmount() {
    // Cleanup
    this.removeEventListeners()
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval)
    }
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer)
    }
  }

  // Default projects data
  getDefaultProjects = () => {
    return [
      {
        id: 1,
        title: 'E-commerce Dashboard',
        description: 'A comprehensive dashboard for managing online store operations with real-time analytics.',
        category: 'Web Application',
        technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
        image: '/api/placeholder/400/250',
        github: 'https://github.com/username/ecommerce-dashboard',
        demo: 'https://ecommerce-demo.com',
        status: 'completed',
        featured: true,
        startDate: '2024-01-15',
        endDate: '2024-03-20',
        team: ['John Doe', 'Jane Smith'],
        metrics: {
          stars: 45,
          forks: 12,
          views: 1250,
          downloads: 340
        },
        tags: ['responsive', 'analytics', 'real-time', 'dashboard'],
        features: [
          'Real-time sales tracking',
          'Inventory management',
          'Customer analytics',
          'Revenue reporting',
          'Mobile responsive design'
        ]
      },
      {
        id: 2,
        title: 'Music Streaming App',
        description: 'A modern music streaming application with offline support and personalized playlists.',
        category: 'Mobile App',
        technologies: ['React Native', 'Firebase', 'Expo', 'Redux'],
        image: '/api/placeholder/400/250',
        github: 'https://github.com/username/music-app',
        demo: 'https://music-app-demo.com',
        status: 'in-progress',
        featured: true,
        startDate: '2024-02-01',
        endDate: null,
        team: ['John Doe'],
        metrics: {
          stars: 28,
          forks: 8,
          views: 890,
          downloads: 156
        },
        tags: ['mobile', 'streaming', 'offline', 'music'],
        features: [
          'Offline music playback',
          'Custom playlists',
          'Social sharing',
          'Cross-platform support',
          'Audio visualization'
        ]
      },
      {
        id: 3,
        title: 'Task Management System',
        description: 'A collaborative task management platform with team collaboration features.',
        category: 'Productivity',
        technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
        image: '/api/placeholder/400/250',
        github: 'https://github.com/username/task-manager',
        demo: 'https://task-manager-demo.com',
        status: 'completed',
        featured: false,
        startDate: '2023-11-10',
        endDate: '2024-01-05',
        team: ['John Doe', 'Mike Johnson', 'Sarah Wilson'],
        metrics: {
          stars: 67,
          forks: 23,
          views: 2100,
          downloads: 580
        },
        tags: ['collaboration', 'productivity', 'real-time', 'teams'],
        features: [
          'Real-time collaboration',
          'Kanban boards',
          'Time tracking',
          'Team chat',
          'Project analytics'
        ]
      }
    ]
  }

  // Event handlers
  setupEventListeners = () => {
    document.addEventListener('keydown', this.handleKeyPress)
    window.addEventListener('beforeunload', this.handleBeforeUnload)
  }

  removeEventListeners = () => {
    document.removeEventListener('keydown', this.handleKeyPress)
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
  }

  handleKeyPress = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 's':
          e.preventDefault()
          this.saveToLocalStorage()
          break
        case 'z':
          if (e.shiftKey) {
            this.redo()
          } else {
            this.undo()
          }
          break
        case 'f':
          e.preventDefault()
          document.querySelector('.search-input')?.focus()
          break
        default:
          break
      }
    }
  }

  handleBeforeUnload = (e) => {
    this.saveToLocalStorage()
  }

  // Data management
  loadProjects = () => {
    this.setState({ loading: true })
    
    setTimeout(() => {
      this.setState({ 
        loading: false,
        filteredProjects: this.filterAndSortProjects()
      })
    }, 500)
  }

  saveToLocalStorage = () => {
    try {
      localStorage.setItem('portfolioTheme', this.state.theme)
      localStorage.setItem('portfolioProjects', JSON.stringify(this.state.projects))
      localStorage.setItem('portfolioSettings', JSON.stringify(this.state.settings))
      
      if (this.state.settings.notifications) {
        this.showNotification('Portfolio data saved successfully!', 'success')
      }
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
      this.showNotification('Failed to save data', 'error')
    }
  }

  // Theme management
  toggleTheme = () => {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark'
    this.setState({ theme: newTheme }, () => {
      this.saveToLocalStorage()
    })
  }

  // Project filtering and sorting
  filterAndSortProjects = () => {
    let filtered = [...this.state.projects]

    // Apply search filter
    if (this.state.searchTerm) {
      const term = this.state.searchTerm.toLowerCase()
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.technologies.some(tech => tech.toLowerCase().includes(term)) ||
        project.tags.some(tag => tag.toLowerCase().includes(term))
      )
    }

    // Apply category filter
    if (this.state.filterCategory !== 'all') {
      filtered = filtered.filter(project => 
        project.category === this.state.filterCategory
      )
    }

    // Apply tag filter
    if (this.state.selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        this.state.selectedTags.every(tag =>
          project.tags.includes(tag)
        )
      )
    }

    // Apply sorting
    switch (this.state.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        break
      case 'popularity':
        filtered.sort((a, b) => b.metrics.stars - a.metrics.stars)
        break
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return filtered
  }

  handleSearch = (searchTerm) => {
    // Debounce search for better performance
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer)
    }

    this.searchDebounceTimer = setTimeout(() => {
      this.setState({
        searchTerm,
        filteredProjects: this.filterAndSortProjects()
      })
    }, 300)
  }

  handleFilterChange = (filterCategory) => {
    this.setState({
      filterCategory,
      filteredProjects: this.filterAndSortProjects()
    })
  }

  handleSortChange = (sortBy) => {
    this.setState({
      sortBy,
      filteredProjects: this.filterAndSortProjects()
    })
  }

  // Utility functions
  showNotification = (message, type = 'info') => {
    // Implementation for toast notifications
    console.log(`${type.toUpperCase()}: ${message}`)
  }

  undo = () => {
    if (this.state.undoStack.length > 0) {
      const previousState = this.state.undoStack.pop()
      this.state.redoStack.push({ projects: this.state.projects })
      this.setState({
        projects: previousState.projects,
        filteredProjects: this.filterAndSortProjects()
      })
    }
  }

  redo = () => {
    if (this.state.redoStack.length > 0) {
      const nextState = this.state.redoStack.pop()
      this.state.undoStack.push({ projects: this.state.projects })
      this.setState({
        projects: nextState.projects,
        filteredProjects: this.filterAndSortProjects()
      })
    }
  }

  render() {
    const { theme, loading, error } = this.state

    if (loading) {
      return (
        <div style={this.getLoadingStyles()}>
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="loading-text">Loading Portfolio...</div>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div style={this.getErrorStyles()}>
          <div className="error-content">
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button onClick={() => this.setState({ error: null })}>
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return (
      <ThemeProvider theme={theme}>
        <div className={`portfolio-container ${theme}-theme`} style={this.getContainerStyles()}>
          {/* Header Section */}
          <ProjectHeader 
            onThemeToggle={this.toggleTheme}
            theme={theme}
            onSearch={this.handleSearch}
            onFilterChange={this.handleFilterChange}
            onSortChange={this.handleSortChange}
            searchTerm={this.state.searchTerm}
            filterCategory={this.state.filterCategory}
            sortBy={this.state.sortBy}
          />

          {/* Stats Overview */}
          <ProjectStats 
            projects={this.state.projects}
            filteredProjects={this.state.filteredProjects}
            theme={theme}
          />

          {/* Feature Showcase */}
          <FeatureShowcase 
            projects={this.state.filteredProjects}
            selectedProject={this.state.selectedProject}
            onProjectSelect={(project) => this.setState({ selectedProject: project })}
            theme={theme}
            viewMode={this.state.viewMode}
            onViewModeChange={(viewMode) => this.setState({ viewMode })}
          />

          {/* Interactive Controls */}
          <ProjectInteractions 
            projects={this.state.projects}
            onProjectUpdate={(projects) => this.setState({ projects, filteredProjects: this.filterAndSortProjects() })}
            theme={theme}
            settings={this.state.settings}
            onSettingsChange={(settings) => this.setState({ settings })}
          />

          {/* Custom Styles */}
          <style jsx>{this.getCustomStyles()}</style>
        </div>
      </ThemeProvider>
    )
  }

  // Styling methods
  getContainerStyles = () => ({
    minHeight: '100vh',
    background: this.state.theme === 'dark' 
      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '20px',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: this.state.theme === 'dark' ? '#ffffff' : '#333333',
    transition: 'all 0.3s ease'
  })

  getLoadingStyles = () => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: this.state.theme === 'dark' 
      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    color: this.state.theme === 'dark' ? '#ffffff' : '#333333'
  })

  getErrorStyles = () => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: this.state.theme === 'dark' 
      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    color: this.state.theme === 'dark' ? '#ffffff' : '#333333'
  })

  getCustomStyles = () => `
    .loading-spinner {
      text-align: center;
    }

    .spinner-ring {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    .loading-text {
      font-size: 18px;
      font-weight: 500;
      opacity: 0.8;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .portfolio-container {
      animation: fadeIn 0.6s ease-out;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .portfolio-container {
        padding: 10px;
      }
    }

    @media (max-width: 480px) {
      .portfolio-container {
        padding: 5px;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `
}
