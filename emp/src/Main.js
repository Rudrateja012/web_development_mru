import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'

// Import components
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import ShowEmployees from './components/ShowEmployees'
import Products from './components/Products'

export default class Main extends Component {
  render() {
    return (
      <Router>
        <div style={{ 
          fontFamily: 'Inter, system-ui, sans-serif', 
          margin: '0',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px'
        }}>   
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
              justifyContent: 'center',
              gap: '15px'
            }}>
              <NavLink 
                to='/home' 
                activeStyle={{
                  background: 'linear-gradient(135deg, #007bff, #0056b3)',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 123, 255, 0.3)'
                }}
                style={{
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  color: '#007bff',
                  border: '2px solid #007bff',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                🏠 Home
              </NavLink>
              
              <NavLink 
                to='/login'
                activeStyle={{
                  background: 'linear-gradient(135deg, #28a745, #1e7e34)',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(40, 167, 69, 0.3)'
                }}
                style={{
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  color: '#28a745',
                  border: '2px solid #28a745',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                🔐 Login
              </NavLink>
              
              <NavLink 
                to='/register'
                activeStyle={{
                  background: 'linear-gradient(135deg, #ffc107, #e0a800)',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255, 193, 7, 0.3)'
                }}
                style={{
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  color: '#ffc107',
                  border: '2px solid #ffc107',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                📝 Register
              </NavLink>
              
              <NavLink 
                to='/showemps'
                activeStyle={{
                  background: 'linear-gradient(135deg, #17a2b8, #138496)',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(23, 162, 184, 0.3)'
                }}
                style={{
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  color: '#17a2b8',
                  border: '2px solid #17a2b8',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                👥 Employees
              </NavLink>
              
              <NavLink 
                to='/products'
                activeStyle={{
                  background: 'linear-gradient(135deg, #dc3545, #c82333)',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(220, 53, 69, 0.3)'
                }}
                style={{
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  color: '#dc3545',
                  border: '2px solid #dc3545',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                🛍️ Products
              </NavLink>
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
                Manage your workforce with ease and efficiency
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
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/showemps" component={ShowEmployees} />
                <Route path="/products" component={Products} />
              </Switch>
            </div>
        </div>
      </Router>
    )
  }
}