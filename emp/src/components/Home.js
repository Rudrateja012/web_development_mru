import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2 style={{ color: '#007bff', marginBottom: '20px' }}>
          🏠 Welcome to Home Page
        </h2>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h3>React Single Page Application</h3>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            This is a demonstration of React Router implementation with multiple components.
            Navigate through different sections using the navigation menu above.
          </p>
          <div style={{ marginTop: '20px' }}>
            <div style={{ 
              display: 'inline-block', 
              margin: '10px',
              padding: '15px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '10px'
            }}>
              <h4>📊 Features</h4>
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
                <li>✅ Employee Management</li>
                <li>✅ User Authentication</li>
                <li>✅ Product Catalog</li>
                <li>✅ Responsive Design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
