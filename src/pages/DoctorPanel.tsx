import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Calendar, Users, Clock, ClipboardList, User, FileText, PlusCircle, Search } from 'lucide-react';

const DoctorPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    document.title = 'ডাক্তার প্যানেল - স্বাস্থ্যসেবা ক্লিনিক';
  }, []);
  
  // Mock data
  const upcomingAppointments = [
    {
      id: 1,
      patient: 'রহমান মিয়া',
      age: 45,
      problem: 'উচ্চ রক্তচাপ',
      date: '১৫ মে, ২০২৫',
      time: '১০:৩০ AM',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: 'আফসানা বেগম',
      age: 32,
      problem: 'মাথা ব্যথা',
      date: '১৫ মে, ২০২৫',
      time: '১১:০০ AM',
      status: 'confirmed'
    },
    {
      id: 3,
      patient: 'কামাল হোসেন',
      age: 28,
      problem: 'সর্দি-কাশি',
      date: '১৫ মে, ২০২৫',
      time: '১১:৩০ AM',
      status: 'confirmed'
    }
  ];
  
  const patients = [
    {
      id: 1,
      name: 'রহমান মিয়া',
      age: 45,
      gender: 'পুরুষ',
      phone: '০১৭১২৩৪৫৬৭৮',
      lastVisit: '০১ এপ্রিল, ২০২৫',
    },
    {
      id: 2,
      name: 'আফসানা বেগম',
      age: 32,
      gender: 'মহিলা',
      phone: '০১৮১২৩৪৫৬৭৮',
      lastVisit: '২০ মার্চ, ২০২৫',
    },
    {
      id: 3,
      name: 'কামাল হোসেন',
      age: 28,
      gender: 'পুরুষ',
      phone: '০১৯১২৩৪৫৬৭৮',
      lastVisit: '১০ মার্চ, ২০২৫',
    },
    {
      id: 4,
      name: 'নাজমা আক্তার',
      age: 35,
      gender: 'মহিলা',
      phone: '০১৬১২৩৪৫৬৭৮',
      lastVisit: '০৫ মার্চ, ২০২৫',
    },
    {
      id: 5,
      name: 'ফারুক আহমেদ',
      age: 50,
      gender: 'পুরুষ',
      phone: '০১৫১২৩৪৫৬৭৮',
      lastVisit: '২৫ ফেব্রুয়ারি, ২০২৫',
    }
  ];
  
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-green-700 text-white p-6 rounded-t-lg">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-green-700 text-2xl font-bold mr-4">
              RI
            </div>
            <div>
              <h1 className="text-2xl font-bold">ডা. রফিকুল ইসলাম</h1>
              <p className="opacity-90">মেডিসিন বিশেষজ্ঞ</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-b-lg mb-8">
          <div className="flex border-b overflow-x-auto">
            <button 
              className={`px-4 py-3 font-medium text-sm flex items-center ${
                activeTab === 'dashboard' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Calendar className="mr-1 h-4 w-4" />
              ড্যাশবোর্ড
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm flex items-center ${
                activeTab === 'appointments' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('appointments')}
            >
              <Clock className="mr-1 h-4 w-4" />
              অ্যাপয়েন্টমেন্ট
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm flex items-center ${
                activeTab === 'patients' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('patients')}
            >
              <Users className="mr-1 h-4 w-4" />
              রোগী
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm flex items-center ${
                activeTab === 'prescriptions' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('prescriptions')}
            >
              <FileText className="mr-1 h-4 w-4" />
              প্রেসক্রিপশন
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm flex items-center ${
                activeTab === 'schedule' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('schedule')}
            >
              <ClipboardList className="mr-1 h-4 w-4" />
              সময়সূচি
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-green-50 border border-green-100">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full mr-3">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">আজকের অ্যাপয়েন্টমেন্ট</p>
                          <p className="text-2xl font-bold">৮</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-50 border border-blue-100">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full mr-3">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">মোট রোগী</p>
                          <p className="text-2xl font-bold">১২৫</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-purple-50 border border-purple-100">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full mr-3">
                          <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">প্রেসক্রিপশন</p>
                          <p className="text-2xl font-bold">৯৫</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-yellow-50 border border-yellow-100">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-full mr-3">
                          <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">পরবর্তী অ্যাপয়েন্টমেন্ট</p>
                          <p className="text-2xl font-bold">১০:৩০ AM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">আজকের অ্যাপয়েন্টমেন্ট</h2>
                  </div>
                  
                  <div className="bg-white rounded-lg border overflow-hidden">
                    {upcomingAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="p-4 border-b last:border-b-0 flex flex-col md:flex-row md:justify-between md:items-center"
                      >
                        <div className="mb-3 md:mb-0">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-sm font-bold mr-3">
                              {appointment.patient.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{appointment.patient}</p>
                              <div className="flex text-sm text-gray-600">
                                <span>{appointment.age} বছর</span>
                                <span className="mx-1">•</span>
                                <span>{appointment.problem}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm md:mx-4">
                          <Clock className="h-4 w-4 text-gray-500 mr-1" />
                          <span>{appointment.time}</span>
                        </div>
                        
                        <div className="flex items-center mt-3 md:mt-0">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mr-2"
                          >
                            বিস্তারিত
                          </Button>
                          <Button 
                            variant="primary" 
                            size="sm"
                          >
                            প্রেসক্রিপশন লিখুন
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">সাম্প্রতিক রোগী</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      icon={<Search className="h-4 w-4" />}
                    >
                      রোগী খুঁজুন
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            রোগী
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            শেষ ভিজিট
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            অ্যাকশন
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {patients.slice(0, 3).map((patient) => (
                          <tr key={patient.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-sm font-bold mr-3">
                                  {patient.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{patient.name}</div>
                                  <div className="text-gray-500 text-sm">
                                    {patient.age} বছর, {patient.gender}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                              {patient.lastVisit}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <Button 
                                variant="outline" 
                                size="sm"
                              >
                                প্রোফাইল দেখুন
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'patients' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">আপনার রোগী</h2>
                  <div className="flex">
                    <div className="relative mr-2">
                      <input 
                        type="text" 
                        placeholder="রোগীর নাম খুঁজুন"
                        className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      icon={<PlusCircle className="h-4 w-4" />}
                    >
                      নতুন রোগী
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          রোগী
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          যোগাযোগ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          শেষ ভিজিট
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          অ্যাকশন
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {patients.map((patient) => (
                        <tr key={patient.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-sm font-bold mr-3">
                                {patient.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{patient.name}</div>
                                <div className="text-gray-500 text-sm">
                                  {patient.age} বছর, {patient.gender}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-700">{patient.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {patient.lastVisit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              প্রোফাইল
                            </Button>
                            <Button 
                              variant="primary" 
                              size="sm"
                            >
                              প্রেসক্রিপশন
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
                    <nav className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-700">
                          মোট <span className="font-medium">১২৫</span> রোগীর মধ্যে <span className="font-medium">১-৫</span> দেখাচ্ছে
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                          পূর্ববর্তী
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                          পরবর্তী
                        </button>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'prescriptions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">প্রেসক্রিপশন</h2>
                  <Button 
                    variant="primary" 
                    size="sm"
                    icon={<PlusCircle className="h-4 w-4" />}
                  >
                    নতুন প্রেসক্রিপশন
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg border mb-6">
                  <h3 className="text-lg font-semibold mb-4">প্রেসক্রিপশন লিখুন</h3>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">রোগী নির্বাচন করুন</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                          <option value="">রোগী নির্বাচন করুন</option>
                          {patients.map(patient => (
                            <option key={patient.id} value={patient.id}>{patient.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">রোগ নির্ণয়</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="রোগের নাম"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">ওষুধ</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="text" 
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="ওষুধের নাম"
                          />
                          <input 
                            type="text" 
                            className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="ডোজ"
                          />
                          <input 
                            type="text" 
                            className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="সময়কাল"
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <button type="button" className="mt-2 text-sm text-green-600 hover:text-green-700">
                        + আরও ওষুধ যোগ করুন
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">টেস্ট/পরীক্ষা</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="text" 
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="টেস্টের নাম"
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <button type="button" className="mt-2 text-sm text-green-600 hover:text-green-700">
                        + আরও টেস্ট যোগ করুন
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">নির্দেশনা</label>
                      <textarea 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows={3}
                        placeholder="রোগীর জন্য নির্দেশনা"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">পরবর্তী অ্যাপয়েন্টমেন্ট</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" type="button">বাতিল করুন</Button>
                      <Button variant="primary" type="submit">প্রেসক্রিপশন সংরক্ষণ করুন</Button>
                    </div>
                  </form>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">সাম্প্রতিক প্রেসক্রিপশন</h3>
                  
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            রোগী
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            রোগ নির্ণয়
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            তারিখ
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            অ্যাকশন
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-sm font-bold mr-3">
                                র
                              </div>
                              <div className="font-medium text-gray-900">রহমান মিয়া</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            উচ্চ রক্তচাপ
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            ০১ এপ্রিল, ২০২৫
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              দেখুন
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="ml-2"
                            >
                              প্রিন্ট
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-sm font-bold mr-3">
                                আ
                              </div>
                              <div className="font-medium text-gray-900">আফসানা বেগম</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            মাইগ্রেন
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            ২০ মার্চ, ২০২৫
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              দেখুন
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="ml-2"
                            >
                              প্রিন্ট
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'schedule' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">আপনার সময়সূচি</h2>
                  <Button 
                    variant="primary" 
                    size="sm"
                    icon={<PlusCircle className="h-4 w-4" />}
                  >
                    সময়সূচি আপডেট করুন
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg border mb-6">
                  <h3 className="text-lg font-semibold mb-4">বর্তমান সময়সূচি</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">রবিবার - বৃহস্পতিবার</h4>
                      <p className="text-gray-700">সকাল ১০:০০ - দুপুর ০২:০০</p>
                      <div className="mt-2 text-sm text-gray-600">স্বাস্থ্যসেবা ক্লিনিক, মিরপুর</div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">শনিবার</h4>
                      <p className="text-gray-700">বিকাল ০৪:০০ - রাত ০৮:০০</p>
                      <div className="mt-2 text-sm text-gray-600">স্বাস্থ্যসেবা ক্লিনিক, মিরপুর</div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">ছুটির দিন</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>প্রতি শুক্রবার</li>
                      <li>সরকারি ছুটির দিন</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">সময়সূচি আপডেট করুন</h3>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">দিন</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                          <option value="">দিন নির্বাচন করুন</option>
                          <option value="sunday">রবিবার</option>
                          <option value="monday">সোমবার</option>
                          <option value="tuesday">মঙ্গলবার</option>
                          <option value="wednesday">বুধবার</option>
                          <option value="thursday">বৃহস্পতিবার</option>
                          <option value="friday">শুক্রবার</option>
                          <option value="saturday">শনিবার</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">শিফট</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                          <option value="">শিফট নির্বাচন করুন</option>
                          <option value="morning">সকাল (১০:০০ - ০২:০০)</option>
                          <option value="evening">বিকাল (০৪:০০ - ০৮:০০)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">শুরুর সময়</label>
                        <input 
                          type="time" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">শেষের সময়</label>
                        <input 
                          type="time" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">ছুটির দিন</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'].map((day) => (
                          <label key={day} className="inline-flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                            <span className="ml-2 text-gray-700">{day}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" type="button">বাতিল করুন</Button>
                      <Button variant="primary" type="submit">সময়সূচি আপডেট করুন</Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPanel;