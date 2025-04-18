import React from 'react';
import FadeIn from '../../components/LandingPage/FadeIn';
// import Header from '../../components/LandingPage/Header';
import HeroSection from '../../components/LandingPage/HeroSection';
import FeaturesSection from '../../components/LandingPage/FeaturesSection';
import CallToActionSection from '../../components/LandingPage/CallToActionSection';
import Homes from '../../components/LandingPage/Homes';
import FAQ from 'components/LandingPage/FAQ';
// import Footer from '../../components/Footer';

const LandingPage: React.FC = () => (
  <FadeIn>
    <div className="min-h-screen bg-gray-100">
      {/* <Header /> */}
      <main className="pt-">
        <HeroSection />
        <FeaturesSection />
        <Homes />
        <FAQ />
        <CallToActionSection />
        
      </main>
    </div>
  </FadeIn>
);

export default LandingPage;
