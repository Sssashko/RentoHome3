import React from 'react';
import Carousel from './Carousel';

const HeroSection: React.FC = () => {
  const images = [
    '/Home1.webp',
    '/Home2.webp',
    '/Home3.webp',
  ];

  return (
    <section className="bg-gray-150 pt-24 pb-16">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-6">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">Find Your Perfect Home</h1>
          <p className="text-xl text-gray-700 mb-6">
            Discover the best rental listings with an easy search and verified properties.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <a
              href="#"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Start Searching
            </a>
            <a
              href="listings"
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              View Listings
            </a>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <Carousel images={images} interval={4000} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


