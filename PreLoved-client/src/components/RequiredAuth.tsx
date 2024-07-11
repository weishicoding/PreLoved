import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequiredAuth: React.FC = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequiredAuth;
