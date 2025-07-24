import React, { Component } from 'react'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      stats: {
        totalEmployees: 156,
        totalProducts: 89,
        activeProjects: 12,
        pendingTasks: 23
      }
    }
  }

  componentDidMount() {
    // Get current user from localStorage
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
      this.setState({ currentUser: user })
    }
  }

  handleLogout = () => {
    // Clear user session
    localStorage.removeItem('currentUser')
    // Redirect to login or refresh page
    window.location.reload()
  }

  render() {
    const { currentUser, stats } = this.state

    if (!currentUser) {
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Please login to access the dashboard</h2>
        </div>
      )
    }

    return (
      <div style={{ 
        padding: '20px',
        minHeight: '500px'
      }}>
        {/* Header with user info and logout */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div>
            <h1 style={{
              margin: '0 0 10px 0',
              fontSize: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🎯 Welcome, {currentUser.firstName}!
            </h1>
            <p style={{ margin: 0, color: '#666', fontSize: '1.1rem' }}>
              📧 {currentUser.email} • 🕒 Logged in: {new Date(currentUser.loginTime).toLocaleString()}
            </p>
          </div>
          <button
            onClick={this.handleLogout}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #dc3545, #c82333)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 25px rgba(220, 53, 69, 0.3)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            🚪 Logout
          </button>
        </div>

        {/* Dashboard Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '3rem' }}>👥</h3>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>{stats.totalEmployees}</h2>
            <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>Total Employees</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #28a745, #1e7e34)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(40, 167, 69, 0.3)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '3rem' }}>🛍️</h3>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>{stats.totalProducts}</h2>
            <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>Total Products</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #17a2b8, #138496)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(23, 162, 184, 0.3)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '3rem' }}>📊</h3>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>{stats.activeProjects}</h2>
            <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>Active Projects</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ffc107, #e0a800)',
            color: 'white',
            padding: '30px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(255, 193, 7, 0.3)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '3rem' }}>⏰</h3>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>{stats.pendingTasks}</h2>
            <p style={{ margin: 0, fontSize: '1.1rem', opacity: 0.9 }}>Pending Tasks</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: '1.8rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🚀 Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <button style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #007bff, #0056b3)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              👥 Manage Employees
            </button>
            <button style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #28a745, #1e7e34)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              🛍️ View Products
            </button>
            <button style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #17a2b8, #138496)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              📊 Generate Reports
            </button>
            <button style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #6f42c1, #5a2d91)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '30px',
          borderRadius: '15px',
          marginTop: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: '1.8rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            📋 Recent Activity
          </h2>
          <div style={{ color: '#666' }}>
            <p style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
              ✅ New employee John Smith was added to IT department
            </p>
            <p style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
              📦 Product "Wireless Headphones" inventory updated
            </p>
            <p style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
              📊 Monthly report generated successfully
            </p>
            <p style={{ padding: '10px 0' }}>
              🔧 System maintenance completed
            </p>
          </div>
        </div>
      </div>
    )
  }
}
