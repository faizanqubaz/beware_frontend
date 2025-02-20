import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const authToken = localStorage.getItem('authToken'); // Check for the token
  console.log('authToken',authToken)

  return authToken ? <Outlet /> : <Navigate to="/admin-sigin" />;
};

export default ProtectedRoute;