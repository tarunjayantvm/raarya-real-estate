import React, { useState } from 'react';

export default function UserLogin() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please enter your name and phone number.');
      return;
    }
    // Add your login logic here
    setError('');
    alert(`Welcome, ${name}! (Phone: ${phone})`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative" style={{
      background: "url('https://wallpaperaccess.com/full/1137443.jpg') center center/cover no-repeat",
      minHeight: '100vh',
    }}>
      {/* Optional: Add a dark overlay for readability, matching homepage */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70 z-0" />
      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-dark-light/70 rounded-2xl shadow-xl border border-gold/30 backdrop-blur-premium">
        <h2 className="text-3xl font-bold text-gold mb-8 text-center">User Login</h2>
        {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gold font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-dark border border-gold/30 text-white placeholder-gold focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-gold font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-lg bg-dark border border-gold/30 text-white placeholder-gold focus:outline-none focus:border-gold"
            />
          </div>
          <button type="submit" className="w-full bg-gold text-dark font-bold py-3 rounded-lg text-lg hover:bg-gold-dark transition-colors duration-300 shadow-lg hover:shadow-gold-glow mt-4">Continue</button>
        </form>
      </div>
    </div>
  );
} 