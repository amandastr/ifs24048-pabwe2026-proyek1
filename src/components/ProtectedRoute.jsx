import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { isTokenExpired } from '../utils/jwt.js';

export default function ProtectedRoute() {
  const { token } = useAuth();
  const location = useLocation();
  const authenticated = Boolean(token) && !isTokenExpired(token);
  return authenticated ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
}
