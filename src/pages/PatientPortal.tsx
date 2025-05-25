import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Calendar, FileText, Activity, PlusCircle, Clock, CheckCircle } from 'lucide-react';

const PatientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    document.title = 'রোগী পোর্টাল - স্বাস্থ্যসেবা ক্লিনিক';
  }, []);
  
  // Mock data
  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'ডা. রফিকুল ইসলাম',
      department: 'মেডিসিন',
      date: '১৫ মে, ২০২৫',
      time: '১০:৩০ AM',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'ডা. ফারজানা আকতার',
      department: 'শিশু বিভাগ',
      date: '২২ মে, ২০২৫',
      time: '০৫:০০ PM',
      status: 'pending'
    }
  ];
  
  const prescriptions = [
    {
      id: 1,
      doctor: 'ডা. রফিকুল ইসলাম',
      date: '০১ এপ্রিল, ২০২৫',
      diagnosis: 'ইনফ্লুয়েঞ্জা',
      medications: [
        'নাপা ৫০০ মি.গ্রা. - দিনে ৩ বার',
        'সিটিজিন - দিনে ১ বার',
        'এজিথ্রো ৫০০ - দিনে ১ বার'
      ]
    },
    {
      id: 2,
      doctor: 'ডা. আব্দুল্লাহ আল মামুন',
      date: '১৫ মার্চ, ২০২৫',
      diagnosis: 'হাইপারটেনশন',
      medications: [
        'অ্যামলো ৫ মি.গ্রা. - দিনে ১ বার',
        'লোসার্টান ৫০ মি.গ্রা. - দিনে ১ বার'
      ]
    }
  ];
  
  const labReports = [
    {
      id: 1,
      name: 'রক্তের রিপোর্ট',
      date: '০১ এপ্রিল, ২০২৫',
      doctor: 'ডা. রফিকুল ইসলাম'
    },
    {
      id: 2,
      name: 'ECG রিপোর্ট',
      date: '১৫ মার্চ, ২০২৫',
      doctor: 'ডা. আব্দুল্লাহ আল মামুন'
    },
    {
      id: 3,
      name: 'চেস্ট এক্স-রে',
      date: '১০ ফেব্রুয়ারি, ২০২৫',
      doctor: 'ডা. রফিকুল ইসলাম'
    }
  ];
  
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-green-700 text-white p-6 rounded-t-lg">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-green-700 text-2xl font-bold mr-4">
              RM
            </div>
            <div>
              <h1 className="text-2xl font-bold">রহমান মিয়া</h1>
              <p className="opacity-90">রোগী আইডি: PT-12345</p>
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
                activeTab === 'lab' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('lab')}
            >
              <FileText className="mr-1 h-4 w-4" />
              ল্যাব রিপোর্ট
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
                          <p className="text-gray-600 text-sm">মোট অ্যাপয়েন্টমেন্ট</p>
                          <p className="text-2xl font-bold">১২</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-blue-50 border border-blue-100">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full mr-3">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">প্রেসক্রিপশন</p>
                          <p className="text-2xl font-bold">৮</p>
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
                          <p className="text-gray-600 text-sm">ল্যাব টেস্ট</p>
                          <p className="text-2xl font-bold">৫</p>
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
                          <p className="text-gray-600 text-sm">আসন্ন অ্যাপয়েন্টমেন্ট</p>
                          <p className="text-2xl font-bold">২</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">আসন্ন অ্যাপয়েন্টমেন্ট</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      icon={<PlusCircle className="h-4 w-4" />}
                    >
                      নতুন অ্যাপয়েন্টমেন্ট
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-lg border overflow-hidden">
                    {upcomingAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="p-4 border-b last:border-b-0 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{appointment.doctor}</p>
                          <p className="text-gray-600 text-sm">{appointment.department}</p>
                          <div className="flex items-center text-sm mt-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-500 mr-1" />
                            <span>{appointment.date}</span>
                            <span className="mx-1">•</span>
                            <Clock className="h-3.5 w-3.5 text-gray-500 mr-1" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status === 'confirmed' ? 'নিশ্চিত' : 'অপেক্ষমান'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">সাম্প্রতিক প্রেসক্রিপশন</h2>
                  </div>
                  
                  <div className="bg-white rounded-lg border overflow-hidden">
                    {prescriptions.slice(0, 2).map((prescription) => (
                      <div 
                        key={prescription.id}
                        className="p-4 border-b last:border-b-0"
                      >
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">{prescription.doctor}</p>
                          <p className="text-sm text-gray-600">{prescription.date}</p>
                        </div>
                        <p className="text-gray-700 mb-2">রোগ নির্ণয়: <span className="font-medium">{prescription.diagnosis}</span></p>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          বিস্তারিত দেখুন
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'appointments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">আপনার অ্যাপয়েন্টমেন্ট</h2>
                  <Button 
                    variant="primary" 
                    size="sm"
                    icon={<PlusCircle className="h-4 w-4" />}
                  >
                    নতুন অ্যাপয়েন্টমেন্ট
                  </Button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">আসন্ন অ্যাপয়েন্টমেন্ট</h3>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    {upcomingAppointments.length ? (
                      upcomingAppointments.map((appointment) => (
                        <div 
                          key={appointment.id}
                          className="p-4 border-b last:border-b-0 flex flex-col md:flex-row md:justify-between md:items-center"
                        >
                          <div className="mb-3 md:mb-0">
                            <div className="flex items-center">
                              <div className="p-2 bg-green-100 rounded-full mr-3">
                                <Calendar className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium">{appointment.doctor}</p>
                                <p className="text-gray-600 text-sm">{appointment.department}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm md:mx-4">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{appointment.date}</span>
                            <span className="mx-1">•</span>
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{appointment.time}</span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 md:mt-0">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appointment.status === 'confirmed' ? 'নিশ্চিত' : 'অপেক্ষমান'}
                            </span>
                            
                            <div className="flex space-x-2 ml-4">
                              <Button 
                                variant="outline" 
                                size="sm"
                              >
                                সম্পাদনা করুন
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm"
                              >
                                বাতিল করুন
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500">কোন আসন্ন অ্যাপয়েন্টমেন্ট নেই</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">পূর্ববর্তী অ্যাপয়েন্টমেন্ট</h3>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="p-4 border-b flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="mb-3 md:mb-0">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-full mr-3">
                            <Calendar className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">ডা. রফিকুল ইসলাম</p>
                            <p className="text-gray-600 text-sm">মেডিসিন</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm md:mx-4">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                        <span>০১ এপ্রিল, ২০২৫</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-4 w-4 text-gray-500 mr-1" />
                        <span>১০:০০ AM</span>
                      </div>
                      
                      <div className="flex items-center mt-3 md:mt-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          সম্পন্ন
                        </span>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="ml-4"
                        >
                          বিস্তারিত দেখুন
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 border-b flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="mb-3 md:mb-0">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-full mr-3">
                            <Calendar className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">ডা. আব্দুল্লাহ আল মামুন</p>
                            <p className="text-gray-600 text-sm">হৃদরোগ</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm md:mx-4">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                        <span>১৫ মার্চ, ২০২৫</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-4 w-4 text-gray-500 mr-1" />
                        <span>০৫:৩০ PM</span>
                      </div>
                      
                      <div className="flex items-center mt-3 md:mt-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          সম্পন্ন
                        </span>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="ml-4"
                        >
                          বিস্তারিত দেখুন
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'prescriptions' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">আপনার প্রেসক্রিপশন</h2>
                
                <div className="bg-white rounded-lg border overflow-hidden">
                  {prescriptions.map((prescription) => (
                    <div 
                      key={prescription.id}
                      className="p-4 border-b last:border-b-0"
                    >
                      <div className="flex justify-between mb-3">
                        <div>
                          <p className="font-medium">{prescription.doctor}</p>
                          <p className="text-sm text-gray-600">{prescription.date}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          ডাউনলোড
                        </Button>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium mb-2">রোগ নির্ণয়: {prescription.diagnosis}</p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">ওষুধ:</p>
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {prescription.medications.map((med, idx) => (
                              <li key={idx}>{med}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'lab' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">আপনার ল্যাব রিপোর্ট</h2>
                
                <div className="bg-white rounded-lg border overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          টেস্ট নাম
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          তারিখ
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ডাক্তার
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          অ্যাকশন
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {labReports.map((report) => (
                        <tr key={report.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{report.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {report.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {report.doctor}
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
                              ডাউনলোড
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;