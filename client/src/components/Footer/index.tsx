const Footer = () => (
	<footer className="bg-neutral-700 text-white py-10">
	  <div className="container mx-auto px-6 md:px-12 lg:px-16 flex flex-wrap justify-between">
		
		{/* Logo, Company Name, and About Us */}
		<div className="w-full md:w-1/3 mb-6 md:mb-0 text-center md:text-left">
		  <div className="flex items-center justify-center md:justify-start mb-4">
			<img src="/logo.png" alt="Company Logo" className="w-10 h-10" />
			<span className="ml-2 text-xl font-semibold">RentoHome</span>
		  </div>
		  <p className="text-gray-400 text-sm">
			About Us: RentoHome provides quality rental properties with a focus on customer satisfaction. Our mission is to make renting easy, reliable, and trustworthy for everyone.
		  </p>
		</div>
		
		{/* Contact Information */}
		<div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col">
		  <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
		  <p className="text-gray-400">Phone: <a href="tel:+1234567890" className="text-gray-300 hover:text-white">+1 (234) 567-890</a></p>
		  <p className="text-gray-400">Email: <a href="mailto:info@rentohome.com" className="text-gray-300 hover:text-white">info@rentohome.com</a></p>
		</div>
		
		{/* Quick Links */}
		<div className="w-full md:w-1/3">
		  <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
		  <ul className="text-center md:text-left">
			<li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
			<li><a href="/services" className="text-gray-300 hover:text-white">Services</a></li>
			<li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
			<li><a href="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
		  </ul>
		</div>
	  </div>
  
	  {/* Copyright Section */}
	  <div className="mt-10 border-t border-gray-600 text-center pt-4">
		<p className="text-gray-500 text-sm">© 2024 RentoHome. All Rights Reserved.</p>
	  </div>
	</footer>
);
  
export default Footer;
