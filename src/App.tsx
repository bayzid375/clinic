import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy loaded pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const PatientPortal = React.lazy(() => import('./pages/PatientPortal'));
const DoctorPanel = React.lazy(() => import('./pages/DoctorPanel'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const PharmacyLab = React.lazy(() => import('./pages/PharmacyLab'));
const AppointmentPage = React.lazy(() => import('./pages/AppointmentPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="patient-portal" element={<PatientPortal />} />
            <Route path="doctor-panel" element={<DoctorPanel />} />
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="pharmacy-lab" element={<PharmacyLab />} />
            <Route path="appointment" element={<AppointmentPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;