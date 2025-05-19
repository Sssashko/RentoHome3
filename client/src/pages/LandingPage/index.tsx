import React from 'react'
import FadeIn from '../../components/LandingPage/FadeIn'
// import Header from '../../components/LandingPage/Header'
import HeroSection from '../../components/LandingPage/HeroSection'
import FeaturesSection from '../../components/LandingPage/FeaturesSection'
import CallToActionSection from '../../components/LandingPage/CallToActionSection'
import Homes from '../../components/LandingPage/Homes'
import FAQ from 'components/LandingPage/FAQ'

const LandingPage: React.FC = () => (
  // wrapper adds fade-in animation to the whole page
  <FadeIn>
    <div className="min-h-screen bg-gray-100">
      {/* optional header component */}
      {/* <Header /> */}
      <main>
        {/* top hero banner with headline and CTA */}
        <HeroSection />
        {/* highlights key features of the platform */}
        <FeaturesSection />
        {/* showcase of available homes */}
        <Homes />
        {/* frequently asked questions section */}
        <FAQ />
        {/* final call-to-action section */}
        <CallToActionSection />
      </main>
      {/* optional footer for links and info */}
      {/* <Footer /> */}
    </div>
  </FadeIn>
)

export default LandingPage
