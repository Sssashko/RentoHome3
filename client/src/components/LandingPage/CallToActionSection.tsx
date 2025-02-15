import React from 'react';

const CallToActionSection: React.FC = () => (
  <section className="bg-white dark:bg-gray-800 py-16">
    <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
      <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
        Ready to Get Started?
      </h2>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
        Sign up now to access exclusive rental listings and enjoy a seamless renting experience.
      </p>
      <a
        href="/signup"
        className="px-10 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
      >
        Sign Up
      </a>
    </div>
  </section>
);

export default CallToActionSection;
