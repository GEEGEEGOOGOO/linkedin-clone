// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

/*
  ProtectedRoute: wraps any route element that requires authentication.
  Checks for token first (preferred). Falls back to presence of `user` in localStorage.
*/
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token && !user) {
    // not authenticated -> redirect to login
    return <Navigate to="/login" replace />;
  }
  return children;
}
