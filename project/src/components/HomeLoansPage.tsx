import React, { useState, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import axisLogo from '../assets/banks/axis.jpg';
import hdfcLogo from '../assets/banks/hdfc.png';
import iciciLogo from '../assets/banks/icici.png';
import kotakLogo from '../assets/banks/kotak.png';
import licLogo from '../assets/banks/lic.png';
import sbiLogo from '../assets/banks/sbiimg.png';

// Dummy partners data (now matches all banks in top loan offers)
const partners = [
  { name: 'HDFC', logo: hdfcLogo },
  { name: 'ICICI', logo: iciciLogo },
  { name: 'SBI', logo: sbiLogo },
  { name: 'Axis', logo: axisLogo },
  { name: 'Kotak Mahindra Bank', logo: kotakLogo },
  { name: 'LIC Housing Finance', logo: licLogo },
];

// Bank offers data (mock)
const bankOffers = [
  {
    name: 'Kotak Mahindra Bank',
    logo: kotakLogo,
    interest: 7.55,
    fees: 10000,
    emi: 35689,
    maxLtv: 90,
    featured: false,
  },
  {
    name: 'HDFC',
    logo: hdfcLogo,
    interest: 8.5,
    fees: 3000,
    emi: 37195,
    maxLtv: 90,
    featured: true,
  },
  {
    name: 'LIC Housing Finance',
    logo: licLogo,
    interest: 6.9,
    fees: 5000,
    emi: 34678,
    maxLtv: 90,
    featured: true,
  },
  {
    name: 'SBI Home Loans',
    logo: sbiLogo,
    interest: 6.8,
    fees: 10000,
    emi: 34524,
    maxLtv: 90,
    featured: false,
  },
  {
    name: 'ICICI Bank',
    logo: iciciLogo,
    interest: 6.8,
    fees: 7500,
    emi: 34524,
    maxLtv: 90,
    featured: false,
  },
  {
    name: 'Axis Bank',
    logo: axisLogo,
    interest: 6.9,
    fees: 10000,
    emi: 34678,
    maxLtv: 90,
    featured: false,
  },
];

// BannerSlide component for the landing banner (rectangular, more animated, spaced from header)
const BannerSlide = () => (
  <section className="w-full pt-16 mb-12 px-0">
    <div
      className="relative w-full rounded-none md:rounded-2xl shadow-2xl bg-gradient-to-br from-black via-dark to-gold/10 border-b border-gold/20 py-12 md:py-16 flex flex-col items-center animate-fade-in-up overflow-hidden"
      style={{ minHeight: '220px' }}
    >
      {/* Animated gold particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gold/30 blur-xl animate-pulse-slow`}
            style={{
              width: `${16 + Math.random() * 32}px`,
              height: `${16 + Math.random() * 32}px`,
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 90}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-gold/20 rounded-full blur-2xl opacity-70 animate-float-slow" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gold/10 rounded-full blur-2xl opacity-60 animate-float" />
      </div>
      <div className="relative z-10 w-full text-center px-2 md:px-0">
        <h1 className="text-3xl md:text-5xl font-bold text-gold mb-4 gold-shimmer drop-shadow-lg animate-slide-in-down">Unlock Your Dream Home with Easy Loans</h1>
        <p className="text-base md:text-xl text-white/80 mb-2 drop-shadow animate-fade-in-up">Compare, apply, and get instant approval from top banks. Fast, transparent, and hassle-free home loans tailored for you.</p>
      </div>
    </div>
  </section>
);

// BankOffersSection component
const BankOffersSection = () => (
  <section className="w-full bg-dark/80 py-8 px-0 md:px-0 flex flex-col items-center">
    <div className="w-full max-w-7xl mx-auto px-2 md:px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gold mb-6 text-center gold-shimmer">Top Home Loan Offers</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {bankOffers.map((bank, idx) => (
          <div
            key={bank.name}
            className={`relative bg-gradient-to-br from-black via-dark to-gold/5 border border-gold/20 rounded-2xl shadow-lg p-6 flex flex-col items-center w-72 min-w-[260px] transition-transform hover:scale-105 hover:shadow-2xl group ${bank.featured ? 'ring-2 ring-gold/60' : ''}`}
          >
            {bank.featured && (
              <span className="absolute top-3 left-3 bg-gold text-dark text-xs font-bold px-2 py-1 rounded-full animate-pulse">FEATURED</span>
            )}
            <img src={bank.logo} alt={bank.name} className="h-10 mb-2 drop-shadow-lg" />
            <div className="text-lg font-bold text-gold mb-1 text-center">{bank.name}</div>
            <div className="flex flex-col gap-1 w-full mt-2">
              <div className="flex justify-between text-sm text-gold/80">
                <span>Interest</span>
                <span className="font-bold text-gold text-lg">{bank.interest}%</span>
              </div>
              <div className="flex justify-between text-sm text-gold/80">
                <span>Processing Fees</span>
                <span>₹{bank.fees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gold/80">
                <span>EMI</span>
                <span>₹{bank.emi.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gold/80">
                <span>Max LTV</span>
                <span>{bank.maxLtv}%</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-gold text-dark font-bold py-2 rounded-lg hover:bg-gold/90 transition-all shadow-gold/10 shadow-md group-hover:shadow-xl">Get this deal</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Home Loan Eligibility Calculator Section
const HomeLoanEligibilityCalculator = () => {
  const [borrowers, setBorrowers] = useState<'one' | 'two'>('one');
  const [age, setAge] = useState(30);
  const [occupation, setOccupation] = useState('Salaried');
  const [income, setIncome] = useState(100000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [interest, setInterest] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [result, setResult] = useState<{eligible: number, payable: number, emi: number} | null>(null);

  // Visualization state for donut
  const donutRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const maxPossible = 2000000; // for demo scaling
  const eligible = result ? result.eligible : 0;
  const percent = Math.min(eligible / maxPossible, 1);
  const emi = result ? Math.round(result.emi) : 0;
  const incomeVal = income;
  const isEligible = eligible > 0 && percent > 0.05;

  // Simple eligibility calculation (for demo)
  const calculateEligibility = () => {
    // Assume max EMI = 50% of net income minus existing EMI
    const maxEmi = Math.max(0, (income * (borrowers === 'one' ? 0.5 : 0.6)) - existingEmi);
    const monthlyRate = interest / 12 / 100;
    const eligible = maxEmi > 0 && interest && tenure
      ? Math.round((maxEmi * (Math.pow(1 + monthlyRate, tenure * 12) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, tenure * 12)))
      : 0;
    const totalPayable = eligible;
    setResult({ eligible, payable: eligible, emi: maxEmi });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-2 md:px-6 py-12">
      <div className="bg-dark border border-gold/20 rounded-2xl shadow-lg p-8 w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-gold mb-8 text-center gold-shimmer">Home Loan Eligibility Calculator</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Form */}
          <div>
            <div className="flex gap-4 mb-6 items-center">
              <span className="font-semibold text-gold">Number of Borrowers</span>
              <button
                className={`px-4 py-1 rounded-full font-bold text-sm transition ${borrowers === 'one' ? 'bg-gold text-dark' : 'bg-dark border border-gold text-gold'}`}
                onClick={() => setBorrowers('one')}
              >One</button>
              <button
                className={`px-4 py-1 rounded-full font-bold text-sm transition ${borrowers === 'two' ? 'bg-gold text-dark' : 'bg-dark border border-gold text-gold'}`}
                onClick={() => setBorrowers('two')}
              >Two</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gold mb-1">Your Age</label>
                <input type="number" min={18} max={70} value={age} onChange={e => setAge(Number(e.target.value))} className="w-full bg-dark border border-gold/20 rounded px-2 py-2 text-gold" />
              </div>
              <div>
                <label className="block text-xs text-gold mb-1">Occupation</label>
                <select value={occupation} onChange={e => setOccupation(e.target.value)} className="w-full bg-dark border border-gold/20 rounded px-2 py-2 text-gold">
                  <option value="Salaried">Salaried</option>
                  <option value="Self-Employed">Self-Employed</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gold mb-1">Net Income</label>
                <input type="number" min={0} value={income} onChange={e => setIncome(Number(e.target.value))} className="w-full bg-dark border border-gold/20 rounded px-2 py-2 text-gold" />
                <span className="text-xs text-gold/60">Monthly</span>
              </div>
              <div>
                <label className="block text-xs text-gold mb-1">Existing Monthly EMI</label>
                <input type="number" min={0} value={existingEmi} onChange={e => setExistingEmi(Number(e.target.value))} className="w-full bg-dark border border-gold/20 rounded px-2 py-2 text-gold" />
                <span className="text-xs text-gold/60">Monthly</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gold mb-1">Rate of Interest</label>
                <input type="number" min={6} max={15} step={0.01} value={interest} onChange={e => setInterest(Number(e.target.value))} className="w-full bg-dark border border-gold/20 rounded px-2 py-2 text-gold" />
                <span className="text-xs text-gold/60">%</span>
              </div>
              <div>
                <label className="block text-xs text-gold mb-1">Tenure</label>
                <input type="number" min={1} max={30} value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full bg-dark border border-gold/20 rounded px-2 py-2 text-gold" />
                <span className="text-xs text-gold/60">Years</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-gold text-dark font-bold py-2 rounded-lg hover:bg-gold/90 transition-all text-lg shadow-gold/10 shadow-md" onClick={calculateEligibility}>Calculate</button>
          </div>
          {/* Visualization & Results */}
          <div className="flex flex-col items-center justify-center w-full gap-6">
            {/* Single Donut Visualization */}
            <div className="relative flex flex-col items-center justify-center w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="relative flex items-center justify-center" style={{ minHeight: 240 }}>
                  <svg width="220" height="220" viewBox="0 0 220 220" ref={donutRef}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <defs>
                      <linearGradient id="gold-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#bfa14a" />
                        <stop offset="100%" stopColor="#ffe082" />
                      </linearGradient>
                    </defs>
                    {/* Track */}
                    <circle
                      cx="110" cy="110" r="90"
                      fill="none"
                      stroke="#222"
                      strokeWidth="18"
                    />
                    {/* Progress (with gap) */}
                    <circle
                      cx="110" cy="110" r="90"
                      fill="none"
                      stroke="url(#gold-gradient)"
                      strokeWidth="18"
                      strokeDasharray={`${percent * 540}, 540`}
                      strokeDashoffset="-135"
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(.4,2,.6,1)' }}
                    />
                    {/* Center dark circle */}
                    <circle
                      cx="110" cy="110" r="68"
                      fill="#181716"
                    />
                  </svg>
                  {/* Centered info */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-40">
                    <div className={`text-lg font-bold ${isEligible ? 'text-gold' : 'text-red-400'}`}>{isEligible ? 'Eligible' : 'Not Eligible'}</div>
                    <div className="text-2xl font-extrabold text-gold mt-1">₹{eligible.toLocaleString()}</div>
                  </div>
                  {/* Tooltip below donut */}
                  {hovered && (
                    <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 bg-dark text-gold text-xs font-bold px-4 py-2 rounded shadow-lg animate-fade-in-up border border-gold z-10 min-w-[220px] text-center">
                      <div className="mb-1">{isEligible ? 'You are eligible!' : 'Not eligible for a loan at this time.'}</div>
                      <div>Eligible Amount: <span className="font-bold">₹{eligible.toLocaleString()}</span></div>
                      <div>Max Possible: <span className="font-bold">₹{maxPossible.toLocaleString()}</span></div>
                      <div>Monthly EMI: <span className="font-bold">₹{emi.toLocaleString()}</span></div>
                      <div>Net Income: <span className="font-bold">₹{incomeVal.toLocaleString()}</span></div>
                    </div>
                  )}
                </div>
                {/* Legend below donut */}
                <div className="flex gap-2 mt-4 text-xs justify-center w-full">
                  <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full" style={{background: isEligible ? '#bfa14a' : '#f87171'}}></span> {isEligible ? 'Eligible' : 'Not Eligible'}</span>
                </div>
              </div>
            </div>
            {/* Results Card */}
            <div className="w-full bg-gold/10 border border-gold/30 rounded-xl p-4 flex flex-col items-center mb-2 mt-4">
              <div className="text-gold text-lg font-bold mb-1">You could borrow up to</div>
              <div className="text-2xl font-extrabold text-gold mb-2">₹{result ? result.eligible.toLocaleString() : '--'}</div>
              <div className="flex gap-8 text-gold/80 text-sm mb-2">
                <span>Payable Amount: <span className="font-bold text-gold">₹{result ? result.payable.toLocaleString() : '--'}</span></span>
                <span>Monthly EMI: <span className="font-bold text-gold">₹{result ? Math.round(result.emi).toLocaleString() : '--'}</span></span>
              </div>
              <button className="mt-2 bg-gold text-dark font-bold py-2 px-6 rounded-lg hover:bg-gold/90 transition-all shadow-gold/10 shadow-md">Apply for Loan</button>
            </div>
            <div className="text-xs text-gold/60 text-center">* Results are estimates. Actual eligibility may vary based on bank policy.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

function HomeLoansPage() {
  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const monthlyRate = interestRate / 12 / 100;
  const emi = loanAmount && interestRate && tenure
    ? Math.round(
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure * 12)) /
          (Math.pow(1 + monthlyRate, tenure * 12) - 1)
      )
    : 0;
  const totalPayable = emi * tenure * 12;
  const totalInterest = totalPayable - loanAmount;

  // Multi-step form state (simplified for demo)
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    income: '',
    propertyType: '',
    loanType: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-dark text-white font-lexend">
      <Header />
      <BannerSlide />
      <BankOffersSection />
      <section className="relative z-10 flex flex-col justify-center items-center w-full max-w-7xl mx-auto px-2 md:px-6">
        {/* EMI Calculator - now full width and more visual */}
        <div className="bg-dark border border-gold/20 rounded-xl p-8 shadow-lg w-full">
          <h2 className="text-3xl font-bold text-gold mb-6">EMI Calculator</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm mb-1">Loan Amount (₹)</label>
                <input type="range" min="100000" max="50000000" step="10000" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full accent-gold" />
                <div className="flex justify-between text-xs text-gold/70">
                  <span>1L</span><span>5Cr</span>
                </div>
                <input type="number" className="w-full mt-1 bg-dark border border-gold/20 rounded px-2 py-1 text-gold" value={loanAmount} min={100000} max={50000000} onChange={e => setLoanAmount(Number(e.target.value))} />
              </div>
              <div className="mb-6">
                <label className="block text-sm mb-1">Interest Rate (%)</label>
                <input type="range" min="6" max="15" step="0.01" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full accent-gold" />
                <div className="flex justify-between text-xs text-gold/70">
                  <span>6%</span><span>15%</span>
                </div>
                <input type="number" className="w-full mt-1 bg-dark border border-gold/20 rounded px-2 py-1 text-gold" value={interestRate} min={6} max={15} step={0.01} onChange={e => setInterestRate(Number(e.target.value))} />
              </div>
              <div className="mb-6">
                <label className="block text-sm mb-1">Tenure (years)</label>
                <input type="range" min="1" max="30" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full accent-gold" />
                <div className="flex justify-between text-xs text-gold/70">
                  <span>1</span><span>30</span>
                </div>
                <input type="number" className="w-full mt-1 bg-dark border border-gold/20 rounded px-2 py-1 text-gold" value={tenure} min={1} max={30} onChange={e => setTenure(Number(e.target.value))} />
              </div>
            </div>
            {/* Interactive Visualization */}
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4">
                <svg width="140" height="140" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="#222" stroke="#bfa14a" strokeWidth="2" />
                  <circle
                    cx="18" cy="18" r="16"
                    fill="none"
                    stroke="#f5d06f"
                    strokeWidth="4"
                    strokeDasharray={`${((loanAmount/totalPayable)*100).toFixed(1)} ${(100-(loanAmount/totalPayable)*100).toFixed(1)}`}
                    strokeDashoffset="25"
                    style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(.4,2,.6,1)' }}
                  />
                  <circle
                    cx="18" cy="18" r="12"
                    fill="none"
                    stroke="#bfa14a"
                    strokeWidth="1"
                    strokeDasharray="100 100"
                    strokeDashoffset="0"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-1 mb-2">
                <span className="text-lg font-bold text-gold">Monthly EMI</span>
                <span className="text-2xl font-extrabold text-gold">₹{emi.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-gold/80 text-sm">Total Interest: <span className="font-bold">₹{totalInterest.toLocaleString()}</span></span>
                <span className="text-gold/80 text-sm">Total Payable: <span className="font-bold">₹{totalPayable.toLocaleString()}</span></span>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-1 text-xs text-gold/80">
                  <span className="inline-block w-3 h-3 bg-gold rounded-full mr-1"></span> Principal
                </div>
                <div className="flex items-center gap-1 text-xs text-gold/80">
                  <span className="inline-block w-3 h-3 bg-gold/40 rounded-full mr-1"></span> Interest
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Partners Section */}
      <section className="py-10 bg-dark/90 border-t border-gold/10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gold mb-6 text-center">Our Banking Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map(p => (
              <div key={p.name} className="flex flex-col items-center">
                <img src={p.logo} alt={p.name} className="h-12 mb-2 object-contain" />
                <span className="text-gold/80 text-sm text-center">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HomeLoanEligibilityCalculator />
      {/* Benefits Section */}
      <section className="py-10 bg-dark border-t border-gold/10">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="bg-gold/10 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-bold text-gold mb-1">Instant Approval</div>
            <div className="text-white/70 text-sm">Get quick eligibility check and instant approval from top banks.</div>
          </div>
          <div className="bg-gold/10 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <div className="font-bold text-gold mb-1">Secure & Transparent</div>
            <div className="text-white/70 text-sm">No hidden charges. 100% secure and transparent process.</div>
          </div>
          <div className="bg-gold/10 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">💡</div>
            <div className="font-bold text-gold mb-1">Expert Guidance</div>
            <div className="text-white/70 text-sm">Our experts help you choose the best loan plan for your needs.</div>
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-10 bg-dark/90 border-t border-gold/10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gold mb-6 text-center">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gold/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">1️⃣</div>
              <div className="font-bold text-gold mb-1">Apply Online</div>
              <div className="text-white/70 text-xs">Fill out the simple application form.</div>
            </div>
            <div className="bg-gold/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">2️⃣</div>
              <div className="font-bold text-gold mb-1">Get Offers</div>
              <div className="text-white/70 text-xs">Receive loan offers from multiple banks.</div>
            </div>
            <div className="bg-gold/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">3️⃣</div>
              <div className="font-bold text-gold mb-1">Compare & Choose</div>
              <div className="text-white/70 text-xs">Compare interest rates and features.</div>
            </div>
            <div className="bg-gold/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">4️⃣</div>
              <div className="font-bold text-gold mb-1">Get Disbursal</div>
              <div className="text-white/70 text-xs">Quick disbursal to your account.</div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-10 bg-dark border-t border-gold/10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gold mb-6 text-center">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <details className="bg-gold/10 rounded-xl p-4">
              <summary className="font-semibold text-gold cursor-pointer">What is the eligibility for a home loan?</summary>
              <div className="text-white/80 mt-2 text-sm">Eligibility depends on your income, credit score, property value, and other factors. Our experts will guide you through the process.</div>
            </details>
            <details className="bg-gold/10 rounded-xl p-4">
              <summary className="font-semibold text-gold cursor-pointer">How much loan can I get?</summary>
              <div className="text-white/80 mt-2 text-sm">You can get up to 80-90% of the property value as a loan, subject to eligibility and bank policies.</div>
            </details>
            <details className="bg-gold/10 rounded-xl p-4">
              <summary className="font-semibold text-gold cursor-pointer">What documents are required?</summary>
              <div className="text-white/80 mt-2 text-sm">Basic KYC, income proof, property documents, and bank statements are required. We help you with the checklist.</div>
            </details>
            <details className="bg-gold/10 rounded-xl p-4">
              <summary className="font-semibold text-gold cursor-pointer">Can I transfer my existing loan?</summary>
              <div className="text-white/80 mt-2 text-sm">Yes, you can transfer your existing home loan to another bank for better rates or top-up options.</div>
            </details>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomeLoansPage; 