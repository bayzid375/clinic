import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-700 to-green-900 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              স্বাস্থ্যসেবা ক্লিনিক
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              আপনার বিশ্বস্ত স্বাস্থ্যসেবা পার্টনার
            </p>
            <p className="text-gray-200 mb-8 max-w-md mx-auto md:mx-0">
              আমাদের অভিজ্ঞ চিকিৎসক দল এবং আধুনিক চিকিৎসা সুবিধা দিয়ে আমরা আপনার ও আপনার পরিবারের স্বাস্থ্যসেবা নিশ্চিত করি।
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
                  className="bg-white/10 border-white text-white hover:bg-white/20"
                  icon={<Phone className="w-5 h-5" />}
                >
                  +৮৮০ ১৭১২ ৩৪৫৬৭৮
                </Button>
              </a>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">দ্রুত অ্যাপয়েন্টমেন্ট</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">নাম</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="আপনার পূর্ণ নাম"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">মোবাইল নাম্বার</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="০১৭XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">বিভাগ</label>
                  <select className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    <option value="medicine">মেডিসিন</option>
                    <option value="cardiology">কার্ডিওলজি</option>
                    <option value="gynecology">গাইনি</option>
                    <option value="neurology">নিউরোলজি</option>
                    <option value="orthopedics">অর্থোপেডিক্স</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">তারিখ</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <Button variant="secondary" fullWidth>অ্যাপয়েন্টমেন্ট নিশ্চিত করুন</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative bg-green-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">১০+</span>
              <span className="text-gray-200">অভিজ্ঞ ডাক্তার</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">২৪/৭</span>
              <span className="text-gray-200">এমার্জেন্সি সেবা</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">৫০০০+</span>
              <span className="text-gray-200">সন্তুষ্ট রোগী</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;