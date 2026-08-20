import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-400">Blinkeyit</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Your one-stop destination for fresh groceries delivered to your door in minutes. Quality you can trust, speed you will love.
          </p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-green-400 transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-green-400 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-green-400 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-green-400 transition-colors"><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-gray-300 text-sm">
            <li><Link to="/" className="hover:text-green-400 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
            <li><Link to="/offers" className="hover:text-green-400 transition-colors">Offers</Link></li>
            <li><Link to="/contact" className="hover:text-green-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="flex flex-col gap-2 text-gray-300 text-sm">
            <li><Link to="/faq" className="hover:text-green-400 transition-colors">FAQ</Link></li>
            <li><Link to="/terms" className="hover:text-green-400 transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/returns" className="hover:text-green-400 transition-colors">Return Policy</Link></li>
          </ul>
        </div>

        {/* App Download */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Download App</h3>
          <p className="text-gray-300 text-sm mb-4">
            Get the Blinkeyit app for the best mobile experience and exclusive offers.
          </p>
          <div className="flex flex-col gap-3">
            <button className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-2 flex items-center gap-2 transition-colors w-full sm:w-auto">
              <span className="text-left leading-tight">
                <span className="block text-xs text-gray-400">Download on the</span>
                <span className="block text-sm font-semibold">App Store</span>
              </span>
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-2 flex items-center gap-2 transition-colors w-full sm:w-auto">
              <span className="text-left leading-tight">
                <span className="block text-xs text-gray-400">GET IT ON</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </span>
            </button>
          </div>
        </div>

      </div>

      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Blinkeyit Grocery Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
