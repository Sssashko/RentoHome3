import React from 'react';

const Footer = () => (
  <footer className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 py-12">
    <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Logo & About */}
      <div className="flex flex-col items-center md:items-start">
        <div className="flex items-center mb-4">
          <img src="/logo.png" alt="Company Logo" className="w-14 h-14" />
          <span className="ml-3 text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            RentoHome
          </span>
        </div>
        <p className="text-sm leading-relaxed max-w-sm text-center md:text-left">
          Discover premium rental properties designed for comfort and convenience. 
          Experience modern living made effortless with RentoHome.
        </p>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-center md:items-start">
        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Contact Us</h3>
        <p className="mb-2">
          📞 <a href="tel:+1234567890" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            +1 (234) 567-890
          </a>
        </p>
        <p>
          ✉️ <a href="mailto:info@rentohome.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            info@rentohome.com
          </a>
        </p>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col items-center md:items-start">
        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Quick Links</h3>
        <ul className="space-y-2">
          {["About Us", "Services", "Contact", "Privacy Policy"].map((link, idx) => (
            <li key={idx}>
              <a href={`/${link.replace(/\s+/g, "-").toLowerCase()}`} 
                 className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Divider */}
    <div className="container mx-auto px-6 md:px-12 lg:px-20 mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} RentoHome. All Rights Reserved.
      </p>

      {/* Social Links */}
      <div className="flex space-x-5 mt-4 md:mt-0">
        {[
          { name: "Facebook", url: "https://facebook.com", icon: "M22.675 0h-21.35C.596 0 0 .595 0 1.333v21.333C0 23.405.596 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.405 24 22.667V1.333C24 .595 23.405 0 22.675 0z" },
          { name: "Twitter", url: "https://twitter.com", icon: "M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3a9.868 9.868 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.944 13.944 0 0 1 1.671 3.149a4.917 4.917 0 0 0 1.523 6.574 4.902 4.902 0 0 1-2.229-.616v.06a4.918 4.918 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.224.085 4.918 4.918 0 0 0 4.59 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.01-7.512 14.01-14.01 0-.213-.005-.426-.014-.637A10.012 10.012 0 0 0 24 4.557z" },
        ].map(({ name, url, icon }) => (
          <a key={name} href={url} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition" aria-label={name}>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d={icon} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
