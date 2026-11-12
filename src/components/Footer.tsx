import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#101C2C] text-gray-300 border-t border-[#C6A15B]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-[#172B45] to-[#101C2C] border border-[#C6A15B] flex items-center justify-center shrink-0 shadow-sm p-1">
                <svg viewBox="0 0 40 40" className="w-full h-full text-[#C6A15B]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5L6 16H11V33H29V16H34L20 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 33V22H25V33" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M20 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <span className="text-white font-serif font-bold text-lg block leading-tight">
                  DEAL LAND
                </span>
                <span className="text-[#C6A15B] text-[10px] uppercase tracking-wider font-medium">
                  Real Estate & Builders
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              {COMPANY_INFO.experienceText.slice(0, 160)}...
            </p>

            <div className="pt-2 text-xs text-gray-400 space-y-1">
              <p className="text-[#C6A15B] font-medium">{COMPANY_INFO.positioning}</p>
              <p>Experience: {COMPANY_INFO.experienceYears} in Bahria Town Lahore</p>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
                aria-label="Follow Deal Land on Instagram"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
                aria-label="Follow Deal Land on Facebook"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
                aria-label="Subscribe to Deal Land on YouTube"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
                aria-label="Follow Deal Land on TikTok"
                title="TikTok"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.socialLinks.zameenProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 text-[11px] rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
                title="Official Zameen Agent Profile"
              >
                <span>Zameen</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-serif font-semibold text-base mb-4 tracking-wide">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#C6A15B] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-[#C6A15B] transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/buy" className="hover:text-[#C6A15B] transition-colors">
                  Buy Property in Bahria
                </Link>
              </li>
              <li>
                <Link to="/rent" className="hover:text-[#C6A15B] transition-colors">
                  Rentals & Leases
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-[#C6A15B] transition-colors">
                  Sell Your Property
                </Link>
              </li>
              <li>
                <Link to="/construction" className="hover:text-[#C6A15B] transition-colors">
                  Construction & Renovation
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C6A15B] transition-colors">
                  About Deal Land
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C6A15B] transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Real Estate Services */}
          <div>
            <h3 className="text-white font-serif font-semibold text-base mb-4 tracking-wide">
              Our Core Services
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full" />
                <span>Property Sales & Buying</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full" />
                <span>Residential Plots (5M, 10M, 1K, 2K)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full" />
                <span>Luxury Bungalows & Designer Villas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full" />
                <span>Commercial Plots & Plazas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full" />
                <span>Complete House Construction</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full" />
                <span>Architectural Planning & Renovation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full" />
                <span>Executive Rentals & Management</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Hours */}
          <div className="space-y-3">
            <h3 className="text-white font-serif font-semibold text-base mb-4 tracking-wide">
              Office & Contact
            </h3>
            <div className="flex items-start gap-3 text-sm text-gray-300">
              <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-1" />
              <span>{COMPANY_INFO.address.full}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <div className="flex flex-col">
                <a href={`tel:${COMPANY_INFO.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.primaryPhone}
                </a>
                <a href={`tel:${COMPANY_INFO.secondaryPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.secondaryPhone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                {COMPANY_INFO.email}
              </a>
            </div>

            <div className="flex items-start gap-3 text-xs text-gray-400 pt-2 border-t border-white/5">
              <Clock className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
              <div>
                <p>{COMPANY_INFO.workingHours.days}</p>
                <p className="text-amber-400/90 mt-0.5">{COMPANY_INFO.workingHours.friday}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Discreet Demo Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © 2026 {COMPANY_INFO.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[#C6A15B]/70 font-medium">
              Website Demonstration – Sample Property Listings
            </span>
            <span>·</span>
            <Link to="/contact" className="hover:text-gray-400 transition-colors">
              Privacy & Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
