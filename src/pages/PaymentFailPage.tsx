import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XCircle, Home, RefreshCw } from 'lucide-react';

export default function PaymentFailPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/appointment'); // Redirect to try again
    }, 10000);

    return () => {
      clearInterval(countdownTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-4">
      <div className="bg-white max-w-xl w-full p-8 md:p-12 rounded-2xl shadow-lg text-center">
        <div className="mx-auto mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600">
            <XCircle size={40} />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">পেমেন্ট ব্যর্থ হয়েছে!</h1>
        <p className="text-gray-600 text-lg mb-6">
          দুঃখিত, আপনার পেমেন্ট সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন অথবা আপনার কার্ডের তথ্য যাচাই করুন।
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Link
            to="/appointment"
            className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center"
          >
            <RefreshCw className="inline-block mr-2" size={18} />
            আবার চেষ্টা করুন
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center"
          >
            <Home className="inline-block mr-2" size={18} />
            হোমে ফিরে যান
          </Link>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          স্বয়ংক্রিয়ভাবে অ্যাপয়েন্টমেন্ট পেজে নিয়ে যাওয়া হবে {countdown} সেকেন্ডে...
        </p>
      </div>
    </div>
  );
}