import React, { Component } from 'react'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { firstName, lastName, email, password, confirmPassword } = this.state
    
    if (!firstName || !lastName || !email || !password) {
      this.setState({ message: '❌ Please fill all fields!' })
      return
    }
    
    if (password !== confirmPassword) {
      this.setState({ message: '❌ Passwords do not match!' })
      return
    }
    
    if (password.length < 6) {
      this.setState({ message: '❌ Password must be at least 6 characters!' })
      return
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || []
    const userExists = users.find(user => user.email === email)
    
    if (userExists) {
      this.setState({ message: '❌ User with this email already exists!' })
      return
    }

    // Save user to localStorage
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      registeredAt: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(users))
    
    this.setState({ message: '✅ Registration Successful! You can now login.' })
    
    // Reset form
    setTimeout(() => {
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        message: ''
      })
    }, 2000)
  }

  render() {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#ffc107', marginBottom: '30px' }}>
          📝 User Registration
        </h2>
        
        <form onSubmit={this.handleSubmit} style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="John"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="john.doe@example.com"
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Minimum 6 characters"
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Re-enter password"
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(45deg, #ffc107, #fd7e14)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Register
          </button>
          
          {this.state.message && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              textAlign: 'center',
              borderRadius: '5px',
              background: this.state.message.includes('Successful') ? '#d4edda' : '#f8d7da',
              color: this.state.message.includes('Successful') ? '#155724' : '#721c24',
              fontWeight: 'bold'
            }}>
              {this.state.message}
            </div>
          )}
        </form>
      </div>
    )
  }
}
