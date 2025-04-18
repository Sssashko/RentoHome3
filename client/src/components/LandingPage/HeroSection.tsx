import React from 'react';
import Carousel from './Carousel';

const HeroSection: React.FC = () => {
  const images = ['/Home1.webp', '/Home2.webp', '/Home3.webp'];

  return (
    <section className="bg-gray-150 dark:bg-gray-900 pt-16 pb-16">
      {/* increased horizontal padding from px-6 to px-8 (mobile) and lg:px-16 */}
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center px-8 lg:px-16">
        {/* left column */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="mb-6 text-5xl font-bold text-blue-600 dark:text-blue-400">
            Find Your Perfect Home
          </h1>
          <p className="mb-6 text-xl text-gray-700 dark:text-gray-300">
            Discover the best rental listings with an easy search and verified properties.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <a
              href="#"
              className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Start Searching
            </a>
            <a
              href="/listings"
              className="px-8 py-3 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
            >
              View Listings
            </a>
          </div>
        </div>

        {/* right column */}
        <div className="mt-8 w-full lg:mt-0 lg:w-1/2">
          <Carousel images={images} interval={4000} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
