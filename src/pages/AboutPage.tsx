import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  CheckCircle2,
  ExternalLink,
  Phone,
  MessageCircle,
  Building,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { ImageLightbox } from '../components/ImageLightbox';
import { generateWhatsAppLink } from '../utils/propertyUtils';

export const AboutPage: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const officialPhotos = COMPANY_INFO.officialPhotos;

  const handleOpenPhoto = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const aboutWhatsAppUrl = generateWhatsAppLink(
    COMPANY_INFO.whatsappNumber,
    'Assalam-o-Alaikum Deal Land Team. I am reading about Deal Land on your website and would like to connect.'
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1D2733] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Profile Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Authorized Bahria Town Dealer · 9+ Years of Trusted Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#101C2C] mb-6 tracking-tight">
            About Deal Land Real Estate & Builders
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            {COMPANY_INFO.experienceText}
          </p>
        </div>

        {/* Company Overview & Split Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-md mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest block">
              Our Heritage & Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#101C2C] leading-snug">
              A Family Group Business Dedicated to Turning Dreams into Solid Ground
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Founded on the bedrock of integrity and deep local knowledge, Deal Land has grown alongside Bahria Town Lahore for over nine years. Situated at 4-C, 1st Floor, Main Boulevard, Sector C, our physical office stands in the vibrant center of the development.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              We treat every transaction—from a 5 Marla starter plot to a multi-story commercial plaza or signature golf-view mansion—as a stewardship of our clients' hard-earned wealth.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#101C2C]">
                <Award className="w-4 h-4 text-[#C6A15B]" />
                <span>9+ Years Experience</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-2 text-xs font-bold text-[#101C2C]">
                <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                <span>Authorized Bahria Dealer</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-2 text-xs font-bold text-[#101C2C]">
                <Users className="w-4 h-4 text-[#C6A15B]" />
                <span>Family Group Values</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 sm:h-96 bg-gray-100">
            <img
              src={officialPhotos[0]?.url}
              alt="Deal Land Office Interior"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs text-[#C6A15B] font-semibold uppercase tracking-wider block">
                  Sector C Commercial Headquarters
                </span>
                <span className="font-serif font-bold text-base sm:text-lg">
                  Main Boulevard, Sector C, Bahria Town Lahore
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, and Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-[#101C2C] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#C6A15B]/30 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#172B45] text-[#C6A15B] flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs text-[#C6A15B] font-semibold uppercase tracking-widest block mb-2">
                Our Purpose
              </span>
              <h3 className="font-serif font-bold text-2xl text-white mb-4">
                Our Mission
              </h3>
              <p className="text-base text-gray-300 font-light leading-relaxed">
                "{COMPANY_INFO.mission}"
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-[#172B45] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#101C2C] text-[#C6A15B] flex items-center justify-center mb-6">
                <Building className="w-6 h-6" />
              </div>
              <span className="text-xs text-[#C6A15B] font-semibold uppercase tracking-widest block mb-2">
                The Future
              </span>
              <h3 className="font-serif font-bold text-2xl text-white mb-4">
                Our Vision
              </h3>
              <p className="text-base text-gray-300 font-light leading-relaxed">
                "{COMPANY_INFO.vision}"
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest block mb-2">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#101C2C]">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {COMPANY_INFO.values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs hover:border-[#C6A15B] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#101C2C] text-[#C6A15B] text-xs font-bold flex items-center justify-center mb-4">
                  0{idx + 1}
                </div>
                <h4 className="font-serif font-bold text-base text-[#101C2C] mb-2">
                  {val.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Official Office Gallery Section (Supplied Original Photos) */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest block mb-1">
                Authentic Presence
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#101C2C]">
                Official Deal Land Premises & Sector C Location
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Explore original photographic documentation of our office and meeting facilities in Bahria Town Lahore.
              </p>
            </div>

            <button
              onClick={() => handleOpenPhoto(0)}
              className="px-4 py-2 bg-[#101C2C] text-[#C6A15B] hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <span>View Fullscreen Gallery</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 7 Official Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {officialPhotos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => handleOpenPhoto(idx)}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-gray-100 border border-gray-200 shadow-xs hover:shadow-xl transition-all"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] text-[#C6A15B] font-semibold uppercase tracking-wider mb-1">
                    Official Photograph 0{idx + 1}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-white group-hover:text-[#C6A15B] transition-colors leading-snug">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-gray-300 mt-1 line-clamp-1">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Banner */}
        <div className="bg-[#101C2C] rounded-3xl p-8 sm:p-12 text-center text-white border border-[#C6A15B]/30">
          <h3 className="font-serif font-bold text-2xl sm:text-3xl mb-4">
            Meet Our Leadership in Person
          </h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            We welcome you to visit our Sector C office for transparent property discussions, file checks, and fresh consultations over tea.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#C6A15B] hover:bg-[#B38E46] text-[#101C2C] text-xs font-bold rounded-xl shadow-md transition-all"
            >
              Get Office Directions
            </Link>
            <a
              href={aboutWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox for all official photographs */}
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
