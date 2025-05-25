import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { UserPlus, User, Mail, Phone, Lock } from 'lucide-react';

const RegisterPage: React.FC = () => {
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
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert('পাসওয়ার্ড মিলছে না!');
      return;
    }
    
    // Handle registration logic
    console.log(formData);
    alert('রেজিস্ট্রেশন সফল হয়েছে!');
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
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  আমি সকল <a href="#" className="text-green-600 hover:text-green-700">শর্তাবলী</a> এবং <a href="#" className="text-green-600 hover:text-green-700">প্রাইভেসি পলিসি</a> মেনে নিচ্ছি।
                </label>
              </div>
              
              <Button 
                type="submit" 
                fullWidth 
                icon={<UserPlus className="h-5 w-5" />}
              >
                রেজিস্ট্রেশন করুন
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