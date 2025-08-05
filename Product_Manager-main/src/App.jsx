import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
      <Route path="/add" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
      <Route path="/edit/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
