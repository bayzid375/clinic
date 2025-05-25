import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Users, Calendar, PieChart, User, Activity, CreditCard, FileText, 
  TrendingUp, Download, PlusCircle, Search, ArrowUp, ArrowDown 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    document.title = 'অ্যাডমিন ড্যাশবোর্ড - স্বাস্থ্যসেবা ক্লিনিক';
  }, []);
  
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-green-700 text-white p-6 rounded-t-lg">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-green-700 text-2xl font-bold mr-4">
              BM
            </div>
            <div>
              <h1 className="text-2xl font-bold">বায়জিদ মিয়া</h1>
              <p className="opacity-90">অ্যাডমিন (মালিক)</p>
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
              <Activity className="mr-1 h-4 w-4" />
              ড্যাশবোর্ড
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
                activeTab === 'doctors' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('doctors')}
            >
              <User className="mr-1 h-4 w-4" />
              ডাক্তার
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm flex items-center ${
                activeTab === 'appointments' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('appointments')}
            >
              <Calendar className="mr-1 h-4 w-4" />
              অ্যাপয়েন্টমেন্ট
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm flex items-center ${
                activeTab === 'revenue' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('revenue')}
            >
              <CreditCard className="mr-1 h-4 w-4" />
              রাজস্ব
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm flex items-center ${
                activeTab === 'reports' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              <FileText className="mr-1 h-4 w-4" />
              রিপোর্ট
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-blue-50 border border-blue-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-3 bg-blue-100 rounded-full mr-3">
                            <Users className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">মোট রোগী</p>
                            <p className="text-2xl font-bold">১,২৫৬</p>
                          </div>
                        </div>
                        <div className="text-green-600 flex items-center">
                          <ArrowUp className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">১২%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-green-50 border border-green-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-3 bg-green-100 rounded-full mr-3">
                            <Calendar className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">অ্যাপয়েন্টমেন্ট</p>
                            <p className="text-2xl font-bold">৮৫</p>
                          </div>
                        </div>
                        <div className="text-green-600 flex items-center">
                          <ArrowUp className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">৮%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-purple-50 border border-purple-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-3 bg-purple-100 rounded-full mr-3">
                            <User className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">ডাক্তার</p>
                            <p className="text-2xl font-bold">১৫</p>
                          </div>
                        </div>
                        <div className="text-green-600 flex items-center">
                          <ArrowUp className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">৪%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-yellow-50 border border-yellow-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-3 bg-yellow-100 rounded-full mr-3">
                            <CreditCard className="h-6 w-6 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">আয়</p>
                            <p className="text-2xl font-bold">৳ ৫৮,৩৫০</p>
                          </div>
                        </div>
                        <div className="text-red-600 flex items-center">
                          <ArrowDown className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">৩%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">ডাক্তার পারফরম্যান্স</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-sm font-bold mr-3">
                              RI
                            </div>
                            <div>
                              <p className="font-medium">ডা. রফিকুল ইসলাম</p>
                              <p className="text-sm text-gray-600">মেডিসিন বিশেষজ্ঞ</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">৩৮ জন</p>
                            <p className="text-sm text-gray-600">সাপ্তাহিক রোগী</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 text-sm font-bold mr-3">
                              NN
                            </div>
                            <div>
                              <p className="font-medium">ডা. নাজমুন নাহার</p>
                              <p className="text-sm text-gray-600">গাইনি বিশেষজ্ঞ</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">৩৫ জন</p>
                            <p className="text-sm text-gray-600">সাপ্তাহিক রোগী</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-bold mr-3">
                              AM
                            </div>
                            <div>
                              <p className="font-medium">ডা. আব্দুল্লাহ আল মামুন</p>
                              <p className="text-sm text-gray-600">হৃদরোগ বিশেষজ্ঞ</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">৩০ জন</p>
                            <p className="text-sm text-gray-600">সাপ্তাহিক রোগী</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center text-red-700 text-sm font-bold mr-3">
                              FA
                            </div>
                            <div>
                              <p className="font-medium">ডা. ফারজানা আকতার</p>
                              <p className="text-sm text-gray-600">শিশু রোগ বিশেষজ্ঞ</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">২৮ জন</p>
                            <p className="text-sm text-gray-600">সাপ্তাহিক রোগী</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">আজকের অ্যাপয়েন্টমেন্ট</h3>
                        <Button 
                          variant="outline" 
                          size="sm"
                          icon={<Calendar className="h-4 w-4" />}
                        >
                          সকল দেখুন
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-sm font-bold mr-3">
                              র
                            </div>
                            <div>
                              <p className="font-medium">রহমান মিয়া</p>
                              <div className="flex text-sm text-gray-600">
                                <span>ডা. রফিকুল ইসলাম</span>
                                <span className="mx-1">•</span>
                                <span>১০:৩০ AM</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              নিশ্চিত
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-sm font-bold mr-3">
                              আ
                            </div>
                            <div>
                              <p className="font-medium">আফসানা বেগম</p>
                              <div className="flex text-sm text-gray-600">
                                <span>ডা. নাজমুন নাহার</span>
                                <span className="mx-1">•</span>
                                <span>১১:০০ AM</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              নিশ্চিত
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-sm font-bold mr-3">
                              ক
                            </div>
                            <div>
                              <p className="font-medium">কামাল হোসেন</p>
                              <div className="flex text-sm text-gray-600">
                                <span>ডা. রফিকুল ইসলাম</span>
                                <span className="mx-1">•</span>
                                <span>১১:৩০ AM</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              নিশ্চিত
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-sm font-bold mr-3">
                              ন
                            </div>
                            <div>
                              <p className="font-medium">নাজমা আক্তার</p>
                              <div className="flex text-sm text-gray-600">
                                <span>ডা. ফারজানা আকতার</span>
                                <span className="mx-1">•</span>
                                <span>১২:০০ PM</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              অপেক্ষমান
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">রাজস্ব সারাংশ</h3>
                        <div className="flex space-x-2">
                          <select className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option>সাপ্তাহিক</option>
                            <option>মাসিক</option>
                            <option>বাৎসরিক</option>
                          </select>
                          <Button 
                            variant="outline" 
                            size="sm"
                            icon={<Download className="h-4 w-4" />}
                          >
                            ডাউনলোড
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                          <p className="text-sm text-gray-600 mb-1">মোট আয়</p>
                          <p className="text-2xl font-bold">৳ ৫৮,৩৫০</p>
                          <div className="text-green-600 flex items-center text-sm mt-2">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            <span>৮% এই সপ্তাহে</span>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-sm text-gray-600 mb-1">অ্যাপয়েন্টমেন্ট থেকে</p>
                          <p className="text-2xl font-bold">৳ ৪২,৫০০</p>
                          <div className="text-green-600 flex items-center text-sm mt-2">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            <span>১২% এই সপ্তাহে</span>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                          <p className="text-sm text-gray-600 mb-1">ফার্মেসি থেকে</p>
                          <p className="text-2xl font-bold">৳ ১৫,৮৫০</p>
                          <div className="text-red-600 flex items-center text-sm mt-2">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            <span>৩% এই সপ্তাহে</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-60 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">রাজস্ব চার্ট</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {activeTab === 'revenue' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">রাজস্ব ম্যানেজমেন্ট</h2>
                  <div className="flex space-x-2">
                    <select className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>সাপ্তাহিক</option>
                      <option>মাসিক</option>
                      <option>বাৎসরিক</option>
                    </select>
                    <Button 
                      variant="outline" 
                      icon={<Download className="h-4 w-4" />}
                    >
                      রিপোর্ট ডাউনলোড
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Card className="bg-green-50 border border-green-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">মোট আয়</p>
                          <p className="text-2xl font-bold">৳ ৫৮,৩৫০</p>
                          <div className="text-green-600 flex items-center text-sm mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>৮% বৃদ্ধি</span>
                          </div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                          <CreditCard className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-50 border border-blue-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">অ্যাপয়েন্টমেন্ট</p>
                          <p className="text-2xl font-bold">৳ ৪২,৫০০</p>
                          <div className="text-green-600 flex items-center text-sm mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>১২% বৃদ্ধি</span>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-purple-50 border border-purple-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">ফার্মেসি</p>
                          <p className="text-2xl font-bold">৳ ১৫,৮৫০</p>
                          <div className="text-red-600 flex items-center text-sm mt-1">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            <span>৩% হ্রাস</span>
                          </div>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                          <PillIcon className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-yellow-50 border border-yellow-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">ল্যাব টেস্ট</p>
                          <p className="text-2xl font-bold">৳ ১০,২০০</p>
                          <div className="text-green-600 flex items-center text-sm mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>৫% বৃদ্ধি</span>
                          </div>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-full">
                          <Flask className="h-6 w-6 text-yellow-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mb-8">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">রাজস্ব বিশ্লেষণ</h3>
                        <div className="flex space-x-2">
                          <select className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option>এই সপ্তাহ</option>
                            <option>গত সপ্তাহ</option>
                            <option>এই মাস</option>
                            <option>গত মাস</option>
                          </select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-60 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">রাজস্ব চার্ট</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mb-8">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">সাম্প্রতিক লেনদেন</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                আইডি
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                বিবরণ
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                তারিখ
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                পরিমাণ
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                পেমেন্ট
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                স্ট্যাটাস
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                INV-001
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                রহমান মিয়া - অ্যাপয়েন্টমেন্ট
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ১৫ মে, ২০২৫
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ৳ ৫০০
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                বিকাশ
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  সম্পন্ন
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                INV-002
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                আফসানা বেগম - অ্যাপয়েন্টমেন্ট
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ১৫ মে, ২০২৫
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ৳ ৫০০
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                নগদ
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  সম্পন্ন
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                INV-003
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                কামাল হোসেন - ল্যাব টেস্ট
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ১৫ মে, ২০২৫
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ৳ ১,২০০
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                রকেট
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  সম্পন্ন
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                INV-004
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ফারুক আহমেদ - ফার্মেসি
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ১৪ মে, ২০২৫
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ৳ ৮৫০
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                বিকাশ
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  সম্পন্ন
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                INV-005
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                নাজমা আক্তার - অ্যাপয়েন্টমেন্ট
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ১৪ মে, ২০২৫
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                ৳ ৫০০
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                SSLCommerz
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  প্রক্রিয়াধীন
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;