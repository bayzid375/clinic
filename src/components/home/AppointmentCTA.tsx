import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';
import Button from '../ui/Button';

const AppointmentCTA: React.FC = () => {
  return (
    <section className="py-16 bg-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">আজই আপনার অ্যাপয়েন্টমেন্ট বুক করুন</h2>
            <p className="text-gray-100 mb-8 text-lg">
              আপনার স্বাস্থ্য সমস্যার সমাধানে আমাদের বিশেষজ্ঞ ডাক্তারগণ প্রস্তুত। অনলাইনে সহজেই অ্যাপয়েন্টমেন্ট বুক করুন অথবা কল করুন আমাদের হেল্পলাইনে।
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/appointment">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  icon={<Calendar className="w-5 h-5" />}
                >
                  অ্যাপয়েন্টমেন্ট বুক করুন
                </Button>
              </Link>
              
              <a href="tel:+8801712345678">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                  icon={<Phone className="w-5 h-5" />}
                >
                  +৮৮০ ১৭১২ ৩৪৫৬৭৮
                </Button>
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <img 
              src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Doctor consultation" 
              className="rounded-lg shadow-lg object-cover h-96 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentCTA;