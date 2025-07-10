import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/patient-portal'); // Redirect to patient portal for next steps
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600">
            <CheckCircle size={40} />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">পেমেন্ট সফল হয়েছে!</h1>
        <p className="text-gray-600 text-lg mb-6">
          ধন্যবাদ! আপনার অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে। আপনার অ্যাপয়েন্টমেন্টের বিবরণ দেখতে ড্যাশবোর্ডে যান।
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Link
            to="/patient-portal"
            className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center"
          >
            <Home className="inline-block mr-2" size={18} />
            ড্যাশবোর্ডে যান
          </Link>
          <Link
            to="/appointment"
            className="w-full sm:w-auto border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center"
          >
            নতুন অ্যাপয়েন্টমেন্ট
            <ArrowRight className="inline-block ml-2" size={18} />
          </Link>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          স্বয়ংক্রিয়ভাবে ড্যাশবোর্ডে নিয়ে যাওয়া হবে {countdown} সেকেন্ডে...
        </p>
      </div>
    </div>
  );
}