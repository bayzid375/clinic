import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PillIcon, FlaskRound as Flask, Search, Calendar, ShoppingCart, CreditCard, AlertCircle, PlusCircle, Download, Upload } from 'lucide-react';

const PharmacyLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pharmacy');
  
  useEffect(() => {
    document.title = 'ফার্মেসি ও ল্যাব - স্বাস্থ্যসেবা ক্লিনিক';
  }, []);
  
  // Mock data
  const medicines = [
    {
      id: 1,
      name: 'নাপা ৫০০ মি.গ্রা.',
      generic: 'প্যারাসিটামল',
      stock: 250,
      price: 2,
      expiry: '১০ ডিসেম্বর, ২০২৫'
    },
    {
      id: 2,
      name: 'সিটিজিন ১০ মি.গ্রা.',
      generic: 'সিটিরিজিন',
      stock: 180,
      price: 5,
      expiry: '২০ নভেম্বর, ২০২৫'
    },
    {
      id: 3,
      name: 'অ্যামলো ৫ মি.গ্রা.',
      generic: 'অ্যামলোডিপিন',
      stock: 120,
      price: 4,
      expiry: '১৫ অক্টোবর, ২০২৫'
    },
    {
      id: 4,
      name: 'এজিথ্রো ৫০০ মি.গ্রা.',
      generic: 'অ্যাজিথ্রোমাইসিন',
      stock: 80,
      price: 15,
      expiry: '০৫ সেপ্টেম্বর, ২০২৫'
    },
    {
      id: 5,
      name: 'লোসার্টান ৫০ মি.গ্রা.',
      generic: 'লোসার্টান পটাশিয়াম',
      stock: 100,
      price: 8,
      expiry: '২৫ জানুয়ারী, ২০২৬'
    }
  ];
  
  const labTests = [
    {
      id: 1,
      name: 'সম্পূর্ণ রক্ত পরীক্ষা (CBC)',
      price: 450,
      description: 'রক্তের সাধারণ পরীক্ষা, WBC, RBC, হিমোগ্লোবিন এবং প্লেটলেট গণনা সহ।',
      duration: '১ দিন'
    },
    {
      id: 2,
      name: 'লিপিড প্রোফাইল',
      price: 800,
      description: 'কোলেস্টেরল, ট্রাইগ্লিসারাইড, HDL, LDL পরীক্ষা।',
      duration: '১ দিন'
    },
    {
      id: 3,
      name: 'লিভার ফাংশন টেস্ট',
      price: 950,
      description: 'SGPT, SGOT, বিলিরুবিন, অ্যালকালাইন ফসফেটেজ পরীক্ষা।',
      duration: '১ দিন'
    },
    {
      id: 4,
      name: 'থাইরয়েড ফাংশন টেস্ট',
      price: 1200,
      description: 'T3, T4, TSH হরমোন পরীক্ষা।',
      duration: '২ দিন'
    },
    {
      id: 5,
      name: 'ইউরিন আর/ই',
      price: 250,
      description: 'প্রস্রাব পরীক্ষা, ইউরিনে সংক্রমণ বা অন্যান্য সমস্যা নির্ণয়ে।',
      duration: '১ দিন'
    },
    {
      id: 6,
      name: 'চেস্ট এক্স-রে',
      price: 500,
      description: 'বুকের এক্স-রে, ফুসফুস ও হার্টের অবস্থা দেখার জন্য।',
      duration: 'তাৎক্ষণিক'
    },
    {
      id: 7,
      name: 'ইসিজি',
      price: 650,
      description: 'হার্টের ইলেকট্রিক্যাল অ্যাকটিভিটি পরীক্ষা।',
      duration: 'তাৎক্ষণিক'
    }
  ];
  
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex border-b">
            <button 
              className={`px-6 py-4 font-medium flex items-center ${
                activeTab === 'pharmacy' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('pharmacy')}
            >
              <PillIcon className="mr-2 h-5 w-5" />
              ফার্মেসি
            </button>
            <button 
              className={`px-6 py-4 font-medium flex items-center ${
                activeTab === 'lab' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('lab')}
            >
              <Flask className="mr-2 h-5 w-5" />
              ডায়াগনস্টিক ল্যাব
            </button>
          </div>
          
          {activeTab === 'pharmacy' && (
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">ফার্মেসি</h2>
                <p className="text-gray-600">
                  আমাদের ফার্মেসিতে সকল ধরনের ওষুধ সাশ্রয়ী মূল্যে পাওয়া যায়। প্রেসক্রিপশন এবং ওষুধের পরামর্শের জন্য আমাদের অভিজ্ঞ ফার্মাসিস্টরা আছেন।
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-8/12">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">ওষুধের তালিকা</h3>
                        <div className="flex space-x-2">
                          <div className="relative">
                            <input 
                              type="text" 
                              placeholder="ওষুধ খুঁজুন"
                              className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          </div>
                          <Button 
                            variant="primary" 
                            icon={<PlusCircle className="h-4 w-4" />}
                          >
                            নতুন ওষুধ
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ওষুধের নাম
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                জেনেরিক
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                স্টক
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                মূল্য (৳)
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                মেয়াদ
                              </th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                অ্যাকশন
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {medicines.map((medicine) => (
                              <tr key={medicine.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="font-medium text-gray-900">{medicine.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                  {medicine.generic}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    medicine.stock > 100 
                                      ? 'bg-green-100 text-green-800' 
                                      : medicine.stock > 50 
                                      ? 'bg-yellow-100 text-yellow-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {medicine.stock}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                  ৳ {medicine.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                  {medicine.expiry}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="mr-2"
                                  >
                                    সম্পাদনা
                                  </Button>
                                  <Button 
                                    variant="primary" 
                                    size="sm"
                                  >
                                    <ShoppingCart className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:w-4/12">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">বিক্রয়</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border p-3 rounded-md">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">নাপা ৫০০ মি.গ্রা.</span>
                            <div className="flex items-center space-x-2">
                              <button className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">-</button>
                              <span>3</span>
                              <button className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">+</button>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">৳ 2 × 3</span>
                            <span>৳ 6</span>
                          </div>
                        </div>
                        
                        <div className="border p-3 rounded-md">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">এজিথ্রো ৫০০ মি.গ্রা.</span>
                            <div className="flex items-center space-x-2">
                              <button className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">-</button>
                              <span>1</span>
                              <button className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">+</button>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">৳ 15 × 1</span>
                            <span>৳ 15</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">প্রেসক্রিপশন</label>
                          <div className="flex">
                            <input 
                              type="file" 
                              className="hidden" 
                              id="prescription-upload" 
                            />
                            <label 
                              htmlFor="prescription-upload"
                              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              প্রেসক্রিপশন আপলোড
                            </label>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t mt-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">সাবটোটাল</span>
                            <span>৳ 21</span>
                          </div>
                          <div className="flex justify-between mb-4">
                            <span className="font-medium">ভ্যাট (5%)</span>
                            <span>৳ 1.05</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold">
                            <span>মোট</span>
                            <span>৳ 22.05</span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="primary" 
                          fullWidth
                          icon={<CreditCard className="h-4 w-4" />}
                        >
                          পেমেন্ট করুন
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-yellow-50 border border-yellow-100">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="p-3 bg-yellow-100 rounded-full mr-3">
                        <AlertCircle className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">মেয়াদ উত্তীর্ণ হতে যাওয়া ওষুধ</h3>
                        <p className="text-gray-600 text-sm">আগামী ৩০ দিনের মধ্যে মেয়াদ শেষ হবে</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center text-sm">
                        <span>সিটিজিন ১০ মি.গ্রা.</span>
                        <span className="text-yellow-700">২০ নভেম্বর, ২০২৫</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span>অ্যামলো ৫ মি.গ্রা.</span>
                        <span className="text-yellow-700">১৫ অক্টোবর, ২০২৫</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span>এজিথ্রো ৫০০ মি.গ্রা.</span>
                        <span className="text-yellow-700">০৫ সেপ্টেম্বর, ২০২৫</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-red-50 border border-red-100">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="p-3 bg-red-100 rounded-full mr-3">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">স্টক কম আছে</h3>
                        <p className="text-gray-600 text-sm">স্টক ৫০ এর নিচে নেমে এসেছে</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center text-sm">
                        <span>এজিথ্রো ৫০০ মি.গ্রা.</span>
                        <span className="text-red-700">৪০ পিস</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span>লোসার্টান ৫০ মি.গ্রা.</span>
                        <span className="text-red-700">২৫ পিস</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 border border-green-100">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="p-3 bg-green-100 rounded-full mr-3">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">সাম্প্রতিক অর্ডার</h3>
                        <p className="text-gray-600 text-sm">গত ৭ দিনের অর্ডার</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center text-sm">
                        <span>রহমান মিয়া</span>
                        <span className="text-green-700">৳ ৪৫০</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span>আফসানা বেগম</span>
                        <span className="text-green-700">৳ ৩২০</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span>কামাল হোসেন</span>
                        <span className="text-green-700">৳ ৫৮০</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'lab' && (
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">ডায়াগনস্টিক ল্যাব</h2>
                <p className="text-gray-600">
                  আমাদের আধুনিক ডায়াগনস্টিক ল্যাবে সকল ধরনের টেস্ট করা হয়। নির্ভুল রিপোর্ট এবং দ্রুত সেবা আমাদের অঙ্গীকার।
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-8/12">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">টেস্টের তালিকা</h3>
                        <div className="flex space-x-2">
                          <div className="relative">
                            <input 
                              type="text" 
                              placeholder="টেস্ট খুঁজুন"
                              className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          </div>
                          <Button 
                            variant="primary" 
                            icon={<PlusCircle className="h-4 w-4" />}
                          >
                            নতুন টেস্ট
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        {labTests.map((test) => (
                          <div key={test.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between">
                              <div>
                                <h4 className="font-semibold">{test.name}</h4>
                                <p className="text-gray-600 text-sm">{test.description}</p>
                                <div className="flex items-center mt-2 text-sm">
                                  <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                  <span>রিপোর্ট: {test.duration}</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="font-bold text-lg">৳ {test.price}</span>
                                <Button 
                                  variant="primary" 
                                  size="sm"
                                  className="mt-2"
                                >
                                  বুক করুন
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:w-4/12">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">রিপোর্ট আপলোড</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">রোগীর নাম</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="রোগীর পূর্ণ নাম"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">মোবাইল নাম্বার</label>
                          <input 
                            type="tel" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="০১৭XXXXXXXX"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">টেস্ট</label>
                          <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="">টেস্ট নির্বাচন করুন</option>
                            {labTests.map(test => (
                              <option key={test.id} value={test.id}>{test.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-1">রিপোর্ট আপলোড</label>
                          <div className="flex">
                            <input 
                              type="file" 
                              className="hidden" 
                              id="report-upload" 
                            />
                            <label 
                              htmlFor="report-upload"
                              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              রিপোর্ট ফাইল আপলোড
                            </label>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (মাক্স. ৫MB)</p>
                        </div>
                        
                        <div>
                          <label className="flex items-center">
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              SMS দ্বারা রোগীকে অবহিত করুন
                            </span>
                          </label>
                        </div>
                        
                        <Button 
                          variant="primary" 
                          fullWidth
                          icon={<Upload className="h-4 w-4" />}
                        >
                          রিপোর্ট আপলোড করুন
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <h3 className="text-lg font-semibold">সাম্প্রতিক রিপোর্ট</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <p className="font-medium">রহমান মিয়া</p>
                            <p className="text-sm text-gray-600">সম্পূর্ণ রক্ত পরীক্ষা (CBC)</p>
                            <p className="text-xs text-gray-500">১৫ মে, ২০২৫</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            icon={<Download className="h-4 w-4" />}
                          >
                            ডাউনলোড
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <p className="font-medium">আফসানা বেগম</p>
                            <p className="text-sm text-gray-600">থাইরয়েড ফাংশন টেস্ট</p>
                            <p className="text-xs text-gray-500">১৪ মে, ২০২৫</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            icon={<Download className="h-4 w-4" />}
                          >
                            ডাউনলোড
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <p className="font-medium">কামাল হোসেন</p>
                            <p className="text-sm text-gray-600">চেস্ট এক্স-রে</p>
                            <p className="text-xs text-gray-500">১৩ মে, ২০২৫</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            icon={<Download className="h-4 w-4" />}
                          >
                            ডাউনলোড
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-blue-50 border border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="p-3 bg-blue-100 rounded-full mr-3">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">আজকের টেস্ট</h3>
                        <p className="text-gray-600 text-sm">আজকের নিবন্ধিত টেস্ট</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center text-sm">
                        <span>সম্পূর্ণ রক্ত পরীক্ষা (CBC)</span>
                        <span className="text-blue-700">৫ জন</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span>লিপিড প্রোফাইল</span>
                        <span className="text-blue-700">৩ জন</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span>চেস্ট এক্স-রে</span>
                        <span className="text-blue-700">৪ জন</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50 border border-purple-100">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="p-3 bg-purple-100 rounded-full mr-3">
                        <Flask className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">বেশি বুকিং</h3>
                        <p className="text-gray-600 text-sm">সর্বাধিক বুকিং করা টেস্ট</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center text-sm">
                        <span>সম্পূর্ণ রক্ত পরীক্ষা (CBC)</span>
                        <span className="text-purple-700">১২০+</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span>চেস্ট এক্স-রে</span>
                        <span className="text-purple-700">৯৫+</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span>ইসিজি</span>
                        <span className="text-purple-700">৮৫+</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 border border-green-100">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="p-3 bg-green-100 rounded-full mr-3">
                        <CreditCard className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">রাজস্ব</h3>
                        <p className="text-gray-600 text-sm">এই মাসের রাজস্ব</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center text-sm">
                        <span>মোট আয়</span>
                        <span className="text-green-700">৳ ১৫,২০০</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span>মোট টেস্ট</span>
                        <span className="text-green-700">৭৫</span>
                      </li>
                      <li className="flex justify-between items-center text-sm">
                        <span>গড় আয় (প্রতিদিন)</span>
                        <span className="text-green-700">৳ ৫০৬</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyLab;