import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../contexts/AuthProvider';

export default function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}