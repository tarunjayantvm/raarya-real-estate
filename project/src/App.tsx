import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PriceRangeFilter from './components/PriceRangeFilter';
import FeaturedProperties from './components/FeaturedProperties';
import TestimonialsSection from './components/TestimonialsSection';
import PartnersSection from './components/PartnersSection';
import Footer from './components/Footer';
import UserLogin from './components/UserLogin';
import BuyPage from './components/BuyPage';
import HomeLoansPage from './components/HomeLoansPage';
import About from './components/About';
import RentPage from './components/RentPage';
import SellPage from './components/SellPage';
import Contact from './components/Contact';
import PropertiesPage from './components/PropertiesPage';
import PropertyDetailsPage from './components/PropertyDetailsPage';
import AdminPropertiesPage from './components/AdminPropertiesPage';

function MainSite() {
  return (
    <div className="min-h-screen bg-transparent font-lexend overflow-x-hidden">
      <Header />
      <HeroSection />
      
      {/* Stats Section - Enhanced */}
      <section className="py-14 md:py-20 bg-dark relative overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gold/5 rounded-full animate-float"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/3 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 text-center">
            {[{label:'Properties Listed',value:500,icon:'M17 8l4 4-4 4M3 12h18'},{label:'Happy Clients',value:200,icon:'M17 8l4 4-4 4M3 12h18'},{label:'Years Experience',value:10,icon:'M17 8l4 4-4 4M3 12h18'},{label:'Top Locations',value:15,icon:'M17 8l4 4-4 4M3 12h18'}].map((stat, i) => (
              <AnimatedStat key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} delay={i * 200} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Top Projects Section (replaces Info Section) */}
      <section className="py-16 bg-dark-light relative overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full animate-float"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/3 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gold mb-4 gold-shimmer">Top Projects</h2>
            <p className="text-white text-lg max-w-2xl mx-auto">Explore our most sought-after real estate projects, handpicked for quality, location, and lifestyle. Each project features real images and verified details.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Example Project Cards - Replace with real data as needed */}
            <div className="bg-dark rounded-xl shadow-lg overflow-hidden border border-gold/10 hover:shadow-gold/20 transition-all">
              <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Luxury Villa" className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gold mb-2">Raarya Heights</h3>
                <p className="text-white/90 mb-2">Luxury 4BHK Villas in Saravanampatti</p>
                <div className="flex items-center text-gold mb-2">
                  <span className="mr-4">₹2.5 Cr</span>
                  <span>2,200 sq ft</span>
                </div>
                <div className="text-gray-300 text-sm">Ready to move | Gated Community | Clubhouse</div>
              </div>
            </div>
            <div className="bg-dark rounded-xl shadow-lg overflow-hidden border border-gold/10 hover:shadow-gold/20 transition-all">
              <img src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Modern Apartment" className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gold mb-2">Green Residency</h3>
                <p className="text-white/90 mb-2">Premium 3BHK Apartments in Peelamedu</p>
                <div className="flex items-center text-gold mb-2">
                  <span className="mr-4">₹1.8 Cr</span>
                  <span>1,450 sq ft</span>
                </div>
                <div className="text-gray-300 text-sm">Swimming Pool | Gym | 24x7 Security</div>
              </div>
            </div>
            <div className="bg-dark rounded-xl shadow-lg overflow-hidden border border-gold/10 hover:shadow-gold/20 transition-all">
              <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Commercial Space" className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gold mb-2">Central Business Park</h3>
                <p className="text-white/90 mb-2">Premium Commercial Spaces in Avinashi Road</p>
                <div className="flex items-center text-gold mb-2">
                  <span className="mr-4">₹3.2 Cr</span>
                  <span>3,500 sq ft</span>
                </div>
                <div className="text-gray-300 text-sm">Grade A Offices | Ample Parking | Prime Location</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedProperties />
      <TestimonialsSection />
      <PartnersSection />
      <Footer />
    </div>
  );
}

