import React from 'react'

const ThemeProvider = ({ theme, children }) => {
  return (
    <div 
      data-theme={theme}
      style={{
        '--theme': theme,
        '--is-dark': theme === 'dark' ? '1' : '0'
      }}
    >
      {children}
    </div>
  )
}

export default ThemeProvider
