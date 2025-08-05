import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/products');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
