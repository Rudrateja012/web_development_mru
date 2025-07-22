import React, { Component } from 'react'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: new Date().toLocaleString(),
      animatedCards: false,
      hoveredCard: null,
      stats: {
        totalUsers: 1247,
        activeProjects: 23,
        completedTasks: 856,
        satisfaction: 98.5
      }
    }
  }

  componentDidMount() {
    // Update time every second
    this.timeInterval = setInterval(() => {
      this.setState({ currentTime: new Date().toLocaleString() })
    }, 1000)

    // Trigger card animations after component mounts
    setTimeout(() => {
      this.setState({ animatedCards: true })
    }, 500)
  }

  componentWillUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  }

  handleCardHover = (cardIndex) => {
    this.setState({ hoveredCard: cardIndex })
  }

  handleCardLeave = () => {
    this.setState({ hoveredCard: null })
  }

  render() {
    const { currentTime, animatedCards, hoveredCard, stats } = this.state

    const cardData = [
      {
        icon: '👥',
        title: 'Employee Management',
        description: 'Manage your workforce efficiently with our comprehensive employee management system.',
        color: '#4CAF50'
      },
      {
        icon: '🔐',
        title: 'Secure Authentication',
        description: 'Advanced security features with multi-factor authentication and role-based access.',
        color: '#2196F3'
      },
      {
        icon: '📊',
        title: 'Analytics Dashboard',
        description: 'Real-time insights and analytics to help you make data-driven decisions.',
        color: '#FF9800'
      },
      {
        icon: '🚀',
        title: 'High Performance',
        description: 'Lightning-fast performance with modern React architecture and optimization.',
        color: '#9C27B0'
      }
    ]

    const statsData = [
      { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: '👤', color: '#4CAF50' },
      { label: 'Active Projects', value: stats.activeProjects, icon: '🎯', color: '#2196F3' },
      { label: 'Completed Tasks', value: stats.completedTasks.toLocaleString(), icon: '✅', color: '#FF9800' },
      { label: 'Satisfaction Rate', value: `${stats.satisfaction}%`, icon: '⭐', color: '#E91E63' }
    ]

    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '20px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        borderRadius: '20px',
        minHeight: '600px'
      }}>
        {/* Header Section */}
        <div style={{
          marginBottom: '40px',
          transform: animatedCards ? 'translateY(0)' : 'translateY(-30px)',
          opacity: animatedCards ? 1 : 0,
          transition: 'all 0.8s ease'
        }}>
          <h1 style={{ 
            color: '#2d3748',
            marginBottom: '10px',
            fontSize: '3rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            🏠 Employee Management Hub
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            marginBottom: '10px',
            fontWeight: '400'
          }}>
            Streamline your workforce management with our cutting-edge platform
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.8)',
            padding: '8px 16px',
            borderRadius: '20px',
            display: 'inline-block',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            fontSize: '14px',
            color: '#666',
            fontWeight: '500'
          }}>
            🕐 {currentTime}
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
          transform: animatedCards ? 'translateY(0)' : 'translateY(30px)',
          opacity: animatedCards ? 1 : 0,
          transition: 'all 0.8s ease 0.2s'
        }}>
          {statsData.map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.9)',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                transform: hoveredCard === `stat-${index}` ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: `2px solid ${stat.color}20`
              }}
              onMouseEnter={() => this.handleCardHover(`stat-${index}`)}
              onMouseLeave={this.handleCardLeave}
            >
              <div style={{ 
                fontSize: '2rem', 
                marginBottom: '10px',
                filter: hoveredCard === `stat-${index}` ? 'scale(1.2)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}>
                {stat.icon}
              </div>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: stat.color,
                marginBottom: '5px'
              }}>
                {stat.value}
              </div>
              <div style={{ 
                fontSize: '14px', 
                color: '#666',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
          marginBottom: '40px',
          transform: animatedCards ? 'translateY(0)' : 'translateY(30px)',
          opacity: animatedCards ? 1 : 0,
          transition: 'all 0.8s ease 0.4s',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated background elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '100px',
            height: '100px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '60px',
            height: '60px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out infinite reverse'
          }}></div>

          <h3 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '20px',
            fontWeight: '700'
          }}>
            Next-Generation Workforce Platform
          </h3>
          <p style={{ 
            fontSize: '1.3rem', 
            lineHeight: '1.8',
            marginBottom: '30px',
            maxWidth: '800px',
            margin: '0 auto 30px auto'
          }}>
            Experience the future of employee management with our intelligent, 
            secure, and scalable platform designed for modern businesses.
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '30px'
          }}>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)'
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)'
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}>
              🚀 Get Started
            </button>
            <button style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.5)',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent'
              e.target.style.transform = 'translateY(0)'
            }}>
              📖 Learn More
            </button>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px',
          transform: animatedCards ? 'translateY(0)' : 'translateY(30px)',
          opacity: animatedCards ? 1 : 0,
          transition: 'all 0.8s ease 0.6s'
        }}>
          {cardData.map((card, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.95)',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: hoveredCard === index ? '0 20px 40px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.1)',
                transform: hoveredCard === index ? 'translateY(-10px) rotate(1deg)' : 'translateY(0) rotate(0deg)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                border: `3px solid ${hoveredCard === index ? card.color : 'transparent'}`,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={() => this.handleCardHover(index)}
              onMouseLeave={this.handleCardLeave}
            >
              {/* Animated background gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${card.color}10, ${card.color}05)`,
                opacity: hoveredCard === index ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '20px',
                  transform: hoveredCard === index ? 'scale(1.2) rotate(10deg)' : 'scale(1) rotate(0deg)',
                  transition: 'all 0.3s ease',
                  filter: hoveredCard === index ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none'
                }}>
                  {card.icon}
                </div>
                <h4 style={{ 
                  color: hoveredCard === index ? card.color : '#2d3748',
                  marginBottom: '15px',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  transition: 'color 0.3s ease'
                }}>
                  {card.title}
                </h4>
                <p style={{ 
                  color: '#666',
                  lineHeight: '1.6',
                  fontSize: '16px'
                }}>
                  {card.description}
                </p>
                
                {/* Hover indicator */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  color: card.color,
                  fontSize: '20px',
                  opacity: hoveredCard === index ? 1 : 0,
                  transform: hoveredCard === index ? 'translateX(0)' : 'translateX(10px)',
                  transition: 'all 0.3s ease'
                }}>
                  →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}</style>
      </div>
    )
  }
}
