import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

const OTPVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Get email from location state or localStorage
    const emailFromState = location.state?.email;
    const emailFromStorage = localStorage.getItem('pendingVerificationEmail');
    
    if (emailFromState) {
      setEmail(emailFromState);
      localStorage.setItem('pendingVerificationEmail', emailFromState);
    } else if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else {
      // No email found, redirect to register
      navigate('/register');
      return;
    }

    // Start countdown for resend
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, location.state]);

  useEffect(() => {
    document.title = 'ইমেইল নিশ্চিতকরণ - স্বাস্থ্যসেবা ক্লিনিক';
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');
    if (pastedData.length === 6) {
      const otpArray = pastedData.split('').slice(0, 6);
      setOtp(otpArray);
    }
  };

  const verifyOTP = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('৬ অঙ্কের OTP দিন');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otpString,
        type: 'signup'
      });

      if (error) {
        if (error.message.includes('Invalid OTP')) {
          setError('ভুল OTP। আবার চেষ্টা করুন।');
        } else if (error.message.includes('expired')) {
          setError('OTP এর মেয়াদ শেষ হয়ে গেছে। নতুন OTP চাইতে হবে।');
        } else {
          setError('OTP নিশ্চিতকরণে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        }
      } else {
        setSuccess('ইমেইল সফলভাবে নিশ্চিত হয়েছে!');
        localStorage.removeItem('pendingVerificationEmail');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। এখন লগইন করুন।' 
            } 
          });
        }, 2000);
      }
    } catch (err) {
      setError('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (countdown > 0) return;

    setResendLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });

      if (error) {
        setError('OTP পুনরায় পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      } else {
        setSuccess('নতুন OTP আপনার ইমেইলে পাঠানো হয়েছে।');
        setCountdown(60);
        
        // Start countdown again
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err) {
      setError('একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
    } finally {
      setResendLoading(false);
    }
  };

  const goBackToRegister = () => {
    localStorage.removeItem('pendingVerificationEmail');
    navigate('/register');
  };

  return (
    <div className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">ইমেইল নিশ্চিতকরণ</h1>
            <p className="text-gray-600 mt-2">
              আমরা আপনার ইমেইলে একটি ৬ অঙ্কের কোড পাঠিয়েছি
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {email}
            </p>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-3 text-center">
                  OTP কোড দিন
                </label>
                <div className="flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg font-semibold"
                      disabled={loading}
                    />
                  ))}
                </div>
              </div>

              <Button
                onClick={verifyOTP}
                fullWidth
                disabled={loading || otp.join('').length !== 6}
              >
                {loading ? 'নিশ্চিত করা হচ্ছে...' : 'নিশ্চিত করুন'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  কোড পাননি?
                </p>
                <button
                  onClick={resendOTP}
                  disabled={resendLoading || countdown > 0}
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center justify-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <Mail className="h-4 w-4 mr-1" />
                  )}
                  {countdown > 0 
                    ? `${countdown} সেকেন্ড পর আবার চেষ্টা করুন` 
                    : 'নতুন কোড পাঠান'
                  }
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="text-center border-t">
            <button
              onClick={goBackToRegister}
              className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center mx-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              ফিরে যান
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerificationPage; 