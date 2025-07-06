import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'patient' | 'doctor' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required, check user role
  if (requiredRole) {
    // You can implement role checking logic here
    // For now, we'll just check if user exists
    // In a real app, you'd check user metadata or a separate roles table
    const userRole = user.user_metadata?.role || 'patient';
    
    if (userRole !== requiredRole) {
      // Redirect to appropriate dashboard based on user role
      switch (userRole) {
        case 'doctor':
          return <Navigate to="/doctor-panel" replace />;
        case 'admin':
          return <Navigate to="/admin-dashboard" replace />;
        default:
          return <Navigate to="/patient-portal" replace />;
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 