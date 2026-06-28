import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector(s => s.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}