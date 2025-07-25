import React, { createContext, useContext } from 'react'

// Create Theme Context
const ThemeContext = createContext()

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme configuration
const themes = {
  dark: {
    primary: '#667eea',
    secondary: '#764ba2',
    background: '#1a1a2e',
    surface: '#16213e',
    surfaceAlt: '#0f3460',
    text: '#ffffff',
    textSecondary: '#b8c5d3',
    textMuted: '#8892a0',
    border: '#2d3748',
    borderLight: '#4a5568',
    accent: '#f093fb',
    success: '#48bb78',
    warning: '#ed8936',
    error: '#f56565',
    info: '#4299e1',
    cardBackground: 'rgba(255, 255, 255, 0.05)',
    glassmorphism: 'rgba(255, 255, 255, 0.1)',
    shadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    shadowLight: '0 4px 20px rgba(0, 0, 0, 0.2)',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradientAlt: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    backdropBlur: 'blur(20px)'
  },
  light: {
    primary: '#667eea',
    secondary: '#764ba2',
    background: '#f5f7fa',
    surface: '#ffffff',
    surfaceAlt: '#f7fafc',
    text: '#1a202c',
    textSecondary: '#4a5568',
    textMuted: '#718096',
    border: '#e2e8f0',
    borderLight: '#cbd5e0',
    accent: '#ed64a6',
    success: '#38a169',
    warning: '#d69e2e',
    error: '#e53e3e',
    info: '#3182ce',
    cardBackground: 'rgba(255, 255, 255, 0.9)',
    glassmorphism: 'rgba(255, 255, 255, 0.8)',
    shadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    shadowLight: '0 4px 20px rgba(0, 0, 0, 0.05)',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradientAlt: 'linear-gradient(135deg, #ed64a6 0%, #f093fb 100%)',
    backdropBlur: 'blur(20px)'
  }
}

// Animation presets
const animations = {
  fadeIn: {
    initial: { opacity: 0, transform: 'translateY(20px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
    transition: { duration: 0.6, ease: 'ease-out' }
  },
  slideIn: {
    initial: { opacity: 0, transform: 'translateX(-30px)' },
    animate: { opacity: 1, transform: 'translateX(0)' },
    transition: { duration: 0.5, ease: 'ease-out' }
  },
  scaleIn: {
    initial: { opacity: 0, transform: 'scale(0.9)' },
    animate: { opacity: 1, transform: 'scale(1)' },
    transition: { duration: 0.4, ease: 'ease-out' }
  },
  bounce: {
    animate: { 
      transform: ['scale(1)', 'scale(1.05)', 'scale(1)'],
      transition: { duration: 0.3, ease: 'ease-in-out' }
    }
  },
  pulse: {
    animate: {
      opacity: [1, 0.7, 1],
      transition: { duration: 2, repeat: Infinity, ease: 'ease-in-out' }
    }
  }
}

// Breakpoints for responsive design
const breakpoints = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px'
}

// Z-index levels
const zIndex = {
  base: 0,
  dropdown: 1000,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
  overlay: 9999
}

// Component spacing system
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px'
}

// Typography scale
const typography = {
  fontFamily: {
    primary: 'Inter, system-ui, -apple-system, sans-serif',
    secondary: 'Fira Code, Consolas, monospace',
    accent: 'Poppins, sans-serif'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  }
}

// Component variants
const variants = {
  button: {
    primary: (theme) => ({
      background: theme.gradient,
      color: '#ffffff',
      border: 'none',
      boxShadow: theme.shadowLight,
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadow
      }
    }),
    secondary: (theme) => ({
      background: theme.cardBackground,
      color: theme.text,
      border: `1px solid ${theme.border}`,
      backdropFilter: theme.backdropBlur,
      '&:hover': {
        borderColor: theme.primary,
        boxShadow: theme.shadowLight
      }
    }),
    ghost: (theme) => ({
      background: 'transparent',
      color: theme.text,
      border: `1px solid transparent`,
      '&:hover': {
        background: theme.glassmorphism,
        borderColor: theme.borderLight
      }
    })
  },
  card: {
    default: (theme) => ({
      background: theme.cardBackground,
      backdropFilter: theme.backdropBlur,
      border: `1px solid ${theme.border}`,
      borderRadius: '16px',
      boxShadow: theme.shadowLight,
      transition: 'all 0.3s ease'
    }),
    elevated: (theme) => ({
      background: theme.cardBackground,
      backdropFilter: theme.backdropBlur,
      border: `1px solid ${theme.border}`,
      borderRadius: '20px',
      boxShadow: theme.shadow,
      transform: 'translateY(0)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 20px 60px rgba(0, 0, 0, ${theme.name === 'dark' ? '0.4' : '0.15'})`
      }
    }),
    glass: (theme) => ({
      background: theme.glassmorphism,
      backdropFilter: theme.backdropBlur,
      border: `1px solid ${theme.borderLight}`,
      borderRadius: '20px',
      boxShadow: theme.shadowLight
    })
  }
}

// Utility functions
const getResponsiveValue = (value, breakpoint) => {
  if (typeof value === 'object') {
    return value[breakpoint] || value.base || value
  }
  return value
}

const generateBoxShadow = (theme, intensity = 'medium') => {
  const shadows = {
    light: theme.name === 'dark' ? '0 2px 10px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
    medium: theme.shadowLight,
    heavy: theme.shadow,
    glow: `0 0 30px ${theme.primary}40`
  }
  return shadows[intensity] || shadows.medium
}

