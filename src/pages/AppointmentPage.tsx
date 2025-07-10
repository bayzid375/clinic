import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const AppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, refreshSession } = useAuth(); 
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // State for form steps
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    healthIssues: ''
  });
  const [selectedPayment, setSelectedPayment] = useState('');

  // Mock data for the form
  const departments = [
    { id: 'medicine', name: 'মেডিসিন' },
    { id: 'cardiology', name: 'হৃদরোগ' },
    { id: 'gynecology', name: 'গাইনি' },
    { id: 'neurology', name: 'নিউরোলজি' },
    { id: 'orthopedics', name: 'অর্থোপেডিক্স' },
    { id: 'pediatrics', name: 'শিশু বিভাগ' },
  ];
  
  const doctors: Record<string, { id: string, name: string }[]> = {
    medicine: [ { id: 'dr-rafiqul', name: 'ডা. রফিকুল ইসলাম' }, { id: 'dr-shamsul', name: 'ডা. শামসুল আলম' } ],
    cardiology: [ { id: 'dr-abdullah', name: 'ডা. আব্দুল্লাহ আল মামুন' }, { id: 'dr-mahfuz', name: 'ডা. মাহফুজ রহমান' } ],
    gynecology: [ { id: 'dr-nazmun', name: 'ডা. নাজমুন নাহার' }, { id: 'dr-rabeya', name: 'ডা. রাবেয়া খাতুন' } ],
    neurology: [ { id: 'dr-jahangir', name: 'ডা. জাহাঙ্গীর আলম' } ],
    orthopedics: [ { id: 'dr-farid', name: 'ডা. ফরিদ উদ্দিন' } ],
    pediatrics: [ { id: 'dr-farzana', name: 'ডা. ফারজানা আকতার' }, { id: 'dr-asif', name: 'ডা. আসিফ ইকবাল' } ],
  };
  
  const timeSlots = [ '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM' ];
  const paymentMethods = [ { id: 'bkash', name: 'বিকাশ', image: 'https://i.ibb.co/qk4QdFM/bkash-logo.png' }, { id: 'nagad', name: 'নগদ', image: 'https://i.ibb.co/S0cfz1D/nagad-logo.png' }, { id: 'rocket', name: 'রকেট', image: 'https://i.ibb.co/C2sCKVn/rocket-logo.png' }, { id: 'sslcommerz', name: 'কার্ড পেমেন্ট', image: 'https://i.ibb.co/j4BJb8F/sslcommerz-logo.png' }, { id: 'cash', name: 'নগদ টাকা', image: 'https://i.ibb.co/rZ7jMjB/cash-logo.png' } ];

  // Redirect user if not logged in and handle visibility changes
  useEffect(() => {
    const checkUserIsLoggedIn = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login', { state: { returnTo: '/appointment' } });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshSession();
        if (loading) {
          setLoading(false); // Reset loading state when page becomes visible
        }
      }
    };

    checkUserIsLoggedIn();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [navigate, refreshSession, loading]);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dept = e.target.value;
    setSelectedDepartment(dept);
    setSelectedDoctor('');
  };

  const handlePatientInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== Starting appointment submission ===');
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      console.log('Step 1: Checking user authentication...');
      
      // Use AuthContext user instead of direct Supabase call
      if (!user) {
        console.error('No user found in AuthContext');
        throw new Error('You are not logged in. Please log in to book an appointment.');
      }
      
      const currentUserId = user.id;
      console.log('Current user ID:', currentUserId);

      // Validate that all required fields are filled before submitting
      console.log('Step 2: Validating form data...');
      const validationErrors = [];
      
      if (!selectedDepartment) validationErrors.push('Department');
      if (!selectedDoctor) validationErrors.push('Doctor');
      if (!selectedDate) validationErrors.push('Date');
      if (!selectedTime) validationErrors.push('Time');
      if (!patientInfo.name) validationErrors.push('Patient Name');
      if (!patientInfo.phone) validationErrors.push('Phone');
      if (!patientInfo.age) validationErrors.push('Age');
      if (!patientInfo.healthIssues) validationErrors.push('Health Issues');
      if (!selectedPayment) validationErrors.push('Payment Method');
      
      if (validationErrors.length > 0) {
        console.error('Validation errors:', validationErrors);
        throw new Error(`অনুগ্রহ করে সব তথ্য সঠিকভাবে পূরণ করুন: ${validationErrors.join(', ')}`);
      }
      
      const departmentName = departments.find(d => d.id === selectedDepartment)?.name;
      if (!departmentName) {
        throw new Error('বিভাগ খুঁজে পাওয়া যায়নি।');
      }
      
      console.log('Step 3: Building appointment data...');
      const appointmentData = {
        patient_id: currentUserId,
        department: departmentName,
        doctor_id: selectedDoctor,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        patient_name: patientInfo.name,
        patient_phone: patientInfo.phone,
        patient_email: patientInfo.email || null,
        patient_age: parseInt(patientInfo.age),
        health_issues: patientInfo.healthIssues,
        payment_method: selectedPayment,
        payment_status: 'pending',
        appointment_status: 'pending',
        fee: 500.00,
      };
      
      console.log('Appointment data to submit:', appointmentData);

      //console.log('Step 4: Testing Supabase connection...');
      // // Test the connection first with timeout
      // const testPromise = supabase
      //   .from('appointments')
      //   .select('id')
      //   .limit(1);
      
      // const testTimeoutPromise = new Promise((_, reject) => 
      //   setTimeout(() => reject(new Error('Database connection timeout')), 10000)
      // );
      
      // const { data: testData, error: testError } = await Promise.race([
      //   testPromise,
      //   testTimeoutPromise
      // ]) as any;
      
      // if (testError) {
      //   console.error('Supabase connection test failed:', testError);
      //   if (testError.code === 'PGRST116') {
      //     throw new Error('Appointments table does not exist. Please contact administrator.');
      //   } else if (testError.code === '42501') {
      //     throw new Error('Permission denied. Please log in again.');
      //   } else {
      //     throw new Error(`Database connection error: ${testError.message}`);
      //   }
      // }
      
      console.log('Step 5: Inserting appointment data...');

      const response = await fetch('https://clinic-server-rho.vercel.app/api/pay',{
        method :'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if(response.ok && data.url){
        window.location.href =  data.url;
      } else {
        throw new Error(data.error || 'Failed to initiate payment.');
      }

      // Insert data into Supabase with timeout
      // const insertPromise = supabase
      //   .from('appointments')
      //   .insert([appointmentData])
      //   .select()
      //   .single();
      
      // const insertTimeoutPromise = new Promise((_, reject) => 
      //   setTimeout(() => reject(new Error('Database insertion timeout')), 15000)
      // );
      
      // const { data, error: insertError } = await Promise.race([
      //   insertPromise,
      //   insertTimeoutPromise
      // ]) as any;
      
      // if (insertError) {
      //   console.error('Supabase insertion error:', insertError);
        
      //   // Handle specific error types
      //   if (insertError.code === '42501') {
      //     throw new Error('Permission denied. Please log in again.');
      //   } else if (insertError.code === '23505') {
      //     throw new Error('This appointment slot is already booked. Please choose another time.');
      //   } else if (insertError.code === '23514') {
      //     throw new Error('Invalid data provided. Please check your information.');
      //   } else {
      //     throw new Error(`Database error: ${insertError.message}`);
      //   }
      // }
      
      // console.log('Step 6: Appointment created successfully:', data);
      // setSuccess('আপনার অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে!');
      
      setTimeout(() => {
        navigate('/patient-portal', { 
          state: { message: 'অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে।' } 
        });
      }, 2000);
      
    } catch (err: any) {
      console.error('=== Error in appointment submission ===');
      console.error('Error details:', err);
      
      if (err.message.includes('timeout')) {
        setError('সংযোগ সময় শেষ। অনুগ্রহ করে আবার চেষ্টা করুন।');
      } else if (err.message.includes('violates row-level security policy') || err.code === '42501') {
        setError('অনুমতি নেই। অ্যাপয়েন্টমেন্ট বুক করতে অনুগ্রহ করে আবার লগইন করুন।');
        setTimeout(() => navigate('/login', { state: { returnTo: '/appointment' } }), 2000);
      } else if (err.message.includes('You are not logged in')) {
        setError(err.message);
        setTimeout(() => navigate('/login', { state: { returnTo: '/appointment' } }), 2000);
      } else if (err.message.includes('table does not exist')) {
        setError('ডাটাবেস সেটআপ সমস্যা। অ্যাডমিনের সাথে যোগাযোগ করুন।');
      } else {
        setError(`অ্যাপয়েন্টমেন্ট বুক করতে সমস্যা হয়েছে: ${err.message}`);
      }
    } finally {
      console.log('=== Appointment submission completed ===');
      setLoading(false);
    }
  };
  
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };
  
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">অ্যাপয়েন্টমেন্ট বুক করুন</h1>
          <p className="mt-2 text-gray-600">আমাদের বিশেষজ্ঞ ডাক্তারদের সাথে সহজেই অ্যাপয়েন্টমেন্ট নিন</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Stepper UI */}
          <div className="p-4 bg-green-600 text-white">
            <div className="flex justify-between items-center">
              <div className={`flex items-center ${step >= 1 ? 'text-white' : 'text-gray-300'}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-white text-green-600' : 'bg-gray-400'}`}>1</div><span className="ml-2 font-medium">ডাক্তার নির্বাচন</span></div>
              <div className="flex-1 mx-4 h-1 bg-gray-300"><div className={`h-full bg-white transition-all ${step > 1 ? 'w-full' : 'w-0'}`}></div></div>
              <div className={`flex items-center ${step >= 2 ? 'text-white' : 'text-gray-300'}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-white text-green-600' : 'bg-gray-400'}`}>2</div><span className="ml-2 font-medium">সময় নির্ধারণ</span></div>
              <div className="flex-1 mx-4 h-1 bg-gray-300"><div className={`h-full bg-white transition-all ${step > 2 ? 'w-full' : 'w-0'}`}></div></div>
              <div className={`flex items-center ${step >= 3 ? 'text-white' : 'text-gray-300'}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-white text-green-600' : 'bg-gray-400'}`}>3</div><span className="ml-2 font-medium">প্রদত্ত তথ্য</span></div>
            </div>
          </div>
          
          {/* Form content */}
          <div className="p-4">
            {step === 1 && (
              <div>
                {/* Department selection */}
                <div className="mb-4">
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">ডাক্তার নির্বাচন</label>
                  <select
                    id="department"
                    name="department"
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">ডাক্তার নির্বাচন করুন</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                {/* Doctor selection */}
                <div className="mb-4">
                  <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">ডাক্তার নির্বাচন</label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">ডাক্তার নির্বাচন করুন</option>
                    {selectedDepartment && doctors[selectedDepartment].map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                {/* Date selection */}
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">তারিখ নির্ধারণ</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Time selection */}
                <div className="mb-4">
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">সময় নির্ধারণ</label>
                  <select
                    id="time"
                    name="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">সময় নির্ধারণ করুন</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                {/* Patient information */}
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">নাম</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={patientInfo.name}
                    onChange={handlePatientInfoChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">ফোন নম্বর</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={patientInfo.phone}
                    onChange={handlePatientInfoChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">ইমেইল</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={patientInfo.email}
                    onChange={handlePatientInfoChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">বয়স</label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={patientInfo.age}
                    onChange={handlePatientInfoChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="healthIssues" className="block text-sm font-medium text-gray-700">সমস্যা</label>
                  <textarea
                    id="healthIssues"
                    name="healthIssues"
                    value={patientInfo.healthIssues}
                    onChange={handlePatientInfoChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Payment method selection */}
                <div className="mb-4">
                  <label htmlFor="payment" className="block text-sm font-medium text-gray-700">পেমেন্ট পদ্ধতি</label>
                  <select
                    id="payment"
                    name="payment"
                    value={selectedPayment}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">পেমেন্ট পদ্ধতি নির্বাচন করুন</option>
                    {paymentMethods.map((method) => (
                      <option key={method.id} value={method.id}>{method.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          
          {/* Form actions */}
          <div className="p-4 bg-gray-100">
            <div className="flex justify-between items-center">
              {step > 1 && (
                <Button onClick={handlePrevious}>পূর্ববর্তী</Button>
              )}
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)}>পরবর্তী</Button>
              ) : (
                <Button onClick={handleSubmit}>বুক করুন</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;