import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">স্বাস্থ্যসেবা ক্লিনিক</h3>
            <p className="mb-4 text-gray-300">আপনার বিশ্বস্ত স্বাস্থ্যসেবা পার্টনার</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-green-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-green-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-green-300 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">যোগাযোগ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span>১২৩ নূর সড়ক, মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+৮৮০ ১৭১২ ৩৪৫৬৭৮</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@swasthoseba.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>সকাল ৯টা - রাত ৯টা (প্রতিদিন)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">দ্রুত লিঙ্ক</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">হোম</Link>
              </li>
              <li>
                <Link to="/patient-portal" className="text-gray-300 hover:text-white transition-colors">রোগী পোর্টাল</Link>
              </li>
              <li>
                <Link to="/doctor-panel" className="text-gray-300 hover:text-white transition-colors">ডাক্তার প্যানেল</Link>
              </li>
              <li>
                <Link to="/pharmacy-lab" className="text-gray-300 hover:text-white transition-colors">ফার্মেসি ও ল্যাব</Link>
              </li>
              <li>
                <Link to="/appointment" className="text-gray-300 hover:text-white transition-colors">অ্যাপয়েন্টমেন্ট</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">সেবাসমূহ</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white transition-colors">ডায়াগনস্টিক টেস্ট</li>
              <li className="text-gray-300 hover:text-white transition-colors">অনলাইন কনসালটেশন</li>
              <li className="text-gray-300 hover:text-white transition-colors">ফার্মেসি সেবা</li>
              <li className="text-gray-300 hover:text-white transition-colors">এমবুলেন্স সেবা</li>
              <li className="text-gray-300 hover:text-white transition-colors">হোম ভিজিট</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} স্বাস্থ্যসেবা ক্লিনিক | সর্বস্বত্ব সংরক্ষিত
          </p>
          <div className="mt-4 md:mt-0">
            <img src="https://i.ibb.co/yVGvtxX/bd-payment-methods.png" alt="Payment Methods" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;