import React, { Component } from 'react'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {}
    
    this.state = {
      user: currentUser,
      isEditing: false,
      editedUser: { ...currentUser },
      activeTab: 'general',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisible: true,
        activityVisible: false,
        contactVisible: true
      },
      theme: 'light',
      language: 'english',
      showDeleteConfirm: false,
      hoveredCard: null
    }
  }

  handleEditToggle = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
      editedUser: prevState.isEditing ? prevState.user : { ...prevState.user }
    }))
  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => ({
      editedUser: {
        ...prevState.editedUser,
        [name]: value
      }
    }))
  }

  handleSave = () => {
    const updatedUser = { ...this.state.editedUser }
    
    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    
    // Update registered users list
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || []
    const userIndex = users.findIndex(u => u.email === updatedUser.email)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser }
      localStorage.setItem('registeredUsers', JSON.stringify(users))
    }
    
    this.setState({
      user: updatedUser,
      isEditing: false
    })
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab })
  }

  handleNotificationChange = (type) => {
    this.setState(prevState => ({
      notifications: {
        ...prevState.notifications,
        [type]: !prevState.notifications[type]
      }
    }))
  }

  handlePrivacyChange = (type) => {
    this.setState(prevState => ({
      privacy: {
        ...prevState.privacy,
        [type]: !prevState.privacy[type]
      }
    }))
  }

  handleCardHover = (cardId) => {
    this.setState({ hoveredCard: cardId })
  }

  handleCardLeave = () => {
    this.setState({ hoveredCard: null })
  }

  handleDeleteAccount = () => {
    // Remove user from localStorage
    localStorage.removeItem('currentUser')
    
    // Remove from registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || []
    const filteredUsers = users.filter(u => u.email !== this.state.user.email)
    localStorage.setItem('registeredUsers', JSON.stringify(filteredUsers))
    
    // Redirect to home
    window.location.href = '/home'
  }

  render() {
    const { user, isEditing, editedUser, activeTab, notifications, privacy, theme, language, showDeleteConfirm, hoveredCard } = this.state

    if (!user.email) {
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Please login to view your profile</h2>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Go to Login
          </button>
        </div>
      )
    }

    const tabs = [
      { id: 'general', label: '👤 General', icon: '👤' },
      { id: 'security', label: '🔒 Security', icon: '🔒' },
      { id: 'notifications', label: '🔔 Notifications', icon: '🔔' },
      { id: 'privacy', label: '🛡️ Privacy', icon: '🛡️' },
      { id: 'preferences', label: '⚙️ Preferences', icon: '⚙️' }
    ]

    return (
      <div style={{ 
        padding: '20px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        borderRadius: '20px',
        minHeight: '600px'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '30px',
          borderRadius: '20px',
          marginBottom: '30px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}>
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </div>
            <div style={{ textAlign: 'left' }}>
              <h1 style={{
                margin: '0 0 10px 0',
                fontSize: '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {user.firstName} {user.lastName}
              </h1>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '18px' }}>
                📧 {user.email}
              </p>
              <p style={{ margin: '0', color: '#888', fontSize: '14px' }}>
                Member since {new Date(user.loginTime).getFullYear()}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={this.handleEditToggle}
              style={{
                background: isEditing ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '15px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isEditing ? '💾 Save Changes' : '✏️ Edit Profile'}
            </button>
            {isEditing && (
              <button
                onClick={() => this.setState({ isEditing: false, editedUser: { ...user } })}
                style={{
                  background: 'transparent',
                  color: '#6c757d',
                  border: '2px solid #6c757d',
                  padding: '12px 24px',
                  borderRadius: '15px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => this.handleTabChange(tab.id)}
              style={{
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                  : 'rgba(255,255,255,0.9)',
                color: activeTab === tab.id ? 'white' : '#667eea',
                border: activeTab === tab.id ? 'none' : '2px solid #667eea',
                padding: '12px 20px',
                borderRadius: '15px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 8px 25px rgba(102, 126, 234, 0.3)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          minHeight: '400px'
        }}>
          
          {/* General Tab */}
          {activeTab === 'general' && (
            <div>
              <h2 style={{ marginBottom: '30px', color: '#2d3748' }}>👤 General Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={isEditing ? editedUser.firstName || '' : user.firstName || ''}
                    onChange={this.handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      background: isEditing ? 'white' : '#f8f9fa',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={isEditing ? editedUser.lastName || '' : user.lastName || ''}
                    onChange={this.handleInputChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      background: isEditing ? 'white' : '#f8f9fa',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email || ''}
                    disabled={true}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      background: '#f8f9fa',
                      color: '#6c757d',
                      boxSizing: 'border-box'
                    }}
                  />
                  <small style={{ color: '#6c757d', fontSize: '12px' }}>
                    Email cannot be changed for security reasons
                  </small>
                </div>
              </div>
              
              {isEditing && (
                <div style={{ marginTop: '30px', textAlign: 'right' }}>
                  <button
                    onClick={this.handleSave}
                    style={{
                      background: 'linear-gradient(135deg, #28a745, #20c997)',
                      color: 'white',
                      border: 'none',
                      padding: '15px 30px',
                      borderRadius: '15px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginRight: '15px'
                    }}
                  >
                    💾 Save Changes
                  </button>
                  <button
                    onClick={() => this.setState({ isEditing: false, editedUser: { ...user } })}
                    style={{
                      background: 'transparent',
                      color: '#6c757d',
                      border: '2px solid #6c757d',
                      padding: '15px 30px',
                      borderRadius: '15px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <h2 style={{ marginBottom: '30px', color: '#2d3748' }}>🔒 Security Settings</h2>
              <div style={{ display: 'grid', gap: '25px' }}>
                <div style={{
                  background: 'rgba(255, 193, 7, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  border: '2px solid rgba(255, 193, 7, 0.3)'
                }}>
                  <h3 style={{ color: '#856404', marginBottom: '10px' }}>🔑 Password</h3>
                  <p style={{ color: '#856404', marginBottom: '15px' }}>
                    Last changed: Never
                  </p>
                  <button style={{
                    background: 'linear-gradient(135deg, #ffc107, #e0a800)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Change Password
                  </button>
                </div>
                
                <div style={{
                  background: 'rgba(23, 162, 184, 0.1)',
                  padding: '20px',
                  borderRadius: '15px',
                  border: '2px solid rgba(23, 162, 184, 0.3)'
                }}>
                  <h3 style={{ color: '#0c5460', marginBottom: '10px' }}>🛡️ Two-Factor Authentication</h3>
                  <p style={{ color: '#0c5460', marginBottom: '15px' }}>
                    Add an extra layer of security to your account
                  </p>
                  <button style={{
                    background: 'linear-gradient(135deg, #17a2b8, #138496)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h2 style={{ marginBottom: '30px', color: '#2d3748' }}>🔔 Notification Preferences</h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {Object.entries(notifications).map(([key, value]) => (
                  <div 
                    key={key} 
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px',
                      background: 'rgba(255,255,255,0.5)',
                      borderRadius: '15px',
                      border: '2px solid rgba(102, 126, 234, 0.2)'
                    }}
                  >
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', color: '#2d3748' }}>
                        {key === 'email' ? '📧 Email Notifications' : 
                         key === 'push' ? '📱 Push Notifications' : 
                         '📱 SMS Notifications'}
                      </h4>
                      <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                        {key === 'email' ? 'Receive notifications via email' : 
                         key === 'push' ? 'Receive push notifications in browser' : 
                         'Receive notifications via SMS'}
                      </p>
                    </div>
                    <button
                      onClick={() => this.handleNotificationChange(key)}
                      style={{
                        background: value ? 'linear-gradient(135deg, #28a745, #20c997)' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        minWidth: '80px'
                      }}
                    >
                      {value ? 'ON' : 'OFF'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div>
              <h2 style={{ marginBottom: '30px', color: '#2d3748' }}>🛡️ Privacy Settings</h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {Object.entries(privacy).map(([key, value]) => (
                  <div 
                    key={key} 
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px',
                      background: 'rgba(255,255,255,0.5)',
                      borderRadius: '15px',
                      border: '2px solid rgba(102, 126, 234, 0.2)'
                    }}
                  >
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', color: '#2d3748' }}>
                        {key === 'profileVisible' ? '👤 Profile Visibility' : 
                         key === 'activityVisible' ? '📊 Activity Visibility' : 
                         '📞 Contact Information'}
                      </h4>
                      <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                        {key === 'profileVisible' ? 'Allow others to view your profile' : 
                         key === 'activityVisible' ? 'Show your activity to other users' : 
                         'Allow others to see your contact information'}
                      </p>
                    </div>
                    <button
                      onClick={() => this.handlePrivacyChange(key)}
                      style={{
                        background: value ? 'linear-gradient(135deg, #28a745, #20c997)' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        minWidth: '80px'
                      }}
                    >
                      {value ? 'PUBLIC' : 'PRIVATE'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div>
              <h2 style={{ marginBottom: '30px', color: '#2d3748' }}>⚙️ Preferences</h2>
              <div style={{ display: 'grid', gap: '25px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '15px', fontWeight: '600', color: '#2d3748' }}>
                    🎨 Theme
                  </label>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {['light', 'dark', 'auto'].map(themeOption => (
                      <button
                        key={themeOption}
                        onClick={() => this.setState({ theme: themeOption })}
                        style={{
                          background: theme === themeOption ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.8)',
                          color: theme === themeOption ? 'white' : '#667eea',
                          border: theme === themeOption ? 'none' : '2px solid #667eea',
                          padding: '12px 24px',
                          borderRadius: '15px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textTransform: 'capitalize'
                        }}
                      >
                        {themeOption}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '15px', fontWeight: '600', color: '#2d3748' }}>
                    🌍 Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => this.setState({ language: e.target.value })}
                    style={{
                      padding: '15px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      background: 'white',
                      minWidth: '200px'
                    }}
                  >
                    <option value="english">English</option>
                    <option value="spanish">Español</option>
                    <option value="french">Français</option>
                    <option value="german">Deutsch</option>
                  </select>
                </div>

                <div style={{
                  background: 'rgba(220, 53, 69, 0.1)',
                  padding: '25px',
                  borderRadius: '15px',
                  border: '2px solid rgba(220, 53, 69, 0.3)',
                  marginTop: '30px'
                }}>
                  <h3 style={{ color: '#721c24', marginBottom: '15px' }}>⚠️ Danger Zone</h3>
                  <p style={{ color: '#721c24', marginBottom: '20px' }}>
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button
                    onClick={() => this.setState({ showDeleteConfirm: !showDeleteConfirm })}
                    style={{
                      background: showDeleteConfirm ? 'linear-gradient(135deg, #dc3545, #c82333)' : 'transparent',
                      color: showDeleteConfirm ? 'white' : '#dc3545',
                      border: '2px solid #dc3545',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginBottom: showDeleteConfirm ? '15px' : '0'
                    }}
                  >
                    🗑️ Delete Account
                  </button>
                  
                  {showDeleteConfirm && (
                    <div style={{ marginTop: '15px' }}>
                      <p style={{ color: '#721c24', fontSize: '14px', marginBottom: '15px' }}>
                        Are you absolutely sure? This action cannot be undone.
                      </p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={this.handleDeleteAccount}
                          style={{
                            background: 'linear-gradient(135deg, #dc3545, #c82333)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => this.setState({ showDeleteConfirm: false })}
                          style={{
                            background: 'transparent',
                            color: '#6c757d',
                            border: '2px solid #6c757d',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
