import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Calendar, Clock, CreditCard } from 'lucide-react';

const AppointmentPage: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1);
  
  // Mock departments and doctors
  const departments = [
    { id: 'medicine', name: 'মেডিসিন' },
    { id: 'cardiology', name: 'হৃদরোগ' },
    { id: 'gynecology', name: 'গাইনি' },
    { id: 'neurology', name: 'নিউরোলজি' },
    { id: 'orthopedics', name: 'অর্থোপেডিক্স' },
    { id: 'pediatrics', name: 'শিশু বিভাগ' },
  ];
  
  const doctors = {
    medicine: [
      { id: 'dr-rafiqul', name: 'ডা. রফিকুল ইসলাম' },
      { id: 'dr-shamsul', name: 'ডা. শামসুল আলম' },
    ],
    cardiology: [
      { id: 'dr-abdullah', name: 'ডা. আব্দুল্লাহ আল মামুন' },
      { id: 'dr-mahfuz', name: 'ডা. মাহফুজ রহমান' },
    ],
    gynecology: [
      { id: 'dr-nazmun', name: 'ডা. নাজমুন নাহার' },
      { id: 'dr-rabeya', name: 'ডা. রাবেয়া খাতুন' },
    ],
    neurology: [
      { id: 'dr-jahangir', name: 'ডা. জাহাঙ্গীর আলম' },
    ],
    orthopedics: [
      { id: 'dr-farid', name: 'ডা. ফরিদ উদ্দিন' },
    ],
    pediatrics: [
      { id: 'dr-farzana', name: 'ডা. ফারজানা আকতার' },
      { id: 'dr-asif', name: 'ডা. আসিফ ইকবাল' },
    ],
  };
  
  // Available time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  ];
  
  // Payment methods
  const paymentMethods = [
    { id: 'bkash', name: 'বিকাশ', image: 'https://i.ibb.co/qk4QdFM/bkash-logo.png' },
    { id: 'nagad', name: 'নগদ', image: 'https://i.ibb.co/S0cfz1D/nagad-logo.png' },
    { id: 'rocket', name: 'রকেট', image: 'https://i.ibb.co/C2sCKVn/rocket-logo.png' },
    { id: 'sslcommerz', name: 'কার্ড পেমেন্ট', image: 'https://i.ibb.co/j4BJb8F/sslcommerz-logo.png' },
    { id: 'cash', name: 'নগদ টাকা', image: 'https://i.ibb.co/rZ7jMjB/cash-logo.png' },
  ];
  
  const [selectedPayment, setSelectedPayment] = useState('');
  
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dept = e.target.value;
    setSelectedDepartment(dept);
    setSelectedDoctor('');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit appointment
      alert('আপনার অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে!');
    }
  };
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  useEffect(() => {
    document.title = 'অ্যাপয়েন্টমেন্ট বুক করুন - স্বাস্থ্যসেবা ক্লিনিক';
  }, []);
  
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">অ্যাপয়েন্টমেন্ট বুক করুন</h1>
          <p className="mt-2 text-gray-600">আমাদের বিশেষজ্ঞ ডাক্তারদের সাথে সহজেই অ্যাপয়েন্টমেন্ট নিন</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-green-600 text-white">
            <div className="flex justify-between items-center">
              <div className={`flex items-center ${step >= 1 ? 'text-white' : 'text-gray-300'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-white text-green-600' : 'bg-gray-400'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">ডাক্তার নির্বাচন</span>
              </div>
              <div className="flex-1 mx-4 h-1 bg-gray-300">
                <div className={`h-full bg-white transition-all ${step > 1 ? 'w-full' : 'w-0'}`}></div>
              </div>
              <div className={`flex items-center ${step >= 2 ? 'text-white' : 'text-gray-300'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-white text-green-600' : 'bg-gray-400'}`}>
                  2
                </div>
                <span className="ml-2 font-medium">সময় নির্ধারণ</span>
              </div>
              <div className="flex-1 mx-4 h-1 bg-gray-300">
                <div className={`h-full bg-white transition-all ${step > 2 ? 'w-full' : 'w-0'}`}></div>
              </div>
              <div className={`flex items-center ${step >= 3 ? 'text-white' : 'text-gray-300'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-white text-green-600' : 'bg-gray-400'}`}>
                  3
                </div>
                <span className="ml-2 font-medium">তথ্য ও পেমেন্ট</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">ডাক্তার নির্বাচন করুন</h2>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">বিভাগ</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    required
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">ডাক্তার</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    disabled={!selectedDepartment}
                    required
                  >
                    <option value="">ডাক্তার নির্বাচন করুন</option>
                    {selectedDepartment && doctors[selectedDepartment as keyof typeof doctors]?.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!selectedDepartment || !selectedDoctor}
                  >
                    পরবর্তী
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">সময় নির্ধারণ করুন</h2>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    <Calendar className="inline-block mr-2 h-5 w-5" />
                    তারিখ
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    <Clock className="inline-block mr-2 h-5 w-5" />
                    সময়
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`py-2 px-1 text-sm border rounded-md focus:outline-none transition-colors ${
                          selectedTime === time
                            ? 'bg-green-600 text-white border-green-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                  >
                    পূর্ববর্তী
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!selectedDate || !selectedTime}
                  >
                    পরবর্তী
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">আপনার তথ্য এবং পেমেন্ট</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">নাম</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="আপনার পূর্ণ নাম"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">মোবাইল নাম্বার</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="০১৭XXXXXXXX"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">ইমেইল</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">বয়স</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="আপনার বয়স"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">সমস্যার বিবরণ</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                    placeholder="আপনার স্বাস্থ্য সমস্যার সংক্ষিপ্ত বিবরণ"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    <CreditCard className="inline-block mr-2 h-5 w-5" />
                    পেমেন্ট পদ্ধতি
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {paymentMethods.map((method) => (
                      <div 
                        key={method.id}
                        className={`border rounded-md p-3 cursor-pointer transition-all ${
                          selectedPayment === method.id 
                            ? 'border-green-600 bg-green-50' 
                            : 'border-gray-300 hover:border-green-300'
                        }`}
                        onClick={() => setSelectedPayment(method.id)}
                      >
                        <div className="flex flex-col items-center">
                          <img src={method.image} alt={method.name} className="h-8 mb-2" />
                          <span className="text-sm text-center">{method.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 mb-6 rounded-md">
                  <h3 className="font-medium mb-2">অ্যাপয়েন্টমেন্ট সারাংশ</h3>
                  <div className="text-sm text-gray-700">
                    <p><span className="font-medium">বিভাগ:</span> {departments.find(d => d.id === selectedDepartment)?.name}</p>
                    <p><span className="font-medium">ডাক্তার:</span> {doctors[selectedDepartment as keyof typeof doctors]?.find(d => d.id === selectedDoctor)?.name}</p>
                    <p><span className="font-medium">তারিখ:</span> {selectedDate}</p>
                    <p><span className="font-medium">সময়:</span> {selectedTime}</p>
                    <p><span className="font-medium">ফি:</span> ৳ ৫০০</p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                  >
                    পূর্ববর্তী
                  </Button>
                  <Button 
                    type="submit"
                    disabled={!selectedPayment}
                  >
                    অ্যাপয়েন্টমেন্ট নিশ্চিত করুন
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;