import React, { Component } from 'react'

export default class ShowEmployees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [
        { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'IT', salary: '$75,000', email: 'john.doe@company.com' },
        { id: 2, name: 'Jane Smith', position: 'Project Manager', department: 'IT', salary: '$85,000', email: 'jane.smith@company.com' },
        { id: 3, name: 'Mike Johnson', position: 'Designer', department: 'Design', salary: '$65,000', email: 'mike.johnson@company.com' },
        { id: 4, name: 'Sarah Wilson', position: 'HR Manager', department: 'HR', salary: '$70,000', email: 'sarah.wilson@company.com' },
        { id: 5, name: 'David Brown', position: 'Data Analyst', department: 'Analytics', salary: '$68,000', email: 'david.brown@company.com' },
        { id: 6, name: 'Lisa Garcia', position: 'Marketing Specialist', department: 'Marketing', salary: '$60,000', email: 'lisa.garcia@company.com' }
      ],
      searchTerm: '',
      sortBy: 'name'
    }
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  handleSort = (e) => {
    this.setState({ sortBy: e.target.value })
  }

  getFilteredAndSortedEmployees = () => {
    let { employees, searchTerm, sortBy } = this.state
    
    // Filter by search term
    if (searchTerm) {
      employees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Sort employees
    employees.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'position') return a.position.localeCompare(b.position)
      if (sortBy === 'department') return a.department.localeCompare(b.department)
      return 0
    })
    
    return employees
  }

  render() {
    const filteredEmployees = this.getFilteredAndSortedEmployees()
    
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#17a2b8', marginBottom: '30px' }}>
          👥 Employee Management System
        </h2>
        
        {/* Search and Sort Controls */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '30px',
          padding: '20px',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
        }}>
          <div style={{ flex: '1' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              🔍 Search Employees:
            </label>
            <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              placeholder="Search by name, position, or department..."
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #e0e0e0',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              📊 Sort By:
            </label>
            <select
              value={this.state.sortBy}
              onChange={this.handleSort}
              style={{
                padding: '10px',
                border: '2px solid #e0e0e0',
                borderRadius: '5px',
                fontSize: '16px',
                background: 'white'
              }}
            >
              <option value="name">Name</option>
              <option value="position">Position</option>
              <option value="department">Department</option>
            </select>
          </div>
        </div>
        
        {/* Employee Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {filteredEmployees.map(employee => (
            <div
              key={employee.id}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                border: '1px solid #e0e0e0',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #17a2b8, #007bff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginRight: '15px'
                }}>
                  {employee.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{employee.name}</h3>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>ID: {employee.id}</p>
                </div>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#17a2b8' }}>Position:</strong> {employee.position}
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#17a2b8' }}>Department:</strong> {employee.department}
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#17a2b8' }}>Salary:</strong> {employee.salary}
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#17a2b8' }}>Email:</strong> {employee.email}
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{
                  padding: '8px 15px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  Edit
                </button>
                <button style={{
                  padding: '8px 15px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredEmployees.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            background: 'white',
            borderRadius: '10px',
            color: '#666'
          }}>
            <h3>No employees found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
        
        <div style={{
          marginTop: '30px',
          textAlign: 'center',
          padding: '15px',
          background: 'linear-gradient(45deg, #17a2b8, #007bff)',
          color: 'white',
          borderRadius: '10px'
        }}>
          <h4>📈 Total Employees: {filteredEmployees.length}</h4>
        </div>
      </div>
    )
  }
}
