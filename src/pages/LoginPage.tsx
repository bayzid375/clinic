import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { LogIn, User, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  // Redirect if user is already logged in (only after loading is complete)
  useEffect(() => {
    if (!loading && user) {
      const returnTo = location.state?.from?.pathname || '/patient-portal';
      navigate(returnTo, { replace: true });
    }
  }, [user, loading, navigate, location.state]);

  // Show success message if redirected from OTP verification
  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      // Clear the state to prevent showing message on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setError('ইমেইল এবং পাসওয়ার্ড প্রয়োজন');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('ভুল ইমেইল বা পাসওয়ার্ড');
        } else if (error.message.includes('Email not confirmed')) {
          setError('আপনার ইমেইল নিশ্চিত করা হয়নি। অনুগ্রহ করে আপনার ইমেইল চেক করুন।');
        } else {
          setError('লগইনে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        }
      }
      // Success case is handled by the useEffect above
    } catch (err) {
      setError('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    document.title = 'লগইন - স্বাস্থ্যসেবা ক্লিনিক';
  }, []);

  // Show loading spinner only while checking authentication (not during form submission)
  if (loading) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">যাচাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="text-center pb-6">
            <h1 className="text-2xl font-bold text-gray-900">লগইন করুন</h1>
            <p className="text-gray-600 mt-1">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}
            
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-gray-200 p-1 rounded-md">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    userType === 'patient' ? 'bg-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setUserType('patient')}
                  disabled={isSubmitting}
                >
                  রোগী
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    userType === 'doctor' ? 'bg-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setUserType('doctor')}
                  disabled={isSubmitting}
                >
                  ডাক্তার
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    userType === 'admin' ? 'bg-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setUserType('admin')}
                  disabled={isSubmitting}
                >
                  অ্যাডমিন
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  <User className="inline-block mr-1 h-4 w-4" />
                  ইমেইল
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="আপনার ইমেইল ঠিকানা"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={isSubmitting}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  <Lock className="inline-block mr-1 h-4 w-4" />
                  পাসওয়ার্ড
                </label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="আপনার পাসওয়ার্ড"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={isSubmitting}
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    মনে রাখুন
                  </label>
                </div>
                
                <a href="#" className="text-sm text-green-600 hover:text-green-700">
                  পাসওয়ার্ড ভুলে গেছেন?
                </a>
              </div>
              
              <Button 
                type="submit" 
                fullWidth 
                disabled={isSubmitting}
                icon={isSubmitting ? undefined : <LogIn className="h-5 w-5" />}
              >
                {isSubmitting ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="text-center border-t">
            <p className="text-gray-700">
              অ্যাকাউন্ট নেই? 
              <Link to="/register" className="ml-1 text-green-600 hover:text-green-700 font-medium">
                রেজিস্ট্রেশন করুন
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;