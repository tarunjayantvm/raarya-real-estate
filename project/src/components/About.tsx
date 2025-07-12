import React from 'react';
import { Target, Eye, Users, ShieldCheck, Award, Zap, Leaf, Star, MapPin, Linkedin } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const About = () => {
  
  const teamMembers = [
    {
      name: 'Karthik Kumar',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Visionary leader with a passion for creating sustainable and innovative living spaces.'
    },
    {
      name: 'Priya Sharma',
      role: 'Lead Architect',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Award-winning architect known for blending modern design with functional elegance.'
    },
    {
      name: 'Arjun Reddy',
      role: 'Head of Sales',
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in real estate market trends, dedicated to finding the perfect property for every client.'
    }
  ];

  const values = [
    { icon: ShieldCheck, title: 'Integrity', description: 'Upholding the highest standards of honesty and transparency in every interaction.' },
    { icon: Award, title: 'Excellence', description: 'A commitment to unparalleled quality and craftsmanship from concept to completion.' },
    { icon: Zap, title: 'Innovation', description: 'Pioneering new ideas and technologies to redefine the future of living.' },
    { icon: Users, title: 'Customer-First', description: 'Placing our clients at the heart of everything we do, ensuring a seamless experience.' },
  ];

  const whyChooseUs = [
    { icon: Star, title: 'Unmatched Quality', description: "We don't just build structures; we craft landmarks. Our commitment to using premium materials and superior craftsmanship is evident in every project." },
    { icon: Leaf, title: 'Sustainable & Innovative', description: 'Building for the future, we integrate sustainable practices and smart technology to create eco-friendly and future-ready homes.' },
    { icon: Users, title: 'Client-Centric Approach', description: 'Your vision is our blueprint. We work closely with you at every step, ensuring a transparent, seamless, and personalized experience.' },
    { icon: MapPin, title: 'Prime Locations', description: "Location is key. Our properties are strategically situated in Coimbatore's most sought-after neighborhoods, offering convenience and high investment potential." }
  ];

  const partners = [
    { name: 'HDFC Bank', logo: 'https://raarya.com/wp-content/uploads/2024/06/hdfc-logo.png' },
    { name: 'SBI', logo: 'https://raarya.com/wp-content/uploads/2024/06/sbi-logo.png' },
    { name: 'ICICI', logo: 'https://raarya.com/wp-content/uploads/2024/06/icici-logo.png' },
    { name: 'Axis', logo: 'https://raarya.com/wp-content/uploads/2024/06/axis-logo.png' },
    { name: 'LIC', logo: 'https://raarya.com/wp-content/uploads/2024/06/lic-logo.png' },
    { name: 'Kotak', logo: 'https://raarya.com/wp-content/uploads/2024/06/kotak-logo.png' },
  ];

  const [openBio, setOpenBio] = React.useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="bg-dark text-white font-lexend">
        {/* Hero Section */}
        <section className="relative bg-dark-light pt-40 pb-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold/5 rounded-full animate-float"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gold mb-4 gold-shimmer gradient-text animate-fade-in-up" style={{background: 'linear-gradient(90deg, #f9ba1a, #d4af37, #8c7f5f, #d4af37, #f9ba1a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'goldShimmer 3s linear infinite'}}>
                Welcome to Raarya
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 animate-fade-in-up">Coimbatore's Trusted Real Estate Partner</h2>
              <p className="text-lg text-gray-300 animate-fade-in-up">
                Transforming the real estate landscape with innovative and sustainable living spaces since 2022.
              </p>
            </div>
            <div className="flex justify-center items-center animate-fade-in-right">
              <div className="bg-gradient-to-br from-gold/20 to-dark-light p-8 rounded-2xl shadow-premium-lg border-4 border-gold animate-glow">
                <img src="https://raarya.com/wp-content/uploads/2024/07/cropped-color-logo.jpeg" alt="Raarya Logo" className="w-56 h-auto rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="py-24 bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-16 items-center">
            <div className="animate-on-scroll animate-fade-in-up">
              <div className="flex items-center mb-4">
                <Target className="w-10 h-10 text-gold mr-4" />
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-300">
                To craft exceptional living and commercial spaces that inspire and endure. We are committed to delivering projects that not only meet but exceed our clients' expectations through quality construction, timely delivery, and unwavering integrity.
              </p>
            </div>
            {/* Animated vertical divider */}
            <div className="hidden md:flex justify-center">
              <div className="w-1 h-48 bg-gradient-to-b from-gold via-gold/30 to-dark-light rounded-full animate-fade-in-up" style={{animationDelay: '200ms'}}></div>
            </div>
            <div className="animate-on-scroll animate-fade-in-up" style={{animationDelay: '200ms'}}>
              <div className="flex items-center mb-4">
                <Eye className="w-10 h-10 text-gold mr-4" />
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-300">
                To be Coimbatore's most trusted and innovative real estate developer, recognized for our commitment to sustainable practices, architectural excellence, and creating vibrant communities that stand the test of time.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 bg-dark-light relative overflow-hidden">
          {/* Animated gold particles background */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg width="100%" height="100%" className="absolute inset-0" style={{opacity: 0.08}}>
              <defs>
                <radialGradient id="gold-dot" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              {Array.from({length: 18}).map((_, i) => (
                <circle key={i} cx={Math.random()*100+'%'} cy={Math.random()*100+'%'} r={Math.random()*18+6} fill="url(#gold-dot)" />
              ))}
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gold mb-4 gold-shimmer animate-on-scroll animate-fade-in-up">Why Choose Raarya</h2>
              <p className="text-lg text-white max-w-3xl mx-auto animate-on-scroll animate-fade-in-up" style={{animationDelay: '150ms'}}>
                We don't just build properties; we build dreams. Discover the Raarya difference.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center p-8 bg-dark rounded-2xl shadow-premium-sm border border-gold/10 transform hover:-translate-y-2 transition-transform duration-300 animate-on-scroll animate-fade-in-up hover:shadow-gold/40 hover:shadow-lg hover:border-gold/40" style={{animationDelay: `${index * 150}ms`}}>
                    <div className="inline-block p-4 bg-gold/10 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-24 bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gold mb-4 gold-shimmer animate-on-scroll animate-fade-in-up">Our Core Values</h2>
              <p className="text-lg text-white max-w-2xl mx-auto animate-on-scroll animate-fade-in-up" style={{animationDelay: '150ms'}}>
                The principles that guide every decision we make.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:overflow-visible overflow-x-auto pb-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center p-8 bg-dark-light rounded-2xl shadow-premium-sm border border-gold/10 transform hover:-translate-y-2 transition-transform duration-300 animate-on-scroll animate-fade-in-up mx-auto max-w-xs w-full min-w-[220px]" style={{animationDelay: `${index * 150}ms`}}>
                    <div className="inline-block p-4 bg-gold/10 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-24 bg-dark-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gold mb-2 gold-shimmer animate-on-scroll animate-fade-in-up">Meet Our Leadership</h2>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-on-scroll animate-fade-in-up" style={{animationDelay: '150ms'}}>
                The visionaries guiding Raarya to excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <div key={index} className="relative bg-dark rounded-2xl shadow-lg border border-gold/10 flex flex-col items-center p-8 transition-transform hover:-translate-y-2 animate-on-scroll animate-fade-in-up hover:shadow-gold/40 hover:shadow-xl hover:border-gold/40" style={{animationDelay: `${index * 150}ms`}}>
                  <img src={member.image} alt={member.name} className="w-32 h-32 object-cover object-top rounded-full border-4 border-gold mb-6 shadow-md" />
                  <h3 className="text-2xl font-bold text-gold mb-1 text-center">{member.name}</h3>
                  <p className="text-lg text-white font-medium mb-4 text-center">{member.role}</p>
                  <div className="flex gap-2 justify-center mb-4">
                    <a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gold/10 hover:bg-gold/30 transition-colors" title="LinkedIn">
                      <Linkedin className="w-5 h-5 text-gold" />
                    </a>
                  </div>
                  <button
                    onClick={() => setOpenBio(index)}
                    className="mt-auto bg-gold text-dark font-semibold px-6 py-2 rounded-lg shadow hover:bg-gold-dark transition-colors duration-200"
                  >
                    View Bio
                  </button>
                </div>
              ))}
            </div>
            {/* Bio Modal */}
            {typeof openBio === 'number' && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="bg-dark-light rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-fade-in-up">
                  <button
                    className="absolute top-4 right-4 text-gold hover:text-white text-2xl font-bold"
                    onClick={() => setOpenBio(null)}
                  >
                    &times;
                  </button>
                  <img src={teamMembers[openBio].image} alt={teamMembers[openBio].name} className="w-24 h-24 object-cover rounded-full border-2 border-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gold text-center mb-1">{teamMembers[openBio].name}</h3>
                  <p className="text-md text-white text-center mb-4">{teamMembers[openBio].role}</p>
                  <p className="text-gray-200 text-center">{teamMembers[openBio].bio}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-dark py-20">
            <div className="max-w-4xl mx-auto text-center px-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                    Ready to Begin Your Journey with Raarya?
                </h2>
                <p className="text-gold text-lg mb-8">
                    Explore our properties or get in touch with our experts today.
                </p>
                <a 
                    href="#" 
                    onClick={e => { e.preventDefault(); navigate('/all-properties'); }}
                    className="inline-block bg-gold text-dark font-bold py-3 px-8 rounded-lg text-lg hover:bg-gold-dark transition-colors duration-300 shadow-lg hover:shadow-gold-glow"
                >
                    View Properties
                </a>
            </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;