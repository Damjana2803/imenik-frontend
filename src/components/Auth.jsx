import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Auth({ children }) {
  const accessToken = localStorage.getItem('token');

  if (!accessToken) {
    return <Navigate to="/prijava" replace />;
  }

  return <Outlet />;
}

export default Auth;
