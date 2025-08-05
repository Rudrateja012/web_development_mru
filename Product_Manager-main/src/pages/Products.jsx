import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`products_${user.email}`));
    if (stored) {
      setProducts(stored);
    } else {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
          localStorage.setItem(`products_${user.email}`, JSON.stringify(data));
          setProducts(data);
        });
    }
  }, [user.email]);

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem(`products_${user.email}`, JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div>
      <header>
        <h1>Product Manager System</h1>
      </header>
      <h2>Welcome {user.name}</h2>
      <button onClick={logout}>Logout</button>
      <Link to="/add"><button>Add Product</button></Link>
      {products.length === 0 ? <p>No products</p> : (
        <ul>
          {products.map(p => (
            <li key={p.id}>
              <img src={p.image} width="40" />
              <p>{p.title}</p>
              <p>₹{p.price}</p>
              <Link to={`/edit/${p.id}`}><button>Edit</button></Link>
              <button onClick={() => deleteProduct(p.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
