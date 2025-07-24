import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailId: '',
      password: '',
      errors: {},
      isLoading: false
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: '' } // Clear error when user types
    })
  }

  validateForm = () => {
    const { emailId, password } = this.state
    const errors = {}

    // Email validation
    if (!emailId.trim()) {
      errors.emailId = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(emailId)) {
      errors.emailId = 'Email is invalid'
    }

    // Password validation
    if (!password.trim()) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    return errors
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const errors = this.validateForm()

    if (Object.keys(errors).length > 0) {
      this.setState({ errors })
      return
    }

    this.setState({ isLoading: true })

    // Simulate API call
    setTimeout(() => {
      const { emailId, password } = this.state
      
      // Get registered users from localStorage
      const users = JSON.parse(localStorage.getItem('registeredUsers')) || []
      const user = users.find(user => user.email === emailId && user.password === password)
      
      if (user) {
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          loginTime: new Date().toISOString()
        }))
        
        // Redirect to dashboard by reloading the page (to update Main component state)
        window.location.href = '/dashboard'
        
        // Clear form
        this.setState({ 
          emailId: '', 
          password: '', 
          errors: {},
          isLoading: false 
        })
      } else {
        this.setState({ 
          errors: { general: 'Invalid email or password. Please register first if you don\'t have an account.' },
          isLoading: false 
        })
      }
    }, 1000)
  }

  render() {
    const { emailId, password, errors, isLoading } = this.state
    
    // Check if there are any registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || []
    const hasRegisteredUsers = users.length > 0

    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '400px',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h1 style={{
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '2rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🔐 Login
          </h1>

          {errors.general && (
            <div style={{
              background: '#f8d7da',
              color: '#721c24',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #f5c6cb',
              textAlign: 'center'
            }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={this.handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#2d3748'
              }}>
                Email Address
              </label>
              <input
                type="email"
                name="emailId"
                value={emailId}
                onChange={this.handleInputChange}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.emailId ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  outline: 'none',
                  background: 'rgba(255,255,255,0.8)',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.emailId ? '#e53e3e' : '#e2e8f0'}
              />
              {errors.emailId && (
                <span style={{ color: '#e53e3e', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                  {errors.emailId}
                </span>
              )}
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#2d3748'
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.password ? '2px solid #e53e3e' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  outline: 'none',
                  background: 'rgba(255,255,255,0.8)',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.password ? '#e53e3e' : '#e2e8f0'}
              />
              {errors.password && (
                <span style={{ color: '#e53e3e', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                  {errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                background: isLoading ? '#cbd5e0' : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)'
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }
              }}
            >
              {isLoading ? '🔄 Logging in...' : '🚀 Login'}
            </button>
          </form>

          <div style={{
            textAlign: 'center',
            marginTop: '20px',
            padding: '15px',
            background: hasRegisteredUsers ? 'rgba(40, 167, 69, 0.1)' : 'rgba(255, 193, 7, 0.1)',
            borderRadius: '10px',
            fontSize: '14px',
            color: '#666'
          }}>
            {hasRegisteredUsers ? (
              <>
                <strong>✅ Ready to Login!</strong><br />
                Use your registered email and password to login.
              </>
            ) : (
              <>
                <strong>⚠️ No registered users found</strong><br />
                Please go to the Register page to create a new account first.
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
}
