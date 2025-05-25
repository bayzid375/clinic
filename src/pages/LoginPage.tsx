import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { LogIn, User, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, userType });
    alert('লগইন সফল হয়েছে!');
  };
  
  useEffect(() => {
    document.title = 'লগইন - স্বাস্থ্যসেবা ক্লিনিক';
  }, []);
  
  return (
    <div className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="text-center pb-6">
            <h1 className="text-2xl font-bold text-gray-900">লগইন করুন</h1>
            <p className="text-gray-600 mt-1">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
          </CardHeader>
          
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-gray-200 p-1 rounded-md">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    userType === 'patient' ? 'bg-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setUserType('patient')}
                >
                  রোগী
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    userType === 'doctor' ? 'bg-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setUserType('doctor')}
                >
                  ডাক্তার
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    userType === 'admin' ? 'bg-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setUserType('admin')}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
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
                icon={<LogIn className="h-5 w-5" />}
              >
                লগইন করুন
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