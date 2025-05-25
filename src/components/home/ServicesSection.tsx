import React from 'react';
import { Stethoscope, PillIcon, FlaskRound as Flask, Ambulance, Calendar, HeartPulse, Brain, Activity } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <Card className="h-full transition-transform duration-300 hover:-translate-y-2">
      <CardContent className="flex flex-col items-center text-center p-6">
        <div className="p-3 bg-green-100 text-green-600 rounded-full mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'সাধারণ চিকিৎসা',
      description: 'ডায়াবেটিস, উচ্চ রক্তচাপসহ সাধারণ রোগের চিকিৎসা এবং পরামর্শ প্রদান।',
      icon: <Stethoscope className="h-6 w-6" />
    },
    {
      id: 2,
      title: 'হৃদরোগ বিভাগ',
      description: 'হার্ট ডিজিজ, ইসিজি, ইকোকার্ডিওগ্রাম এবং উন্নত হৃদরোগ চিকিৎসা সেবা।',
      icon: <HeartPulse className="h-6 w-6" />
    },
    {
      id: 3,
      title: 'নিউরোলজি',
      description: 'মাথাব্যথা, মৃগীরোগ, পক্ষাঘাত, পারকিনসন্স রোগের চিকিৎসা সেবা।',
      icon: <Brain className="h-6 w-6" />
    },
    {
      id: 4,
      title: 'ফার্মেসি সেবা',
      description: 'সাশ্রয়ী মূল্যে গুণগত ওষুধ এবং প্রেসক্রিপশন সেবা।',
      icon: <PillIcon className="h-6 w-6" />
    },
    {
      id: 5,
      title: 'ডায়াগনস্টিক টেস্ট',
      description: 'রক্ত পরীক্ষা, ইউরিন টেস্ট, আল্ট্রাসাউন্ডসহ সকল ধরনের ল্যাব টেস্ট।',
      icon: <Flask className="h-6 w-6" />
    },
    {
      id: 6,
      title: 'অ্যাম্বুলেন্স সেবা',
      description: '২৪ ঘন্টা অ্যাম্বুলেন্স সেবা, জরুরি সময়ে রোগী পরিবহন।',
      icon: <Ambulance className="h-6 w-6" />
    },
    {
      id: 7,
      title: 'অনলাইন অ্যাপয়েন্টমেন্ট',
      description: 'সহজে অনলাইনে ডাক্তার অ্যাপয়েন্টমেন্ট বুকিং করুন।',
      icon: <Calendar className="h-6 w-6" />
    },
    {
      id: 8,
      title: 'হেলথ চেকআপ',
      description: 'নিয়মিত স্বাস্থ্য পরীক্ষা এবং পূর্ণাঙ্গ মেডিকেল চেকআপ প্যাকেজ।',
      icon: <Activity className="h-6 w-6" />
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">আমাদের সেবাসমূহ</h2>
          <p className="text-gray-600">
            আমরা আপনার স্বাস্থ্য সমস্যার সমাধান এবং ভালো থাকার জন্য বিভিন্ন ধরনের চিকিৎসা সেবা প্রদান করি।
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;