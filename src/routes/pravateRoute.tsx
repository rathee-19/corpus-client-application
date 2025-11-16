// src/routes/pravateRoute.tsx
import type { FC } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute: FC = ({ children }: any) => {
  const { logged } = useSelector((state: any) => state.user);
  const location = useLocation();

  // If authenticated, render children (the protected route)
  if (logged) return children ?? null;

  // Not authenticated: redirect to login and preserve return location in state
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
