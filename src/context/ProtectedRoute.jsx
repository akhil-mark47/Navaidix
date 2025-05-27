import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser } = useAuth();

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to={adminOnly ? "/admin/login" : "/signin"} replace />;
  }

  // If admin route but user is not admin, redirect to user dashboard
  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // User is authorized, render children
  return children;
};

export default ProtectedRoute;