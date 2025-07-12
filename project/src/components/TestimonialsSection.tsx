import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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

    const element = document.getElementById('testimonials');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: 'Suresh Kumar',
      role: 'Property Buyer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      content: 'Raarya has transformed our property search experience. Their team\'s expertise and dedication made the entire process smooth and enjoyable. We found our dream home within weeks!'
    },
    {
      id: 2,
      name: 'Priya Rajesh',
      role: 'First-time Home Buyer',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      content: 'As a first-time buyer, I was overwhelmed by the process. Raarya guided me through every step, from loan assistance to final documentation. Excellent service and genuine care for customers.'
    },
    {
      id: 3,
      name: 'Ramesh Textiles',
      role: 'Commercial Investor',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      content: 'We\'ve been working with Raarya for our commercial property investments for over 3 years. Their market knowledge and professional approach have helped us make profitable decisions consistently.'
    },
    {
      id: 4,
      name: 'Anitha Krishnan',
      role: 'Villa Owner',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      content: 'Selling our villa through Raarya was effortless. They handled everything professionally and got us the best price in the market. Highly recommend their services!'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 transition-all duration-300 ${
          index < rating ? 'text-gold fill-current animate-pulse-slow' : 'text-gray-400'
        }`}
      />
    ));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 bg-dark relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full animate-float"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/3 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold text-gold mb-4 gold-shimmer">What Our Clients Say</h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Raarya.
          </p>
        </div>
        
        {/* Featured Testimonial Carousel */}
        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
        }`}>
          <div className="relative">
            <div className="premium-card rounded-2xl p-8 text-center relative overflow-hidden">
              {/* Background Quote */}
              <div className="absolute top-4 left-4 opacity-10">
                <Quote className="w-16 h-16 text-gold" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-gold animate-glow"
                  />
                </div>
                
                <div className="flex justify-center mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
                
                <p className="text-white text-lg italic mb-6 leading-relaxed max-w-2xl mx-auto">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                <div className="text-center">
                  <p className="text-gold font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gold-light text-sm">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gold/20 backdrop-blur-sm text-gold p-3 rounded-full hover:bg-gold hover:text-dark transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gold/20 backdrop-blur-sm text-gold p-3 rounded-full hover:bg-gold hover:text-dark transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-gold scale-125'
                    : 'bg-gold/30 hover:bg-gold/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        
        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="backdrop-blur-premium rounded-xl p-8 max-w-2xl mx-auto border border-gold/20">
            <h3 className="text-2xl font-bold text-gold mb-4 gold-shimmer">Ready to Join Our Happy Customers?</h3>
            <p className="text-white mb-6">
              Let us help you find your perfect property in Coimbatore. Our expert team is ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="premium-button text-dark font-bold py-3 px-6 rounded-lg" onClick={() => navigate('/all-properties')}>
                Start Your Property Search
              </button>
              <button className="border border-gold text-gold font-bold py-3 px-6 rounded-lg hover:bg-gold hover:text-dark transition-all duration-300 transform hover:scale-105" onClick={() => navigate('/contact')}>
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;