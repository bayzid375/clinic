import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, location, text, rating, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-600 text-sm">{location}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'কামরুল হাসান',
      location: 'মিরপুর, ঢাকা',
      text: 'আমি এখানে হার্টের চিকিৎসা নিয়েছি। ডাক্তারের পরামর্শ ও সেবায় খুব সন্তুষ্ট। ক্লিনিকের পরিবেশ ও স্টাফদের আচরণ খুবই ভালো।',
      rating: 5,
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      name: 'ফারিহা আক্তার',
      location: 'গুলশান, ঢাকা',
      text: 'অনলাইনে অ্যাপয়েন্টমেন্ট নেওয়া থেকে শুরু করে চিকিৎসা সেবা পাওয়া পর্যন্ত সবকিছু সহজ ও দ্রুত। বিশেষ করে ডাঃ নাজমুন নাহার এর চিকিৎসায় আমি সম্পূর্ণ সুস্থ হয়েছি।',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      name: 'আব্দুর রহিম',
      location: 'উত্তরা, ঢাকা',
      text: 'ডায়াবেটিস নিয়ে দীর্ঘদিন ভুগছিলাম। এখানে চিকিৎসা নেওয়ার পর থেকে রোগ নিয়ন্ত্রণে আছে। ডাক্তার রফিকুল ইসলাম খুব ভালো পরামর্শ দিয়েছেন।',
      rating: 4,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">রোগীদের অভিমত</h2>
          <p className="text-gray-600">
            আমাদের ক্লিনিক থেকে সেবা নিয়ে সন্তুষ্ট রোগীদের মতামত জানুন।
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Testimonial 
              key={testimonial.id}
              name={testimonial.name}
              location={testimonial.location}
              text={testimonial.text}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;