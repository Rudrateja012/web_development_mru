import React, { useState } from 'react'

const ProjectHeader = ({ 
  title, 
  subtitle, 
  theme, 
  isEditing, 
  onThemeToggle, 
  onEditToggle,
  className = '' 
}) => {
  const [editableTitle, setEditableTitle] = useState(title)
  const [editableSubtitle, setEditableSubtitle] = useState(subtitle)

  const handleTitleChange = (e) => {
    setEditableTitle(e.target.value)
  }

  const handleSubtitleChange = (e) => {
    setEditableSubtitle(e.target.value)
  }

  return (
    <header 
      className={`project-header ${className}`}
      style={{
        textAlign: 'center',
        marginBottom: 'var(--spacing-xl)',
        padding: 'var(--spacing-lg)',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}
      role="banner"
    >
      {/* Background Decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
          opacity: 0.8
        }}
        aria-hidden="true"
      />

      {/* Control Buttons */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--spacing-sm)',
          right: 'var(--spacing-sm)',
          display: 'flex',
          gap: 'var(--spacing-xs)',
          zIndex: 10
        }}
      >
        <button
          onClick={onThemeToggle}
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius)',
            padding: '0.5rem',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'var(--transition)',
            fontSize: '1.2rem',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'var(--accent-primary)'
            e.target.style.color = 'white'
            e.target.style.transform = 'scale(1.05)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'var(--bg-tertiary)'
            e.target.style.color = 'var(--text-primary)'
            e.target.style.transform = 'scale(1)'
          }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme (Ctrl+T)`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <button
          onClick={onEditToggle}
          style={{
            background: isEditing ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius)',
            padding: '0.5rem',
            color: isEditing ? 'white' : 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'var(--transition)',
            fontSize: '1.2rem',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => {
            if (!isEditing) {
              e.target.style.background = 'var(--accent-secondary)'
              e.target.style.color = 'white'
            }
            e.target.style.transform = 'scale(1.05)'
          }}
          onMouseOut={(e) => {
            if (!isEditing) {
              e.target.style.background = 'var(--bg-tertiary)'
              e.target.style.color = 'var(--text-primary)'
            }
            e.target.style.transform = 'scale(1)'
          }}
          aria-label={isEditing ? 'Exit edit mode' : 'Enter edit mode'}
          title={`${isEditing ? 'Exit' : 'Enter'} edit mode (Ctrl+E)`}
        >
          {isEditing ? '💾' : '✏️'}
        </button>
      </div>

      {/* Project Icon */}
      <div
        style={{
          fontSize: '4rem',
          marginBottom: 'var(--spacing-md)',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}
        aria-hidden="true"
      >
        🏢
      </div>

      {/* Title */}
      {isEditing ? (
        <input
          type="text"
          value={editableTitle}
          onChange={handleTitleChange}
          style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'transparent',
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--border-radius)',
            padding: 'var(--spacing-sm)',
            color: 'var(--text-primary)',
            textAlign: 'center',
            width: '100%',
            marginBottom: 'var(--spacing-md)',
            fontFamily: 'inherit'
          }}
          aria-label="Edit project title"
        />
      ) : (
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            margin: '0 0 var(--spacing-md) 0',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1.2'
          }}
        >
          {editableTitle}
        </h1>
      )}

      {/* Subtitle */}
      {isEditing ? (
        <textarea
          value={editableSubtitle}
          onChange={handleSubtitleChange}
          style={{
            fontSize: '1.2rem',
            background: 'transparent',
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--border-radius)',
            padding: 'var(--spacing-sm)',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            width: '100%',
            minHeight: '3rem',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
          aria-label="Edit project subtitle"
        />
      ) : (
        <p
          style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            margin: '0',
            lineHeight: '1.6',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          {editableSubtitle}
        </p>
      )}

      {/* Project Status */}
      <div
        style={{
          marginTop: 'var(--spacing-md)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          flexWrap: 'wrap'
        }}
      >
        <span
          style={{
            background: 'var(--success)',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          <span style={{ fontSize: '0.75rem' }}>●</span>
          Production Ready
        </span>

        <span
          style={{
            background: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            border: '1px solid var(--border-color)'
          }}
        >
          🚀 v2.1.0
        </span>

        <span
          style={{
            background: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            border: '1px solid var(--border-color)'
          }}
        >
          ⭐ Featured Project
        </span>
      </div>

      {/* Links */}
      <div
        style={{
          marginTop: 'var(--spacing-lg)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--spacing-md)',
          flexWrap: 'wrap'
        }}
      >
        <a
          href="#demo"
          style={{
            background: 'var(--accent-primary)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--border-radius)',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'var(--transition)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-md)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = 'var(--shadow-lg)'
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'var(--shadow-md)'
          }}
          aria-label="View live demo"
        >
          🚀 Live Demo
        </a>

        <button
          onClick={() => window.open('https://github.com', '_blank')}
          style={{
            background: 'transparent',
            color: 'var(--text-primary)',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--border-radius)',
            fontWeight: '600',
            transition: 'var(--transition)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 'inherit'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'var(--bg-tertiary)'
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = 'var(--shadow-md)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'var(--shadow-sm)'
          }}
          aria-label="View source code on GitHub"
        >
          💻 Source Code
        </button>
      </div>
    </header>
  )
}

export default ProjectHeader