const generateGradient = (colors, direction = '135deg') => {
  if (Array.isArray(colors)) {
    return `linear-gradient(${direction}, ${colors.join(', ')})`
  }
  return colors
}

// Theme Provider Component
const ThemeProvider = ({ children, theme: themeName = 'dark' }) => {
  const currentTheme = { 
    ...themes[themeName], 
    name: themeName,
    animations,
    breakpoints,
    zIndex,
    spacing,
    typography,
    variants
  }

  const themeUtils = {
    getResponsiveValue,
    generateBoxShadow: (intensity) => generateBoxShadow(currentTheme, intensity),
    generateGradient,
    getVariant: (component, variant) => {
      const componentVariants = variants[component]
      if (componentVariants && componentVariants[variant]) {
        return componentVariants[variant](currentTheme)
      }
      return {}
    },
    // Color utilities
    rgba: (color, alpha) => {
      // Convert hex to rgba
      const r = parseInt(color.slice(1, 3), 16)
      const g = parseInt(color.slice(3, 5), 16)
      const b = parseInt(color.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    },
    // Spacing utilities
    getSpacing: (size) => spacing[size] || size,
    // Typography utilities
    getTypography: (property, value) => typography[property]?.[value] || value
  }

  const themeValue = {
    theme: currentTheme,
    utils: themeUtils,
    toggleTheme: () => {
      // This would be implemented by parent component
      console.log('Theme toggle requested')
    }
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className={`theme-${themeName}`}>
        {children}
        
        {/* Global theme styles */}
        <style jsx global>{`
          .theme-${themeName} {
            --primary: ${currentTheme.primary};
            --secondary: ${currentTheme.secondary};
            --background: ${currentTheme.background};
            --surface: ${currentTheme.surface};
            --surface-alt: ${currentTheme.surfaceAlt};
            --text: ${currentTheme.text};
            --text-secondary: ${currentTheme.textSecondary};
            --text-muted: ${currentTheme.textMuted};
            --border: ${currentTheme.border};
            --border-light: ${currentTheme.borderLight};
            --accent: ${currentTheme.accent};
            --success: ${currentTheme.success};
            --warning: ${currentTheme.warning};
            --error: ${currentTheme.error};
            --info: ${currentTheme.info};
            --card-background: ${currentTheme.cardBackground};
            --glassmorphism: ${currentTheme.glassmorphism};
            --shadow: ${currentTheme.shadow};
            --shadow-light: ${currentTheme.shadowLight};
            --gradient: ${currentTheme.gradient};
            --gradient-alt: ${currentTheme.gradientAlt};
            --backdrop-blur: ${currentTheme.backdropBlur};
            
            --font-family-primary: ${typography.fontFamily.primary};
            --font-family-secondary: ${typography.fontFamily.secondary};
            --font-family-accent: ${typography.fontFamily.accent};
            
            --spacing-xs: ${spacing.xs};
            --spacing-sm: ${spacing.sm};
            --spacing-md: ${spacing.md};
            --spacing-lg: ${spacing.lg};
            --spacing-xl: ${spacing.xl};
            --spacing-xxl: ${spacing.xxl};
            
            --z-dropdown: ${zIndex.dropdown};
            --z-modal: ${zIndex.modal};
            --z-popover: ${zIndex.popover};
            --z-tooltip: ${zIndex.tooltip};
            --z-toast: ${zIndex.toast};
            --z-overlay: ${zIndex.overlay};
          }

          /* Reset and base styles */
          * {
            box-sizing: border-box;
          }

          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: ${currentTheme.surface};
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: ${currentTheme.border};
            border-radius: 4px;
            transition: all 0.3s ease;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: ${currentTheme.borderLight};
          }

          /* Selection styling */
          ::selection {
            background: ${currentTheme.primary}40;
            color: ${currentTheme.text};
          }

          /* Focus styles */
          *:focus {
            outline: 2px solid ${currentTheme.primary};
            outline-offset: 2px;
          }

          /* Utility classes */
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }

          .transition-smooth {
            transition: all 0.3s ease;
          }

          .transition-fast {
            transition: all 0.15s ease;
          }

          .transition-slow {
            transition: all 0.5s ease;
          }

          /* Animation classes */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }

          @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }

          .animate-slideInLeft {
            animation: slideInLeft 0.5s ease-out;
          }

          .animate-slideInRight {
            animation: slideInRight 0.5s ease-out;
          }

          .animate-scaleIn {
            animation: scaleIn 0.4s ease-out;
          }

          .animate-pulse {
            animation: pulse 2s ease-in-out infinite;
          }

          .animate-bounce {
            animation: bounce 0.3s ease-in-out;
          }

          .animate-spin {
            animation: spin 1s linear infinite;
          }

          /* Responsive utilities */
          @media (max-width: ${breakpoints.sm}) {
            .hidden-mobile {
              display: none !important;
            }
          }

          @media (min-width: ${breakpoints.md}) {
            .hidden-desktop {
              display: none !important;
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

          @media (prefers-contrast: high) {
            * {
              border-color: ${currentTheme.text} !important;
            }
          }
        `}</style>
      </div>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
export { themes, animations, breakpoints, zIndex, spacing, typography, variants }
