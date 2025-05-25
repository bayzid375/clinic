import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface DoctorCardProps {
  name: string;
  specialty: string;
  image: string;
  degrees: string;
  schedule: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, specialty, image, degrees, schedule }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-green-600 font-medium mb-2">{specialty}</p>
        <p className="text-gray-600 text-sm mb-3">{degrees}</p>
        <p className="text-gray-700 text-sm mb-4">
          <span className="font-medium">সময়সূচী:</span> {schedule}
        </p>
        <Link to="/appointment">
          <Button 
            variant="primary" 
            fullWidth 
            icon={<Calendar className="w-4 h-4" />}
          >
            অ্যাপয়েন্টমেন্ট নিন
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const DoctorsSection: React.FC = () => {
  const doctors = [
    {
      id: 1,
      name: 'ডা. রফিকুল ইসলাম',
      specialty: 'মেডিসিন বিশেষজ্ঞ',
      image: 'https://images.pexels.com/photos/19438561/pexels-photo-19438561/free-photo-of-doctor.jpeg',
      degrees: 'এমবিবিএস, এফসিপিএস (মেডিসিন)',
      schedule: 'রবি - বৃহস্পতি, সকাল ১০টা - দুপুর ২টা'
    },
    {
      id: 2,
      name: 'ডা. নাজমুন নাহার',
      specialty: 'গাইনি বিশেষজ্ঞ',
      image: 'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      degrees: 'এমবিবিএস, এফসিপিএস (গাইনি)',
      schedule: 'শনি - বুধ, বিকাল ৪টা - রাত ৮টা'
    },
    {
      id: 3,
      name: 'ডা. আব্দুল্লাহ আল মামুন',
      specialty: 'হৃদরোগ বিশেষজ্ঞ',
      image: 'https://images.pexels.com/photos/8460094/pexels-photo-8460094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      degrees: 'এমবিবিএস, এমডি (কার্ডিওলজি)',
      schedule: 'শনি - বৃহস্পতি, বিকাল ৫টা - রাত ৯টা'
    },
    {
      id: 4,
      name: 'ডা. ফারজানা আকতার',
      specialty: 'শিশু রোগ বিশেষজ্ঞ',
      image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      degrees: 'এমবিবিএস, এফসিপিএস (শিশু)',
      schedule: 'রবি - বুধ, সকাল ৯টা - দুপুর ১টা'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">আমাদের বিশেষজ্ঞ ডাক্তারগণ</h2>
          <p className="text-gray-600">
            আমাদের ক্লিনিকে দেশের অভিজ্ঞ ও দক্ষ বিশেষজ্ঞ ডাক্তারগণ আপনাদের সেবায় নিয়োজিত আছেন।
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard 
              key={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
              image={doctor.image}
              degrees={doctor.degrees}
              schedule={doctor.schedule}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/doctor-panel">
            <Button variant="outline" size="lg">
              সকল ডাক্তার দেখুন
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;