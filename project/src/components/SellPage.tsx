import React, { useState, useEffect } from 'react';
import { MapPin, Home, DollarSign, TrendingUp, Users, Shield, Phone, Mail, Clock, Star, CheckCircle, ArrowRight, Upload, Camera, FileText, Calculator, BarChart3, Award, Target, Zap, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import Header from './Header';
import Footer from './Footer';
import Modal from 'react-modal';

Modal.setAppElement('body');

const SellPage = () => {
  const [activeTab, setActiveTab] = useState('list-property');
  const [formData, setFormData] = useState({
    propertyType: '',
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    propertyAge: '',
    parking: '',
    amenities: [] as string[],
    images: [] as File[]
  });

  const [marketData] = useState({
    avgPrice: '₹85,00,000',
    avgDaysOnMarket: 45,
    propertiesSold: 127,
    priceGrowth: '+12.5%'
  });

  const [sellerServices] = useState([
    {
      icon: <Camera className="h-8 w-8 text-gold" />,
      title: 'Professional Photography',
      description: 'High-quality photos that showcase your property in the best light',
      price: '₹2,500'
    },
    {
      icon: <FileText className="h-8 w-8 text-gold" />,
      title: 'Legal Documentation',
      description: 'Complete legal assistance for property documentation and verification',
      price: '₹5,000'
    },
    {
      icon: <Calculator className="h-8 w-8 text-gold" />,
      title: 'Valuation Report',
      description: 'Professional property valuation with detailed market analysis',
      price: '₹3,500'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-gold" />,
      title: 'Market Analysis',
      description: 'Comprehensive market research and pricing strategy',
      price: '₹4,000'
    }
  ]);

  const [listedProperties, setListedProperties] = useState([
    {
      id: 1,
      title: 'Modern 3BHK Apartment in Race Course',
      price: '₹1,25,00,000',
      location: 'Race Course, Coimbatore',
      status: 'Active',
      views: 245,
      inquiries: 12,
      daysListed: 8,
      propertyType: 'Apartment',
      description: 'A luxurious and spacious 3BHK apartment in the heart of Coimbatore. Features a modern kitchen, balcony with a city view, and access to premium amenities.',
      bedrooms: '3',
      bathrooms: '3',
      area: '1800',
      propertyAge: '2',
      parking: 'Covered',
      amenities: ['Swimming Pool', 'Gym', 'Clubhouse'],
      images: [] as File[]
    },
    {
      id: 2,
      title: 'Luxury Villa in Vadavalli',
      price: '₹2,85,00,000',
      location: 'Vadavalli, Coimbatore',
      status: 'Under Review',
      views: 189,
      inquiries: 8,
      daysListed: 3,
      propertyType: 'Villa',
      description: 'An exquisite villa with a private garden and stunning mountain views. Perfect for those seeking tranquility and luxury.',
      bedrooms: '4',
      bathrooms: '5',
      area: '3200',
      propertyAge: '5',
      parking: 'Open',
      amenities: ['Private Garden', 'Security', 'Play Area'],
      images: [] as File[]
    },
    {
      id: 3,
      title: '2BHK Flat in Peelamedu',
      price: '₹75,00,000',
      location: 'Peelamedu, Coimbatore',
      status: 'Active',
      views: 156,
      inquiries: 6,
      daysListed: 12,
      propertyType: 'Flat',
      description: 'A cozy 2BHK flat located in a prime area, close to IT parks, schools, and hospitals. Ideal for small families and professionals.',
      bedrooms: '2',
      bathrooms: '2',
      area: '1200',
      propertyAge: '8',
      parking: 'Covered',
      amenities: ['Power Backup', 'Lift'],
      images: [] as File[]
    }
  ]);

  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [valuationData, setValuationData] = useState({
    basePrice: 0,
    locationPremium: 0,
    amenitiesBonus: 0,
    conditionScore: 0,
    marketDemand: 0,
    totalValue: 0,
    comparableProperties: [] as any[]
  });

  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: 'apartment',
    area: '',
    location: '',
    age: '',
    condition: 'good',
    amenities: [] as string[]
  });

  const [roiData, setRoiData] = useState({
    purchasePrice: '',
    sellingPrice: '',
    holdingPeriod: '',
    additionalCosts: '',
    totalInvestment: 0,
    totalProfit: 0,
    profitMargin: 0,
    annualRoi: 0,
    monthlyReturn: 0
  });

  const [analyticsData, setAnalyticsData] = useState({
    currentPrice: 12500000,
    location: 'Race Course',
    propertyType: 'Apartment',
    startMonth: new Date().getMonth(),
    endMonth: (new Date().getMonth() + 6) % 12,
    duration: 6,
    predictedPrice: 13500000,
    growthRate: 8.0,
    buyerInterest: 'High',
    inventoryLevel: 'Medium',
    priceStability: 'Stable',
    monthlyForecast: [] as { month: string, price: number }[],
    sentimentScores: {
      interest: 80,
      inventory: 60,
      stability: 75,
      economic: 65,
      affordability: 50
    },
    influencingFactors: [] as { name: string, impact: number }[]
  });

  // Financial Tools State
  const [mortgageData, setMortgageData] = useState({
    propertyPrice: 10000000,
    downPayment: 2000000,
    loanAmount: 8000000,
    interestRate: 8.5,
    loanTerm: 20,
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0,
    emiBreakdown: [] as { month: number, principal: number, interest: number, balance: number }[]
  });

  const [taxData, setTaxData] = useState({
    purchasePrice: 8000000,
    sellingPrice: 12000000,
    holdingPeriod: 5,
    improvements: 500000,
    transferCosts: 200000,
    capitalGains: 0,
    taxLiability: 0,
    taxRate: 0,
    exemptions: 0,
    netGains: 0
  });

  const [investmentData, setInvestmentData] = useState({
    sellingPrice: 12000000,
    monthlyRent: 45000,
    annualRentGrowth: 5,
    maintenanceCosts: 12000,
    propertyTax: 24000,
    insuranceCosts: 18000,
    holdingPeriod: 5,
    sellingScenario: {
      netAmount: 0,
      totalReturns: 0,
      annualizedReturn: 0
    },
    rentingScenario: {
      totalRentalIncome: 0,
      totalExpenses: 0,
      netRentalIncome: 0,
      propertyValue: 0,
      totalReturns: 0,
      annualizedReturn: 0
    },
    comparison: {
      betterOption: '',
      difference: 0,
      recommendation: ''
    }
  });

  const [insuranceData, setInsuranceData] = useState({
    propertyValue: 12000000,
    propertyType: 'Residential',
    constructionType: 'RCC',
    location: 'Urban',
    coverageType: 'Comprehensive',
    annualPremium: 0,
    monthlyPremium: 0,
    coverageDetails: {
      structure: 0,
      contents: 0,
      liability: 0,
      naturalDisasters: 0
    },
    addOns: [] as string[],
    totalCoverage: 0
  });

  const growthModels: { [key: string]: { [key: string]: number } } = {
    'Race Course': { 'Apartment': 0.10, 'Villa': 0.12, 'House': 0.11, 'Plot': 0.15 },
    'RS Puram': { 'Apartment': 0.11, 'Villa': 0.13, 'House': 0.12, 'Plot': 0.16 },
    'Vadavalli': { 'Apartment': 0.08, 'Villa': 0.10, 'House': 0.09, 'Plot': 0.12 },
    'Peelamedu': { 'Apartment': 0.07, 'Villa': 0.09, 'House': 0.08, 'Plot': 0.11 },
    'Saibaba Colony': { 'Apartment': 0.09, 'Villa': 0.11, 'House': 0.10, 'Plot': 0.14 },
    'Tatabad': { 'Apartment': 0.06, 'Villa': 0.08, 'House': 0.07, 'Plot': 0.10 },
    'Singanallur': { 'Apartment': 0.05, 'Villa': 0.07, 'House': 0.06, 'Plot': 0.09 }
  };

  const [comparableProperties] = useState([
    {
      id: 1,
      title: '3BHK Apartment in Race Course',
      price: '₹1,25,00,000',
      area: '1500 sq ft',
      location: 'Race Course',
      soldDate: '2024-01-15',
      pricePerSqFt: 8333,
      amenities: ['Parking', 'Lift', 'Security']
    },
    {
      id: 2,
      title: '2BHK Flat in Vadavalli',
      price: '₹85,00,000',
      area: '1200 sq ft',
      location: 'Vadavalli',
      soldDate: '2024-01-20',
      pricePerSqFt: 7083,
      amenities: ['Parking', 'Garden']
    },
    {
      id: 3,
      title: '4BHK Villa in Peelamedu',
      price: '₹2,10,00,000',
      area: '2500 sq ft',
      location: 'Peelamedu',
      soldDate: '2024-01-10',
      pricePerSqFt: 8400,
      amenities: ['Parking', 'Garden', 'Swimming Pool', 'Gym']
    }
  ]);

  const locationPricing = {
    'Race Course': { basePrice: 8500, premium: 1.4 },
    'Vadavalli': { basePrice: 7500, premium: 1.2 },
    'Peelamedu': { basePrice: 6500, premium: 1.1 },
    'Saibaba Colony': { basePrice: 8000, premium: 1.3 },
    'RS Puram': { basePrice: 9000, premium: 1.5 },
    'Tatabad': { basePrice: 6000, premium: 1.0 },
    'Singanallur': { basePrice: 5500, premium: 0.9 }
  };

  const amenitiesScoring = {
    'Parking': 50000,
    'Garden': 75000,
    'Balcony': 25000,
    'Lift': 100000,
    'Security': 50000,
    'Power Backup': 75000,
    'Water Supply': 25000,
    'Internet': 15000,
    'Gym': 150000,
    'Swimming Pool': 200000,
    'Clubhouse': 100000,
    'Children\'s Play Area': 50000
  };

  const conditionMultipliers = {
    'excellent': 1.2,
    'good': 1.0,
    'average': 0.9,
    'needs_repair': 0.8
  };

  const calculateValuation = () => {
    if (!propertyDetails.area || !propertyDetails.location) return;

    const area = parseInt(propertyDetails.area);
    const location = locationPricing[propertyDetails.location as keyof typeof locationPricing];
    
    if (!location) return;

    // Base calculation
    const basePrice = area * location.basePrice;
    
    // Location premium
    const locationPremium = basePrice * (location.premium - 1);
    
    // Amenities bonus
    const amenitiesBonus = propertyDetails.amenities.reduce((total, amenity) => {
      return total + (amenitiesScoring[amenity as keyof typeof amenitiesScoring] || 0);
    }, 0);
    
    // Condition multiplier
    const conditionMultiplier = conditionMultipliers[propertyDetails.condition as keyof typeof conditionMultipliers] || 1;
    
    // Age factor (depreciation)
    const age = parseInt(propertyDetails.age) || 0;
    const ageFactor = Math.max(0.7, 1 - (age * 0.01));
    
    // Market demand factor (simulated)
    const marketDemand = Math.random() * 0.3 + 0.85; // 85% to 115%
    
    // Total calculation
    const totalValue = (basePrice + locationPremium + amenitiesBonus) * conditionMultiplier * ageFactor * marketDemand;
    
    setValuationData({
      basePrice: Math.round(basePrice),
      locationPremium: Math.round(locationPremium),
      amenitiesBonus,
      conditionScore: Math.round((conditionMultiplier - 1) * 100),
      marketDemand: Math.round((marketDemand - 1) * 100),
      totalValue: Math.round(totalValue),
      comparableProperties: comparableProperties.filter(prop => 
        prop.location === propertyDetails.location
      ).slice(0, 3)
    });
  };

  const handlePropertyDetailChange = (field: string, value: any) => {
    setPropertyDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setPropertyDetails(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setFormData({ ...formData, images: [...formData.images, ...newImages] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProperty = {
      id: Date.now(),
      status: 'Under Review',
      views: 0,
      inquiries: 0,
      daysListed: 0,
      ...formData,
      price: `₹${Number(formData.price).toLocaleString('en-IN')}`,
    };
    setListedProperties([newProperty, ...listedProperties]);
    
    // Reset form
    setFormData({
      propertyType: '',
      title: '',
      description: '',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      propertyAge: '',
      parking: '',
      amenities: [],
      images: []
    });
    
    // Show success message and switch to dashboard
    alert('Property listed successfully! Redirecting to dashboard...');
    setActiveTab('dashboard');
  };

  const handleDelete = (id: number) => {
    const propertyToDelete = listedProperties.find(p => p.id === id);
    if (propertyToDelete && window.confirm(`Are you sure you want to delete "${propertyToDelete.title}"? This action cannot be undone.`)) {
      setListedProperties(listedProperties.filter(p => p.id !== id));
      alert('Property deleted successfully!');
    }
  };

  const handleEdit = (property: any) => {
    setEditingProperty({
        ...property,
        price: property.price.replace(/[^0-9]/g, '')
    });
    setIsEditModalOpen(true);
  };
  
  const handleUpdateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    setListedProperties(
      listedProperties.map(p =>
        p.id === editingProperty.id
          ? { ...editingProperty, price: `₹${Number(editingProperty.price).toLocaleString('en-IN')}` }
          : p
      )
    );
    setIsEditModalOpen(false);
    setEditingProperty(null);
    alert('Property updated successfully!');
  };
  
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingProperty) return;
    const { name, value } = e.target;
    setEditingProperty({ ...editingProperty, [name]: value });
  };

  const handleEditAmenityChange = (amenity: string) => {
    if (!editingProperty) return;
    const currentAmenities = editingProperty.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a: string) => a !== amenity)
      : [...currentAmenities, amenity];
    setEditingProperty({ ...editingProperty, amenities: newAmenities });
  };

  const calculateROI = () => {
    const purchase = parseFloat(roiData.purchasePrice);
    const selling = parseFloat(roiData.sellingPrice);
    const holding = parseFloat(roiData.holdingPeriod);
    const additional = parseFloat(roiData.additionalCosts);

    if (purchase > 0 && selling > 0 && holding > 0) {
      const totalInvestment = purchase + additional;
      const totalProfit = selling - totalInvestment;
      const profitMargin = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;
      const annualRoi = holding > 0 ? profitMargin / holding : 0;
      const monthlyReturn = annualRoi / 12;

      setRoiData(prev => ({
        ...prev,
        totalInvestment,
        totalProfit,
        profitMargin,
        annualRoi,
        monthlyReturn
      }));
    }
  };

  const handleROIInputChange = (field: string, value: string) => {
    setRoiData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateAnalyticsData = (details: { price: number, location: string, type: string, startMonth: number, endMonth: number }) => {
    const { price, location, type, startMonth, endMonth } = details;

    // Calculate duration based on start and end months
    let duration = endMonth - startMonth;
    if (duration <= 0) duration += 12; // Handle year wrap-around
    duration = Math.max(1, duration); // Ensure minimum 1 month

    // Use a sophisticated model for market trend, with a fallback for safety
    const baseTrend = growthModels[location]?.[type] ?? 0.08;
    const marketTrend = baseTrend + (Math.random() - 0.5) * 0.02; // Add a small random factor

    // Calculate growth over the specific duration
    const totalGrowthRate = marketTrend * (duration / 12); // Convert to annual rate
    const predictedPrice = price * (1 + totalGrowthRate);
    const growthRate = totalGrowthRate * 100;
      
    // Dynamic market sentiment based on price trends and duration
    const buyerInterest = growthRate > 10 ? 'High' : growthRate > 5 ? 'Medium' : 'Low';
    const inventoryLevel = Math.random() > 0.5 ? 'Low' : 'Medium';
    const priceStability = growthRate < 5 ? 'Stable' : growthRate < 10 ? 'Moderate' : 'Volatile';
  
    // Generate monthly forecast data for the specified duration
    const forecast = [];
    let lastPrice = price;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < duration; i++) {
      const monthIndex = (startMonth + i) % 12;
      lastPrice *= (1 + (marketTrend / 12)); // Monthly growth
      forecast.push({ month: months[monthIndex], price: Math.round(lastPrice) });
    }

    // Generate sentiment scores
    const sentimentScores = {
      interest: Math.round(Math.random() * 50 + 50), // 50-100
      inventory: Math.round(Math.random() * 40 + 40), // 40-80
      stability: Math.round(Math.random() * 60 + 30), // 30-90
      economic: Math.round(Math.random() * 50 + 40), // 40-90
      affordability: Math.round(Math.random() * 40 + 30) // 30-70
    };

    // Generate influencing factors
    const influencingFactors = [
      { name: 'Location', impact: Math.round(baseTrend * 100 + (Math.random() * 5)) },
      { name: 'Market Demand', impact: Math.round(Math.random() * 15 + 5) },
      { name: 'Infrastructure', impact: Math.round(Math.random() * 10 + 5) },
      { name: 'Interest Rates', impact: -Math.round(Math.random() * 10) },
      { name: 'Economy', impact: Math.round(Math.random() * 12) },
    ];

    setAnalyticsData({
      currentPrice: price,
      location: location,
      propertyType: type,
      startMonth: startMonth,
      endMonth: endMonth,
      duration: duration,
      predictedPrice: Math.round(predictedPrice),
      growthRate: Math.round(growthRate * 10) / 10,
      buyerInterest,
      inventoryLevel,
      priceStability,
      monthlyForecast: forecast,
      sentimentScores,
      influencingFactors
    });
  };

  const getPredictionSummary = () => {
    const { growthRate, location, propertyType, duration, startMonth, endMonth } = analyticsData;
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const startMonthName = months[startMonth];
    const endMonthName = months[endMonth];

    // Seasonal analysis
    const isPeakSeason = (startMonth >= 2 && startMonth <= 5) || (endMonth >= 2 && endMonth <= 5); // March to June
    const isMonsoonSeason = (startMonth >= 6 && startMonth <= 9) || (endMonth >= 6 && endMonth <= 9); // July to October
    const isFestivalSeason = (startMonth >= 9 && startMonth <= 11) || (endMonth >= 9 && endMonth <= 11); // October to December

    // Enhanced logic considering duration and seasonal factors
    if (growthRate > 10 && (location === 'RS Puram' || location === 'Race Course') && (propertyType === 'Villa' || propertyType === 'Plot')) {
      const seasonalAdvice = isPeakSeason ? "Peak buying season will maximize your returns." : 
                           isMonsoonSeason ? "Monsoon season may slow down sales but prices remain strong." :
                           "Festival season brings increased buyer activity.";
      
      return {
        title: 'Prime Investment Opportunity',
        message: `${propertyType}s in ${location} show exceptional growth from ${startMonthName} to ${endMonthName}. ${seasonalAdvice}`,
        recommendation: `Sell between ${startMonthName} and ${endMonthName} for maximum profit. Market conditions are optimal.`,
        color: 'green',
        icon: '🚀'
      };
    }
    if (growthRate > 7) {
      const timingAdvice = isPeakSeason ? "You've chosen the peak season - excellent timing!" :
                          isMonsoonSeason ? "Consider extending to post-monsoon for better prices." :
                          "Festival season will boost buyer interest.";
      
      return {
        title: 'Strong Growth Potential',
        message: `The ${duration}-month forecast from ${startMonthName} to ${endMonthName} shows strong growth. ${timingAdvice}`,
        recommendation: `Sell between ${startMonthName} and ${endMonthName} for optimal returns. Market conditions are favorable.`,
        color: 'green',
        icon: '📈'
      };
    }
    if (growthRate > 3) {
      const seasonalNote = isPeakSeason ? "Peak season timing will help maximize your returns." :
                          isMonsoonSeason ? "Monsoon period may require patience but prices are stable." :
                          "Festival season timing is good for buyer engagement.";
      
      return {
        title: 'Moderate Growth Expected',
        message: `Steady ${growthRate.toFixed(1)}% growth predicted from ${startMonthName} to ${endMonthName}. ${seasonalNote}`,
        recommendation: `Selling between ${startMonthName} and ${endMonthName} should yield reasonable returns.`,
        color: 'yellow',
        icon: '📊'
      };
    }
    if (growthRate >= 0) {
      const timingSuggestion = isPeakSeason ? "Peak season timing may help offset low growth." :
                              isMonsoonSeason ? "Consider waiting until post-monsoon for better market conditions." :
                              "Festival season might provide a boost to buyer interest.";
      
      return {
        title: 'Stable but Cautious Market',
        message: `Low growth forecast from ${startMonthName} to ${endMonthName}. ${timingSuggestion}`,
        recommendation: `Consider holding beyond ${endMonthName} unless selling is necessary. Market may improve.`,
        color: 'yellow',
        icon: '⚠️'
      };
    }
    
    const recoveryAdvice = isPeakSeason ? "Even peak season may not offset the decline." :
                          isMonsoonSeason ? "Monsoon period may worsen the situation." :
                          "Festival season might provide some relief.";
    
    return {
      title: 'Potential Market Dip',
      message: `${Math.abs(growthRate).toFixed(1)}% decline forecasted from ${startMonthName} to ${endMonthName}. ${recoveryAdvice}`,
      recommendation: `Consider waiting beyond ${endMonthName} for more favorable market conditions.`,
      color: 'red',
      icon: '📉'
    };
  };

  // Auto-calculate valuation when property details change
  useEffect(() => {
    if (propertyDetails.area && propertyDetails.location) {
      calculateValuation();
    }
  }, [propertyDetails]);

  const predictionSummary = getPredictionSummary();

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={14}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Financial Tools Calculation Functions
  const calculateMortgage = () => {
    const { propertyPrice, downPayment, interestRate, loanTerm } = mortgageData;
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    
    // Calculate monthly EMI
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const totalAmount = monthlyPayment * totalPayments;
    const totalInterest = totalAmount - loanAmount;
    
    // Generate EMI breakdown
    const emiBreakdown: { month: number, principal: number, interest: number, balance: number }[] = [];
    let balance = loanAmount;
    for (let month = 1; month <= Math.min(12, totalPayments); month++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      balance -= principal;
      emiBreakdown.push({
        month,
        principal: Math.round(principal),
        interest: Math.round(interest),
        balance: Math.max(0, Math.round(balance))
      });
    }
    
    setMortgageData(prev => ({
      ...prev,
      loanAmount,
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      emiBreakdown
    }));
  };

  const calculateTax = () => {
    const { purchasePrice, sellingPrice, holdingPeriod, improvements, transferCosts } = taxData;
    
    // Calculate capital gains
    const indexedCost = purchasePrice * Math.pow(1.05, holdingPeriod); // 5% inflation index
    const capitalGains = sellingPrice - indexedCost - improvements - transferCosts;
    
    // Determine tax rate based on holding period
    let taxRate = 0;
    let exemptions = 0;
    
    if (holdingPeriod >= 2) {
      // Long-term capital gains
      taxRate = 20;
      exemptions = Math.min(100000, capitalGains); // Basic exemption
    } else {
      // Short-term capital gains
      taxRate = 30;
      exemptions = 0;
    }
    
    const taxableAmount = Math.max(0, capitalGains - exemptions);
    const taxLiability = (taxableAmount * taxRate) / 100;
    const netGains = capitalGains - taxLiability;
    
    setTaxData(prev => ({
      ...prev,
      capitalGains: Math.round(capitalGains),
      taxLiability: Math.round(taxLiability),
      taxRate,
      exemptions: Math.round(exemptions),
      netGains: Math.round(netGains)
    }));
  };

  const calculateInvestment = () => {
    const { sellingPrice, monthlyRent, annualRentGrowth, maintenanceCosts, propertyTax, insuranceCosts, holdingPeriod } = investmentData;
    
    // Selling scenario
    const sellingScenario = {
      netAmount: sellingPrice - (sellingPrice * 0.05), // 5% selling costs
      totalReturns: 0,
      annualizedReturn: 0
    };
    sellingScenario.totalReturns = sellingScenario.netAmount - taxData.purchasePrice;
    sellingScenario.annualizedReturn = ((sellingScenario.totalReturns / taxData.purchasePrice) / holdingPeriod) * 100;
    
    // Renting scenario
    let totalRentalIncome = 0;
    let totalExpenses = 0;
    let currentRent = monthlyRent;
    
    for (let year = 1; year <= holdingPeriod; year++) {
      totalRentalIncome += currentRent * 12;
      totalExpenses += (maintenanceCosts + propertyTax + insuranceCosts) * 12;
      currentRent *= (1 + annualRentGrowth / 100);
    }
    
    const netRentalIncome = totalRentalIncome - totalExpenses;
    const propertyValue = sellingPrice * Math.pow(1.08, holdingPeriod); // 8% annual appreciation
    const totalReturns = netRentalIncome + propertyValue - taxData.purchasePrice;
    const annualizedReturn = ((totalReturns / taxData.purchasePrice) / holdingPeriod) * 100;
    
    const rentingScenario = {
      totalRentalIncome: Math.round(totalRentalIncome),
      totalExpenses: Math.round(totalExpenses),
      netRentalIncome: Math.round(netRentalIncome),
      propertyValue: Math.round(propertyValue),
      totalReturns: Math.round(totalReturns),
      annualizedReturn: Math.round(annualizedReturn * 100) / 100
    };
    
    // Comparison
    const difference = rentingScenario.totalReturns - sellingScenario.totalReturns;
    const betterOption = difference > 0 ? 'Renting' : 'Selling';
    const recommendation = difference > 0 
      ? `Renting is better by ₹${Math.abs(difference).toLocaleString()} over ${holdingPeriod} years`
      : `Selling is better by ₹${Math.abs(difference).toLocaleString()} over ${holdingPeriod} years`;
    
    setInvestmentData(prev => ({
      ...prev,
      sellingScenario: {
        netAmount: Math.round(sellingScenario.netAmount),
        totalReturns: Math.round(sellingScenario.totalReturns),
        annualizedReturn: Math.round(sellingScenario.annualizedReturn * 100) / 100
      },
      rentingScenario,
      comparison: {
        betterOption,
        difference: Math.round(difference),
        recommendation
      }
    }));
  };

  const calculateInsurance = () => {
    const { propertyValue, propertyType, constructionType, location, coverageType } = insuranceData;
    
    // Base premium calculation
    let baseRate = 0.15; // 0.15% of property value
    
    // Adjustments based on factors
    if (propertyType === 'Commercial') baseRate *= 1.2;
    if (constructionType === 'RCC') baseRate *= 0.9;
    if (location === 'Urban') baseRate *= 1.1;
    if (coverageType === 'Comprehensive') baseRate *= 1.3;
    
    const annualPremium = propertyValue * baseRate / 100;
    const monthlyPremium = annualPremium / 12;
    
    // Coverage details
    const coverageDetails = {
      structure: propertyValue * 0.8,
      contents: propertyValue * 0.2,
      liability: 1000000,
      naturalDisasters: propertyValue * 0.5
    };
    
    const totalCoverage = coverageDetails.structure + coverageDetails.contents + coverageDetails.liability + coverageDetails.naturalDisasters;
    
    setInsuranceData(prev => ({
      ...prev,
      annualPremium: Math.round(annualPremium),
      monthlyPremium: Math.round(monthlyPremium),
      coverageDetails: {
        structure: Math.round(coverageDetails.structure),
        contents: Math.round(coverageDetails.contents),
        liability: Math.round(coverageDetails.liability),
        naturalDisasons: Math.round(coverageDetails.naturalDisasters)
      },
      totalCoverage: Math.round(totalCoverage)
    }));
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateMortgage();
  }, [mortgageData.propertyPrice, mortgageData.downPayment, mortgageData.interestRate, mortgageData.loanTerm]);

  useEffect(() => {
    calculateTax();
  }, [taxData.purchasePrice, taxData.sellingPrice, taxData.holdingPeriod, taxData.improvements, taxData.transferCosts]);

  useEffect(() => {
    calculateInvestment();
  }, [investmentData.sellingPrice, investmentData.monthlyRent, investmentData.annualRentGrowth, investmentData.maintenanceCosts, investmentData.propertyTax, investmentData.insuranceCosts, investmentData.holdingPeriod, taxData.purchasePrice]);

  useEffect(() => {
    calculateInsurance();
  }, [insuranceData.propertyValue, insuranceData.propertyType, insuranceData.constructionType, insuranceData.location, insuranceData.coverageType]);

  const TABS = [
    { name: 'List Property', icon: <Home className="h-5 w-5" /> },
    { name: 'Seller Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Professional Services', icon: <Award className="h-5 w-5" /> },
    { name: 'Market Analysis', icon: <TrendingUp className="h-5 w-5" /> },
    { name: 'Property Analytics', icon: <Calculator className="h-5 w-5" /> },
    { name: 'Financial Tools', icon: <DollarSign className="h-5 w-5" /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'list-property':
        return (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Property Listing Form */}
            <div className="lg:col-span-2">
              <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
                <h2 className="text-2xl font-bold text-gold mb-6">List Your Property</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Property Type</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        required
                      >
                        <option value="">Select Property Type</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="house">Independent House</option>
                        <option value="plot">Plot/Land</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Expected Price (₹)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Enter expected price"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Property Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter a compelling title for your property"
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Bedrooms</label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        placeholder="No. of bedrooms"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Bathrooms</label>
                      <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        placeholder="No. of bathrooms"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Area (sq ft)</label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        placeholder="Total area"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter property location"
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Describe your property in detail..."
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Parking', 'Garden', 'Balcony', 'Lift', 'Security', 'Power Backup', 'Water Supply', 'Internet', 'Gym', 'Swimming Pool'].map(amenity => (
                        <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => handleAmenityChange(amenity)}
                            className="text-gold bg-dark border-gold/30 rounded focus:ring-gold"
                          />
                          <span className="text-white/80">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Property Images</label>
                    <div className="border-2 border-dashed border-gold/30 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-gold mx-auto mb-4" />
                      <p className="text-white/70 mb-4">Upload high-quality images of your property</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="bg-gold text-dark px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-yellow-400 transition"
                      >
                        Choose Images
                      </label>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="mt-4">
                        <p className="text-white/70 mb-2">{formData.images.length} images selected</p>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold text-dark font-bold py-4 rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
                  >
                    List Property
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why Choose Us */}
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <h3 className="text-xl font-bold text-gold mb-4">Why Choose Raarya?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Maximum Exposure</h4>
                      <p className="text-white/70 text-sm">Reach thousands of qualified buyers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Professional Support</h4>
                      <p className="text-white/70 text-sm">Expert guidance throughout the process</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Best Price Guarantee</h4>
                      <p className="text-white/70 text-sm">Get the best market value for your property</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <h3 className="text-xl font-bold text-gold mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gold" />
                    <span className="text-white">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gold" />
                    <span className="text-white">sell@raarya.com</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gold text-dark font-medium py-2 rounded-lg hover:bg-yellow-400 transition">
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Dashboard Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Active Listings</p>
                    <p className="text-2xl font-bold text-gold">{listedProperties.filter(p => p.status === 'Active').length}</p>
                  </div>
                  <Home className="h-8 w-8 text-gold/50" />
                </div>
              </div>
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Views</p>
                    <p className="text-2xl font-bold text-gold">{listedProperties.reduce((sum, p) => sum + p.views, 0)}</p>
                  </div>
                  <Users className="h-8 w-8 text-gold/50" />
                </div>
              </div>
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Inquiries</p>
                    <p className="text-2xl font-bold text-gold">{listedProperties.reduce((sum, p) => sum + p.inquiries, 0)}</p>
                  </div>
                  <Phone className="h-8 w-8 text-gold/50" />
                </div>
              </div>
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Listings</p>
                    <p className="text-2xl font-bold text-gold">{listedProperties.length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gold/50" />
                </div>
              </div>
            </div>

            {/* Your Listings */}
            <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gold">Your Property Listings</h3>
                <button
                  onClick={() => setActiveTab('list-property')}
                  className="bg-gold text-dark font-medium px-4 py-2 rounded-lg hover:bg-yellow-400 transition flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Add New Property
                </button>
              </div>
              
              {listedProperties.length === 0 ? (
                <div className="text-center py-12">
                  <Home className="h-16 w-16 text-gold/50 mx-auto mb-4" />
                  <h4 className="text-white font-medium mb-2">No Properties Listed Yet</h4>
                  <p className="text-white/70 mb-6">Start by listing your first property to see it here</p>
                  <button
                    onClick={() => setActiveTab('list-property')}
                    className="bg-gold text-dark font-medium px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
                  >
                    List Your First Property
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listedProperties.map(listing => (
                    <div key={listing.id} className="bg-dark rounded-lg border border-gold/10 overflow-hidden hover:border-gold/30 transition-all duration-300">
                      {/* Property Image */}
                      <div className="h-48 bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center">
                        <Home className="h-12 w-12 text-gold/50" />
                      </div>
                      
                      {/* Property Details */}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium text-lg line-clamp-2">{listing.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            listing.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {listing.status}
                          </span>
                        </div>
                        
                        <p className="text-white/70 text-sm mb-3 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {listing.location}
                        </p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gold font-bold text-lg">{listing.price}</span>
                          <span className="text-white/60 text-sm">{listing.propertyType}</span>
                        </div>
                        
                        {/* Property Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                          <div className="bg-dark-light rounded p-2">
                            <div className="text-gold font-bold text-sm">{listing.bedrooms || '-'}</div>
                            <div className="text-white/60 text-xs">Beds</div>
                          </div>
                          <div className="bg-dark-light rounded p-2">
                            <div className="text-gold font-bold text-sm">{listing.bathrooms || '-'}</div>
                            <div className="text-white/60 text-xs">Baths</div>
                          </div>
                          <div className="bg-dark-light rounded p-2">
                            <div className="text-gold font-bold text-sm">{listing.area || '-'}</div>
                            <div className="text-white/60 text-xs">Sqft</div>
                          </div>
                        </div>
                        
                        {/* Performance Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs">
                          <div>
                            <div className="text-white font-medium">{listing.views}</div>
                            <div className="text-white/60">Views</div>
                          </div>
                          <div>
                            <div className="text-white font-medium">{listing.inquiries}</div>
                            <div className="text-white/60">Inquiries</div>
                          </div>
                          <div>
                            <div className="text-white font-medium">{listing.daysListed}</div>
                            <div className="text-white/60">Days</div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(listing)}
                            className="flex-1 bg-gold/10 text-gold border border-gold/30 px-3 py-2 rounded-lg hover:bg-gold hover:text-dark transition-all duration-200 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(listing.id)}
                            className="flex-1 bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">Professional Services</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Enhance your property listing with our professional services designed to maximize your property's appeal and value.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {sellerServices.map((service, index) => (
                <div key={index} className="bg-dark-light rounded-xl p-6 border border-gold/20 hover:border-gold/40 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    {service.icon}
                    <span className="text-gold font-bold text-lg">{service.price}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-white/70 mb-4">{service.description}</p>
                  <button className="bg-gold text-dark font-medium px-6 py-2 rounded-lg hover:bg-yellow-400 transition">
                    Book Service
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Services */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Premium Packages</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Target className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Basic Package</h4>
                  <p className="text-gold font-bold text-2xl mb-4">₹8,000</p>
                  <ul className="text-white/70 text-sm space-y-2 mb-6">
                    <li>Professional Photography</li>
                    <li>Property Listing</li>
                    <li>Basic Marketing</li>
                  </ul>
                  <button className="bg-gold text-dark font-medium px-6 py-2 rounded-lg hover:bg-yellow-400 transition">
                    Choose Package
                  </button>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border-2 border-gold">
                  <Zap className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Premium Package</h4>
                  <p className="text-gold font-bold text-2xl mb-4">₹15,000</p>
                  <ul className="text-white/70 text-sm space-y-2 mb-6">
                    <li>All Basic Features</li>
                    <li>Virtual Tour</li>
                    <li>Social Media Marketing</li>
                    <li>Legal Assistance</li>
                  </ul>
                  <button className="bg-gold text-dark font-medium px-6 py-2 rounded-lg hover:bg-yellow-400 transition">
                    Choose Package
                  </button>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Award className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Elite Package</h4>
                  <p className="text-gold font-bold text-2xl mb-4">₹25,000</p>
                  <ul className="text-white/70 text-sm space-y-2 mb-6">
                    <li>All Premium Features</li>
                    <li>Dedicated Agent</li>
                    <li>Priority Listing</li>
                    <li>Negotiation Support</li>
                  </ul>
                  <button className="bg-gold text-dark font-medium px-6 py-2 rounded-lg hover:bg-yellow-400 transition">
                    Choose Package
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'market-analysis':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">Advanced Property Valuation</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Get a comprehensive property valuation using our AI-powered multi-factor analysis system.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Advanced Valuation Form */}
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <h3 className="text-xl font-bold text-gold mb-6">Property Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Property Type</label>
                    <select 
                      value={propertyDetails.propertyType}
                      onChange={(e) => handlePropertyDetailChange('propertyType', e.target.value)}
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="house">Independent House</option>
                      <option value="plot">Plot/Land</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Location</label>
                    <select 
                      value={propertyDetails.location}
                      onChange={(e) => handlePropertyDetailChange('location', e.target.value)}
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    >
                      <option value="">Select Location</option>
                      <option value="Race Course">Race Course</option>
                      <option value="Vadavalli">Vadavalli</option>
                      <option value="Peelamedu">Peelamedu</option>
                      <option value="Saibaba Colony">Saibaba Colony</option>
                      <option value="RS Puram">RS Puram</option>
                      <option value="Tatabad">Tatabad</option>
                      <option value="Singanallur">Singanallur</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Area (sq ft)</label>
                      <input
                        type="number"
                        value={propertyDetails.area}
                        onChange={(e) => handlePropertyDetailChange('area', e.target.value)}
                        placeholder="Enter area"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Age (years)</label>
                      <input
                        type="number"
                        value={propertyDetails.age}
                        onChange={(e) => handlePropertyDetailChange('age', e.target.value)}
                        placeholder="Property age"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Property Condition</label>
                    <select 
                      value={propertyDetails.condition}
                      onChange={(e) => handlePropertyDetailChange('condition', e.target.value)}
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="average">Average</option>
                      <option value="needs_repair">Needs Repair</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Amenities</label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {Object.keys(amenitiesScoring).map(amenity => (
                        <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={propertyDetails.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="text-gold bg-dark border-gold/30 rounded focus:ring-gold"
                          />
                          <span className="text-white/80 text-sm">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={calculateValuation}
                    className="w-full bg-gold text-dark font-bold py-3 rounded-lg hover:bg-yellow-400 transition"
                  >
                    Calculate Valuation
                  </button>
                </div>
              </div>

              {/* Valuation Results */}
              <div className="space-y-6">
                <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                  <h3 className="text-xl font-bold text-gold mb-6">Valuation Results</h3>
                  {valuationData.totalValue > 0 ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-gold mb-2">
                          ₹{valuationData.totalValue.toLocaleString()}
                        </p>
                        <p className="text-white/70">Estimated Market Value</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-dark rounded-lg">
                          <span className="text-white/70">Base Price:</span>
                          <span className="text-white font-medium">₹{valuationData.basePrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark rounded-lg">
                          <span className="text-white/70">Location Premium:</span>
                          <span className="text-green-400 font-medium">+₹{valuationData.locationPremium.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark rounded-lg">
                          <span className="text-white/70">Amenities Bonus:</span>
                          <span className="text-green-400 font-medium">+₹{valuationData.amenitiesBonus.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark rounded-lg">
                          <span className="text-white/70">Condition Factor:</span>
                          <span className={`font-medium ${valuationData.conditionScore >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {valuationData.conditionScore >= 0 ? '+' : ''}{valuationData.conditionScore}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark rounded-lg">
                          <span className="text-white/70">Market Demand:</span>
                          <span className={`font-medium ${valuationData.marketDemand >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {valuationData.marketDemand >= 0 ? '+' : ''}{valuationData.marketDemand}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="h-12 w-12 text-gold/50 mx-auto mb-4" />
                      <p className="text-white/70">Enter property details and click "Calculate Valuation" to get started</p>
                    </div>
                  )}
                </div>

                {/* Comparable Properties */}
                {valuationData.comparableProperties.length > 0 && (
                  <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                    <h3 className="text-xl font-bold text-gold mb-4">Recent Comparable Sales</h3>
                    <div className="space-y-3">
                      {valuationData.comparableProperties.map(prop => (
                        <div key={prop.id} className="p-3 bg-dark rounded-lg border border-gold/10">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-white font-medium text-sm">{prop.title}</h4>
                              <p className="text-white/70 text-xs">{prop.area} • {prop.location}</p>
                              <p className="text-gold font-semibold text-sm">{prop.price}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white/70 text-xs">₹{prop.pricePerSqFt}/sq ft</p>
                              <p className="text-white/70 text-xs">Sold: {new Date(prop.soldDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Market Trends Section */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Market Trends & Analysis</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <TrendingUp className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Price Trends</h4>
                  <p className="text-gold font-bold text-2xl mb-2">+8.5%</p>
                  <p className="text-white/70 text-sm">Average price growth in last 6 months</p>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Clock className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Days on Market</h4>
                  <p className="text-gold font-bold text-2xl mb-2">45</p>
                  <p className="text-white/70 text-sm">Average time to sell</p>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Users className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Buyer Demand</h4>
                  <p className="text-gold font-bold text-2xl mb-2">High</p>
                  <p className="text-white/70 text-sm">Strong buyer interest in area</p>
                </div>
              </div>
            </div>

            {/* Comprehensive Comparable Properties Analysis */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Comparable Properties Analysis</h3>
              <div className="space-y-6">
                {/* Property Comparison Chart */}
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">Recent Sales Comparison</h4>
                  <div className="space-y-4">
                    {comparableProperties.map(prop => (
                      <div key={prop.id} className="flex items-center justify-between p-4 bg-dark-light rounded-lg border border-gold/10">
                        <div className="flex-1">
                          <h5 className="text-white font-medium">{prop.title}</h5>
                          <p className="text-white/70 text-sm">{prop.area} • {prop.location}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-gold font-semibold">{prop.price}</span>
                            <span className="text-white/70 text-sm">₹{prop.pricePerSqFt}/sq ft</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white/70 text-sm">Sold: {new Date(prop.soldDate).toLocaleDateString()}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            {prop.amenities.slice(0, 3).map(amenity => (
                              <span key={amenity} className="text-xs px-2 py-1 bg-gold/20 text-gold rounded">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Analysis */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-dark rounded-lg p-6 border border-gold/20">
                    <h4 className="text-white font-bold mb-4">Price per Sq Ft Analysis</h4>
                    <div className="space-y-3">
                      {comparableProperties.map(prop => (
                        <div key={prop.id} className="flex items-center justify-between">
                          <span className="text-white/70 text-sm">{prop.location}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gold font-semibold">₹{prop.pricePerSqFt}</span>
                            <div className="w-20 h-2 bg-dark-light rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gold rounded-full" 
                                style={{ width: `${(prop.pricePerSqFt / 10000) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-dark rounded-lg p-6 border border-gold/20">
                    <h4 className="text-white font-bold mb-4">Market Insights</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Average Price:</span>
                        <span className="text-gold font-semibold">₹7,945/sq ft</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Price Range:</span>
                        <span className="text-gold font-semibold">₹5,500 - ₹9,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Most Popular:</span>
                        <span className="text-gold font-semibold">Race Course</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Best Value:</span>
                        <span className="text-gold font-semibold">Peelamedu</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities Impact Analysis */}
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">Amenities Impact on Value</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(amenitiesScoring).slice(0, 8).map(([amenity, value]) => (
                      <div key={amenity} className="text-center p-3 bg-dark-light rounded-lg border border-gold/10">
                        <p className="text-white font-medium text-sm mb-1">{amenity}</p>
                        <p className="text-gold font-bold">+₹{(value/1000).toFixed(0)}K</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Location Analysis */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Location Premium Analysis</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(locationPricing).map(([location, data]) => (
                  <div key={location} className="p-4 bg-dark rounded-lg border border-gold/20 hover:border-gold/40 transition-all duration-300">
                    <h4 className="text-white font-medium mb-2">{location}</h4>
                    <p className="text-gold font-bold text-lg">₹{data.basePrice.toLocaleString()}</p>
                    <p className="text-white/70 text-sm">per sq ft</p>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        data.premium > 1.2 ? 'bg-green-500/20 text-green-400' : 
                        data.premium > 1.0 ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {((data.premium - 1) * 100).toFixed(0)}% premium
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gold/20">
                      <p className="text-white/70 text-xs">
                        {data.premium > 1.2 ? 'Premium Location' : 
                         data.premium > 1.0 ? 'Good Investment' : 
                         'Affordable Option'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Recommendations */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Investment Recommendations</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Target className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Best Investment Areas</h4>
                  <ul className="text-white/70 text-sm space-y-2 text-left">
                    <li>• Race Course (40% premium)</li>
                    <li>• RS Puram (50% premium)</li>
                    <li>• Saibaba Colony (30% premium)</li>
                  </ul>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <TrendingUp className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Growth Potential</h4>
                  <ul className="text-white/70 text-sm space-y-2 text-left">
                    <li>• Peelamedu (10% premium)</li>
                    <li>• Vadavalli (20% premium)</li>
                    <li>• Tatabad (0% premium)</li>
                  </ul>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Award className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Value Additions</h4>
                  <ul className="text-white/70 text-sm space-y-2 text-left">
                    <li>• Swimming Pool (+₹2L)</li>
                    <li>• Gym (+₹1.5L)</li>
                    <li>• Lift (+₹1L)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">Property Analytics</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Explore advanced analytics and insights to make informed investment decisions.
              </p>
            </div>

            {/* ROI Calculator */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">ROI Calculator</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-4">Investment Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Purchase Price (₹)</label>
                      <input
                        type="number"
                        value={roiData.purchasePrice}
                        onChange={(e) => handleROIInputChange('purchasePrice', e.target.value)}
                        placeholder="Enter purchase price"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Expected Selling Price (₹)</label>
                      <input
                        type="number"
                        value={roiData.sellingPrice}
                        onChange={(e) => handleROIInputChange('sellingPrice', e.target.value)}
                        placeholder="Enter expected selling price"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Holding Period (years)</label>
                      <input
                        type="number"
                        value={roiData.holdingPeriod}
                        onChange={(e) => handleROIInputChange('holdingPeriod', e.target.value)}
                        placeholder="Enter holding period"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Additional Costs (₹)</label>
                      <input
                        type="number"
                        value={roiData.additionalCosts}
                        onChange={(e) => handleROIInputChange('additionalCosts', e.target.value)}
                        placeholder="Maintenance, taxes, etc."
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <button 
                      onClick={calculateROI}
                      className="w-full bg-gold text-dark font-bold py-3 rounded-lg hover:bg-yellow-400 transition"
                    >
                      Calculate ROI
                    </button>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">ROI Analysis</h4>
                  {roiData.annualRoi > 0 ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gold mb-2">{roiData.annualRoi.toFixed(1)}%</p>
                        <p className="text-white/70">Annual ROI</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                          <span className="text-white/70">Total Investment:</span>
                          <span className="text-white font-semibold">₹{roiData.totalInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                          <span className="text-white/70">Total Profit:</span>
                          <span className={`font-semibold ${roiData.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {roiData.totalProfit >= 0 ? '+' : ''}{roiData.totalProfit.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                          <span className="text-white/70">Profit Margin:</span>
                          <span className={`font-semibold ${roiData.profitMargin >= 0 ? 'text-gold' : 'text-red-400'}`}>
                            {roiData.profitMargin >= 0 ? '+' : ''}{roiData.profitMargin.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                          <span className="text-white/70">Monthly Return:</span>
                          <span className={`font-semibold ${roiData.monthlyReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {roiData.monthlyReturn >= 0 ? '+' : ''}{roiData.monthlyReturn.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="h-12 w-12 text-gold/50 mx-auto mb-4" />
                      <p className="text-white/70">Enter investment details and click "Calculate ROI" to get started</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Market Timing Analysis */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Market Timing Analysis</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <TrendingUp className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Best Time to Sell</h4>
                  <p className="text-gold font-bold text-2xl mb-2">March-April</p>
                  <p className="text-white/70 text-sm">Peak buying season</p>
                  <div className="mt-4">
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      +12% premium
                    </span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Clock className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Optimal Listing Duration</h4>
                  <p className="text-gold font-bold text-2xl mb-2">45-60 days</p>
                  <p className="text-white/70 text-sm">Maximum exposure</p>
                  <div className="mt-4">
                    <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                      Best price
                    </span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <BarChart3 className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Market Cycle</h4>
                  <p className="text-gold font-bold text-2xl mb-2">Bull Market</p>
                  <p className="text-white/70 text-sm">Strong demand</p>
                  <div className="mt-4">
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      Favorable
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Comparison */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Investment Comparison</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">Property Investment vs Other Assets</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Real Estate</span>
                      <span className="text-gold font-bold">12.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Stock Market</span>
                      <span className="text-blue-400 font-bold">8.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Fixed Deposits</span>
                      <span className="text-green-400 font-bold">6.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Gold</span>
                      <span className="text-yellow-400 font-bold">9.1%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">Risk Assessment</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Market Risk:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-dark-light rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-yellow-400 font-semibold">Medium</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Liquidity Risk:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-dark-light rounded-full overflow-hidden">
                          <div className="h-full bg-red-400 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                        <span className="text-red-400 font-semibold">High</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Return Potential:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-dark-light rounded-full overflow-hidden">
                          <div className="h-full bg-green-400 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-green-400 font-semibold">High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictive Analytics */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20 col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-gold mb-6">Predictive Analytics</h3>
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                
                {/* Input and Prediction Output */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Current Property Price (₹)</label>
                      <input
                        type="number"
                        value={analyticsData.currentPrice}
                        onChange={(e) => updateAnalyticsData({ price: parseFloat(e.target.value) || 0, location: analyticsData.location, type: analyticsData.propertyType, startMonth: analyticsData.startMonth, endMonth: analyticsData.endMonth })}
                        placeholder="Enter current property price"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Location</label>
                      <select 
                        value={analyticsData.location}
                        onChange={(e) => updateAnalyticsData({ price: analyticsData.currentPrice, location: e.target.value, type: analyticsData.propertyType, startMonth: analyticsData.startMonth, endMonth: analyticsData.endMonth })}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      >
                        {Object.keys(growthModels).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Property Type</label>
                      <select 
                        value={analyticsData.propertyType}
                        onChange={(e) => updateAnalyticsData({ price: analyticsData.currentPrice, location: analyticsData.location, type: e.target.value, startMonth: analyticsData.startMonth, endMonth: analyticsData.endMonth })}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      >
                        {Object.keys(growthModels['Race Course']).map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Start Month</label>
                        <select 
                          value={analyticsData.startMonth}
                          onChange={(e) => updateAnalyticsData({ price: analyticsData.currentPrice, location: analyticsData.location, type: analyticsData.propertyType, startMonth: parseInt(e.target.value), endMonth: analyticsData.endMonth })}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value={0}>January</option>
                          <option value={1}>February</option>
                          <option value={2}>March</option>
                          <option value={3}>April</option>
                          <option value={4}>May</option>
                          <option value={5}>June</option>
                          <option value={6}>July</option>
                          <option value={7}>August</option>
                          <option value={8}>September</option>
                          <option value={9}>October</option>
                          <option value={10}>November</option>
                          <option value={11}>December</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">End Month</label>
                        <select 
                          value={analyticsData.endMonth}
                          onChange={(e) => updateAnalyticsData({ price: analyticsData.currentPrice, location: analyticsData.location, type: analyticsData.propertyType, startMonth: analyticsData.startMonth, endMonth: parseInt(e.target.value) })}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value={0}>January</option>
                          <option value={1}>February</option>
                          <option value={2}>March</option>
                          <option value={3}>April</option>
                          <option value={4}>May</option>
                          <option value={5}>June</option>
                          <option value={6}>July</option>
                          <option value={7}>August</option>
                          <option value={8}>September</option>
                          <option value={9}>October</option>
                          <option value={10}>November</option>
                          <option value={11}>December</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 bg-dark rounded-lg p-6 border border-gold/20">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-lg">Current Price:</span>
                      <span className="text-white font-semibold text-xl">₹{analyticsData.currentPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-lg">Predicted Price:</span>
                      <span className="text-gold font-semibold text-xl">₹{analyticsData.predictedPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-lg">Growth Rate:</span>
                      <span className={`font-semibold text-xl ${analyticsData.growthRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {analyticsData.growthRate >= 0 ? '+' : ''}{analyticsData.growthRate}%
                      </span>
                    </div>
                  </div>
                  <div className={`mt-4 p-6 rounded-lg border ${
                    predictionSummary.color === 'green' ? 'bg-green-500/10 border-green-500/20' :
                    predictionSummary.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/20' :
                    'bg-red-500/10 border-red-500/20'
                  }`}>
                    <div className="flex items-start gap-4 mb-3">
                      <span className="text-3xl mt-1">{predictionSummary.icon}</span>
                      <div>
                        <h4 className="text-xl font-bold text-white">{predictionSummary.title}</h4>
                        <p className="text-white/80 mt-1">{predictionSummary.message}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gold/20">
                        <p className={`font-semibold ${
                          predictionSummary.color === 'green' ? 'text-green-400' :
                          predictionSummary.color === 'yellow' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                        <span className="font-bold text-gold">Recommendation:</span> {predictionSummary.recommendation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Forecast Visualization */}
                <div className="lg:col-span-3 bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold text-center mb-4">Price Forecast ({analyticsData.duration} Months)</h4>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={analyticsData.monthlyForecast}
                        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="month" stroke="#aaa" fontSize={14} />
                        <YAxis 
                          stroke="#aaa" 
                          fontSize={14}
                          tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} 
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c09a3e', borderRadius: '0.5rem' }}
                          labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                          formatter={(value, name) => [`₹${(value as number).toLocaleString()}`, 'Predicted Price']}
                        />
                        <Legend wrapperStyle={{ color: '#fff', paddingTop: '20px' }} />
                        <Line type="monotone" dataKey="price" name={`${analyticsData.duration}-Month Forecast`} stroke="#c09a3e" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 9 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      case 'financial-tools':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">Financial Tools & Services</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Comprehensive financial calculators to help you make informed decisions about your property investment.
              </p>
            </div>

            {/* Mortgage Calculator */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
                <DollarSign className="h-6 w-6" />
                Mortgage Calculator
              </h3>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div>
                  <h4 className="text-white font-bold mb-4">Loan Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Property Price (₹)</label>
                      <input
                        type="number"
                        value={mortgageData.propertyPrice}
                        onChange={(e) => setMortgageData(prev => ({ ...prev, propertyPrice: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Down Payment (₹)</label>
                      <input
                        type="number"
                        value={mortgageData.downPayment}
                        onChange={(e) => setMortgageData(prev => ({ ...prev, downPayment: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Interest Rate (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={mortgageData.interestRate}
                          onChange={(e) => setMortgageData(prev => ({ ...prev, interestRate: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Loan Term (Years)</label>
                        <input
                          type="number"
                          value={mortgageData.loanTerm}
                          onChange={(e) => setMortgageData(prev => ({ ...prev, loanTerm: parseInt(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column: Visualization and Summary */}
                <div className="space-y-6">
                  <div className="bg-dark rounded-lg p-6 border border-gold/20 h-96">
                    <h4 className="text-white font-bold text-center mb-4">Loan Breakdown</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 5, right: 5, bottom: 30, left: 5 }}>
                        <Pie
                           data={[
                            { name: 'Principal', value: mortgageData.loanAmount },
                            { name: 'Total Interest', value: mortgageData.totalInterest },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                        >
                          <Cell fill="#F59E0B" />
                          <Cell fill="#EF4444" />
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c09a3e' }}
                          formatter={(value) => `₹${(value as number).toLocaleString()}`}
                          itemStyle={{ color: '#fff' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend
                          iconType="circle"
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{ color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-dark rounded-lg p-4 border border-gold/20">
                     <div className="flex justify-between items-center text-lg">
                        <span className="text-white/70">Monthly EMI:</span>
                        <span className="text-gold font-bold">₹{mortgageData.monthlyPayment.toLocaleString()}</span>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Raarya Finance Insights */}
            <div className="bg-gradient-to-r from-gold/10 to-transparent rounded-xl p-8 border border-gold/20">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <TrendingUp className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Current Market Rates</h4>
                  <p className="text-gold font-bold text-2xl mb-2">8.5%</p>
                  <p className="text-white/70 text-sm">Average Home Loan Rate</p>
                  <div className="mt-3">
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      -0.25% from last month
                    </span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Users className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Raarya Advantage</h4>
                  <p className="text-gold font-bold text-2xl mb-2">15+</p>
                  <p className="text-white/70 text-sm">Partner Banks</p>
                  <div className="mt-3">
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                      Best rates guaranteed
                    </span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Clock className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Processing Time</h4>
                  <p className="text-gold font-bold text-2xl mb-2">7-10</p>
                  <p className="text-white/70 text-sm">Days Average</p>
                  <div className="mt-3">
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                      Fastest in industry
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Calculator */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
                <Calculator className="h-6 w-6" />
                Capital Gains Tax Calculator
              </h3>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div>
                  <h4 className="text-white font-bold mb-4">Property Details</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Purchase Price (₹)</label>
                        <input
                          type="number"
                          value={taxData.purchasePrice}
                          onChange={(e) => setTaxData(prev => ({ ...prev, purchasePrice: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Selling Price (₹)</label>
                        <input
                          type="number"
                          value={taxData.sellingPrice}
                          onChange={(e) => setTaxData(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Holding Period (Years)</label>
                      <input
                        type="number"
                        value={taxData.holdingPeriod}
                        onChange={(e) => setTaxData(prev => ({ ...prev, holdingPeriod: parseInt(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Improvements (₹)</label>
                        <input
                          type="number"
                          value={taxData.improvements}
                          onChange={(e) => setTaxData(prev => ({ ...prev, improvements: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Transfer Costs (₹)</label>
                        <input
                          type="number"
                          value={taxData.transferCosts}
                          onChange={(e) => setTaxData(prev => ({ ...prev, transferCosts: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column: Visualization and Summary */}
                <div className="space-y-6">
                  <div className="bg-dark rounded-lg p-6 border border-gold/20 h-96">
                    <h4 className="text-white font-bold text-center mb-4">Tax Breakdown</h4>
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={[
                          { name: 'Selling Price', value: taxData.sellingPrice },
                          { name: 'Net Gains', value: taxData.netGains },
                          { name: 'Tax Liability', value: taxData.taxLiability }
                        ]} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis type="number" stroke="#aaa" tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                        <YAxis type="category" dataKey="name" stroke="#aaa" width={100} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c09a3e' }}
                          formatter={(value) => `₹${(value as number).toLocaleString()}`}
                          itemStyle={{ color: '#fff' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" barSize={30}>
                          <Cell fill="#3B82F6" />
                          <Cell fill="#10B981" />
                          <Cell fill="#EF4444" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-dark rounded-lg p-4 border border-gold/20">
                     <div className="flex justify-between items-center text-lg">
                        <span className="text-white/70">Net Gains:</span>
                        <span className="text-green-400 font-bold">₹{taxData.netGains.toLocaleString()}</span>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expert Tax Tips */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
                <Award className="h-6 w-6" />
                Raarya Tax Advisory Services
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-4">Tax Optimization Strategies</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-dark rounded-lg border border-gold/20">
                      <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="text-white font-medium">Indexation Benefits</h5>
                        <p className="text-white/70 text-sm">Use cost inflation index to reduce taxable gains</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-dark rounded-lg border border-gold/20">
                      <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="text-white font-medium">Reinvestment Exemption</h5>
                        <p className="text-white/70 text-sm">Reinvest in another property within 2 years</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-dark rounded-lg border border-gold/20">
                      <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="text-white font-medium">Documentation</h5>
                        <p className="text-white/70 text-sm">Keep all improvement and transfer cost receipts</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">Our Services</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Tax Planning Consultation</span>
                      <span className="text-gold font-bold">₹2,500</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Documentation Support</span>
                      <span className="text-gold font-bold">₹1,500</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Filing Assistance</span>
                      <span className="text-gold font-bold">₹3,000</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Complete Tax Package</span>
                      <span className="text-gold font-bold">₹5,000</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-gold text-dark font-bold py-3 rounded-lg hover:bg-yellow-400 transition">
                    Book Tax Consultation
                  </button>
                </div>
              </div>
            </div>

            {/* Investment Analysis */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
                <TrendingUp className="h-6 w-6" />
                Sell vs Rent Analysis
              </h3>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div>
                  <h4 className="text-white font-bold mb-4">Investment Parameters</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Selling Price (₹)</label>
                      <input
                        type="number"
                        value={investmentData.sellingPrice}
                        onChange={(e) => setInvestmentData(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Monthly Rent (₹)</label>
                      <input
                        type="number"
                        value={investmentData.monthlyRent}
                        onChange={(e) => setInvestmentData(prev => ({ ...prev, monthlyRent: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Rent Growth (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={investmentData.annualRentGrowth}
                          onChange={(e) => setInvestmentData(prev => ({ ...prev, annualRentGrowth: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Holding Period (Years)</label>
                        <input
                          type="number"
                          value={investmentData.holdingPeriod}
                          onChange={(e) => setInvestmentData(prev => ({ ...prev, holdingPeriod: parseInt(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                 {/* Right Column: Visualization and Summary */}
                <div className="space-y-6">
                  <div className="bg-dark rounded-lg p-6 border border-gold/20 h-96">
                    <h4 className="text-white font-bold text-center mb-4">Total Returns Comparison</h4>
                     <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Selling', Returns: investmentData.sellingScenario.totalReturns },
                        { name: 'Renting', Returns: investmentData.rentingScenario.totalReturns },
                      ]} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#aaa" />
                        <YAxis stroke="#aaa" tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c09a3e' }}
                          formatter={(value) => `₹${(value as number).toLocaleString()}`}
                          itemStyle={{ color: '#fff' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="Returns" barSize={50}>
                          <Cell fill="#F59E0B" />
                          <Cell fill="#10B981" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-dark rounded-lg p-4 border border-gold/20 text-center">
                     <p className={`text-lg font-semibold ${investmentData.comparison.betterOption === 'Renting' ? 'text-green-400' : 'text-gold'}`}>
                      {investmentData.comparison.betterOption} is Better
                    </p>
                    <p className="text-white/80 text-sm">{investmentData.comparison.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Intelligence */}
            <div className="bg-gradient-to-r from-gold/10 to-transparent rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 text-center">Raarya Market Intelligence</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-dark rounded-lg border border-gold/20">
                  <BarChart3 className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-white font-bold">12.5%</p>
                  <p className="text-white/70 text-xs">Avg. Property Appreciation</p>
                </div>
                <div className="text-center p-4 bg-dark rounded-lg border border-gold/20">
                  <Clock className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-white font-bold">45 Days</p>
                  <p className="text-white/70 text-xs">Avg. Time to Sell</p>
                </div>
                <div className="text-center p-4 bg-dark rounded-lg border border-gold/20">
                  <TrendingUp className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-white font-bold">8.2%</p>
                  <p className="text-white/70 text-xs">Rental Yield</p>
                </div>
                <div className="text-center p-4 bg-dark rounded-lg border border-gold/20">
                  <Users className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-white font-bold">2,500+</p>
                  <p className="text-white/70 text-xs">Properties Sold</p>
                </div>
              </div>
            </div>

            {/* Insurance Calculator */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6" />
                Property Insurance Calculator
              </h3>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div>
                  <h4 className="text-white font-bold mb-4">Property Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Property Value (₹)</label>
                      <input
                        type="number"
                        value={insuranceData.propertyValue}
                        onChange={(e) => setInsuranceData(prev => ({ ...prev, propertyValue: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Property Type</label>
                        <select
                          value={insuranceData.propertyType}
                          onChange={(e) => setInsuranceData(prev => ({ ...prev, propertyType: e.target.value }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Construction Type</label>
                        <select
                          value={insuranceData.constructionType}
                          onChange={(e) => setInsuranceData(prev => ({ ...prev, constructionType: e.target.value }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value="RCC">RCC</option>
                          <option value="Load Bearing">Load Bearing</option>
                          <option value="Steel Frame">Steel Frame</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Location</label>
                        <select
                          value={insuranceData.location}
                          onChange={(e) => setInsuranceData(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value="Urban">Urban</option>
                          <option value="Semi-Urban">Semi-Urban</option>
                          <option value="Rural">Rural</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Coverage Type</label>
                        <select
                          value={insuranceData.coverageType}
                          onChange={(e) => setInsuranceData(prev => ({ ...prev, coverageType: e.target.value }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value="Basic">Basic</option>
                          <option value="Comprehensive">Comprehensive</option>
                          <option value="Premium">Premium</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* Right Column: Visualization and Summary */}
                <div className="space-y-6">
                  <div className="bg-dark rounded-lg p-6 border border-gold/20 h-96">
                    <h4 className="text-white font-bold text-center mb-4">Insurance Coverage Breakdown</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 5, right: 5, bottom: 30, left: 5 }}>
                        <Pie
                          data={[
                            { name: 'Structure', value: insuranceData.coverageDetails.structure },
                            { name: 'Contents', value: insuranceData.coverageDetails.contents },
                            { name: 'Liability', value: insuranceData.coverageDetails.liability },
                            { name: 'Natural Disasters', value: insuranceData.coverageDetails.naturalDisasters },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                        >
                          <Cell fill="#F59E0B" />
                          <Cell fill="#10B981" />
                          <Cell fill="#3B82F6" />
                          <Cell fill="#EF4444" />
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c09a3e' }}
                          formatter={(value) => `₹${(value as number).toLocaleString()}`}
                          itemStyle={{ color: '#fff' }}
                          labelStyle={{ color: '#fff' }}
                        />
                         <Legend
                           iconType="circle"
                           layout="horizontal"
                           verticalAlign="bottom"
                           align="center"
                           wrapperStyle={{ color: '#fff' }}
                         />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-dark rounded-lg p-4 border border-gold/20">
                     <div className="flex justify-between items-center text-lg">
                        <span className="text-white/70">Annual Premium:</span>
                        <span className="text-gold font-bold">₹{insuranceData.annualPremium.toLocaleString()}</span>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Raarya Insurance Partners */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 text-center">Trusted Insurance Partners</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="text-white font-bold mb-2">HDFC ERGO</h4>
                  <p className="text-white/70 text-sm mb-4">Comprehensive property insurance with 24/7 support</p>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <span className="text-white/70 text-sm ml-2">4.8/5</span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="text-white font-bold mb-2">ICICI Lombard</h4>
                  <p className="text-white/70 text-sm mb-4">Premium coverage with quick claim settlement</p>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold" />
                    <span className="text-white/70 text-sm ml-2">4.6/5</span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Bajaj Allianz</h4>
                  <p className="text-white/70 text-sm mb-4">Affordable plans with extensive coverage options</p>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold" />
                    <span className="text-white/70 text-sm ml-2">4.5/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-dark via-dark-light to-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gold mb-6 gold-shimmer animate-fade-in-up">
              Sell Your Property
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto animate-fade-in-up animate-delay-200">
              Get the best value for your property with our comprehensive selling platform. 
              Professional support, market analysis, and maximum exposure to qualified buyers.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-dark-light/50 backdrop-blur-sm rounded-lg p-4 border border-gold/20">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-gold" />
                  <span className="text-gold font-semibold">{marketData.priceGrowth}</span>
                  <span className="text-white/70">Price Growth</span>
                </div>
              </div>
              <div className="bg-dark-light/50 backdrop-blur-sm rounded-lg p-4 border border-gold/20">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gold" />
                  <span className="text-gold font-semibold">{marketData.avgDaysOnMarket}</span>
                  <span className="text-white/70">Avg Days</span>
                </div>
              </div>
              <div className="bg-dark-light/50 backdrop-blur-sm rounded-lg p-4 border border-gold/20">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gold" />
                  <span className="text-gold font-semibold">{marketData.propertiesSold}</span>
                  <span className="text-white/70">Properties Sold</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-dark-light border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 py-4">
            {[
              { id: 'list-property', label: 'List Property', icon: <Home className="h-4 w-4" /> },
              { id: 'dashboard', label: 'Seller Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
              { id: 'services', label: 'Professional Services', icon: <Award className="h-4 w-4" /> },
              { id: 'market-analysis', label: 'Market Analysis', icon: <TrendingUp className="h-4 w-4" /> },
              { id: 'analytics', label: 'Property Analytics', icon: <Calculator className="h-4 w-4" /> },
              { id: 'financial-tools', label: 'Financial Tools', icon: <DollarSign className="h-4 w-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gold text-dark shadow-lg'
                    : 'text-white/70 hover:text-gold hover:bg-dark-light/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'list-property' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Property Listing Form */}
            <div className="lg:col-span-2">
              <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
                <h2 className="text-2xl font-bold text-gold mb-6">List Your Property</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Property Type</label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        required
                      >
                        <option value="">Select Property Type</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="house">Independent House</option>
                        <option value="plot">Plot/Land</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Expected Price (₹)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Enter expected price"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Property Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter a compelling title for your property"
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Bedrooms</label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        placeholder="No. of bedrooms"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Bathrooms</label>
                      <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        placeholder="No. of bathrooms"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Area (sq ft)</label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        placeholder="Total area"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter property location"
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Describe your property in detail..."
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Parking', 'Garden', 'Balcony', 'Lift', 'Security', 'Power Backup', 'Water Supply', 'Internet', 'Gym', 'Swimming Pool'].map(amenity => (
                        <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => handleAmenityChange(amenity)}
                            className="text-gold bg-dark border-gold/30 rounded focus:ring-gold"
                          />
                          <span className="text-white/80">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Property Images</label>
                    <div className="border-2 border-dashed border-gold/30 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-gold mx-auto mb-4" />
                      <p className="text-white/70 mb-4">Upload high-quality images of your property</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="bg-gold text-dark px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-yellow-400 transition"
                      >
                        Choose Images
                      </label>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="mt-4">
                        <p className="text-white/70 mb-2">{formData.images.length} images selected</p>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold text-dark font-bold py-4 rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
                  >
                    List Property
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why Choose Us */}
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <h3 className="text-xl font-bold text-gold mb-4">Why Choose Raarya?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Maximum Exposure</h4>
                      <p className="text-white/70 text-sm">Reach thousands of qualified buyers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Professional Support</h4>
                      <p className="text-white/70 text-sm">Expert guidance throughout the process</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium">Best Price Guarantee</h4>
                      <p className="text-white/70 text-sm">Get the best market value for your property</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <h3 className="text-xl font-bold text-gold mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gold" />
                    <span className="text-white">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gold" />
                    <span className="text-white">sell@raarya.com</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gold text-dark font-medium py-2 rounded-lg hover:bg-yellow-400 transition">
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Dashboard Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Active Listings</p>
                    <p className="text-2xl font-bold text-gold">{listedProperties.filter(p => p.status === 'Active').length}</p>
                  </div>
                  <Home className="h-8 w-8 text-gold/50" />
                </div>
              </div>
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Views</p>
                    <p className="text-2xl font-bold text-gold">{listedProperties.reduce((sum, p) => sum + p.views, 0)}</p>
                  </div>
                  <Users className="h-8 w-8 text-gold/50" />
                </div>
              </div>
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Inquiries</p>
                    <p className="text-2xl font-bold text-gold">{listedProperties.reduce((sum, p) => sum + p.inquiries, 0)}</p>
                  </div>
                  <Phone className="h-8 w-8 text-gold/50" />
                </div>
              </div>
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">Total Listings</p>
                    <p className="text-2xl font-bold text-gold">{listedProperties.length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gold/50" />
                </div>
              </div>
            </div>

            {/* Your Listings */}
            <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gold">Your Property Listings</h3>
                <button
                  onClick={() => setActiveTab('list-property')}
                  className="bg-gold text-dark font-medium px-4 py-2 rounded-lg hover:bg-yellow-400 transition flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Add New Property
                </button>
              </div>
              
              {listedProperties.length === 0 ? (
                <div className="text-center py-12">
                  <Home className="h-16 w-16 text-gold/50 mx-auto mb-4" />
                  <h4 className="text-white font-medium mb-2">No Properties Listed Yet</h4>
                  <p className="text-white/70 mb-6">Start by listing your first property to see it here</p>
                  <button
                    onClick={() => setActiveTab('list-property')}
                    className="bg-gold text-dark font-medium px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
                  >
                    List Your First Property
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listedProperties.map(listing => (
                    <div key={listing.id} className="bg-dark rounded-lg border border-gold/10 overflow-hidden hover:border-gold/30 transition-all duration-300">
                      {/* Property Image */}
                      <div className="h-48 bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center">
                        <Home className="h-12 w-12 text-gold/50" />
                      </div>
                      
                      {/* Property Details */}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium text-lg line-clamp-2">{listing.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            listing.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {listing.status}
                          </span>
                        </div>
                        
                        <p className="text-white/70 text-sm mb-3 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {listing.location}
                        </p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gold font-bold text-lg">{listing.price}</span>
                          <span className="text-white/60 text-sm">{listing.propertyType}</span>
                        </div>
                        
                        {/* Property Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                          <div className="bg-dark-light rounded p-2">
                            <div className="text-gold font-bold text-sm">{listing.bedrooms || '-'}</div>
                            <div className="text-white/60 text-xs">Beds</div>
                          </div>
                          <div className="bg-dark-light rounded p-2">
                            <div className="text-gold font-bold text-sm">{listing.bathrooms || '-'}</div>
                            <div className="text-white/60 text-xs">Baths</div>
                          </div>
                          <div className="bg-dark-light rounded p-2">
                            <div className="text-gold font-bold text-sm">{listing.area || '-'}</div>
                            <div className="text-white/60 text-xs">Sqft</div>
                          </div>
                        </div>
                        
                        {/* Performance Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs">
                          <div>
                            <div className="text-white font-medium">{listing.views}</div>
                            <div className="text-white/60">Views</div>
                          </div>
                          <div>
                            <div className="text-white font-medium">{listing.inquiries}</div>
                            <div className="text-white/60">Inquiries</div>
                          </div>
                          <div>
                            <div className="text-white font-medium">{listing.daysListed}</div>
                            <div className="text-white/60">Days</div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(listing)}
                            className="flex-1 bg-gold/10 text-gold border border-gold/30 px-3 py-2 rounded-lg hover:bg-gold hover:text-dark transition-all duration-200 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(listing.id)}
                            className="flex-1 bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">Professional Services</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Enhance your property listing with our professional services designed to maximize your property's appeal and value.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {sellerServices.map((service, index) => (
                <div key={index} className="bg-dark-light rounded-xl p-6 border border-gold/20 hover:border-gold/40 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    {service.icon}
                    <span className="text-gold font-bold text-lg">{service.price}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-white/70 mb-4">{service.description}</p>
                  <button className="bg-gold text-dark font-medium px-6 py-2 rounded-lg hover:bg-yellow-400 transition">
                    Book Service
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Services */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Premium Packages</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Target className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Basic Package</h4>
                  <p className="text-gold font-bold text-2xl mb-4">₹8,000</p>
                  <ul className="text-white/70 text-sm space-y-2 mb-6">
                    <li>Professional Photography</li>
                    <li>Property Listing</li>
                    <li>Basic Marketing</li>
                  </ul>
                  <button className="bg-gold text-dark font-medium px-6 py-2 rounded-lg hover:bg-yellow-400 transition">
                    Choose Package
                  </button>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border-2 border-gold">
                  <Zap className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Premium Package</h4>
                  <p className="text-gold font-bold text-2xl mb-4">₹15,000</p>
                  <ul className="text-white/70 text-sm space-y-2 mb-6">
                    <li>All Basic Features</li>
                    <li>Virtual Tour</li>
                    <li>Social Media Marketing</li>
                    <li>Legal Assistance</li>
                  </ul>
                  <button className="bg-gold text-dark font-medium px-6 py-2 rounded-lg hover:bg-yellow-400 transition">
                    Choose Package
                  </button>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Award className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Elite Package</h4>
                  <p className="text-gold font-bold text-2xl mb-4">₹25,000</p>
                  <ul className="text-white/70 text-sm space-y-2 mb-6">
                    <li>All Premium Features</li>
                    <li>Dedicated Agent</li>
                    <li>Priority Listing</li>
                    <li>Negotiation Support</li>
                  </ul>
                  <button className="bg-gold text-dark font-medium px-6 py-2 rounded-lg hover:bg-yellow-400 transition">
                    Choose Package
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market-analysis' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">Advanced Property Valuation</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Get a comprehensive property valuation using our AI-powered multi-factor analysis system.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Advanced Valuation Form */}
              <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                <h3 className="text-xl font-bold text-gold mb-6">Property Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Property Type</label>
                    <select 
                      value={propertyDetails.propertyType}
                      onChange={(e) => handlePropertyDetailChange('propertyType', e.target.value)}
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="house">Independent House</option>
                      <option value="plot">Plot/Land</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Location</label>
                    <select 
                      value={propertyDetails.location}
                      onChange={(e) => handlePropertyDetailChange('location', e.target.value)}
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    >
                      <option value="">Select Location</option>
                      <option value="Race Course">Race Course</option>
                      <option value="Vadavalli">Vadavalli</option>
                      <option value="Peelamedu">Peelamedu</option>
                      <option value="Saibaba Colony">Saibaba Colony</option>
                      <option value="RS Puram">RS Puram</option>
                      <option value="Tatabad">Tatabad</option>
                      <option value="Singanallur">Singanallur</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Area (sq ft)</label>
                      <input
                        type="number"
                        value={propertyDetails.area}
                        onChange={(e) => handlePropertyDetailChange('area', e.target.value)}
                        placeholder="Enter area"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Age (years)</label>
                      <input
                        type="number"
                        value={propertyDetails.age}
                        onChange={(e) => handlePropertyDetailChange('age', e.target.value)}
                        placeholder="Property age"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Property Condition</label>
                    <select 
                      value={propertyDetails.condition}
                      onChange={(e) => handlePropertyDetailChange('condition', e.target.value)}
                      className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="average">Average</option>
                      <option value="needs_repair">Needs Repair</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Amenities</label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {Object.keys(amenitiesScoring).map(amenity => (
                        <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={propertyDetails.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="text-gold bg-dark border-gold/30 rounded focus:ring-gold"
                          />
                          <span className="text-white/80 text-sm">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={calculateValuation}
                    className="w-full bg-gold text-dark font-bold py-3 rounded-lg hover:bg-yellow-400 transition"
                  >
                    Calculate Valuation
                  </button>
                </div>
              </div>

              {/* Valuation Results */}
              <div className="space-y-6">
                <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                  <h3 className="text-xl font-bold text-gold mb-6">Valuation Results</h3>
                  {valuationData.totalValue > 0 ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-gold mb-2">
                          ₹{valuationData.totalValue.toLocaleString()}
                        </p>
                        <p className="text-white/70">Estimated Market Value</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-dark rounded-lg">
                          <span className="text-white/70">Base Price:</span>
                          <span className="text-white font-medium">₹{valuationData.basePrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark rounded-lg">
                          <span className="text-white/70">Location Premium:</span>
                          <span className="text-green-400 font-medium">+₹{valuationData.locationPremium.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark rounded-lg">
                          <span className="text-white/70">Amenities Bonus:</span>
                          <span className="text-green-400 font-medium">+₹{valuationData.amenitiesBonus.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark rounded-lg">
                          <span className="text-white/70">Condition Factor:</span>
                          <span className={`font-medium ${valuationData.conditionScore >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {valuationData.conditionScore >= 0 ? '+' : ''}{valuationData.conditionScore}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark rounded-lg">
                          <span className="text-white/70">Market Demand:</span>
                          <span className={`font-medium ${valuationData.marketDemand >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {valuationData.marketDemand >= 0 ? '+' : ''}{valuationData.marketDemand}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="h-12 w-12 text-gold/50 mx-auto mb-4" />
                      <p className="text-white/70">Enter property details and click "Calculate Valuation" to get started</p>
                    </div>
                  )}
                </div>

                {/* Comparable Properties */}
                {valuationData.comparableProperties.length > 0 && (
                  <div className="bg-dark-light rounded-xl p-6 border border-gold/20">
                    <h3 className="text-xl font-bold text-gold mb-4">Recent Comparable Sales</h3>
                    <div className="space-y-3">
                      {valuationData.comparableProperties.map(prop => (
                        <div key={prop.id} className="p-3 bg-dark rounded-lg border border-gold/10">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-white font-medium text-sm">{prop.title}</h4>
                              <p className="text-white/70 text-xs">{prop.area} • {prop.location}</p>
                              <p className="text-gold font-semibold text-sm">{prop.price}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-white/70 text-xs">₹{prop.pricePerSqFt}/sq ft</p>
                              <p className="text-white/70 text-xs">Sold: {new Date(prop.soldDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Market Trends Section */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Market Trends & Analysis</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <TrendingUp className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Price Trends</h4>
                  <p className="text-gold font-bold text-2xl mb-2">+8.5%</p>
                  <p className="text-white/70 text-sm">Average price growth in last 6 months</p>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Clock className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Days on Market</h4>
                  <p className="text-gold font-bold text-2xl mb-2">45</p>
                  <p className="text-white/70 text-sm">Average time to sell</p>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Users className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Buyer Demand</h4>
                  <p className="text-gold font-bold text-2xl mb-2">High</p>
                  <p className="text-white/70 text-sm">Strong buyer interest in area</p>
                </div>
              </div>
            </div>

            {/* Comprehensive Comparable Properties Analysis */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Comparable Properties Analysis</h3>
              <div className="space-y-6">
                {/* Property Comparison Chart */}
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">Recent Sales Comparison</h4>
                  <div className="space-y-4">
                    {comparableProperties.map(prop => (
                      <div key={prop.id} className="flex items-center justify-between p-4 bg-dark-light rounded-lg border border-gold/10">
                        <div className="flex-1">
                          <h5 className="text-white font-medium">{prop.title}</h5>
                          <p className="text-white/70 text-sm">{prop.area} • {prop.location}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-gold font-semibold">{prop.price}</span>
                            <span className="text-white/70 text-sm">₹{prop.pricePerSqFt}/sq ft</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white/70 text-sm">Sold: {new Date(prop.soldDate).toLocaleDateString()}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            {prop.amenities.slice(0, 3).map(amenity => (
                              <span key={amenity} className="text-xs px-2 py-1 bg-gold/20 text-gold rounded">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Analysis */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-dark rounded-lg p-6 border border-gold/20">
                    <h4 className="text-white font-bold mb-4">Price per Sq Ft Analysis</h4>
                    <div className="space-y-3">
                      {comparableProperties.map(prop => (
                        <div key={prop.id} className="flex items-center justify-between">
                          <span className="text-white/70 text-sm">{prop.location}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gold font-semibold">₹{prop.pricePerSqFt}</span>
                            <div className="w-20 h-2 bg-dark-light rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gold rounded-full" 
                                style={{ width: `${(prop.pricePerSqFt / 10000) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-dark rounded-lg p-6 border border-gold/20">
                    <h4 className="text-white font-bold mb-4">Market Insights</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Average Price:</span>
                        <span className="text-gold font-semibold">₹7,945/sq ft</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Price Range:</span>
                        <span className="text-gold font-semibold">₹5,500 - ₹9,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Most Popular:</span>
                        <span className="text-gold font-semibold">Race Course</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Best Value:</span>
                        <span className="text-gold font-semibold">Peelamedu</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities Impact Analysis */}
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">Amenities Impact on Value</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(amenitiesScoring).slice(0, 8).map(([amenity, value]) => (
                      <div key={amenity} className="text-center p-3 bg-dark-light rounded-lg border border-gold/10">
                        <p className="text-white font-medium text-sm mb-1">{amenity}</p>
                        <p className="text-gold font-bold">+₹{(value/1000).toFixed(0)}K</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Location Analysis */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Location Premium Analysis</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(locationPricing).map(([location, data]) => (
                  <div key={location} className="p-4 bg-dark rounded-lg border border-gold/20 hover:border-gold/40 transition-all duration-300">
                    <h4 className="text-white font-medium mb-2">{location}</h4>
                    <p className="text-gold font-bold text-lg">₹{data.basePrice.toLocaleString()}</p>
                    <p className="text-white/70 text-sm">per sq ft</p>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        data.premium > 1.2 ? 'bg-green-500/20 text-green-400' : 
                        data.premium > 1.0 ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {((data.premium - 1) * 100).toFixed(0)}% premium
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gold/20">
                      <p className="text-white/70 text-xs">
                        {data.premium > 1.2 ? 'Premium Location' : 
                         data.premium > 1.0 ? 'Good Investment' : 
                         'Affordable Option'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Recommendations */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Investment Recommendations</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Target className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Best Investment Areas</h4>
                  <ul className="text-white/70 text-sm space-y-2 text-left">
                    <li>• Race Course (40% premium)</li>
                    <li>• RS Puram (50% premium)</li>
                    <li>• Saibaba Colony (30% premium)</li>
                  </ul>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <TrendingUp className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Growth Potential</h4>
                  <ul className="text-white/70 text-sm space-y-2 text-left">
                    <li>• Peelamedu (10% premium)</li>
                    <li>• Vadavalli (20% premium)</li>
                    <li>• Tatabad (0% premium)</li>
                  </ul>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Award className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Value Additions</h4>
                  <ul className="text-white/70 text-sm space-y-2 text-left">
                    <li>• Swimming Pool (+₹2L)</li>
                    <li>• Gym (+₹1.5L)</li>
                    <li>• Lift (+₹1L)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">Property Analytics</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Explore advanced analytics and insights to make informed investment decisions.
              </p>
            </div>

            {/* ROI Calculator */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">ROI Calculator</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-4">Investment Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Purchase Price (₹)</label>
                      <input
                        type="number"
                        value={roiData.purchasePrice}
                        onChange={(e) => handleROIInputChange('purchasePrice', e.target.value)}
                        placeholder="Enter purchase price"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Expected Selling Price (₹)</label>
                      <input
                        type="number"
                        value={roiData.sellingPrice}
                        onChange={(e) => handleROIInputChange('sellingPrice', e.target.value)}
                        placeholder="Enter expected selling price"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Holding Period (years)</label>
                      <input
                        type="number"
                        value={roiData.holdingPeriod}
                        onChange={(e) => handleROIInputChange('holdingPeriod', e.target.value)}
                        placeholder="Enter holding period"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Additional Costs (₹)</label>
                      <input
                        type="number"
                        value={roiData.additionalCosts}
                        onChange={(e) => handleROIInputChange('additionalCosts', e.target.value)}
                        placeholder="Maintenance, taxes, etc."
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <button 
                      onClick={calculateROI}
                      className="w-full bg-gold text-dark font-bold py-3 rounded-lg hover:bg-yellow-400 transition"
                    >
                      Calculate ROI
                    </button>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">ROI Analysis</h4>
                  {roiData.annualRoi > 0 ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gold mb-2">{roiData.annualRoi.toFixed(1)}%</p>
                        <p className="text-white/70">Annual ROI</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                          <span className="text-white/70">Total Investment:</span>
                          <span className="text-white font-semibold">₹{roiData.totalInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                          <span className="text-white/70">Total Profit:</span>
                          <span className={`font-semibold ${roiData.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {roiData.totalProfit >= 0 ? '+' : ''}{roiData.totalProfit.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                          <span className="text-white/70">Profit Margin:</span>
                          <span className={`font-semibold ${roiData.profitMargin >= 0 ? 'text-gold' : 'text-red-400'}`}>
                            {roiData.profitMargin >= 0 ? '+' : ''}{roiData.profitMargin.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                          <span className="text-white/70">Monthly Return:</span>
                          <span className={`font-semibold ${roiData.monthlyReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {roiData.monthlyReturn >= 0 ? '+' : ''}{roiData.monthlyReturn.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="h-12 w-12 text-gold/50 mx-auto mb-4" />
                      <p className="text-white/70">Enter investment details and click "Calculate ROI" to get started</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Market Timing Analysis */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Market Timing Analysis</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <TrendingUp className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Best Time to Sell</h4>
                  <p className="text-gold font-bold text-2xl mb-2">March-April</p>
                  <p className="text-white/70 text-sm">Peak buying season</p>
                  <div className="mt-4">
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      +12% premium
                    </span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Clock className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Optimal Listing Duration</h4>
                  <p className="text-gold font-bold text-2xl mb-2">45-60 days</p>
                  <p className="text-white/70 text-sm">Maximum exposure</p>
                  <div className="mt-4">
                    <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                      Best price
                    </span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <BarChart3 className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Market Cycle</h4>
                  <p className="text-gold font-bold text-2xl mb-2">Bull Market</p>
                  <p className="text-white/70 text-sm">Strong demand</p>
                  <div className="mt-4">
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      Favorable
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Comparison */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Investment Comparison</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">Property Investment vs Other Assets</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Real Estate</span>
                      <span className="text-gold font-bold">12.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Stock Market</span>
                      <span className="text-blue-400 font-bold">8.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Fixed Deposits</span>
                      <span className="text-green-400 font-bold">6.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Gold</span>
                      <span className="text-yellow-400 font-bold">9.1%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">Risk Assessment</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Market Risk:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-dark-light rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-yellow-400 font-semibold">Medium</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Liquidity Risk:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-dark-light rounded-full overflow-hidden">
                          <div className="h-full bg-red-400 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                        <span className="text-red-400 font-semibold">High</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Return Potential:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-dark-light rounded-full overflow-hidden">
                          <div className="h-full bg-green-400 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-green-400 font-semibold">High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictive Analytics */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20 col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-gold mb-6">Predictive Analytics</h3>
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                
                {/* Input and Prediction Output */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Current Property Price (₹)</label>
                      <input
                        type="number"
                        value={analyticsData.currentPrice}
                        onChange={(e) => updateAnalyticsData({ price: parseFloat(e.target.value) || 0, location: analyticsData.location, type: analyticsData.propertyType, startMonth: analyticsData.startMonth, endMonth: analyticsData.endMonth })}
                        placeholder="Enter current property price"
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Location</label>
                      <select 
                        value={analyticsData.location}
                        onChange={(e) => updateAnalyticsData({ price: analyticsData.currentPrice, location: e.target.value, type: analyticsData.propertyType, startMonth: analyticsData.startMonth, endMonth: analyticsData.endMonth })}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      >
                        {Object.keys(growthModels).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Property Type</label>
                      <select 
                        value={analyticsData.propertyType}
                        onChange={(e) => updateAnalyticsData({ price: analyticsData.currentPrice, location: analyticsData.location, type: e.target.value, startMonth: analyticsData.startMonth, endMonth: analyticsData.endMonth })}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      >
                        {Object.keys(growthModels['Race Course']).map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Start Month</label>
                        <select 
                          value={analyticsData.startMonth}
                          onChange={(e) => updateAnalyticsData({ price: analyticsData.currentPrice, location: analyticsData.location, type: analyticsData.propertyType, startMonth: parseInt(e.target.value), endMonth: analyticsData.endMonth })}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value={0}>January</option>
                          <option value={1}>February</option>
                          <option value={2}>March</option>
                          <option value={3}>April</option>
                          <option value={4}>May</option>
                          <option value={5}>June</option>
                          <option value={6}>July</option>
                          <option value={7}>August</option>
                          <option value={8}>September</option>
                          <option value={9}>October</option>
                          <option value={10}>November</option>
                          <option value={11}>December</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">End Month</label>
                        <select 
                          value={analyticsData.endMonth}
                          onChange={(e) => updateAnalyticsData({ price: analyticsData.currentPrice, location: analyticsData.location, type: analyticsData.propertyType, startMonth: analyticsData.startMonth, endMonth: parseInt(e.target.value) })}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value={0}>January</option>
                          <option value={1}>February</option>
                          <option value={2}>March</option>
                          <option value={3}>April</option>
                          <option value={4}>May</option>
                          <option value={5}>June</option>
                          <option value={6}>July</option>
                          <option value={7}>August</option>
                          <option value={8}>September</option>
                          <option value={9}>October</option>
                          <option value={10}>November</option>
                          <option value={11}>December</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 bg-dark rounded-lg p-6 border border-gold/20">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-lg">Current Price:</span>
                      <span className="text-white font-semibold text-xl">₹{analyticsData.currentPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-lg">Predicted Price:</span>
                      <span className="text-gold font-semibold text-xl">₹{analyticsData.predictedPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-lg">Growth Rate:</span>
                      <span className={`font-semibold text-xl ${analyticsData.growthRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {analyticsData.growthRate >= 0 ? '+' : ''}{analyticsData.growthRate}%
                      </span>
                    </div>
                  </div>
                  <div className={`mt-4 p-6 rounded-lg border ${
                    predictionSummary.color === 'green' ? 'bg-green-500/10 border-green-500/20' :
                    predictionSummary.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/20' :
                    'bg-red-500/10 border-red-500/20'
                  }`}>
                    <div className="flex items-start gap-4 mb-3">
                      <span className="text-3xl mt-1">{predictionSummary.icon}</span>
                      <div>
                        <h4 className="text-xl font-bold text-white">{predictionSummary.title}</h4>
                        <p className="text-white/80 mt-1">{predictionSummary.message}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gold/20">
                        <p className={`font-semibold ${
                          predictionSummary.color === 'green' ? 'text-green-400' :
                          predictionSummary.color === 'yellow' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                        <span className="font-bold text-gold">Recommendation:</span> {predictionSummary.recommendation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Forecast Visualization */}
                <div className="lg:col-span-3 bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold text-center mb-4">Price Forecast ({analyticsData.duration} Months)</h4>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={analyticsData.monthlyForecast}
                        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="month" stroke="#aaa" fontSize={14} />
                        <YAxis 
                          stroke="#aaa" 
                          fontSize={14}
                          tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} 
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c09a3e', borderRadius: '0.5rem' }}
                          labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                          formatter={(value, name) => [`₹${(value as number).toLocaleString()}`, 'Predicted Price']}
                        />
                        <Legend wrapperStyle={{ color: '#fff', paddingTop: '20px' }} />
                        <Line type="monotone" dataKey="price" name={`${analyticsData.duration}-Month Forecast`} stroke="#c09a3e" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 9 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {activeTab === 'financial-tools' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">Financial Tools & Services</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Comprehensive financial calculators to help you make informed decisions about your property investment.
              </p>
            </div>

            {/* Mortgage Calculator */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
                <DollarSign className="h-6 w-6" />
                Mortgage Calculator
              </h3>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div>
                  <h4 className="text-white font-bold mb-4">Loan Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Property Price (₹)</label>
                      <input
                        type="number"
                        value={mortgageData.propertyPrice}
                        onChange={(e) => setMortgageData(prev => ({ ...prev, propertyPrice: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Down Payment (₹)</label>
                      <input
                        type="number"
                        value={mortgageData.downPayment}
                        onChange={(e) => setMortgageData(prev => ({ ...prev, downPayment: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Interest Rate (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={mortgageData.interestRate}
                          onChange={(e) => setMortgageData(prev => ({ ...prev, interestRate: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Loan Term (Years)</label>
                        <input
                          type="number"
                          value={mortgageData.loanTerm}
                          onChange={(e) => setMortgageData(prev => ({ ...prev, loanTerm: parseInt(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column: Visualization and Summary */}
                <div className="space-y-6">
                  <div className="bg-dark rounded-lg p-6 border border-gold/20 h-96">
                    <h4 className="text-white font-bold text-center mb-4">Loan Breakdown</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 5, right: 5, bottom: 30, left: 5 }}>
                        <Pie
                           data={[
                            { name: 'Principal', value: mortgageData.loanAmount },
                            { name: 'Total Interest', value: mortgageData.totalInterest },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                        >
                          <Cell fill="#F59E0B" />
                          <Cell fill="#EF4444" />
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c09a3e' }}
                          formatter={(value) => `₹${(value as number).toLocaleString()}`}
                          itemStyle={{ color: '#fff' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend
                          iconType="circle"
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{ color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-dark rounded-lg p-4 border border-gold/20">
                     <div className="flex justify-between items-center text-lg">
                        <span className="text-white/70">Monthly EMI:</span>
                        <span className="text-gold font-bold">₹{mortgageData.monthlyPayment.toLocaleString()}</span>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Raarya Finance Insights */}
            <div className="bg-gradient-to-r from-gold/10 to-transparent rounded-xl p-8 border border-gold/20">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <TrendingUp className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Current Market Rates</h4>
                  <p className="text-gold font-bold text-2xl mb-2">8.5%</p>
                  <p className="text-white/70 text-sm">Average Home Loan Rate</p>
                  <div className="mt-3">
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      -0.25% from last month
                    </span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Users className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Raarya Advantage</h4>
                  <p className="text-gold font-bold text-2xl mb-2">15+</p>
                  <p className="text-white/70 text-sm">Partner Banks</p>
                  <div className="mt-3">
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                      Best rates guaranteed
                    </span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <Clock className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h4 className="text-white font-bold mb-2">Processing Time</h4>
                  <p className="text-gold font-bold text-2xl mb-2">7-10</p>
                  <p className="text-white/70 text-sm">Days Average</p>
                  <div className="mt-3">
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                      Fastest in industry
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Calculator */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
                <Calculator className="h-6 w-6" />
                Capital Gains Tax Calculator
              </h3>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div>
                  <h4 className="text-white font-bold mb-4">Property Details</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Purchase Price (₹)</label>
                        <input
                          type="number"
                          value={taxData.purchasePrice}
                          onChange={(e) => setTaxData(prev => ({ ...prev, purchasePrice: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Selling Price (₹)</label>
                        <input
                          type="number"
                          value={taxData.sellingPrice}
                          onChange={(e) => setTaxData(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Holding Period (Years)</label>
                      <input
                        type="number"
                        value={taxData.holdingPeriod}
                        onChange={(e) => setTaxData(prev => ({ ...prev, holdingPeriod: parseInt(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Improvements (₹)</label>
                        <input
                          type="number"
                          value={taxData.improvements}
                          onChange={(e) => setTaxData(prev => ({ ...prev, improvements: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Transfer Costs (₹)</label>
                        <input
                          type="number"
                          value={taxData.transferCosts}
                          onChange={(e) => setTaxData(prev => ({ ...prev, transferCosts: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column: Visualization and Summary */}
                <div className="space-y-6">
                  <div className="bg-dark rounded-lg p-6 border border-gold/20 h-96">
                    <h4 className="text-white font-bold text-center mb-4">Tax Breakdown</h4>
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={[
                          { name: 'Selling Price', value: taxData.sellingPrice },
                          { name: 'Net Gains', value: taxData.netGains },
                          { name: 'Tax Liability', value: taxData.taxLiability }
                        ]} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis type="number" stroke="#aaa" tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                        <YAxis type="category" dataKey="name" stroke="#aaa" width={100} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c09a3e' }}
                          formatter={(value) => `₹${(value as number).toLocaleString()}`}
                          itemStyle={{ color: '#fff' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" barSize={30}>
                          <Cell fill="#3B82F6" />
                          <Cell fill="#10B981" />
                          <Cell fill="#EF4444" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-dark rounded-lg p-4 border border-gold/20">
                     <div className="flex justify-between items-center text-lg">
                        <span className="text-white/70">Net Gains:</span>
                        <span className="text-green-400 font-bold">₹{taxData.netGains.toLocaleString()}</span>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expert Tax Tips */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
                <Award className="h-6 w-6" />
                Raarya Tax Advisory Services
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold mb-4">Tax Optimization Strategies</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-dark rounded-lg border border-gold/20">
                      <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="text-white font-medium">Indexation Benefits</h5>
                        <p className="text-white/70 text-sm">Use cost inflation index to reduce taxable gains</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-dark rounded-lg border border-gold/20">
                      <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="text-white font-medium">Reinvestment Exemption</h5>
                        <p className="text-white/70 text-sm">Reinvest in another property within 2 years</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-dark rounded-lg border border-gold/20">
                      <CheckCircle className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="text-white font-medium">Documentation</h5>
                        <p className="text-white/70 text-sm">Keep all improvement and transfer cost receipts</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-dark rounded-lg p-6 border border-gold/20">
                  <h4 className="text-white font-bold mb-4">Our Services</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Tax Planning Consultation</span>
                      <span className="text-gold font-bold">₹2,500</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Documentation Support</span>
                      <span className="text-gold font-bold">₹1,500</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Filing Assistance</span>
                      <span className="text-gold font-bold">₹3,000</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-dark-light rounded-lg">
                      <span className="text-white font-medium">Complete Tax Package</span>
                      <span className="text-gold font-bold">₹5,000</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-gold text-dark font-bold py-3 rounded-lg hover:bg-yellow-400 transition">
                    Book Tax Consultation
                  </button>
                </div>
              </div>
            </div>

            {/* Investment Analysis */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
                <TrendingUp className="h-6 w-6" />
                Sell vs Rent Analysis
              </h3>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div>
                  <h4 className="text-white font-bold mb-4">Investment Parameters</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Selling Price (₹)</label>
                      <input
                        type="number"
                        value={investmentData.sellingPrice}
                        onChange={(e) => setInvestmentData(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Monthly Rent (₹)</label>
                      <input
                        type="number"
                        value={investmentData.monthlyRent}
                        onChange={(e) => setInvestmentData(prev => ({ ...prev, monthlyRent: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Rent Growth (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={investmentData.annualRentGrowth}
                          onChange={(e) => setInvestmentData(prev => ({ ...prev, annualRentGrowth: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Holding Period (Years)</label>
                        <input
                          type="number"
                          value={investmentData.holdingPeriod}
                          onChange={(e) => setInvestmentData(prev => ({ ...prev, holdingPeriod: parseInt(e.target.value) || 0 }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                 {/* Right Column: Visualization and Summary */}
                <div className="space-y-6">
                  <div className="bg-dark rounded-lg p-6 border border-gold/20 h-96">
                    <h4 className="text-white font-bold text-center mb-4">Total Returns Comparison</h4>
                     <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Selling', Returns: investmentData.sellingScenario.totalReturns },
                        { name: 'Renting', Returns: investmentData.rentingScenario.totalReturns },
                      ]} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#aaa" />
                        <YAxis stroke="#aaa" tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c09a3e' }}
                          formatter={(value) => `₹${(value as number).toLocaleString()}`}
                          itemStyle={{ color: '#fff' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="Returns" barSize={50}>
                          <Cell fill="#F59E0B" />
                          <Cell fill="#10B981" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-dark rounded-lg p-4 border border-gold/20 text-center">
                     <p className={`text-lg font-semibold ${investmentData.comparison.betterOption === 'Renting' ? 'text-green-400' : 'text-gold'}`}>
                      {investmentData.comparison.betterOption} is Better
                    </p>
                    <p className="text-white/80 text-sm">{investmentData.comparison.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Intelligence */}
            <div className="bg-gradient-to-r from-gold/10 to-transparent rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 text-center">Raarya Market Intelligence</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-dark rounded-lg border border-gold/20">
                  <BarChart3 className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-white font-bold">12.5%</p>
                  <p className="text-white/70 text-xs">Avg. Property Appreciation</p>
                </div>
                <div className="text-center p-4 bg-dark rounded-lg border border-gold/20">
                  <Clock className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-white font-bold">45 Days</p>
                  <p className="text-white/70 text-xs">Avg. Time to Sell</p>
                </div>
                <div className="text-center p-4 bg-dark rounded-lg border border-gold/20">
                  <TrendingUp className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-white font-bold">8.2%</p>
                  <p className="text-white/70 text-xs">Rental Yield</p>
                </div>
                <div className="text-center p-4 bg-dark rounded-lg border border-gold/20">
                  <Users className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-white font-bold">2,500+</p>
                  <p className="text-white/70 text-xs">Properties Sold</p>
                </div>
              </div>
            </div>

            {/* Insurance Calculator */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6" />
                Property Insurance Calculator
              </h3>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div>
                  <h4 className="text-white font-bold mb-4">Property Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Property Value (₹)</label>
                      <input
                        type="number"
                        value={insuranceData.propertyValue}
                        onChange={(e) => setInsuranceData(prev => ({ ...prev, propertyValue: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Property Type</label>
                        <select
                          value={insuranceData.propertyType}
                          onChange={(e) => setInsuranceData(prev => ({ ...prev, propertyType: e.target.value }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Construction Type</label>
                        <select
                          value={insuranceData.constructionType}
                          onChange={(e) => setInsuranceData(prev => ({ ...prev, constructionType: e.target.value }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value="RCC">RCC</option>
                          <option value="Load Bearing">Load Bearing</option>
                          <option value="Steel Frame">Steel Frame</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Location</label>
                        <select
                          value={insuranceData.location}
                          onChange={(e) => setInsuranceData(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value="Urban">Urban</option>
                          <option value="Semi-Urban">Semi-Urban</option>
                          <option value="Rural">Rural</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Coverage Type</label>
                        <select
                          value={insuranceData.coverageType}
                          onChange={(e) => setInsuranceData(prev => ({ ...prev, coverageType: e.target.value }))}
                          className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                        >
                          <option value="Basic">Basic</option>
                          <option value="Comprehensive">Comprehensive</option>
                          <option value="Premium">Premium</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* Right Column: Visualization and Summary */}
                <div className="space-y-6">
                  <div className="bg-dark rounded-lg p-6 border border-gold/20 h-96">
                    <h4 className="text-white font-bold text-center mb-4">Insurance Coverage Breakdown</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 5, right: 5, bottom: 30, left: 5 }}>
                        <Pie
                          data={[
                            { name: 'Structure', value: insuranceData.coverageDetails.structure },
                            { name: 'Contents', value: insuranceData.coverageDetails.contents },
                            { name: 'Liability', value: insuranceData.coverageDetails.liability },
                            { name: 'Natural Disasters', value: insuranceData.coverageDetails.naturalDisasters },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                        >
                          <Cell fill="#F59E0B" />
                          <Cell fill="#10B981" />
                          <Cell fill="#3B82F6" />
                          <Cell fill="#EF4444" />
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #c09a3e' }}
                          formatter={(value) => `₹${(value as number).toLocaleString()}`}
                          itemStyle={{ color: '#fff' }}
                          labelStyle={{ color: '#fff' }}
                        />
                         <Legend
                           iconType="circle"
                           layout="horizontal"
                           verticalAlign="bottom"
                           align="center"
                           wrapperStyle={{ color: '#fff' }}
                         />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-dark rounded-lg p-4 border border-gold/20">
                     <div className="flex justify-between items-center text-lg">
                        <span className="text-white/70">Annual Premium:</span>
                        <span className="text-gold font-bold">₹{insuranceData.annualPremium.toLocaleString()}</span>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Raarya Insurance Partners */}
            <div className="bg-dark-light rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6 text-center">Trusted Insurance Partners</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="text-white font-bold mb-2">HDFC ERGO</h4>
                  <p className="text-white/70 text-sm mb-4">Comprehensive property insurance with 24/7 support</p>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <span className="text-white/70 text-sm ml-2">4.8/5</span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="text-white font-bold mb-2">ICICI Lombard</h4>
                  <p className="text-white/70 text-sm mb-4">Premium coverage with quick claim settlement</p>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold" />
                    <span className="text-white/70 text-sm ml-2">4.6/5</span>
                  </div>
                </div>
                <div className="text-center p-6 bg-dark rounded-lg border border-gold/20">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="text-white font-bold mb-2">Bajaj Allianz</h4>
                  <p className="text-white/70 text-sm mb-4">Affordable plans with extensive coverage options</p>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold fill-current" />
                    <Star className="h-4 w-4 text-gold" />
                    <span className="text-white/70 text-sm ml-2">4.5/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {isEditModalOpen && editingProperty && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              background: '#1a202c',
              color: 'white',
              borderRadius: '1rem',
              width: '95%',
              maxWidth: '800px',
              border: '1px solid #c49b63',
              maxHeight: '90vh',
              overflowY: 'auto'
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
            }
          }}
          contentLabel="Edit Property"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gold">Edit Property</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gold hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateProperty} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Property Type</label>
                  <select
                    name="propertyType"
                    value={editingProperty.propertyType}
                    onChange={handleEditInputChange}
                    className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    required
                  >
                    <option value="">Select Property Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="house">Independent House</option>
                    <option value="plot">Plot/Land</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Expected Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={editingProperty.price}
                    onChange={handleEditInputChange}
                    placeholder="Enter expected price"
                    className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Property Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingProperty.title}
                  onChange={handleEditInputChange}
                  placeholder="Enter a compelling title for your property"
                  className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={editingProperty.bedrooms}
                    onChange={handleEditInputChange}
                    placeholder="No. of bedrooms"
                    className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Bathrooms</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={editingProperty.bathrooms}
                    onChange={handleEditInputChange}
                    placeholder="No. of bathrooms"
                    className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Area (sq ft)</label>
                  <input
                    type="number"
                    name="area"
                    value={editingProperty.area}
                    onChange={handleEditInputChange}
                    placeholder="Total area"
                    className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={editingProperty.location}
                  onChange={handleEditInputChange}
                  placeholder="Enter property location"
                  className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={editingProperty.description}
                  onChange={handleEditInputChange}
                  rows={4}
                  placeholder="Describe your property in detail..."
                  className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Property Age (years)</label>
                  <input
                    type="number"
                    name="propertyAge"
                    value={editingProperty.propertyAge}
                    onChange={handleEditInputChange}
                    placeholder="Age of property"
                    className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Parking</label>
                  <select
                    name="parking"
                    value={editingProperty.parking}
                    onChange={handleEditInputChange}
                    className="w-full bg-dark border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none"
                  >
                    <option value="">Select Parking</option>
                    <option value="Covered">Covered</option>
                    <option value="Open">Open</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Parking', 'Garden', 'Balcony', 'Lift', 'Security', 'Power Backup', 'Water Supply', 'Internet', 'Gym', 'Swimming Pool', 'Clubhouse', 'Play Area'].map(amenity => (
                    <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProperty.amenities?.includes(amenity)}
                        onChange={() => handleEditAmenityChange(amenity)}
                        className="text-gold bg-dark border-gold/30 rounded focus:ring-gold"
                      />
                      <span className="text-white/80">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gold text-dark font-bold py-3 rounded-lg hover:bg-yellow-400 transition-all duration-300"
                >
                  Update Property
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-dark-light text-gold border border-gold/30 font-bold py-3 rounded-lg hover:bg-gold hover:text-dark transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SellPage; 