import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  console.log('authToken', authToken);

  return authToken ? children : <Navigate to="/admin-sigin" />;
};


export default ProtectedRoute;