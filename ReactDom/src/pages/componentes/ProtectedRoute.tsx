import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from './interface';

interface ProtedRouteProps {
  user: User | null;
  children?: React.ReactNode;
  redirectTo?: string;
  isALLowed?: boolean | User;
}

export const ProtedRoute: React.FC<ProtedRouteProps> = ({ isALLowed, children, redirectTo = '/' }) => {
  if (!isALLowed) {
    return <Navigate to={redirectTo} />;
  }
  return <>{children ? children : <Outlet />}</>;
};