function App() {
  const [showBulbTip, setShowBulbTip] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Preload critical images
    const criticalImages = [
      'https://raarya.com/wp-content/uploads/2024/06/premium-house-property-coimbatore-1.jpg',
      'https://raarya.com/wp-content/uploads/2024/07/cropped-color-logo.jpeg'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <div className="site-bg" />
      <div className="site-bg-fade" />
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/home-loans" element={<HomeLoansPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-properties" element={<PropertiesPage />} />
        <Route path="/property/:id" element={<PropertyDetailsPage />} />
        <Route path="/admin-properties" element={<AdminPropertiesPage />} />
        <Route path="/*" element={<MainSite />} />
      </Routes>
      {/* WhatsApp Floating Button (Bottom Left, Official Style) - Only show if not on admin panel */}
      {location.pathname !== '/admin-properties' && (
        <a
          href="https://wa.me/919087240400"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed left-6 bottom-6 z-50"
          aria-label="Chat with us on WhatsApp"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
        >
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center border-4 border-white">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#25D366' }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-8 h-8"
                draggable="false"
              />
            </div>
          </div>
        </a>
      )}
      {/* Bulb Floating Button (above WhatsApp) - Only on Properties Page */}
      {location.pathname === '/all-properties' && (
        <div className="fixed left-8 bottom-28 z-50 flex flex-col items-center">
          <button
            aria-label="Show Compare Tip"
            className="focus:outline-none"
            onClick={() => setShowBulbTip(true)}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            {/* Gold Glowing Bulb SVG */}
            <span className="animate-glow">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#glow)">
                  <path d="M24 6C15.1634 6 8 13.1634 8 22C8 27.5228 11.4386 32.1952 16.25 34.25V38C16.25 39.5188 17.4812 40.75 19 40.75H29C30.5188 40.75 31.75 39.5188 31.75 38V34.25C36.5614 32.1952 40 27.5228 40 22C40 13.1634 32.8366 6 24 6Z" stroke="#FFD700" strokeWidth="3" fill="#FFD700" fillOpacity="0.15"/>
                  <rect x="20" y="42" width="8" height="2" rx="1" fill="#FFD700" />
                  <rect x="18" y="44" width="12" height="2" rx="1" fill="#FFD700" />
                  <circle cx="24" cy="22" r="2.5" fill="#FFD700" />
                  {/* Rays */}
                  <rect x="23" y="0" width="2" height="6" rx="1" fill="#FFD700" />
                  <rect x="23" y="42" width="2" height="6" rx="1" fill="#FFD700" />
                  <rect x="42" y="23" width="6" height="2" rx="1" fill="#FFD700" />
                  <rect x="0" y="23" width="6" height="2" rx="1" fill="#FFD700" />
                  <rect x="36.8492" y="36.8492" width="2" height="6" rx="1" transform="rotate(-45 36.8492 36.8492)" fill="#FFD700" />
                  <rect x="9.15076" y="9.15076" width="2" height="6" rx="1" transform="rotate(-45 9.15076 9.15076)" fill="#FFD700" />
                  <rect x="36.8492" y="5.15076" width="2" height="6" rx="1" transform="rotate(45 36.8492 5.15076)" fill="#FFD700" />
                  <rect x="9.15076" y="32.8492" width="2" height="6" rx="1" transform="rotate(45 9.15076 32.8492)" fill="#FFD700" />
                </g>
                <defs>
                  <filter id="glow" x="-10" y="-10" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </span>
          </button>
          {/* Popup Message */}
          {showBulbTip && (
            <div className="mt-4 bg-dark-light/95 border border-gold/80 shadow-xl rounded-2xl px-6 py-5 max-w-xs w-[320px] text-gold animate-fade-in-up relative flex flex-col items-center" style={{ boxShadow: '0 4px 32px 0 rgba(212,180,84,0.18)' }}>
              <button
                className="absolute top-2 right-2 text-gold/70 hover:text-gold text-lg font-bold rounded-full p-0.5 transition"
                onClick={() => setShowBulbTip(false)}
                title="Dismiss"
                style={{ lineHeight: 1 }}
              >
                ×
              </button>
              <div className="flex items-center mb-2">
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 animate-glow">
                  <g filter="url(#glow2)">
                    <path d="M24 6C15.1634 6 8 13.1634 8 22C8 27.5228 11.4386 32.1952 16.25 34.25V38C16.25 39.5188 17.4812 40.75 19 40.75H29C30.5188 40.75 31.75 39.5188 31.75 38V34.25C36.5614 32.1952 40 27.5228 40 22C40 13.1634 32.8366 6 24 6Z" stroke="#FFD700" strokeWidth="2" fill="#FFD700" fillOpacity="0.15"/>
                    <circle cx="24" cy="22" r="2.5" fill="#FFD700" />
                  </g>
                  <defs>
                    <filter id="glow2" x="-10" y="-10" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
                <span className="text-lg font-bold">Compare Properties Easily!</span>
              </div>
              <div className="text-base font-medium text-gold/90 mb-2 text-center">
                Click the <span className="inline-block align-middle bg-gold text-dark rounded-full px-2 py-0.5 mx-1 font-bold text-base">+</span> icon on any property card to add it to compare.<br />
                You can compare up to 4 properties side-by-side. Use this feature to make smarter decisions!
              </div>
              <div className="my-2 h-0.5 w-full bg-gradient-to-r from-gold/60 to-gold/10 rounded-full" />
              <div className="text-base font-semibold leading-relaxed mt-2 text-center">
                <span className="block mb-1">Buy/Sell Section</span>
                Looking to <span className="font-bold text-gold">Buy</span> or <span className="font-bold text-gold">Sell</span>? Use our advanced filters and comparison tools to make the best decision for your next property transaction.
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// AnimatedStat component for animated counting and effects
function AnimatedStat({ label, value, icon, delay }: { label: string, value: number, icon: string, delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const step = Math.max(1, Math.floor(end / 60));
    let current = start;
    const el = ref.current;
    if (!el) return;
    el.textContent = '0+';
    let startTime: number | null = null;
    function animateCount(ts: number) {
      if (!el) return;
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      current = Math.floor(progress * (end - start) + start);
      el.textContent = current + '+';
      if (progress < 1) requestAnimationFrame(animateCount);
      else el.textContent = end + '+';
    }
    setTimeout(() => { if (el) requestAnimationFrame(animateCount); }, delay);
  }, [value, delay]);
  return (
    <div className="flex flex-col items-center group transition-all duration-500 relative">
      <span className="text-4xl md:text-5xl font-extrabold text-gold mb-2 gold-shimmer group-hover:scale-110 group-hover:text-gold/90 transition-transform duration-300 animate-fade-in-up">
        <span ref={ref}></span>
      </span>
      <span className="text-white text-lg md:text-xl font-bold mb-1 animate-fade-in-up group-hover:text-gold transition-colors duration-300">{label}</span>
      <svg className="w-7 h-7 text-gold/80 mt-3 animate-bounce-slow group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={icon} /></svg>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-gold/60 to-gold/10 rounded-full opacity-60 group-hover:opacity-90 transition-all duration-300"></div>
    </div>
  );
}

export default App;