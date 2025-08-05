import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem(`products_${user.email}`)) || [];
    const product = products.find(p => p.id.toString() === id);
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setImage(product.image);
    }
  }, [id, user.email]);

  const handleUpdate = () => {
    const products = JSON.parse(localStorage.getItem(`products_${user.email}`)) || [];
    const updated = products.map(p => p.id.toString() === id ? { ...p, title, price, image } : p);
    localStorage.setItem(`products_${user.email}`, JSON.stringify(updated));
    navigate('/products');
  };

  return (
    <div>
      <header>
        <h1>Product Manager System</h1>
      </header>
      <h2>Edit Product</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br/>
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} /><br/>
      <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} /><br/>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditProduct;
