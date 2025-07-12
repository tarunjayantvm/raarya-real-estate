// NOTE: To use this component, run: npm install swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import React from 'react';

const banners = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    title: 'Luxury Apartments in Mumbai',
    desc: 'Find your dream home with exclusive amenities.',
    cta: 'Explore Now',
    link: '/buy'
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    title: 'Ready to Move Villas',
    desc: 'Premium villas with modern amenities and green spaces.',
    cta: 'View Villas',
    link: '/buy'
  },
  {
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
    title: 'Special Offers on New Launches',
    desc: 'Book your property now and get exclusive discounts.',
    cta: 'See Offers',
    link: '/buy'
  }
];

const BannerSlider: React.FC = () => {
  return (
    <div className="mb-8">
      <Swiper spaceBetween={30} slidesPerView={1} loop autoplay={{ delay: 4000 }}>
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img src={banner.image} alt={banner.title} className="w-full h-64 md:h-80 object-cover" />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-8">
                <h2 className="text-2xl md:text-4xl text-white font-bold mb-2 drop-shadow-lg">{banner.title}</h2>
                <p className="text-white mb-4 max-w-lg drop-shadow-lg">{banner.desc}</p>
                <a href={banner.link} className="bg-gold text-dark px-6 py-2 rounded font-semibold shadow hover:bg-yellow-400 transition">{banner.cta}</a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider; 