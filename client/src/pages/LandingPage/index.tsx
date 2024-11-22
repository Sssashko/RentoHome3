import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center py-16 px-6">
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Find Your Perfect Home
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Discover rental properties that suit your needs with ease. Start exploring
              today and make your next move seamless.
            </p>
            <a
              href="#"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
            >
              Get Started
            </a>
          </div>
          {/* Hero Image */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Hero"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-blue-600 mb-4">
                Easy Search
              </h4>
              <p className="text-gray-600">
                Quickly find properties tailored to your needs with advanced filters.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-blue-600 mb-4">
                Verified Listings
              </h4>
              <p className="text-gray-600">
                All properties are verified for accuracy and availability.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-blue-600 mb-4">
                Affordable Prices
              </h4>
              <p className="text-gray-600">
                Access the best deals on rental properties in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-3xl font-bold mb-6">Ready to Find Your Next Home?</h3>
          <p className="text-lg mb-6">
            Sign up today and start exploring rental properties that match your needs.
          </p>
          <a
            href="#"
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold shadow-lg hover:bg-gray-200"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} RentOHome. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
