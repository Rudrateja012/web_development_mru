import React, { Component } from 'react'

export default class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [
        { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, stock: 15, image: '💻', description: 'High-performance laptop for professionals' },
        { id: 2, name: 'Smartphone X', category: 'Electronics', price: 899, stock: 25, image: '📱', description: 'Latest smartphone with advanced features' },
        { id: 3, name: 'Office Chair', category: 'Furniture', price: 299, stock: 8, image: '🪑', description: 'Ergonomic office chair for comfort' },
        { id: 4, name: 'Coffee Maker', category: 'Appliances', price: 149, stock: 12, image: '☕', description: 'Premium coffee maker for home/office' },
        { id: 5, name: 'Wireless Headphones', category: 'Electronics', price: 199, stock: 30, image: '🎧', description: 'Noise-canceling wireless headphones' },
        { id: 6, name: 'Standing Desk', category: 'Furniture', price: 499, stock: 5, image: '🗂️', description: 'Adjustable standing desk for health' },
        { id: 7, name: 'Tablet', category: 'Electronics', price: 549, stock: 18, image: '📱', description: 'Lightweight tablet for productivity' },
        { id: 8, name: 'Air Purifier', category: 'Appliances', price: 249, stock: 10, image: '🌪️', description: 'HEPA air purifier for clean air' }
      ],
      cart: [],
      filter: 'All',
      searchTerm: ''
    }
  }

  addToCart = (product) => {
    const existingItem = this.state.cart.find(item => item.id === product.id)
    
    if (existingItem) {
      this.setState({
        cart: this.state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      })
    } else {
      this.setState({
        cart: [...this.state.cart, { ...product, quantity: 1 }]
      })
    }
  }

  removeFromCart = (productId) => {
    this.setState({
      cart: this.state.cart.filter(item => item.id !== productId)
    })
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value })
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  getFilteredProducts = () => {
    let { products, filter, searchTerm } = this.state
    
    // Filter by category
    if (filter !== 'All') {
      products = products.filter(product => product.category === filter)
    }
    
    // Filter by search term
    if (searchTerm) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return products
  }

  getTotalCartValue = () => {
    return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  render() {
    const filteredProducts = this.getFilteredProducts()
    const categories = ['All', ...new Set(this.state.products.map(p => p.category))]
    
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#dc3545', marginBottom: '30px' }}>
          🛍️ Product Catalog
        </h2>
        
        {/* Search and Filter Controls */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '30px',
          padding: '20px',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              🔍 Search Products:
            </label>
            <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleSearchChange}
              placeholder="Search products..."
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
              📂 Category:
            </label>
            <select
              value={this.state.filter}
              onChange={this.handleFilterChange}
              style={{
                padding: '10px',
                border: '2px solid #e0e0e0',
                borderRadius: '5px',
                fontSize: '16px',
                background: 'white'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div style={{
            background: 'linear-gradient(45deg, #dc3545, #fd7e14)',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '10px',
            alignSelf: 'flex-end'
          }}>
            🛒 Cart: {this.state.cart.length} items | ${this.getTotalCartValue()}
          </div>
        </div>
        
        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
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
              <div style={{
                fontSize: '60px',
                textAlign: 'center',
                marginBottom: '15px'
              }}>
                {product.image}
              </div>
              
              <h3 style={{ color: '#333', marginBottom: '10px', textAlign: 'center' }}>
                {product.name}
              </h3>
              
              <div style={{ marginBottom: '10px' }}>
                <span style={{
                  background: '#007bff',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '15px',
                  fontSize: '12px'
                }}>
                  {product.category}
                </span>
              </div>
              
              <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>
                {product.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
                  ${product.price}
                </span>
                <span style={{ color: product.stock > 10 ? '#28a745' : '#ffc107' }}>
                  Stock: {product.stock}
                </span>
              </div>
              
              <button
                onClick={() => this.addToCart(product)}
                disabled={product.stock === 0}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: product.stock === 0 ? '#ccc' : 'linear-gradient(45deg, #dc3545, #fd7e14)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => {
                  if (product.stock > 0) e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
        
        {/* Shopping Cart */}
        {this.state.cart.length > 0 && (
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#dc3545', marginBottom: '20px' }}>🛒 Shopping Cart</h3>
            
            {this.state.cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '5px',
                marginBottom: '10px'
              }}>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                  <span style={{ color: '#666', marginLeft: '10px' }}>
                    Qty: {item.quantity} × ${item.price}
                  </span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '15px' }}>
                    ${item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => this.removeFromCart(item.id)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div style={{
              textAlign: 'right',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#dc3545',
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '2px solid #dc3545'
            }}>
              Total: ${this.getTotalCartValue()}
            </div>
          </div>
        )}
        
        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            background: 'white',
            borderRadius: '10px',
            color: '#666'
          }}>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    )
  }
}
