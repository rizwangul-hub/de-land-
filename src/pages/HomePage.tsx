import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Building,
  Hammer,
  Award,
  CheckCircle,
  PhoneCall,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { PROPERTY_CATEGORIES } from '../data/properties';
import { usePropertyContext } from '../context/PropertyContext';
import { PropertyCard } from '../components/PropertyCard';
import { PropertySearchFilter } from '../components/PropertySearchFilter';
import { ImageLightbox } from '../components/ImageLightbox';
import { generateWhatsAppLink } from '../utils/propertyUtils';
import { IMAGES } from '../assets/images';

export const HomePage: React.FC = () => {
  const { properties, setFilterState } = usePropertyContext();
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'sale' | 'rent'>('all');

  // Lightbox for office and location photos
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroBackground = IMAGES.heroLuxuryVilla;

  const displayedProperties = properties.filter((p) => {
    if (activeCategoryTab === 'all') return true;
    return p.purpose === activeCategoryTab;
  });

  const officialPhotos = COMPANY_INFO.officialPhotos;

  const handleOpenPhoto = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleCategoryClick = (categoryType?: string, purpose?: 'sale' | 'rent') => {
    setFilterState((prev) => ({
      ...prev,
      type: categoryType || 'all',
      purpose: purpose || 'all',
    }));
  };

  const directConsultWhatsAppUrl = generateWhatsAppLink(
    COMPANY_INFO.whatsappNumber,
    'Assalam-o-Alaikum Deal Land Team. I am looking for property advice and current rates in Bahria Town Lahore.'
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1D2733]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between pt-16 pb-12 overflow-hidden bg-[#101C2C]">
        {/* Luxury Background Image with Measured Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBackground}
            alt="Luxury Villa in Bahria Town Lahore"
            className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101C2C]/95 via-[#101C2C]/80 to-[#101C2C]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101C2C] via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-16 pb-8">
          <div className="max-w-3xl">
            {/* Subtle Brand Tagline Kicker (Zero-pill text) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C6A15B] font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4 text-[#C6A15B]" />
              <span>{COMPANY_INFO.positioning}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-6 text-balance">
              Find Your Dream Property in Bahria Town Lahore
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mb-8 font-light">
              From premium residential plots to luxury designer homes and commercial plaza investments,
              Deal Land brings over nine years of trusted wisdom to guide your decisions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/properties"
                className="px-6 py-3.5 text-sm font-semibold text-[#101C2C] bg-[#C6A15B] hover:bg-[#B38E46] rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={directConsultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-200 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Talk to Our Experts</span>
              </a>
            </div>
          </div>
        </div>

        {/* Integrated Interactive Property Search Panel */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
          <PropertySearchFilter />
        </div>
      </section>

      {/* 2. TRUST STATISTICS SECTION */}
      <section className="bg-white border-b border-gray-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex flex-col items-center sm:items-start p-4">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-[#101C2C] tracking-tight tabular-nums">
                9+ Years
              </span>
              <span className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold mt-1">
                Real Estate Wisdom
              </span>
              <p className="text-xs text-gray-500 mt-1 text-center sm:text-left">
                Trusted family enterprise serving Bahria Town since 2017.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start p-4 border-l border-gray-100">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-[#101C2C] tracking-tight">
                Sector C
              </span>
              <span className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold mt-1">
                Main Boulevard Office
              </span>
              <p className="text-xs text-gray-500 mt-1 text-center sm:text-left">
                Prime commercial presence at 4-C, 1st Floor.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start p-4 border-l border-gray-100">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-[#101C2C] tracking-tight">
                Buy · Rent · Build
              </span>
              <span className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold mt-1">
                Full-Service Agency
              </span>
              <p className="text-xs text-gray-500 mt-1 text-center sm:text-left">
                Sell, buy, construct, and renovate under one roof.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start p-4 border-l border-gray-100">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-[#101C2C] tracking-tight">
                100% Verified
              </span>
              <span className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold mt-1">
                Transparent Advisory
              </span>
              <p className="text-xs text-gray-500 mt-1 text-center sm:text-left">
                Authorized dealer guidance with verified land titles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-2">
              Curated Showcase
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#101C2C]">
              Featured Properties in Bahria Town
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-xl">
              Explore hand-selected prime bungalows, residential plots, and income-generating commercial plazas.
            </p>
          </div>

          {/* Tab Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveCategoryTab('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeCategoryTab === 'all'
                  ? 'bg-white text-[#101C2C] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setActiveCategoryTab('sale')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeCategoryTab === 'sale'
                  ? 'bg-white text-[#101C2C] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => setActiveCategoryTab('rent')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                activeCategoryTab === 'rent'
                  ? 'bg-white text-[#101C2C] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              For Rent
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProperties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#101C2C] hover:bg-[#172B45] text-white text-sm font-semibold rounded-xl shadow-md transition-all group"
          >
            <span>View All Available Properties</span>
            <ArrowRight className="w-4 h-4 text-[#C6A15B] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 4. EXPLORE PROPERTY CATEGORIES */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-2">
              Specialized Portfolios
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#101C2C]">
              Explore by Category
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Browse our diverse inventory tailored to families, overseas investors, and commercial enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROPERTY_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={cat.purpose ? `/${cat.purpose}` : `/properties`}
                onClick={() => handleCategoryClick(cat.type, cat.purpose as any)}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-semibold text-[#C6A15B] tracking-wider uppercase mb-1">
                    {cat.count}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#C6A15B] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2 mb-3">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-[#C6A15B] font-medium group-hover:underline">
                    <span>View Listings</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE DEAL LAND */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-2">
            The Deal Land Standard
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#101C2C]">
            Why Choose Deal Land?
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            A family enterprise dedicated to protecting your capital and finding your ideal home in Bahria Town.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#C6A15B]/50 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#101C2C] text-[#C6A15B] flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#101C2C] mb-2">
              Client-Centric Approach
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We prioritize lasting relationships built on trust, complete transparency, and personal accountability.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#C6A15B]/50 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#101C2C] text-[#C6A15B] flex items-center justify-center mb-6">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#101C2C] mb-2">
              Prime Locations
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Explore premier opportunities in sought-after sectors and commercial boulevards of Bahria Town Lahore.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#C6A15B]/50 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#101C2C] text-[#C6A15B] flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#101C2C] mb-2">
              Experienced Guidance
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Benefit from more than nine years of hands-on real estate and construction industry experience.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#C6A15B]/50 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#101C2C] text-[#C6A15B] flex items-center justify-center mb-6">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#101C2C] mb-2">
              Responsive Support
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our team is always accessible via WhatsApp, direct call, or personal meeting at our Sector C office.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BUSINESS INTRODUCTION & OFFICIAL PHOTOGRAPHS */}
      <section className="py-20 bg-[#101C2C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story copy */}
            <div>
              <div className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-2">
                Executive Agency & Presence
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight mb-6">
                Building Trust. Creating Opportunities. Finding Your Dream Property.
              </h2>
              <p className="text-base text-gray-300 leading-relaxed mb-6 font-light">
                {COMPANY_INFO.experienceText}
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-200">
                    Official Bahria Town registered presence on Sector C Main Boulevard.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-200">
                    In-house architectural, construction, and property valuation team.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-200">
                    Dedicated support for Overseas Pakistanis looking to build or invest safely.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-3 bg-[#C6A15B] hover:bg-[#B38E46] text-[#101C2C] text-xs font-semibold rounded-xl transition-all inline-flex items-center gap-2"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all"
                >
                  <span>Visit Our Office</span>
                </Link>
              </div>
            </div>

            {/* Official Business Gallery Grid */}
            <div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {officialPhotos.slice(0, 4).map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleOpenPhoto(idx)}
                    className="group relative h-44 sm:h-52 rounded-xl overflow-hidden cursor-pointer border border-white/10 shadow-lg"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="text-[11px] font-semibold text-white drop-shadow-sm block truncate">
                        {photo.title}
                      </span>
                      <span className="text-[10px] text-[#C6A15B] font-medium">Click to view</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <span>Official Deal Land Office & Sector C Boulevard</span>
                <button
                  onClick={() => handleOpenPhoto(0)}
                  className="text-[#C6A15B] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Open Full Gallery ({officialPhotos.length} photos)</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONSTRUCTION & DEVELOPMENT SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#172B45] to-[#101C2C] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-3">
              <Hammer className="w-4 h-4 text-[#C6A15B]" />
              <span>Full-Spectrum Builders</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight mb-4">
              Turnkey Construction & Architectural Development
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8 font-light">
              We do not just find you land; we build your legacy. From grey structure engineering to bespoke luxury interior finishes, Deal Land provides end-to-end residential and commercial construction services in Bahria Town Lahore.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="block text-white font-serif font-bold text-sm">Grey Structure</span>
                <span className="text-[11px] text-gray-400">Engineering excellence</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="block text-white font-serif font-bold text-sm">Turnkey Finishing</span>
                <span className="text-[11px] text-gray-400">Imported materials</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="block text-white font-serif font-bold text-sm">Villa Renovation</span>
                <span className="text-[11px] text-gray-400">Modern upgrades</span>
              </div>
            </div>

            <Link
              to="/construction"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C6A15B] hover:bg-[#B38E46] text-[#101C2C] text-xs font-semibold rounded-xl shadow-lg transition-all"
            >
              <span>Discuss Your Construction Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Decorative architectural image */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden">
            <img
              src={IMAGES.constructionArchitecturalSite}
              alt="Deal Land Construction in Progress"
              className="w-full h-full object-cover opacity-60 mask-image-linear-gradient"
            />
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS (Clearly labeled demo feedback) */}
      <section className="py-20 bg-gray-50 border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-2">
              Client Feedback
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#101C2C]">
              What Our Clients Say
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              (Demonstration client experiences reflecting Deal Land's 9+ years of service standards in Bahria Town)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#C6A15B] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  "Deal Land made our 1 Kanal villa acquisition in Sector C seamless. Being an overseas resident in the UK, having an honest team on the ground to inspect documentation and coordinate directly with Bahria office was invaluable."
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#101C2C]">Dr. Tariq Farooq</h4>
                  <span className="text-xs text-gray-500">Overseas Investor · Sector C</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium">Verified Client</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#C6A15B] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  "We contracted Deal Land Builders for complete turnkey construction of our 10 Marla house in Sector B. The grey structure quality, electrical conduits, and timber work were finished on schedule without budget creep."
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#101C2C]">Chaudhry Kamran</h4>
                  <span className="text-xs text-gray-500">Homeowner · Takbeer Block</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium">Verified Client</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#C6A15B] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  "Their advice on commercial rental yields on Main Boulevard Sector C was spot on. Deal Land successfully negotiated our plaza purchase and tenanted all floors within two months."
                </p>
              </div>
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#101C2C]">Malik Salman</h4>
                  <span className="text-xs text-gray-500">Commercial Investor · Sector C</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium">Verified Client</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. INSTAGRAM & SOCIAL MEDIA FEED */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-1">
              Social Community
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#101C2C]">
              Follow Deal Land Online
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Join thousands following our daily site updates, property tours, and rate analyses on social channels.
            </p>
          </div>

          <a
            href={COMPANY_INFO.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#101C2C] hover:text-[#C6A15B] transition-colors"
          >
            <span>@deallandpk on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href={COMPANY_INFO.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={IMAGES.heroLuxuryVilla}
              alt="Deal Land Instagram Post"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-[#101C2C]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
              <span>View on Instagram</span>
            </div>
          </a>

          <a
            href={COMPANY_INFO.socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={IMAGES.property1KanalModern}
              alt="Deal Land YouTube Tour"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-[#101C2C]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
              <span>Watch on YouTube</span>
            </div>
          </a>

          <a
            href={COMPANY_INFO.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={IMAGES.propertyCommercialPlaza}
              alt="Deal Land Facebook Post"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-[#101C2C]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
              <span>Follow on Facebook</span>
            </div>
          </a>

          <a
            href={COMPANY_INFO.socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={IMAGES.constructionArchitecturalSite}
              alt="Deal Land TikTok Updates"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-[#101C2C]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
              <span>Watch on TikTok</span>
            </div>
          </a>
        </div>
      </section>

      {/* 10. FINAL CONVERSION CTA */}
      <section className="bg-[#101C2C] text-white py-20 border-t border-[#C6A15B]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest block mb-3">
            Begin Your Property Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-6 tracking-tight text-balance">
            Your Dream Property Is Just One Conversation Away.
          </h2>
          <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you want to purchase a residential plot, invest in high-yield commercial plazas,
            or construct your family bungalow in Bahria Town Lahore, our advisors are here to guide you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.primaryPhone.replace(/\s+/g, '')}`}
              className="px-8 py-3.5 bg-[#C6A15B] hover:bg-[#B38E46] text-[#101C2C] text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Our Experts (+92 321 4997657)</span>
            </a>

            <a
              href={directConsultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox for office and gallery images */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={officialPhotos.map((p) => p.url)}
        currentIndex={currentImageIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setCurrentImageIndex((prev) => (prev + 1) % officialPhotos.length)}
        onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + officialPhotos.length) % officialPhotos.length)}
        title={officialPhotos[currentImageIndex]?.title}
      />
    </div>
  );
};
