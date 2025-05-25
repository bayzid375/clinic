import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import DoctorsSection from '../components/home/DoctorsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AppointmentCTA from '../components/home/AppointmentCTA';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'স্বাস্থ্যসেবা ক্লিনিক - আপনার বিশ্বস্ত স্বাস্থ্যসেবা পার্টনার';
  }, []);

  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <DoctorsSection />
      <TestimonialsSection />
      <AppointmentCTA />
    </div>
  );
};

export default HomePage;