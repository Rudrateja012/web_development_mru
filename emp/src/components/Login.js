import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
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
    const { username, password } = this.state
    
    if (username === 'admin' && password === 'password') {
      this.setState({ message: '✅ Login Successful!' })
    } else {
      this.setState({ message: '❌ Invalid credentials!' })
    }
  }

  render() {
    return (
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#28a745', marginBottom: '30px' }}>
          🔐 User Login
        </h2>
        
        <form onSubmit={this.handleSubmit} style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
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
              placeholder="Enter username (try: admin)"
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
              placeholder="Enter password (try: password)"
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(45deg, #28a745, #20c997)',
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
            Login
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
        
        <div style={{ textAlign: 'center', marginTop: '15px', color: '#666' }}>
          <small>Demo credentials: admin / password</small>
        </div>
      </div>
    )
  }
}
