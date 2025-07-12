import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Search, Bell, Menu, X, ChevronDown, User, Heart, LogOut, Building, Tag, Home, Briefcase, Handshake } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: ReactNode;
  hasDropdown?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, hasDropdown = false, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center text-white hover:text-gold transition-all duration-300 font-medium relative group"
  >
    {children}
    {hasDropdown && <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => (
  <div className="absolute top-full left-0 mt-2 w-56 bg-dark-light rounded-lg shadow-premium-lg border border-gold/10 py-2 animate-fade-in-up">
    {children}
  </div>
);

interface DropdownLinkProps {
  to: string;
  icon: React.ElementType;
  children: ReactNode;
}

const DropdownLink: React.FC<DropdownLinkProps> = ({ to, icon, children }) => {
  const Icon = icon;
  return (
    <Link to={to} className="flex items-center px-4 py-2 text-white hover:bg-gold/10 hover:text-gold transition-colors duration-200">
      <Icon className="w-4 h-4 mr-3" />
      <span>{children}</span>
    </Link>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setUserMenuOpen(false);
    if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) setServicesMenuOpen(false);
  };

  useEffect(() => {
    if (userMenuOpen || servicesMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen, servicesMenuOpen]);

  const handleLogin = () => {
    setUserMenuOpen(false);
    navigate('/login');
  };

  const handleSignOut = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-dark text-white border-b border-gold/20 shadow-premium-lg">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://raarya.com/wp-content/uploads/2024/07/cropped-color-logo.jpeg" 
              alt="Raarya Logo" 
              className="w-12 h-12 rounded-full object-cover border-2 border-gold/50"
            />
            <span className="text-2xl font-bold text-gold gold-shimmer tracking-wider">RAARYA</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            
            {/* Services Dropdown */}
            <div className="relative" ref={servicesMenuRef}>
              <button onClick={() => setServicesMenuOpen(!servicesMenuOpen)} className="flex items-center text-white hover:text-gold transition-all duration-300 font-medium relative group">
                Services
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${servicesMenuOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
              {servicesMenuOpen && (
                <DropdownMenu>
                  <DropdownLink to="/buy" icon={Tag}>Buy a Property</DropdownLink>
                  <DropdownLink to="/sell" icon={Building}>Sell a Property</DropdownLink>
                  <DropdownLink to="/rent" icon={Home}>Rent a Property</DropdownLink>
                  <DropdownLink to="/home-loans" icon={Handshake}>Home Loans</DropdownLink>
                </DropdownMenu>
              )}
            </div>
            
            <NavLink to="/all-properties">Properties</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="premium-button text-dark font-bold rounded-lg px-6 py-2 shadow-lg hover:scale-105 transition-transform duration-300" onClick={() => navigate('/sell')}>
              Post Property
            </button>
            <button className="bg-dark/50 p-2 rounded-full hover:bg-gold hover:text-dark transition-all duration-300" onClick={() => setShowNotifications(true)}>
              <Bell className="h-5 w-5" />
            </button>
            
            {/* User Icon with Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-dark font-bold text-lg focus:outline-none ring-2 ring-gold/50 hover:ring-gold transition-all"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                U
              </button>
              {userMenuOpen && (
                <DropdownMenu>
                  {isLoggedIn ? (
                    <>
                      <DropdownLink to="/profile" icon={User}>Profile</DropdownLink>
                      <DropdownLink to="/wishlist" icon={Heart}>Wishlist</DropdownLink>
                      <button
                        className="flex items-center w-full text-left px-4 py-2 text-white hover:bg-gold/10 hover:text-gold transition-colors duration-200"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <button
                      className="flex items-center w-full text-left px-4 py-2 text-white hover:bg-gold/10 hover:text-gold transition-colors duration-200"
                      onClick={handleLogin}
                    >
                      <User className="w-4 h-4 mr-3" />
                      <span>Login / Register</span>
                    </button>
                  )}
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${isMenuOpen ? 'max-h-screen py-4' : 'max-h-0'}`}>
           <nav className="flex flex-col space-y-4 px-4">
              <Link to="/" className="text-white hover:text-gold transition-colors duration-200 py-2">Home</Link>
              <Link to="/about" className="text-white hover:text-gold transition-colors duration-200 py-2">About Us</Link>
              <Link to="/buy" className="text-white hover:text-gold transition-colors duration-200 py-2">Buy</Link>
              <Link to="/sell" className="text-white hover:text-gold transition-colors duration-200 py-2">Sell</Link>
              <Link to="/rent" className="text-white hover:text-gold transition-colors duration-200 py-2">Rent</Link>
              <Link to="/home-loans" className="text-white hover:text-gold transition-colors duration-200 py-2">Home Loans</Link>
              <Link to="/all-properties" className="text-white hover:text-gold transition-colors duration-200 py-2">Properties</Link>
              <Link to="/contact" className="text-white hover:text-gold transition-colors duration-200 py-2">Contact</Link>
           </nav>
        </div>

        {/* Notification Modal */}
        {showNotifications && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-dark-light rounded-2xl shadow-lg border-2 border-gold max-w-md w-full p-8 relative animate-fade-in-up">
              <button className="absolute top-4 right-4 text-gold hover:text-white text-2xl font-bold" onClick={() => setShowNotifications(false)}>&times;</button>
              <h2 className="text-xl font-bold text-gold mb-4 flex items-center gap-2"><Bell className="h-6 w-6" /> Notifications</h2>
              <div className="text-white/80 text-base">
                <p>No new notifications.</p>
                {/* You can map over notifications here in the future */}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;