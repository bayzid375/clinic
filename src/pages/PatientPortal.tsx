import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Calendar, FileText, Activity, PlusCircle, Clock, CheckCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string;
  patient_id: string;
  department: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string | null;
  patient_age: number;
  health_issues: string;
  payment_method: string;
  payment_status: string;
  appointment_status: string;
  fee: number;
  created_at: string;
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  gender: string | null;
  age: number | null;
}

const PatientPortal: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    document.title = 'রোগী পোর্টাল - স্বাস্থ্যসেবা ক্লিনিক';
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }
    
    if (!authLoading && user) {
      fetchUserData();
    }
  }, [user, authLoading, navigate]);

  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching user profile:', profileError);
      } else if (profileData) {
        setUserProfile(profileData);
      }
      
      // Fetch appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', user.id)
        .order('appointment_date', { ascending: true });
      
      if (appointmentsError) {
        console.error('Error fetching appointments:', appointmentsError);
        setError('অ্যাপয়েন্টমেন্ট লোড করতে সমস্যা হয়েছে।');
      } else {
        setAppointments(appointmentsData || []);
      }
      
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('ডেটা লোড করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  // Get upcoming appointments (future dates)
  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate >= today;
  });

  // Get past appointments
  const pastAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate < today;
  });

  // Get doctor name from doctor_id
  const getDoctorName = (doctorId: string) => {
    const doctors: Record<string, string> = {
      'dr-rafiqul': 'ডা. রফিকুল ইসলাম',
      'dr-shamsul': 'ডা. শামসুল আলম',
      'dr-abdullah': 'ডা. আব্দুল্লাহ আল মামুন',
      'dr-mahfuz': 'ডা. মাহফুজ রহমান',
      'dr-nazmun': 'ডা. নাজমুন নাহার',
      'dr-rabeya': 'ডা. রাবেয়া খাতুন',
      'dr-jahangir': 'ডা. জাহাঙ্গীর আলম',
      'dr-farid': 'ডা. ফরিদ উদ্দিন',
      'dr-farzana': 'ডা. ফারজানা আকতার',
      'dr-asif': 'ডা. আসিফ ইকবাল'
    };
    return doctors[doctorId] || doctorId;
  };

  // Format date to Bengali
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('bn-BD', options);
  };

  // Get status in Bengali
  const getStatusInBengali = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'অপেক্ষমান',
      'confirmed': 'নিশ্চিত',
      'cancelled': 'বাতিল',
      'completed': 'সম্পন্ন'
    };
    return statusMap[status] || status;
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'completed': 'bg-gray-100 text-gray-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  // Show loading spinner while checking authentication or loading data
  if (authLoading || loading) {
    return (
      <div className="pt-20 pb-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 pb-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchUserData}>আবার চেষ্টা করুন</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-green-700 text-white p-6 rounded-t-lg">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-green-700 text-2xl font-bold mr-4">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {userProfile?.full_name || user?.email || 'রোগী'}
              </h1>
              <p className="opacity-90">
                রোগী আইডি: {user?.id?.slice(0, 8) || 'N/A'}
              </p>
              {userProfile?.phone && (
                <p className="opacity-90">ফোন: {userProfile.phone}</p>
              )}
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
                          <p className="text-2xl font-bold">{appointments.length}</p>
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
                          <p className="text-2xl font-bold">০</p>
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
                          <p className="text-2xl font-bold">০</p>
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
                          <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
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
                      onClick={() => navigate('/appointment')}
                    >
                      নতুন অ্যাপয়েন্টমেন্ট
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-lg border overflow-hidden">
                    {upcomingAppointments.length > 0 ? (
                      upcomingAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="p-4 border-b last:border-b-0 flex justify-between items-center"
                      >
                        <div>
                            <p className="font-medium">{getDoctorName(appointment.doctor_id)}</p>
                          <p className="text-gray-600 text-sm">{appointment.department}</p>
                          <div className="flex items-center text-sm mt-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-500 mr-1" />
                              <span>{formatDate(appointment.appointment_date)}</span>
                            <span className="mx-1">•</span>
                            <Clock className="h-3.5 w-3.5 text-gray-500 mr-1" />
                              <span>{appointment.appointment_time}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.appointment_status)}`}>
                              {getStatusInBengali(appointment.appointment_status)}
                          </span>
                        </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500">কোন আসন্ন অ্যাপয়েন্টমেন্ট নেই</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-2"
                          onClick={() => navigate('/appointment')}
                        >
                          নতুন অ্যাপয়েন্টমেন্ট বুক করুন
                        </Button>
                      </div>
                    )}
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
                    onClick={() => navigate('/appointment')}
                  >
                    নতুন অ্যাপয়েন্টমেন্ট
                  </Button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">আসন্ন অ্যাপয়েন্টমেন্ট</h3>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    {upcomingAppointments.length > 0 ? (
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
                                <p className="font-medium">{getDoctorName(appointment.doctor_id)}</p>
                                <p className="text-gray-600 text-sm">{appointment.department}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm md:mx-4">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{formatDate(appointment.appointment_date)}</span>
                            <span className="mx-1">•</span>
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{appointment.appointment_time}</span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 md:mt-0">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.appointment_status)}`}>
                              {getStatusInBengali(appointment.appointment_status)}
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-2"
                          onClick={() => navigate('/appointment')}
                        >
                          নতুন অ্যাপয়েন্টমেন্ট বুক করুন
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">পূর্ববর্তী অ্যাপয়েন্টমেন্ট</h3>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    {pastAppointments.length > 0 ? (
                      pastAppointments.map((appointment) => (
                        <div 
                          key={appointment.id}
                          className="p-4 border-b last:border-b-0 flex flex-col md:flex-row md:justify-between md:items-center"
                        >
                      <div className="mb-3 md:mb-0">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-100 rounded-full mr-3">
                            <Calendar className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                                <p className="font-medium">{getDoctorName(appointment.doctor_id)}</p>
                                <p className="text-gray-600 text-sm">{appointment.department}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm md:mx-4">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{formatDate(appointment.appointment_date)}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{appointment.appointment_time}</span>
                      </div>
                      
                      <div className="flex items-center mt-3 md:mt-0">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.appointment_status)}`}>
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              {getStatusInBengali(appointment.appointment_status)}
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
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500">কোন পূর্ববর্তী অ্যাপয়েন্টমেন্ট নেই</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'prescriptions' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">আপনার প্রেসক্রিপশন</h2>
                <div className="bg-white rounded-lg border p-8 text-center">
                  <p className="text-gray-500">কোন প্রেসক্রিপশন নেই</p>
                </div>
              </div>
            )}
            
            {activeTab === 'lab' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">আপনার ল্যাব রিপোর্ট</h2>
                <div className="bg-white rounded-lg border p-8 text-center">
                  <p className="text-gray-500">কোন ল্যাব রিপোর্ট নেই</p>
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