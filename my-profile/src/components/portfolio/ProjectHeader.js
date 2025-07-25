import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from './ThemeProvider'

const ProjectHeader = ({
  onThemeToggle,
  theme,
  onSearch,
  onFilterChange,
  onSortChange,
  searchTerm,
  filterCategory,
  sortBy
}) => {
  const { theme: themeConfig } = useTheme()
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [searchHistory, setSearchHistory] = useState([])
  const searchInputRef = useRef(null)

  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All Projects', icon: '🏠' },
    { value: 'Web Application', label: 'Web Apps', icon: '🌐' },
    { value: 'Mobile App', label: 'Mobile', icon: '📱' },
    { value: 'Productivity', label: 'Productivity', icon: '⚡' },
    { value: 'E-commerce', label: 'E-commerce', icon: '🛒' },
    { value: 'Dashboard', label: 'Dashboards', icon: '📊' }
  ]

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: '🆕' },
    { value: 'oldest', label: 'Oldest First', icon: '📅' },
    { value: 'popularity', label: 'Most Popular', icon: '⭐' },
    { value: 'alphabetical', label: 'A-Z', icon: '🔤' }
  ]

  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    setSearchHistory(savedHistory)
  }, [])

  const handleSearchChange = (e) => {
    const value = e.target.value
    onSearch(value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim() && !searchHistory.includes(searchTerm.trim())) {
      const newHistory = [searchTerm.trim(), ...searchHistory].slice(0, 5)
      setSearchHistory(newHistory)
      localStorage.setItem('searchHistory', JSON.stringify(newHistory))
    }
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }

  const handleQuickSearch = (term) => {
    onSearch(term)
    setIsSearchFocused(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsSearchFocused(false)
      searchInputRef.current?.blur()
    }
  }

  return (
    <header style={headerStyles()}>
      {/* Main Header */}
      <div style={headerContentStyles()}>
        {/* Logo and Title */}
        <div style={logoSectionStyles()}>
          <div style={logoStyles()}>
            <span style={logoIconStyles()}>💼</span>
            <div>
              <h1 style={titleStyles()}>Portfolio Projects</h1>
              <p style={subtitleStyles()}>Showcasing innovative solutions & creative works</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={actionsStyles()}>
          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            style={themeToggleStyles()}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <span style={themeIconStyles()}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </span>
            <span style={themeTextStyles()}>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={filterToggleStyles()}
            aria-label="Toggle filters"
            className={showFilters ? 'active' : ''}
          >
            <span>🎛️</span>
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div style={searchSectionStyles()}>
        {/* Enhanced Search */}
        <div style={searchContainerStyles()}>
          <form onSubmit={handleSearchSubmit} style={searchFormStyles()}>
            <div style={searchInputContainerStyles()}>
              <span style={searchIconStyles()}>🔍</span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search projects, technologies, or features..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onKeyDown={handleKeyDown}
                style={searchInputStyles()}
                className="search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => onSearch('')}
                  style={clearSearchStyles()}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Search Suggestions */}
          {isSearchFocused && searchHistory.length > 0 && (
            <div style={searchSuggestionsStyles()}>
              <div style={suggestionHeaderStyles()}>
                <span>Recent searches</span>
                <button
                  onClick={clearSearchHistory}
                  style={clearHistoryStyles()}
                >
                  Clear
                </button>
              </div>
              {searchHistory.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSearch(term)}
                  style={suggestionItemStyles()}
                >
                  <span>🕒</span>
                  <span>{term}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div style={quickFiltersStyles()}>
          {categories.slice(0, 4).map((category) => (
            <button
              key={category.value}
              onClick={() => onFilterChange(category.value)}
              style={quickFilterButtonStyles(category.value === filterCategory)}
              className={category.value === filterCategory ? 'active' : ''}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Extended Filters Panel */}
      {showFilters && (
        <div style={extendedFiltersStyles()}>
          {/* Category Filters */}
          <div style={filterGroupStyles()}>
            <h3 style={filterGroupTitleStyles()}>📂 Categories</h3>
            <div style={filterOptionsStyles()}>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => onFilterChange(category.value)}
                  style={filterOptionStyles(category.value === filterCategory)}
                  className={category.value === filterCategory ? 'active' : ''}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div style={filterGroupStyles()}>
            <h3 style={filterGroupTitleStyles()}>📋 Sort By</h3>
            <div style={filterOptionsStyles()}>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  style={filterOptionStyles(option.value === sortBy)}
                  className={option.value === sortBy ? 'active' : ''}
                >
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{getCustomStyles()}</style>
    </header>
  )

  // Styling functions
  function headerStyles() {
    return {
      position: 'sticky',
      top: 0,
      zIndex: themeConfig.zIndex.dropdown,
      background: themeConfig.cardBackground,
      backdropFilter: themeConfig.backdropBlur,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '20px',
      marginBottom: '24px',
      overflow: 'hidden',
      boxShadow: themeConfig.shadowLight,
      transition: 'all 0.3s ease'
    }
  }

  function headerContentStyles() {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      borderBottom: `1px solid ${themeConfig.border}`,
      gap: '20px',
      flexWrap: 'wrap'
    }
  }

  function logoSectionStyles() {
    return {
      flex: 1,
      minWidth: '300px'
    }
  }

  function logoStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  }

  function logoIconStyles() {
    return {
      fontSize: '48px',
      background: themeConfig.gradient,
      borderRadius: '16px',
      padding: '12px',
      boxShadow: themeConfig.shadowLight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'bounce 2s ease-in-out infinite'
    }
  }

  function titleStyles() {
    return {
      margin: 0,
      fontSize: '32px',
      fontWeight: '700',
      background: themeConfig.gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: '1.2'
    }
  }

  function subtitleStyles() {
    return {
      margin: '4px 0 0 0',
      fontSize: '16px',
      color: themeConfig.textSecondary,
      fontWeight: '400'
    }
  }

  function actionsStyles() {
    return {
      display: 'flex',
      gap: '12px',
      alignItems: 'center'
    }
  }

  function themeToggleStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
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

  function themeIconStyles() {
    return {
      fontSize: '20px',
      transition: 'transform 0.3s ease'
    }
  }

  function themeTextStyles() {
    return {
      fontSize: '14px',
      fontWeight: '500'
    }
  }

  function filterToggleStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      background: showFilters ? themeConfig.primary : themeConfig.glassmorphism,
      border: `1px solid ${showFilters ? themeConfig.primary : themeConfig.border}`,
      borderRadius: '12px',
      color: showFilters ? '#ffffff' : themeConfig.text,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  function searchSectionStyles() {
    return {
      padding: '20px 24px',
      borderBottom: showFilters ? `1px solid ${themeConfig.border}` : 'none'
    }
  }

  function searchContainerStyles() {
    return {
      position: 'relative',
      marginBottom: '16px'
    }
  }

  function searchFormStyles() {
    return {
      width: '100%'
    }
  }

  function searchInputContainerStyles() {
    return {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }

  function searchIconStyles() {
    return {
      position: 'absolute',
      left: '16px',
      fontSize: '20px',
      color: themeConfig.textMuted,
      zIndex: 1
    }
  }

  function searchInputStyles() {
    return {
      width: '100%',
      padding: '16px 16px 16px 50px',
      background: themeConfig.surface,
      border: `2px solid ${isSearchFocused ? themeConfig.primary : themeConfig.border}`,
      borderRadius: '16px',
      color: themeConfig.text,
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease',
      fontFamily: themeConfig.typography.fontFamily.primary
    }
  }

  function clearSearchStyles() {
    return {
      position: 'absolute',
      right: '16px',
      background: 'none',
      border: 'none',
      color: themeConfig.textMuted,
      cursor: 'pointer',
      fontSize: '16px',
      padding: '4px',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
      outline: 'none'
    }
  }

  function searchSuggestionsStyles() {
    return {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: themeConfig.surface,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '12px',
      marginTop: '4px',
      boxShadow: themeConfig.shadow,
      zIndex: themeConfig.zIndex.dropdown,
      overflow: 'hidden'
    }
  }

  function suggestionHeaderStyles() {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      borderBottom: `1px solid ${themeConfig.border}`,
      fontSize: '12px',
      fontWeight: '600',
      color: themeConfig.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }
  }

  function clearHistoryStyles() {
    return {
      background: 'none',
      border: 'none',
      color: themeConfig.primary,
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  function suggestionItemStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      width: '100%',
      padding: '12px 16px',
      background: 'none',
      border: 'none',
      color: themeConfig.text,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '14px',
      textAlign: 'left',
      outline: 'none'
    }
  }

  function quickFiltersStyles() {
    return {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }
  }

  function quickFilterButtonStyles(isActive) {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      background: isActive ? themeConfig.primary : themeConfig.glassmorphism,
      border: `1px solid ${isActive ? themeConfig.primary : themeConfig.border}`,
      borderRadius: '10px',
      color: isActive ? '#ffffff' : themeConfig.text,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  function extendedFiltersStyles() {
    return {
      padding: '20px 24px',
      background: themeConfig.surfaceAlt,
      borderTop: `1px solid ${themeConfig.border}`
    }
  }

  function filterGroupStyles() {
    return {
      marginBottom: '20px'
    }
  }

  function filterGroupTitleStyles() {
    return {
      margin: '0 0 12px 0',
      fontSize: '16px',
      fontWeight: '600',
      color: themeConfig.text,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }

  function filterOptionsStyles() {
    return {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }
  }

  function filterOptionStyles(isActive) {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      background: isActive ? themeConfig.primary : themeConfig.glassmorphism,
      border: `1px solid ${isActive ? themeConfig.primary : themeConfig.border}`,
      borderRadius: '10px',
      color: isActive ? '#ffffff' : themeConfig.text,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  function getCustomStyles() {
    return `
      /* Hover effects */
      button:hover {
        transform: translateY(-1px);
      }

      .search-input:focus {
        box-shadow: 0 0 0 4px ${themeConfig.primary}20;
      }

      button:hover .theme-icon {
        transform: rotate(20deg);
      }

      /* Suggestion hover */
      button[style*="suggestionItemStyles"]:hover {
        background: ${themeConfig.glassmorphism} !important;
      }

      /* Filter button hover */
      button:not(.active):hover {
        background: ${themeConfig.glassmorphism} !important;
        border-color: ${themeConfig.borderLight} !important;
      }

      /* Active states */
      .active {
        background: ${themeConfig.primary} !important;
        color: #ffffff !important;
        border-color: ${themeConfig.primary} !important;
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .logo-section {
          min-width: 100%;
          margin-bottom: 16px;
        }

        .actions {
          width: 100%;
          justify-content: flex-end;
        }

        .quick-filters {
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .quick-filters::-webkit-scrollbar {
          height: 4px;
        }

        .filter-options {
          overflow-x: auto;
          padding-bottom: 8px;
        }
      }

      @media (max-width: 480px) {
        .header-content {
          padding: 16px;
          flex-direction: column;
          align-items: flex-start;
        }

        .search-section {
          padding: 16px;
        }

        .extended-filters {
          padding: 16px;
        }

        .logo-icon {
          font-size: 32px !important;
          padding: 8px !important;
        }

        .title {
          font-size: 24px !important;
        }
      }

      /* Animation keyframes */
      @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      /* Accessibility */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transition: none !important;
        }
      }
    `
  }
}

export default ProjectHeader
