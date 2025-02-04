import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Main Content */}
      <section className="container mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="flex flex-col lg:flex-row items-center mb-16 gap-8">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img
              src="/Home1.webp"
              alt="RentoHome Illustration"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          {/* Text */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 mb-6">
              RentoHome is a forward-thinking platform dedicated to 
              simplifying the rental process for everyone. We believe 
              that finding a new home or tenant should be effortless, 
              transparent, and enjoyable. Our team is passionate about 
              blending innovative technology with a human touch 
              to deliver the best user experience possible.
            </p>
            <p className="text-gray-700">
              From verified listings to personalized support, we’re here 
              to make renting safe, efficient, and rewarding. Whether 
              you’re looking for a cozy studio or managing multiple properties, 
              RentoHome is your trusted partner every step of the way.
            </p>
          </div>
        </div>

        {/* Our Values / Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Innovation</h3>
            <p className="text-gray-700">
              We stay ahead of the curve, constantly evolving our platform 
              to meet your changing needs. 
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Reliability</h3>
            <p className="text-gray-700">
              From verified listings to secure transactions, we prioritize 
              trust and confidence in every interaction.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Community</h3>
            <p className="text-gray-700">
              We’re more than a platform— we’re a community of renters and 
              owners working together for a better rental experience.
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutUs;
