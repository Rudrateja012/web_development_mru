import React, { useState, useRef, useEffect } from 'react'

const ProjectInteractions = ({ 
  searchTerm, 
  onSearch, 
  theme, 
  isEditing, 
  featuresCount,
  className = '' 
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const searchRef = useRef(null)

  useEffect(() => {
    const searchSuggestions = [
      'React components',
      'Authentication',
      'Dashboard analytics',
      'Employee management',
      'Product catalog',
      'User interface',
      'Database integration',
      'API endpoints',
      'Security features',
      'Performance optimization'
    ]

    if (searchTerm) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase()) &&
        suggestion.toLowerCase() !== searchTerm.toLowerCase()
      )
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }, [searchTerm])

  const handleSearchChange = (e) => {
    onSearch(e.target.value)
  }

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion)
    setSuggestions([])
    searchRef.current?.blur()
  }

  const clearSearch = () => {
    onSearch('')
    setSuggestions([])
    searchRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      clearSearch()
    }
  }

  return (
    <section 
      className={`project-interactions ${className}`}
      style={{
        marginBottom: 'var(--spacing-xl)',
        position: 'relative'
      }}
      role="search"
      aria-label="Project features search"
    >
      {/* Search Container */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--spacing-lg)',
          boxShadow: 'var(--shadow-md)',
          position: 'relative'
        }}
      >
        {/* Search Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-md)',
            flexWrap: 'wrap',
            gap: 'var(--spacing-sm)'
          }}
        >
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)'
            }}
          >
            🔍 Explore Features
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)'
            }}
          >
            <span>{featuresCount} features</span>
            {isEditing && (
              <span
                style={{
                  background: 'var(--accent-secondary)',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}
              >
                EDIT MODE
              </span>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div
          style={{
            position: 'relative',
            marginBottom: suggestions.length > 0 ? 'var(--spacing-md)' : 0
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <input
              ref={searchRef}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={handleKeyDown}
              placeholder="Search features, technologies, or capabilities..."
              style={{
                width: '100%',
                padding: '1rem 3rem 1rem 1rem',
                fontSize: '1rem',
                background: 'var(--bg-primary)',
                border: isFocused ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)',
                color: 'var(--text-primary)',
                transition: 'var(--transition)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
              aria-label="Search project features"
              aria-describedby="search-help"
            />

            {/* Search Icon or Clear Button */}
            <div
              style={{
                position: 'absolute',
                right: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '0.25rem',
                    transition: 'var(--transition)',
                    fontSize: '1rem'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = 'var(--text-primary)'
                    e.target.style.background = 'var(--bg-tertiary)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = 'var(--text-muted)'
                    e.target.style.background = 'none'
                  }}
                  aria-label="Clear search"
                  title="Clear search (Esc)"
                >
                  ✕
                </button>
              )}
              <span
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '1.2rem'
                }}
                aria-hidden="true"
              >
                🔍
              </span>
            </div>
          </div>

          {/* Search Suggestions */}
          {suggestions.length > 0 && isFocused && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1000,
                marginTop: '0.25rem',
                maxHeight: '200px',
                overflowY: 'auto'
              }}
              role="listbox"
              aria-label="Search suggestions"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    borderBottom: index < suggestions.length - 1 ? '1px solid var(--border-color)' : 'none',
                    fontSize: '0.875rem'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'var(--bg-secondary)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'none'
                  }}
                  role="option"
                  aria-selected="false"
                >
                  <span style={{ marginRight: '0.5rem', opacity: 0.6 }}>🔍</span>
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Help Text */}
        <p
          id="search-help"
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            margin: 0,
            textAlign: 'center'
          }}
        >
          Search by feature name, technology, or description • Press Esc to clear
        </p>

        {/* Quick Filters */}
        <div
          style={{
            marginTop: 'var(--spacing-md)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--spacing-xs)',
            justifyContent: 'center'
          }}
        >
          {['React', 'Authentication', 'Dashboard', 'API', 'UI/UX'].map((filter) => (
            <button
              key={filter}
              onClick={() => onSearch(filter)}
              style={{
                background: searchTerm.toLowerCase().includes(filter.toLowerCase()) 
                  ? 'var(--accent-primary)' 
                  : 'var(--bg-tertiary)',
                color: searchTerm.toLowerCase().includes(filter.toLowerCase())
                  ? 'white'
                  : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '1rem',
                padding: '0.5rem 1rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'var(--transition)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseOver={(e) => {
                if (!searchTerm.toLowerCase().includes(filter.toLowerCase())) {
                  e.target.style.background = 'var(--accent-primary)'
                  e.target.style.color = 'white'
                }
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseOut={(e) => {
                if (!searchTerm.toLowerCase().includes(filter.toLowerCase())) {
                  e.target.style.background = 'var(--bg-tertiary)'
                  e.target.style.color = 'var(--text-secondary)'
                }
                e.target.style.transform = 'scale(1)'
              }}
              aria-label={`Filter by ${filter}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Results Summary */}
        {searchTerm && (
          <div
            style={{
              marginTop: 'var(--spacing-md)',
              padding: 'var(--spacing-sm)',
              background: featuresCount > 0 ? 'var(--bg-primary)' : 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius)',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: featuresCount > 0 ? 'var(--text-primary)' : 'var(--text-muted)'
            }}
            role="status"
            aria-live="polite"
          >
            {featuresCount > 0 ? (
              <span>
                <strong>{featuresCount}</strong> feature{featuresCount !== 1 ? 's' : ''} 
                found for "<em>{searchTerm}</em>"
              </span>
            ) : (
              <span>
                No features found for "<em>{searchTerm}</em>". Try different keywords.
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectInteractions
