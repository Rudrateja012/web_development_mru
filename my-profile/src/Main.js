import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import ShowEmployees from './components/ShowEmployees'
import Products from './components/Products'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import PortfolioProject from './components/PortfolioProject'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      currentUser: null,
      showProfileDropdown: false,
      isLoading: false
    }
  }

  componentDidMount() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
      this.setState({ isLoggedIn: true, currentUser: user })
    }
    
    // Add event listener to close dropdown when clicking outside
    document.addEventListener('click', this.handleClickOutside)
  }

  componentWillUnmount() {
    // Remove event listener
    document.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside = (event) => {
    // Close dropdown if clicking outside of it
    if (this.state.showProfileDropdown && !event.target.closest('.profile-dropdown-container')) {
      this.setState({ showProfileDropdown: false })
    }
  }

  handleLogout = () => {
    localStorage.removeItem('currentUser')
    this.setState({ isLoggedIn: false, currentUser: null, showProfileDropdown: false })
  }

  toggleProfileDropdown = () => {
    this.setState(prevState => ({ showProfileDropdown: !prevState.showProfileDropdown }))
  }

  closeProfileDropdown = () => {
    this.setState({ showProfileDropdown: false })
  }

  handleNavigation = (path) => {
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500) // Small delay to show loading animation
  }

  render() {
    const { isLoggedIn, currentUser, showProfileDropdown, isLoading } = this.state
    
    return (
      <Router>
        <div style={{ 
          fontFamily: 'Inter, system-ui, sans-serif', 
          margin: '0',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px'
        }}>   
            {/* Enhanced Loading Overlay */}
            {isLoading && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 99999,
                backdropFilter: 'blur(20px)',
                animation: 'fadeIn 0.3s ease-in-out'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '30px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '50px 40px',
                  borderRadius: '25px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(15px)',
                  animation: 'slideUp 0.5s ease-out'
                }}>
                  {/* Company Logo/Icon */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    color: '#667eea',
                    fontWeight: 'bold',
                    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)',
                    animation: 'bounce 2s infinite'
                  }}>
                    🏢
                  </div>
                  
                  {/* Enhanced Spinner with Multiple Rings */}
                  <div style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px'
                  }}>
                    {/* Outer Ring */}
                    <div style={{
                      position: 'absolute',
                      width: '80px',
                      height: '80px',
                      border: '3px solid rgba(255, 255, 255, 0.2)',
                      borderTop: '3px solid rgba(255, 255, 255, 0.9)',
                      borderRadius: '50%',
                      animation: 'spin 1.5s linear infinite'
                    }}></div>
                    
                    {/* Middle Ring */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      width: '60px',
                      height: '60px',
                      border: '3px solid rgba(255, 255, 255, 0.2)',
                      borderTop: '3px solid rgba(255, 255, 255, 0.7)',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite reverse'
                    }}></div>
                    
                    {/* Inner Ring */}
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      width: '40px',
                      height: '40px',
                      border: '3px solid rgba(255, 255, 255, 0.2)',
                      borderTop: '3px solid rgba(255, 255, 255, 0.5)',
                      borderRadius: '50%',
                      animation: 'spin 0.7s linear infinite'
                    }}></div>
                    
                    {/* Center Dot */}
                    <div style={{
                      position: 'absolute',
                      top: '35px',
                      left: '35px',
                      width: '10px',
                      height: '10px',
                      background: 'white',
                      borderRadius: '50%',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}></div>
                  </div>
                  
                  {/* Loading Text with Animation */}
                  <div style={{
                    textAlign: 'center'
                  }}>
                    <div style={{
                      color: 'white',
                      fontSize: '22px',
                      fontWeight: '700',
                      marginBottom: '8px',
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                      animation: 'textGlow 2s ease-in-out infinite'
                    }}>
                      Loading EMS
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '14px',
                      fontWeight: '500',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      Employee Management System
                    </div>
                  </div>
                  
                  {/* Progress Dots */}
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '50%',
                      animation: 'dotPulse 1.4s ease-in-out infinite'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '50%',
                      animation: 'dotPulse 1.4s ease-in-out infinite 0.2s'
                    }}></div>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '50%',
                      animation: 'dotPulse 1.4s ease-in-out infinite 0.4s'
                    }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced CSS Animations */}
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                
                @keyframes pulse {
                  0%, 100% { 
                    opacity: 1; 
                    transform: scale(1);
                  }
                  50% { 
                    opacity: 0.7; 
                    transform: scale(1.1);
                  }
                }
                
                @keyframes fadeIn {
                  0% { opacity: 0; }
                  100% { opacity: 1; }
                }
                
                @keyframes slideUp {
                  0% { 
                    opacity: 0; 
                    transform: translateY(50px) scale(0.8); 
                  }
                  100% { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                  }
                }
                
                @keyframes bounce {
                  0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                  }
                  40% {
                    transform: translateY(-10px);
                  }
                  60% {
                    transform: translateY(-5px);
                  }
                }
                
                @keyframes textGlow {
                  0%, 100% {
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                  }
                  50% {
                    text-shadow: 0 2px 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3);
                  }
                }
                
                @keyframes dotPulse {
                  0%, 100% {
                    opacity: 0.4;
                    transform: scale(1);
                  }
                  50% {
                    opacity: 1;
                    transform: scale(1.3);
                  }
                }
                
                .nav-link-loading {
                  animation: pulse 0.5s ease-in-out;
                  pointer-events: none;
                }
                
                @media (max-width: 768px) {
                  .loading-container {
                    padding: 30px 20px !important;
                    margin: 0 20px;
                  }
                  
                  .loading-icon {
                    width: 60px !important;
                    height: 60px !important;
                    font-size: 24px !important;
                  }
                  
                  .loading-spinner {
                    width: 60px !important;
                    height: 60px !important;
                  }
                  
                  .loading-title {
                    font-size: 18px !important;
                  }
                }
              `}
            </style>
            <nav style={{ 
              background: 'rgba(255, 255, 255, 0.95)', 
              padding: '20px', 
              borderRadius: '15px',
              marginBottom: '30px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 10000,
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <NavLink 
                  to='/home' 
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    color: isActive ? 'white' : '#007bff',
                    background: isActive ? 'linear-gradient(135deg, #007bff, #0056b3)' : 'transparent',
                    border: '2px solid #007bff',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: isActive ? '0 8px 25px rgba(0, 123, 255, 0.3)' : 'none'
                  })}
                  onClick={() => this.handleNavigation('/home')}
                >
                  🏠 Home
                </NavLink>

                {isLoggedIn && (
                  <NavLink 
                    to='/dashboard' 
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      color: isActive ? 'white' : '#6f42c1',
                      background: isActive ? 'linear-gradient(135deg, #6f42c1, #5a2d91)' : 'transparent',
                      border: '2px solid #6f42c1',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: isActive ? '0 8px 25px rgba(111, 66, 193, 0.3)' : 'none'
                    })}
                    onClick={() => this.handleNavigation('/dashboard')}
                  >
                    🎯 Dashboard
                  </NavLink>
                )}

                {isLoggedIn && (
                  <NavLink 
                    to='/profile' 
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      color: isActive ? 'white' : '#e91e63',
                      background: isActive ? 'linear-gradient(135deg, #e91e63, #ad1457)' : 'transparent',
                      border: '2px solid #e91e63',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: isActive ? '0 8px 25px rgba(233, 30, 99, 0.3)' : 'none'
                    })}
                    onClick={() => this.handleNavigation('/profile')}
                  >
                    👤 Profile
                  </NavLink>
                )}

                {isLoggedIn && (
                  <NavLink 
                    to='/portfolio' 
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      color: isActive ? 'white' : '#9c27b0',
                      background: isActive ? 'linear-gradient(135deg, #9c27b0, #7b1fa2)' : 'transparent',
                      border: '2px solid #9c27b0',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: isActive ? '0 8px 25px rgba(156, 39, 176, 0.3)' : 'none'
                    })}
                    onClick={() => this.handleNavigation('/portfolio')}
                  >
                    💼 Portfolio
                  </NavLink>
                )}
                
                {!isLoggedIn && (
                  <NavLink 
                    to='/login'
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      color: isActive ? 'white' : '#28a745',
                      background: isActive ? 'linear-gradient(135deg, #28a745, #1e7e34)' : 'transparent',
                      border: '2px solid #28a745',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: isActive ? '0 8px 25px rgba(40, 167, 69, 0.3)' : 'none'
                    })}
                    onClick={() => this.handleNavigation('/login')}
                  >
                    🔐 Login
                  </NavLink>
                )}
                
                {!isLoggedIn && (
                  <NavLink 
                    to='/register'
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      color: isActive ? 'white' : '#ffc107',
                      background: isActive ? 'linear-gradient(135deg, #ffc107, #e0a800)' : 'transparent',
                      border: '2px solid #ffc107',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: isActive ? '0 8px 25px rgba(255, 193, 7, 0.3)' : 'none'
                    })}
                    onClick={() => this.handleNavigation('/register')}
                  >
                    📝 Register
                  </NavLink>
                )}
                
                {isLoggedIn && (
                  <NavLink 
                    to='/showemps'
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      color: isActive ? 'white' : '#17a2b8',
                      background: isActive ? 'linear-gradient(135deg, #17a2b8, #138496)' : 'transparent',
                      border: '2px solid #17a2b8',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: isActive ? '0 8px 25px rgba(23, 162, 184, 0.3)' : 'none'
                    })}
                    onClick={() => this.handleNavigation('/showemps')}
                  >
                    👥 Employees
                  </NavLink>
                )}
                
                {isLoggedIn && (
                  <NavLink 
                    to='/products'
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      color: isActive ? 'white' : '#dc3545',
                      background: isActive ? 'linear-gradient(135deg, #dc3545, #c82333)' : 'transparent',
                      border: '2px solid #dc3545',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: isActive ? '0 8px 25px rgba(220, 53, 69, 0.3)' : 'none'
                    })}
                    onClick={() => this.handleNavigation('/products')}
                  >
                    🛍️ Products
                  </NavLink>
                )}
              </div>

              {/* User profile dropdown */}
              {isLoggedIn && currentUser && (
                <div style={{ 
                  position: 'relative',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px' 
                }}>
                  <span style={{ 
                    color: '#666', 
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    👋 Welcome, {currentUser.firstName}!
                  </span>
                  
                  {/* Profile Photo Button */}
                  <div className="profile-dropdown-container" style={{ position: 'relative' }}>
                    <button
                      onClick={this.toggleProfileDropdown}
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: '3px solid rgba(255,255,255,0.8)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                        transform: showProfileDropdown ? 'scale(1.1)' : 'scale(1)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'scale(1.1)'
                        e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = showProfileDropdown ? 'scale(1.1)' : 'scale(1)'
                        e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)'
                      }}
                    >
                      {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
                    </button>
                    
                    {/* Dropdown Menu */}
                    {showProfileDropdown && (
                      <div style={{
                        position: 'absolute',
                        top: '55px',
                        right: '0',
                        background: 'rgba(255,255,255,0.98)',
                        borderRadius: '15px',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        minWidth: '220px',
                        zIndex: 9999,
                        overflow: 'hidden'
                      }}>
                        {/* Profile Header in Dropdown */}
                        <div style={{
                          padding: '20px',
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          color: 'white',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 10px auto',
                            fontSize: '18px',
                            fontWeight: 'bold'
                          }}>
                            {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: '600' }}>
                            {currentUser.firstName} {currentUser.lastName}
                          </div>
                          <div style={{ fontSize: '12px', opacity: '0.9' }}>
                            {currentUser.email}
                          </div>
                        </div>
                        
                        {/* Menu Items */}
                        <div style={{ padding: '10px 0' }}>
                          <NavLink
                            to="/profile"
                            onClick={() => {
                              this.handleNavigation('/profile')
                              this.closeProfileDropdown()
                            }}
                            style={{
                              width: '100%',
                              padding: '12px 20px',
                              background: 'transparent',
                              border: 'none',
                              textAlign: 'left',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#2d3748',
                              textDecoration: 'none'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background = 'rgba(102, 126, 234, 0.1)'
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background = 'transparent'
                            }}
                          >
                            👤 View Profile
                          </NavLink>
                          
                          <NavLink
                            to="/dashboard"
                            onClick={() => {
                              this.handleNavigation('/dashboard')
                              this.closeProfileDropdown()
                            }}
                            style={{
                              width: '100%',
                              padding: '12px 20px',
                              background: 'transparent',
                              border: 'none',
                              textAlign: 'left',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#2d3748',
                              textDecoration: 'none'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background = 'rgba(102, 126, 234, 0.1)'
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background = 'transparent'
                            }}
                          >
                            🎯 Dashboard
                          </NavLink>
                          
                          <button
                            onClick={() => {
                              // Add settings functionality later
                              this.closeProfileDropdown()
                            }}
                            style={{
                              width: '100%',
                              padding: '12px 20px',
                              background: 'transparent',
                              border: 'none',
                              textAlign: 'left',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#2d3748'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background = 'rgba(102, 126, 234, 0.1)'
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background = 'transparent'
                            }}
                          >
                            ⚙️ Settings
                          </button>
                          
                          <div style={{
                            height: '1px',
                            background: 'rgba(0,0,0,0.1)',
                            margin: '10px 0'
                          }}></div>
                          
                          <button
                            onClick={() => {
                              this.handleLogout()
                              this.closeProfileDropdown()
                            }}
                            style={{
                              width: '100%',
                              padding: '12px 20px',
                              background: 'transparent',
                              border: 'none',
                              textAlign: 'left',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#dc3545'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background = 'rgba(220, 53, 69, 0.1)'
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background = 'transparent'
                            }}
                          >
                            🚪 Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </nav>

            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
              color: '#2d3748',
              padding: '30px',
              borderRadius: '20px',
              textAlign: 'center',
              marginBottom: '30px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <h1 style={{ 
                margin: 0, 
                fontSize: '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Welcome to Employee Management System
              </h1>
              <p style={{
                margin: '10px 0 0 0',
                fontSize: '1.1rem',
                color: '#666',
                fontWeight: '400'
              }}>
                {isLoggedIn ? `Manage your workforce with ease and efficiency, ${currentUser.firstName}!` : 'Please login to access the system features'}
              </p>
            </div>

            <div style={{ 
              minHeight: '500px', 
              padding: '30px',
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <Routes>
                <Route path="/" element={isLoggedIn ? <Dashboard /> : <Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/portfolio" element={<PortfolioProject />} />
                <Route path="/showemps" element={<ShowEmployees />} />
                <Route path="/products" element={<Products />} />
              </Routes>
            </div>
        </div>
      </Router>
    )
  }
}
