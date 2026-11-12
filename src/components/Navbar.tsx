import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, Heart, PlusCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { usePropertyContext } from '../context/PropertyContext';
import { generateWhatsAppLink } from '../utils/propertyUtils';

interface NavbarProps {
  onOpenFavorites?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFavorites }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const { favorites } = usePropertyContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Buy', path: '/buy' },
    { name: 'Rent', path: '/rent' },
    { name: 'Sell', path: '/sell' },
    { name: 'Construction', path: '/construction' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const quickWhatsAppUrl = generateWhatsAppLink(
    COMPANY_INFO.whatsappNumber,
    'Assalam-o-Alaikum Deal Land Team. I visited your website and would like information about properties in Bahria Town Lahore.'
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#101C2C]/95 backdrop-blur-md shadow-md border-b border-[#C6A15B]/20 py-3'
          : 'bg-[#101C2C] border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark & Official Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-[#172B45] to-[#101C2C] border border-[#C6A15B] flex items-center justify-center shrink-0 shadow-sm p-1">
              <svg viewBox="0 0 40 40" className="w-full h-full text-[#C6A15B]" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Roofline silhouette */}
                <path d="M20 5L6 16H11V33H29V16H34L20 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {/* Modern villa pillars and DL monogram */}
                <path d="M15 33V22H25V33" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M20 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-serif font-bold text-base sm:text-lg tracking-tight group-hover:text-[#C6A15B] transition-colors leading-tight">
                DEAL LAND
              </span>
              <span className="text-[#C6A15B] text-[9px] sm:text-[10px] tracking-widest uppercase font-medium">
                Real Estate & Builders
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links (Clean single line typography with subtle hover) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`whitespace-nowrap transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#C6A15B] font-semibold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C6A15B] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions & CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Saved properties button */}
            {onOpenFavorites && (
              <button
                onClick={onOpenFavorites}
                type="button"
                className="relative p-2 text-gray-300 hover:text-[#C6A15B] transition-colors rounded-lg hover:bg-white/5"
                aria-label={`View saved properties (${favorites.length})`}
                title="Saved Properties"
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C6A15B] text-[#101C2C] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                    {favorites.length}
                  </span>
                )}
              </button>
            )}

            {/* Direct WhatsApp Action */}
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/50 transition-colors whitespace-nowrap"
              title="Chat with Deal Land on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Call Now button */}
            <a
              href={`tel:${COMPANY_INFO.primaryPhone.replace(/\s+/g, '')}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-200 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap"
              title="Call Deal Land directly"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{COMPANY_INFO.primaryPhone}</span>
            </a>

            {/* List Your Property CTA Button (Desktop & Tablet only, mobile in drawer) */}
            <Link
              to="/sell"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#101C2C] bg-[#C6A15B] hover:bg-[#B38E46] transition-colors rounded-lg shadow-sm whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>List Property</span>
            </Link>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 text-gray-300 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#172B45] border-t border-white/10 px-4 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Prominent List Property Action on Mobile */}
          <Link
            to="/sell"
            className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-[#101C2C] bg-[#C6A15B] rounded-xl shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Your Property with Deal Land</span>
          </Link>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#C6A15B]/20 text-[#C6A15B] font-semibold'
                      : 'text-gray-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 rounded-xl"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp (+92 321 4997657)</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.primaryPhone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold text-white bg-white/10 rounded-xl hover:bg-white/15"
            >
              <Phone className="w-4 h-4 text-[#C6A15B]" />
              <span>Call +92 321 4997657</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
