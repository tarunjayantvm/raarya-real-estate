import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, ArrowUp, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' }
  ];

  return (
    <footer className="bg-dark-light text-white relative overflow-hidden border-t-2 border-gold/20">
      <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img 
                src="https://raarya.com/wp-content/uploads/2024/07/cropped-color-logo.jpeg" 
                alt="Raarya Logo" 
                className="h-12 w-12 rounded-full border-2 border-gold/50"
              />
              <span className="text-2xl font-bold text-gold gold-shimmer tracking-wider">RAARYA</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Coimbatore's premier real estate partner, dedicated to building dreams and crafting lifestyles through innovation and integrity since 2022.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gold transition-transform duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/all-properties" className="footer-link">Properties</Link></li>
              <li><Link to="/home-loans" className="footer-link">Loan Assistance</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Get In Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <span className="text-gray-400">2d, 2nd floor, Sri Ram Towers, Lakshmi Mills, Coimbatore, TN 641018</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold" />
                <span className="text-gray-400">+91 90872 40400</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold" />
                <span className="text-gray-400">info@raarya.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Join Our Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Receive updates on new properties and exclusive offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
              <input 
                type="email"
                placeholder="Enter your email"
                className="w-full bg-dark border border-gold/30 rounded-l-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button type="submit" className="bg-gold text-dark p-2 rounded-r-lg hover:bg-yellow-400 transition-colors duration-300">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Raarya Real Estate. All Rights Reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-gold transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-gold transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 bg-gold text-dark p-3 rounded-full shadow-premium-lg transition-all duration-300 transform ${
          showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;