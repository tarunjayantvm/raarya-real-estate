import React, { useState, useEffect } from 'react';
import { Building2, TrendingUp, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import hdfcLogo from '../assets/banks/hdfc.png';
import sbiLogo from '../assets/banks/sbiimg.png';
import iciciLogo from '../assets/banks/icici.png';
import axisLogo from '../assets/banks/axis.jpg';
import licLogo from '../assets/banks/lic.png';
import kotakLogo from '../assets/banks/kotak.png';

const PartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('partners');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const partners = [
    {
      name: 'HDFC Bank',
      logo: hdfcLogo,
      alt: 'HDFC Bank Logo'
    },
    {
      name: 'State Bank of India',
      logo: sbiLogo,
      alt: 'SBI Logo'
    },
    {
      name: 'ICICI Bank',
      logo: iciciLogo,
      alt: 'ICICI Bank Logo'
    },
    {
      name: 'Axis Bank',
      logo: axisLogo,
      alt: 'Axis Bank Logo'
    },
    {
      name: 'LIC Housing Finance',
      logo: licLogo,
      alt: 'LIC Housing Finance Logo'
    },
    {
      name: 'Kotak Mahindra Bank',
      logo: kotakLogo,
      alt: 'Kotak Mahindra Bank Logo'
    }
  ];

  const loanFeatures = [
    {
      icon: TrendingUp,
      title: '8.5%*',
      subtitle: 'Starting Interest Rate',
      description: 'Competitive rates for your dream home'
    },
    {
      icon: Shield,
      title: '90%',
      subtitle: 'Loan to Value Ratio',
      description: 'Maximum financing available'
    },
    {
      icon: Clock,
      title: '7 Days',
      subtitle: 'Quick Approval',
      description: 'Fast processing for urgent needs'
    }
  ];

  return (
    <section id="partners" className="py-16 bg-dark-light relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full animate-float"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/3 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold text-gold mb-4 gold-shimmer">Our Banking Partners</h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            We've partnered with leading financial institutions to provide you with the best home loan options and competitive interest rates.
          </p>
        </div>
        
        {/* Partners Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-16 transition-all duration-1000 delay-300 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`premium-card rounded-xl p-6 flex items-center justify-center group cursor-pointer transition-all duration-700`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={partner.logo}
                alt={partner.alt}
                className="h-12 w-auto object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<div class="text-gold text-sm font-medium text-center">${partner.name}</div>`;
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Loan Features */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          {loanFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`premium-card rounded-xl p-6 text-center group cursor-pointer transition-all duration-700`}
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="bg-gold/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-gold/30 transition-all duration-300 animate-pulse-slow">
                  <IconComponent className="w-8 h-8 text-gold mx-auto" />
                </div>
                <div className="text-2xl font-bold text-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {feature.title}
                </div>
                <div className="text-white font-medium mb-2 group-hover:text-gold transition-colors duration-300">
                  {feature.subtitle}
                </div>
                <div className="text-gray-300 text-sm">
                  {feature.description}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="backdrop-blur-premium rounded-xl p-8 max-w-4xl mx-auto border border-gold/20">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-gold mr-3 animate-bounce-slow" />
              <h3 className="text-xl font-bold text-gold gold-shimmer">Need Help with Home Loans?</h3>
            </div>
            <p className="text-white mb-6">
              Our loan experts will help you get the best home loan deals with minimal documentation and quick approval process.
            </p>
            
            <button className="premium-button text-dark font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300" onClick={() => navigate('/home-loans')}>
              Get Loan Assistance
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;