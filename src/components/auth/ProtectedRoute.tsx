import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'patient' | 'doctor' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role if required
  if (requiredRole) {
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