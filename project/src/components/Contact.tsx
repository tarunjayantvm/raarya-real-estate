import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const socials = [
  { icon: Facebook, url: 'https://facebook.com/' },
  { icon: Twitter, url: 'https://twitter.com/' },
  { icon: Youtube, url: 'https://youtube.com/' },
  { icon: Instagram, url: 'https://instagram.com/' },
];

export default function Contact() {
  return (
    <>
      <Header />
      <div className="bg-dark text-white font-lexend min-h-screen">
        {/* Hero */}
        <section className="py-20 bg-dark-light text-center pt-32 md:pt-40">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gold mb-4 gold-shimmer animate-fade-in-up">
            Let's Connect
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            We're here to help you find your dream property or answer any questions.
          </p>
        </section>

        {/* Main Content */}
        <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="bg-dark-light rounded-2xl shadow-lg p-8 flex flex-col gap-6 border border-gold/10">
            <h2 className="text-2xl font-bold text-gold mb-2">Send Us a Message</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input-gold" type="text" placeholder="Your Name" required />
              <input className="input-gold" type="email" placeholder="Your Email" required />
              <input className="input-gold" type="tel" placeholder="Phone Number" required />
              <input className="input-gold" type="text" placeholder="City" />
            </div>
            <textarea className="input-gold" rows={4} placeholder="Your Message" required />
            <button
              type="submit"
              className="bg-gold text-dark font-bold py-3 px-8 rounded-lg text-lg hover:bg-gold-dark transition-colors duration-300 shadow-lg hover:shadow-gold-glow"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col gap-8 justify-center">
            <div>
              <h3 className="text-xl font-bold text-gold mb-4">Contact Information</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-gold" />
                  2d, 2nd floor, Sri Ram Towers, Ram Apartment, Lakshmi Mills Junction, Coimbatore, Tamil Nadu - 641018
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-gold" />
                  <a href="tel:+919087240400" className="hover:underline text-gold">+91 90872 40400</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-gold" />
                  <a href="mailto:info@raarya.com" className="hover:underline text-gold">info@raarya.com</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gold mb-2">Follow Us</h4>
              <div className="flex gap-4">
                {socials.map(({ icon: Icon, url }, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 hover:bg-gold/30 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gold mb-2">Visit Us</h4>
              <a
                href="https://maps.google.com/?q=2d, 2nd floor, Sri Ram Towers, Ram Apartment, Lakshmi Mills Junction, Coimbatore, Tamil Nadu - 641018"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-gold"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Member Club CTA */}
        <section className="bg-dark-light py-12 text-center">
          <h3 className="text-2xl font-bold text-gold mb-2">Join Our Member Club</h3>
          <p className="text-gray-300 mb-6">Get updates on special events!</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your Email"
              className="input-gold flex-1"
              required
            />
            <button
              type="submit"
              className="bg-gold text-dark font-bold py-3 px-8 rounded-lg text-lg hover:bg-gold-dark transition-colors duration-300 shadow-lg hover:shadow-gold-glow"
            >
              Subscribe
            </button>
          </form>
        </section>

        {/* Embedded Map */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg border-4 border-gold">
            <iframe
              title="Raarya Location"
              src="https://www.google.com/maps?q=2d, 2nd floor, Sri Ram Towers, Ram Apartment, Lakshmi Mills Junction, Coimbatore, Tamil Nadu - 641018&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

// Add to your CSS for floating labels:
//
// .floating-label {
//   @apply absolute left-4 top-3 text-gold pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gold peer-valid:-top-3 peer-valid:text-xs;
// } 