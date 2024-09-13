import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from './interface';

interface ProtedRouteProps {
  user: User | null;
  children?: React.ReactNode;
  redirectTo?: string;
}

export const ProtedRoute: React.FC<ProtedRouteProps> = ({ user, children, redirectTo = '/' }) => {
  if (!user) {
    return <Navigate to={redirectTo} />;
  }
  return <>{children ? children : <Outlet />}</>;
};
