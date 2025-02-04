import React from 'react';

const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
    <div className="container mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Logo & About */}
      <div className="flex flex-col items-center md:items-start">
        <div className="flex items-center mb-4">
          <img src="/logo.png" alt="Company Logo" className="w-12 h-12" />
          <span className="ml-3 text-2xl font-bold">RentoHome</span>
        </div>
        <p className="text-gray-300 text-sm">
          RentoHome offers premium rental properties with a focus on comfort and convenience. Experience modern living made effortless.
        </p>
      </div>
      {/* Contact Info */}
      <div className="flex flex-col items-center md:items-start">
        <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
        <p className="text-gray-300 mb-1">
          Phone: <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
        </p>
        <p className="text-gray-300">
          Email: <a href="mailto:info@rentohome.com" className="hover:text-white transition-colors">info@rentohome.com</a>
        </p>
      </div>
      {/* Quick Links */}
      <div className="flex flex-col items-center md:items-start">
        <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a>
          </li>
          <li>
            <a href="/services" className="text-gray-300 hover:text-white transition-colors">Services</a>
          </li>
          <li>
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </li>
          <li>
            <a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </div>

    <div className="container mx-auto px-6 md:px-12 lg:px-16 mt-10 border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between">
      <p className="text-gray-400 text-sm">© {new Date().getFullYear()} RentoHome. All Rights Reserved.</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35C.596 0 0 .595 0 1.333v21.333C0 23.405.596 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.405 24 22.667V1.333C24 .595 23.405 0 22.675 0z" />
          </svg>
        </a>
        <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3a9.868 9.868 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.944 13.944 0 0 1 1.671 3.149a4.917 4.917 0 0 0 1.523 6.574 4.902 4.902 0 0 1-2.229-.616v.06a4.918 4.918 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.224.085 4.918 4.918 0 0 0 4.59 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.01-7.512 14.01-14.01 0-.213-.005-.426-.014-.637A10.012 10.012 0 0 0 24 4.557z" />
          </svg>
        </a>
        <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.343 3.608 1.318.975.975 1.256 2.242 1.318 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.343 2.633-1.318 3.608-.975.975-2.242 1.256-3.608 1.318-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.343-3.608-1.318-.975-.975-1.256-2.242-1.318-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.343-2.633 1.318-3.608.975-.975 2.242-1.256 3.608-1.318C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.015 7.052.072 5.775.129 4.601.478 3.635 1.444 2.67 2.409 2.321 3.584 2.264 4.86.015 8.332 0 8.741 0 12s.015 3.668.072 4.948c.057 1.276.406 2.451 1.372 3.417.965.965 2.14 1.315 3.417 1.372C8.332 23.985 8.741 24 12 24s3.668-.015 4.948-.072c1.276-.057 2.451-.406 3.417-1.372.965-.965 1.315-2.14 1.372-3.417.057-1.28.072-1.689.072-4.948s-.015-3.668-.072-4.948c-.057-1.276-.406-2.451-1.372-3.417-.965-.965-2.14-1.315-3.417-1.372C15.668.015 15.259 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
