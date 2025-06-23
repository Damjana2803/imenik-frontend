import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Guest({ children }) {
  const accessToken = localStorage.getItem('token');

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default Guest;
