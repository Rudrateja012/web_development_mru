import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

  const handleAdd = () => {
    const products = JSON.parse(localStorage.getItem(`products_${user.email}`)) || [];
    const newProduct = {
      id: Date.now(),
      title,
      price,
      image,
      description: ''
    };
    products.push(newProduct);
    localStorage.setItem(`products_${user.email}`, JSON.stringify(products));
    navigate('/products');
  };

  return (
    <div>
      <header>
        <h1>Product Manager System</h1>
      </header>
      <h2>Add Product</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br/>
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} /><br/>
      <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} /><br/>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddProduct;
