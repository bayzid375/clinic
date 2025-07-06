import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { UserPlus, User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('নাম প্রয়োজন');
      return false;
    }
    
    if (!formData.email.trim()) {
      setError('ইমেইল প্রয়োজন');
      return false;
    }
    
    if (!formData.phone.trim()) {
      setError('মোবাইল নাম্বার প্রয়োজন');
      return false;
    }
    
    if (!formData.gender) {
      setError('জেন্ডার নির্বাচন করুন');
      return false;
    }
    
    if (!formData.age || parseInt(formData.age) < 1) {
      setError('সঠিক বয়স দিন');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('পাসওয়ার্ড মিলছে না!');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { error, data } = await signUp(formData.email, formData.password, {
        name: formData.name,
        phone: formData.phone,
        gender: formData.gender,
        age: formData.age,
      });
      
      if (error) {
        if (error.message.includes('already registered')) {
          setError('এই ইমেইল দিয়ে ইতিমধ্যে রেজিস্ট্রেশন করা হয়েছে');
        } else if (error.message.includes('Invalid email')) {
          setError('সঠিক ইমেইল ঠিকানা দিন');
        } else {
          setError('রেজিস্ট্রেশনে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        }
      } else {
        // Navigate to OTP verification page
        navigate('/verify-otp', { 
          state: { email: formData.email } 
        });
      }
    } catch (err) {
      setError('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    document.title = 'রেজিস্ট্রেশন - স্বাস্থ্যসেবা ক্লিনিক';
  }, []);
  
  return (
    <div className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg px-4">
        <Card>
          <CardHeader className="text-center pb-6">
            <h1 className="text-2xl font-bold text-gray-900">রেজিস্ট্রেশন করুন</h1>
            <p className="text-gray-600 mt-1">আপনার নতুন অ্যাকাউন্ট তৈরি করুন</p>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    <User className="inline-block mr-1 h-4 w-4" />
                    পূর্ণ নাম
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="আপনার পূর্ণ নাম"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    <Mail className="inline-block mr-1 h-4 w-4" />
                    ইমেইল
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="আপনার ইমেইল ঠিকানা"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    <Phone className="inline-block mr-1 h-4 w-4" />
                    মোবাইল নাম্বার
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="০১৭XXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    জেন্ডার
                  </label>
                  <select 
                    name="gender"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">নির্বাচন করুন</option>
                    <option value="male">পুরুষ</option>
                    <option value="female">মহিলা</option>
                    <option value="other">অন্যান্য</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    বয়স
                  </label>
                  <input 
                    type="number" 
                    name="age"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="আপনার বয়স"
                    value={formData.age}
                    onChange={handleChange}
                    disabled={loading}
                    min="1"
                    max="120"
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
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="পাসওয়ার্ড দিন"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    minLength={6}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    <Lock className="inline-block mr-1 h-4 w-4" />
                    পাসওয়ার্ড নিশ্চিত করুন
                  </label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="পাসওয়ার্ড আবার দিন"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    minLength={6}
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  disabled={loading}
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  আমি সকল <a href="#" className="text-green-600 hover:text-green-700">শর্তাবলী</a> এবং <a href="#" className="text-green-600 hover:text-green-700">প্রাইভেসি পলিসি</a> মেনে নিচ্ছি।
                </label>
              </div>
              
              <Button 
                type="submit" 
                fullWidth 
                disabled={loading}
                icon={loading ? undefined : <UserPlus className="h-5 w-5" />}
              >
                {loading ? 'রেজিস্ট্রেশন হচ্ছে...' : 'রেজিস্ট্রেশন করুন'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="text-center border-t">
            <p className="text-gray-700">
              ইতিমধ্যে অ্যাকাউন্ট আছে? 
              <Link to="/login" className="ml-1 text-green-600 hover:text-green-700 font-medium">
                লগইন করুন
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;