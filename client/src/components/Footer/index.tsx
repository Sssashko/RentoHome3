const Footer = () => (
	<footer className="bg-neutral-700 text-white py-12 mt-12">
	  <div className="container mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-10">
		
		{/* Logo, Company Name, and About Us */}
		<div className="md:w-1/3 flex flex-col items-center md:items-start">
		  <div className="flex items-center mb-4">
			<img src="/logo.png" alt="Company Logo" className="w-12 h-12" />
			<span className="ml-3 text-2xl font-semibold">RentoHome</span>
		  </div>
		  <p className="text-gray-400 text-sm max-w-xs mt-2">
			About Us: RentoHome provides quality rental properties with a focus on customer satisfaction. Our mission is to make renting easy, reliable, and trustworthy for everyone.
		  </p>
		</div>
		
		{/* Contact Information */}
		<div className="md:w-1/3 flex flex-col items-center md:items-start">
		  <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
		  <p className="text-gray-400 mb-1">Phone: <a href="tel:+1234567890" className="text-gray-300 hover:text-white">+1 (234) 567-890</a></p>
		  <p className="text-gray-400">Email: <a href="mailto:info@rentohome.com" className="text-gray-300 hover:text-white">info@rentohome.com</a></p>
		</div>
		
		{/* Quick Links */}
		<div className="md:w-1/3 flex flex-col items-center md:items-start">
		  <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
		  <ul className="space-y-1">
			<li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
			<li><a href="/services" className="text-gray-300 hover:text-white">Services</a></li>
			<li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
			<li><a href="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
		  </ul>
		</div>
	  </div>
  
	  {/* Copyright Section */}
	  <div className="mt-10 border-t border-gray-600 pt-4 text-center">
		<p className="text-gray-500 text-sm">© 2024 RentoHome. All Rights Reserved.</p>
	  </div>
	</footer>
);
  
export default Footer;
