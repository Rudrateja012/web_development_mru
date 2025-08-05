import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
