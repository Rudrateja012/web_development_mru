import React, { useState, useRef } from 'react'
import { useTheme } from './ThemeProvider'

const ProjectInteractions = ({
  projects,
  onProjectUpdate,
  theme,
  settings,
  onSettingsChange
}) => {
  const { theme: themeConfig } = useTheme()
  const [activeTab, setActiveTab] = useState('manage')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [newProject, setNewProject] = useState(getEmptyProject())
  const [draggedProject, setDraggedProject] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [bulkSelection, setBulkSelection] = useState([])
  const fileInputRef = useRef(null)

  // Tabs configuration
  const tabs = [
    { id: 'manage', label: 'Manage Projects', icon: '📁' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'export', label: 'Export/Import', icon: '💾' }
  ]

  // Helper functions
  function getEmptyProject() {
    return {
      id: Date.now(),
      title: '',
      description: '',
      category: 'Web Application',
      technologies: [],
      image: '',
      github: '',
      demo: '',
      status: 'planning',
      featured: false,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      team: [],
      metrics: {
        stars: 0,
        forks: 0,
        views: 0,
        downloads: 0
      },
      tags: [],
      features: []
    }
  }

  function generateProjectId() {
    return Date.now() + Math.random().toString(36).substr(2, 9)
  }

  function validateProject(project) {
    const errors = []
    if (!project.title.trim()) errors.push('Title is required')
    if (!project.description.trim()) errors.push('Description is required')
    if (project.technologies.length === 0) errors.push('At least one technology is required')
    return errors
  }

  // Project management functions
  const handleAddProject = () => {
    const errors = validateProject(newProject)
    if (errors.length > 0) {
      alert('Please fix the following errors:\n' + errors.join('\n'))
      return
    }

    const projectToAdd = {
      ...newProject,
      id: generateProjectId()
    }

    const updatedProjects = [...projects, projectToAdd]
    onProjectUpdate(updatedProjects)
    setNewProject(getEmptyProject())
    setShowAddModal(false)

    if (settings.notifications) {
      showNotification('Project added successfully!', 'success')
    }
  }

  const handleEditProject = (project) => {
    setEditingProject({ ...project })
  }

  const handleUpdateProject = () => {
    const errors = validateProject(editingProject)
    if (errors.length > 0) {
      alert('Please fix the following errors:\n' + errors.join('\n'))
      return
    }

    const updatedProjects = projects.map(p => 
      p.id === editingProject.id ? editingProject : p
    )
    onProjectUpdate(updatedProjects)
    setEditingProject(null)

    if (settings.notifications) {
      showNotification('Project updated successfully!', 'success')
    }
  }

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId)
      onProjectUpdate(updatedProjects)

      if (settings.notifications) {
        showNotification('Project deleted successfully!', 'success')
      }
    }
  }

  const handleBulkDelete = () => {
    if (bulkSelection.length === 0) return
    
    if (window.confirm(`Are you sure you want to delete ${bulkSelection.length} project(s)?`)) {
      const updatedProjects = projects.filter(p => !bulkSelection.includes(p.id))
      onProjectUpdate(updatedProjects)
      setBulkSelection([])

      if (settings.notifications) {
        showNotification(`${bulkSelection.length} project(s) deleted successfully!`, 'success')
      }
    }
  }

  const handleBulkStatusUpdate = (status) => {
    if (bulkSelection.length === 0) return

    const updatedProjects = projects.map(p => 
      bulkSelection.includes(p.id) ? { ...p, status } : p
    )
    onProjectUpdate(updatedProjects)
    setBulkSelection([])

    if (settings.notifications) {
      showNotification(`${bulkSelection.length} project(s) status updated!`, 'success')
    }
  }

  // Drag and drop functions
  const handleDragStart = (e, project) => {
    setDraggedProject(project)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetProject) => {
    e.preventDefault()
    if (!draggedProject || draggedProject.id === targetProject.id) return

    const draggedIndex = projects.findIndex(p => p.id === draggedProject.id)
    const targetIndex = projects.findIndex(p => p.id === targetProject.id)

    const updatedProjects = [...projects]
    updatedProjects.splice(draggedIndex, 1)
    updatedProjects.splice(targetIndex, 0, draggedProject)

    onProjectUpdate(updatedProjects)
    setDraggedProject(null)
  }

  // Export/Import functions
  const handleExportData = () => {
    const dataToExport = {
      projects,
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-projects-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)

    if (settings.notifications) {
      showNotification('Data exported successfully!', 'success')
    }
  }

  const handleImportData = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result)
        
        if (importedData.projects && Array.isArray(importedData.projects)) {
          // Merge with existing projects, avoiding duplicates
          const existingIds = new Set(projects.map(p => p.id))
          const newProjects = importedData.projects.filter(p => !existingIds.has(p.id))
          const updatedProjects = [...projects, ...newProjects]
          
          onProjectUpdate(updatedProjects)
          
          if (importedData.settings) {
            onSettingsChange({ ...settings, ...importedData.settings })
          }

          if (settings.notifications) {
            showNotification(`Imported ${newProjects.length} new project(s)!`, 'success')
          }
        } else {
          throw new Error('Invalid file format')
        }
      } catch (error) {
        alert('Error importing data: ' + error.message)
      }
    }
    reader.readAsText(file)
    event.target.value = '' // Reset file input
  }

  // Utility functions
  const showNotification = (message, type = 'info') => {
    // Simple notification implementation
    console.log(`${type.toUpperCase()}: ${message}`)
  }

  const getAnalyticsData = () => {
    const totalProjects = projects.length
    const completedProjects = projects.filter(p => p.status === 'completed').length
    const inProgressProjects = projects.filter(p => p.status === 'in-progress').length
    const totalStars = projects.reduce((sum, p) => sum + (p.metrics?.stars || 0), 0)
    const totalViews = projects.reduce((sum, p) => sum + (p.metrics?.views || 0), 0)
    
    const techUsage = {}
    projects.forEach(project => {
      project.technologies?.forEach(tech => {
        techUsage[tech] = (techUsage[tech] || 0) + 1
      })
    })

    const topTechnologies = Object.entries(techUsage)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)

    const statusDistribution = {
      completed: completedProjects,
      'in-progress': inProgressProjects,
      planning: totalProjects - completedProjects - inProgressProjects
    }

    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      totalStars,
      totalViews,
      topTechnologies,
      statusDistribution,
      completionRate: totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0
    }
  }

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies?.some(tech => 
      tech.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const analytics = getAnalyticsData()

  return (
    <div style={containerStyles()}>
      {/* Tab Navigation */}
      <div style={tabNavigationStyles()}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={tabButtonStyles(activeTab === tab.id)}
            className={activeTab === tab.id ? 'active' : ''}
          >
            <span style={{ fontSize: '18px' }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={tabContentStyles()}>
        {/* Manage Projects Tab */}
        {activeTab === 'manage' && (
          <div style={manageTabStyles()}>
            {/* Header with Actions */}
            <div style={manageHeaderStyles()}>
              <div style={searchContainerStyles()}>
                <span style={searchIconStyles()}>🔍</span>
                <input
                  type="text"
                  placeholder="Search projects to manage..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={searchInputStyles()}
                />
              </div>
              
              <div style={actionButtonsStyles()}>
                <button
                  onClick={() => setShowAddModal(true)}
                  style={primaryButtonStyles()}
                >
                  <span>➕</span>
                  <span>Add Project</span>
                </button>
                
                {bulkSelection.length > 0 && (
                  <div style={bulkActionsStyles()}>
                    <span style={bulkCountStyles()}>
                      {bulkSelection.length} selected
                    </span>
                    <button
                      onClick={() => handleBulkStatusUpdate('completed')}
                      style={bulkButtonStyles()}
                    >
                      ✅ Complete
                    </button>
                    <button
                      onClick={() => handleBulkStatusUpdate('in-progress')}
                      style={bulkButtonStyles()}
                    >
                      🚧 Progress
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      style={dangerButtonStyles()}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Projects List */}
            <div style={projectsListStyles()}>
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  style={projectRowStyles()}
                  draggable
                  onDragStart={(e) => handleDragStart(e, project)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, project)}
                  className="project-row"
                >
                  <div style={projectRowContentStyles()}>
                    <input
                      type="checkbox"
                      checked={bulkSelection.includes(project.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkSelection([...bulkSelection, project.id])
                        } else {
                          setBulkSelection(bulkSelection.filter(id => id !== project.id))
                        }
                      }}
                      style={checkboxStyles()}
                    />
                    
                    <div style={projectInfoStyles()}>
                      <h4 style={projectTitleStyles()}>{project.title}</h4>
                      <p style={projectDescStyles()}>{project.description}</p>
                      <div style={projectMetaStyles()}>
                        <span style={statusBadgeStyles(project.status)}>
                          {project.status}
                        </span>
                        <span style={categoryBadgeStyles()}>
                          {project.category}
                        </span>
                        <span style={techCountStyles()}>
                          {project.technologies?.length || 0} techs
                        </span>
                      </div>
                    </div>
                    
                    <div style={projectActionsStyles()}>
                      <button
                        onClick={() => handleEditProject(project)}
                        style={editButtonStyles()}
                        title="Edit project"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        style={deleteButtonStyles()}
                        title="Delete project"
                      >
                        🗑️
                      </button>
                      <span style={dragHandleStyles()} title="Drag to reorder">
                        ⋮⋮
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredProjects.length === 0 && (
                <div style={emptyStateStyles()}>
                  <span style={emptyIconStyles()}>📂</span>
                  <p>No projects found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div style={analyticsTabStyles()}>
            <h3 style={sectionTitleStyles()}>📊 Portfolio Analytics</h3>
            
            <div style={analyticsGridStyles()}>
              <div style={analyticsCardStyles()}>
                <h4>Project Overview</h4>
                <div style={analyticsStatsStyles()}>
                  <div style={analyticsStatStyles()}>
                    <span style={analyticsNumberStyles()}>{analytics.totalProjects}</span>
                    <span>Total Projects</span>
                  </div>
                  <div style={analyticsStatStyles()}>
                    <span style={analyticsNumberStyles()}>{analytics.completionRate}%</span>
                    <span>Completion Rate</span>
                  </div>
                </div>
              </div>

              <div style={analyticsCardStyles()}>
                <h4>Engagement Metrics</h4>
                <div style={analyticsStatsStyles()}>
                  <div style={analyticsStatStyles()}>
                    <span style={analyticsNumberStyles()}>{analytics.totalStars}</span>
                    <span>Total Stars</span>
                  </div>
                  <div style={analyticsStatStyles()}>
                    <span style={analyticsNumberStyles()}>{analytics.totalViews}</span>
                    <span>Total Views</span>
                  </div>
                </div>
              </div>

              <div style={analyticsCardStyles()}>
                <h4>Top Technologies</h4>
                <div style={techListStyles()}>
                  {analytics.topTechnologies.map(([tech, count], index) => (
                    <div key={tech} style={techItemStyles()}>
                      <span>{tech}</span>
                      <span style={techCountBadgeStyles()}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={analyticsCardStyles()}>
                <h4>Status Distribution</h4>
                <div style={statusChartStyles()}>
                  {Object.entries(analytics.statusDistribution).map(([status, count]) => (
                    <div key={status} style={statusItemStyles()}>
                      <span style={statusLabelStyles()}>{status}</span>
                      <div style={statusBarStyles()}>
                        <div 
                          style={statusBarFillStyles(count, analytics.totalProjects)}
                        />
                      </div>
                      <span style={statusCountStyles()}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div style={settingsTabStyles()}>
            <h3 style={sectionTitleStyles()}>⚙️ Portfolio Settings</h3>
            
            <div style={settingsGridStyles()}>
              <div style={settingsCardStyles()}>
                <h4>General Settings</h4>
                <div style={settingItemStyles()}>
                  <label style={settingLabelStyles()}>
                    <input
                      type="checkbox"
                      checked={settings.autoSave}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        autoSave: e.target.checked
                      })}
                      style={settingCheckboxStyles()}
                    />
                    Auto-save changes
                  </label>
                </div>
                <div style={settingItemStyles()}>
                  <label style={settingLabelStyles()}>
                    <input
                      type="checkbox"
                      checked={settings.animations}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        animations: e.target.checked
                      })}
                      style={settingCheckboxStyles()}
                    />
                    Enable animations
                  </label>
                </div>
                <div style={settingItemStyles()}>
                  <label style={settingLabelStyles()}>
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        notifications: e.target.checked
                      })}
                      style={settingCheckboxStyles()}
                    />
                    Show notifications
                  </label>
                </div>
                <div style={settingItemStyles()}>
                  <label style={settingLabelStyles()}>
                    <input
                      type="checkbox"
                      checked={settings.sound}
                      onChange={(e) => onSettingsChange({
                        ...settings,
                        sound: e.target.checked
                      })}
                      style={settingCheckboxStyles()}
                    />
                    Sound effects
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export/Import Tab */}
        {activeTab === 'export' && (
          <div style={exportTabStyles()}>
            <h3 style={sectionTitleStyles()}>💾 Data Management</h3>
            
            <div style={exportGridStyles()}>
              <div style={exportCardStyles()}>
                <h4>Export Data</h4>
                <p style={exportDescStyles()}>
                  Export your portfolio projects and settings as a JSON file for backup or sharing.
                </p>
                <button
                  onClick={handleExportData}
                  style={primaryButtonStyles()}
                >
                  <span>📤</span>
                  <span>Export Portfolio</span>
                </button>
              </div>

              <div style={exportCardStyles()}>
                <h4>Import Data</h4>
                <p style={exportDescStyles()}>
                  Import portfolio data from a previously exported JSON file.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={secondaryButtonStyles()}
                >
                  <span>📥</span>
                  <span>Import Portfolio</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Project Modal */}
      {(showAddModal || editingProject) && (
        <div style={modalOverlayStyles()}>
          <div style={modalContentStyles()}>
            <div style={modalHeaderStyles()}>
              <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingProject(null)
                }}
                style={modalCloseStyles()}
              >
                ✕
              </button>
            </div>
            
            <div style={modalBodyStyles()}>
              {/* Project form would go here */}
              <div style={formGroupStyles()}>
                <label style={formLabelStyles()}>Project Title</label>
                <input
                  type="text"
                  value={editingProject ? editingProject.title : newProject.title}
                  onChange={(e) => {
                    if (editingProject) {
                      setEditingProject({ ...editingProject, title: e.target.value })
                    } else {
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                  }}
                  style={formInputStyles()}
                  placeholder="Enter project title"
                />
              </div>
              
              <div style={formGroupStyles()}>
                <label style={formLabelStyles()}>Description</label>
                <textarea
                  value={editingProject ? editingProject.description : newProject.description}
                  onChange={(e) => {
                    if (editingProject) {
                      setEditingProject({ ...editingProject, description: e.target.value })
                    } else {
                      setNewProject({ ...newProject, description: e.target.value })
                    }
                  }}
                  style={formTextareaStyles()}
                  placeholder="Enter project description"
                  rows={4}
                />
              </div>
              
              {/* Add more form fields as needed */}
            </div>
            
            <div style={modalFooterStyles()}>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingProject(null)
                }}
                style={secondaryButtonStyles()}
              >
                Cancel
              </button>
              <button
                onClick={editingProject ? handleUpdateProject : handleAddProject}
                style={primaryButtonStyles()}
              >
                {editingProject ? 'Update' : 'Add'} Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{getCustomStyles()}</style>
    </div>
  )

  // Styling functions (truncated for brevity - would include all the styling functions)
  function containerStyles() {
    return {
      background: themeConfig.cardBackground,
      backdropFilter: themeConfig.backdropBlur,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: themeConfig.shadowLight,
      transition: 'all 0.3s ease'
    }
  }

  function tabNavigationStyles() {
    return {
      display: 'flex',
      borderBottom: `1px solid ${themeConfig.border}`,
      background: themeConfig.surface
    }
  }

  function tabButtonStyles(isActive) {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '16px 20px',
      background: isActive ? themeConfig.primary : 'transparent',
      color: isActive ? '#ffffff' : themeConfig.text,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500',
      outline: 'none',
      borderBottom: isActive ? `2px solid ${themeConfig.primary}` : '2px solid transparent'
    }
  }

  function tabContentStyles() {
    return {
      padding: '24px'
    }
  }

  function manageTabStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }
  }

  function manageHeaderStyles() {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap'
    }
  }

  function searchContainerStyles() {
    return {
      position: 'relative',
      flex: 1,
      minWidth: '300px'
    }
  }

  function searchIconStyles() {
    return {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '16px',
      color: themeConfig.textMuted
    }
  }

  function searchInputStyles() {
    return {
      width: '100%',
      padding: '12px 12px 12px 40px',
      background: themeConfig.surface,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '10px',
      color: themeConfig.text,
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.3s ease'
    }
  }

  function actionButtonsStyles() {
    return {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }

  function primaryButtonStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      background: themeConfig.primary,
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  function secondaryButtonStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      background: themeConfig.glassmorphism,
      color: themeConfig.text,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  // Add more styling functions as needed...
  function bulkActionsStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      background: themeConfig.glassmorphism,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '8px'
    }
  }

  function bulkCountStyles() {
    return {
      fontSize: '12px',
      color: themeConfig.textSecondary,
      fontWeight: '500'
    }
  }

  function bulkButtonStyles() {
    return {
      padding: '4px 8px',
      background: themeConfig.primary + '20',
      color: themeConfig.primary,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '11px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  function dangerButtonStyles() {
    return {
      padding: '4px 8px',
      background: themeConfig.error + '20',
      color: themeConfig.error,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '11px',
      fontWeight: '500',
      outline: 'none'
    }
  }

  function projectsListStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }

  function projectRowStyles() {
    return {
      background: themeConfig.glassmorphism,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '12px',
      padding: '16px',
      transition: 'all 0.3s ease',
      cursor: 'move'
    }
  }

  function projectRowContentStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  }

  function checkboxStyles() {
    return {
      width: '16px',
      height: '16px',
      cursor: 'pointer'
    }
  }

  function projectInfoStyles() {
    return {
      flex: 1,
      minWidth: 0
    }
  }

  function projectTitleStyles() {
    return {
      margin: '0 0 4px 0',
      fontSize: '16px',
      fontWeight: '600',
      color: themeConfig.text
    }
  }

  function projectDescStyles() {
    return {
      margin: '0 0 8px 0',
      fontSize: '14px',
      color: themeConfig.textSecondary,
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }

  function projectMetaStyles() {
    return {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }
  }

  function statusBadgeStyles(status) {
    const colors = {
      completed: themeConfig.success,
      'in-progress': themeConfig.warning,
      planning: themeConfig.info
    }
    const color = colors[status] || themeConfig.info
    
    return {
      padding: '2px 8px',
      background: color + '20',
      color: color,
      border: `1px solid ${color}40`,
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '500',
      textTransform: 'capitalize'
    }
  }

  function categoryBadgeStyles() {
    return {
      padding: '2px 8px',
      background: themeConfig.border + '40',
      color: themeConfig.textMuted,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '500'
    }
  }

  function techCountStyles() {
    return {
      fontSize: '11px',
      color: themeConfig.textMuted,
      fontWeight: '500'
    }
  }

  function projectActionsStyles() {
    return {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }
  }

  function editButtonStyles() {
    return {
      padding: '6px',
      background: themeConfig.info + '20',
      color: themeConfig.info,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      outline: 'none'
    }
  }

  function deleteButtonStyles() {
    return {
      padding: '6px',
      background: themeConfig.error + '20',
      color: themeConfig.error,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      outline: 'none'
    }
  }

  function dragHandleStyles() {
    return {
      color: themeConfig.textMuted,
      cursor: 'move',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '4px'
    }
  }

  function emptyStateStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px',
      color: themeConfig.textMuted,
      textAlign: 'center'
    }
  }

  function emptyIconStyles() {
    return {
      fontSize: '48px',
      marginBottom: '12px'
    }
  }

  function analyticsTabStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }
  }

  function sectionTitleStyles() {
    return {
      margin: '0 0 20px 0',
      fontSize: '20px',
      fontWeight: '600',
      color: themeConfig.text,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }

  function analyticsGridStyles() {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px'
    }
  }

  function analyticsCardStyles() {
    return {
      background: themeConfig.glassmorphism,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '12px',
      padding: '20px'
    }
  }

  function analyticsStatsStyles() {
    return {
      display: 'flex',
      gap: '20px',
      marginTop: '16px'
    }
  }

  function analyticsStatStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px'
    }
  }

  function analyticsNumberStyles() {
    return {
      fontSize: '24px',
      fontWeight: '700',
      color: themeConfig.primary
    }
  }

  function techListStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '16px'
    }
  }

  function techItemStyles() {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      color: themeConfig.text
    }
  }

  function techCountBadgeStyles() {
    return {
      padding: '2px 8px',
      background: themeConfig.primary + '20',
      color: themeConfig.primary,
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500'
    }
  }

  function statusChartStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginTop: '16px'
    }
  }

  function statusItemStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }

  function statusLabelStyles() {
    return {
      fontSize: '14px',
      color: themeConfig.text,
      minWidth: '80px',
      textTransform: 'capitalize'
    }
  }

  function statusBarStyles() {
    return {
      flex: 1,
      height: '8px',
      background: themeConfig.border,
      borderRadius: '4px',
      overflow: 'hidden'
    }
  }

  function statusBarFillStyles(count, total) {
    const percentage = total > 0 ? (count / total) * 100 : 0
    return {
      height: '100%',
      width: `${percentage}%`,
      background: themeConfig.primary,
      transition: 'width 0.5s ease'
    }
  }

  function statusCountStyles() {
    return {
      fontSize: '14px',
      color: themeConfig.textSecondary,
      fontWeight: '500',
      minWidth: '30px',
      textAlign: 'right'
    }
  }

  function settingsTabStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }
  }

  function settingsGridStyles() {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px'
    }
  }

  function settingsCardStyles() {
    return {
      background: themeConfig.glassmorphism,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '12px',
      padding: '20px'
    }
  }

  function settingItemStyles() {
    return {
      marginBottom: '16px'
    }
  }

  function settingLabelStyles() {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '14px',
      color: themeConfig.text,
      cursor: 'pointer'
    }
  }

  function settingCheckboxStyles() {
    return {
      width: '16px',
      height: '16px',
      cursor: 'pointer'
    }
  }

  function exportTabStyles() {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }
  }

  function exportGridStyles() {
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px'
    }
  }

  function exportCardStyles() {
    return {
      background: themeConfig.glassmorphism,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center'
    }
  }

  function exportDescStyles() {
    return {
      margin: '0 0 20px 0',
      fontSize: '14px',
      color: themeConfig.textSecondary,
      lineHeight: '1.5'
    }
  }

  function modalOverlayStyles() {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: themeConfig.zIndex.modal,
      padding: '20px'
    }
  }

  function modalContentStyles() {
    return {
      background: themeConfig.surface,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '16px',
      width: '100%',
      maxWidth: '600px',
      maxHeight: '80vh',
      overflow: 'hidden',
      boxShadow: themeConfig.shadow
    }
  }

  function modalHeaderStyles() {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      borderBottom: `1px solid ${themeConfig.border}`
    }
  }

  function modalCloseStyles() {
    return {
      background: 'none',
      border: 'none',
      color: themeConfig.textMuted,
      cursor: 'pointer',
      fontSize: '18px',
      padding: '4px',
      borderRadius: '4px',
      outline: 'none'
    }
  }

  function modalBodyStyles() {
    return {
      padding: '20px',
      maxHeight: '400px',
      overflow: 'auto'
    }
  }

  function modalFooterStyles() {
    return {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      padding: '20px',
      borderTop: `1px solid ${themeConfig.border}`
    }
  }

  function formGroupStyles() {
    return {
      marginBottom: '20px'
    }
  }

  function formLabelStyles() {
    return {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: themeConfig.text
    }
  }

  function formInputStyles() {
    return {
      width: '100%',
      padding: '12px',
      background: themeConfig.surface,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '8px',
      color: themeConfig.text,
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.3s ease'
    }
  }

  function formTextareaStyles() {
    return {
      width: '100%',
      padding: '12px',
      background: themeConfig.surface,
      border: `1px solid ${themeConfig.border}`,
      borderRadius: '8px',
      color: themeConfig.text,
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.3s ease',
      resize: 'vertical',
      fontFamily: 'inherit'
    }
  }

  function getCustomStyles() {
    return `
      /* Tab hover effects */
      button[style*="tabButtonStyles"]:not(.active):hover {
        background: ${themeConfig.glassmorphism} !important;
        color: ${themeConfig.primary} !important;
      }

      /* Project row hover */
      .project-row:hover {
        transform: translateY(-2px);
        box-shadow: ${themeConfig.shadowLight};
        border-color: ${themeConfig.primary}40;
      }

      /* Button hover effects */
      button:hover {
        transform: translateY(-1px);
      }

      /* Form focus styles */
      input:focus, textarea:focus {
        border-color: ${themeConfig.primary} !important;
        box-shadow: 0 0 0 3px ${themeConfig.primary}20 !important;
      }

      /* Modal animations */
      @keyframes modalFadeIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .modal-content {
        animation: modalFadeIn 0.3s ease-out;
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .manage-header {
          flex-direction: column;
          align-items: stretch;
        }

        .search-container {
          min-width: unset;
        }

        .action-buttons {
          justify-content: stretch;
        }

        .bulk-actions {
          flex-wrap: wrap;
        }

        .project-row-content {
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .analytics-grid,
        .settings-grid,
        .export-grid {
          grid-template-columns: 1fr;
        }

        .tab-navigation {
          overflow-x: auto;
        }

        .tab-navigation button {
          white-space: nowrap;
        }
      }

      @media (max-width: 480px) {
        .tab-content {
          padding: 16px;
        }

        .modal-overlay {
          padding: 10px;
        }

        .modal-body {
          padding: 16px;
        }

        .modal-header,
        .modal-footer {
          padding: 16px;
        }
      }

      /* Accessibility */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transition: none !important;
        }
      }

      /* Focus styles */
      button:focus,
      input:focus,
      textarea:focus {
        outline: 2px solid ${themeConfig.primary};
        outline-offset: 2px;
      }
    `
  }
}

export default ProjectInteractions
