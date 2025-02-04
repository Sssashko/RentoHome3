import React from 'react';

const FeaturesSection: React.FC = () => (
  <section id="features" className="bg-white py-16">
    <div className="container mx-auto px-6 md:px-12 lg:px-16">
      <h2 className="text-center text-4xl font-bold text-blue-600 mb-4">
        Why RentoHome?
      </h2>
      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
        Explore our platform to see how easy it is to find your perfect rental property. 
        We provide quality listings, an educational approach, and top-notch support.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="p-6 bg-white rounded-lg shadow transition-transform hover:scale-105">
          <img
            src="/time.png"
            alt="Easy"
            className="w-16 h-16 mb-6 mx-auto"
          />
          <h3 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            Simplicity
          </h3>
          <p className="text-gray-700 text-center">
            Quickly buy, rent, or list properties using our intuitive interface and 
            powerful filters. Renting has never been easier!
          </p>
          <div className="text-center mt-6">
            <a
              href="#"
              className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 bg-white rounded-lg shadow transition-transform hover:scale-105">
          <img
            src="/education.png"
            alt="Education"
            className="w-16 h-16 mb-6 mx-auto"
          />
          <h3 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            Education
          </h3>
          <p className="text-gray-700 text-center">
            Real estate can seem complicated. Discover more about renting, property 
            management, and get expert tips along the way.
          </p>
          <div className="text-center mt-6">
            <a
              href="#"
              className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 bg-white rounded-lg shadow transition-transform hover:scale-105">
          <img
            src="/support.png"
            alt="Service"
            className="w-16 h-16 mb-6 mx-auto"
          />
          <h3 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            Support
          </h3>
          <p className="text-gray-700 text-center">
            Get instant answers to your questions or reach us by chat, phone, or email. 
            We’re here for you 24/7.
          </p>
          <div className="text-center mt-6">
            <a
              href="/support"
              className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
