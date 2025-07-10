import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy loaded pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const PatientPortal = React.lazy(() => import('./pages/PatientPortal'));
const DoctorPanel = React.lazy(() => import('./pages/DoctorPanel'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const PharmacyLab = React.lazy(() => import('./pages/PharmacyLab'));
const AppointmentPage = React.lazy(() => import('./pages/AppointmentPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const OTPVerificationPage = React.lazy(() => import('./pages/OTPVerificationPage'));

// --- NEWLY ADDED PAYMENT PAGES ---
const PaymentSuccessPage = React.lazy(() => import('./pages/PaymentSuccessPage'));
const PaymentFailPage = React.lazy(() => import('./pages/PaymentFailPage'));
const PaymentCancelPage = React.lazy(() => import('./pages/PaymentCancelPage'));


function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route 
                path="patient-portal" 
                element={
                  <ProtectedRoute requiredRole="patient">
                    <PatientPortal />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="doctor-panel" 
                element={
                  <ProtectedRoute requiredRole="doctor">
                    <DoctorPanel />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="admin-dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="pharmacy-lab" 
                element={
                  <ProtectedRoute>
                    <PharmacyLab />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="appointment" 
                element={
                  <ProtectedRoute>
                    <AppointmentPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="verify-otp" element={<OTPVerificationPage />} />

              {/* --- NEW ROUTES FOR PAYMENT STATUS --- */}
              <Route path="payment-success" element={<PaymentSuccessPage />} />
              <Route path="payment-fail" element={<PaymentFailPage />} />
              <Route path="payment-cancel" element={<PaymentCancelPage />} />

            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;