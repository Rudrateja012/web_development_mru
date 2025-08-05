import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find(u => u.email === email);
    if (exists) {
      alert('Email already exists');
    } else {
      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      navigate('/login');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br/>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;
