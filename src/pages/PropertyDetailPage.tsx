import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  ExternalLink,
  ArrowLeft,
  Send,
  Building,
  Check,
} from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { COMPANY_INFO } from '../data/company';
import { generateWhatsAppLink, validateInquiryForm } from '../utils/propertyUtils';
import { ImageLightbox } from '../components/ImageLightbox';
import { PropertyCard } from '../components/PropertyCard';
import { InquiryFormData } from '../types/property';

export const PropertyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { properties, isFavorite, toggleFavorite, submitInquiry } = usePropertyContext();

  const property = properties.find((p) => p.slug === slug);

  // Gallery & Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Inquiry Form State
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phone: '',
    email: '',
    propertyTitle: property?.title || '',
    propertyId: property?.id || '',
    message: `Assalam-o-Alaikum, I am interested in ${property?.title || 'this property'}. Please let me know when we can arrange a site visit.`,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] py-20 text-center px-4">
        <h2 className="font-serif font-bold text-2xl text-[#101C2C] mb-2">
          Property Listing Not Found
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          The property you are looking for may have been sold or moved.
        </p>
        <Link
          to="/properties"
          className="px-6 py-2.5 bg-[#101C2C] text-[#C6A15B] rounded-xl text-xs font-semibold hover:text-white transition-colors"
        >
          Return to All Listings
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(property.id);

  const whatsAppDirectUrl = generateWhatsAppLink(
    COMPANY_INFO.whatsappNumber,
    `Assalam-o-Alaikum Deal Land Team. I am inquiring about "${property.title}" (ID: ${property.id}, Demand: ${property.priceDisplay}) located in ${property.location}. Please provide availability and schedule a visit.`
  );

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.block === property.block))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateInquiryForm({
      ...formData,
      propertyTitle: property.title,
      propertyId: property.id,
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const res = await submitInquiry({
        ...formData,
        propertyTitle: property.title,
        propertyId: property.id,
      });
      setSubmittedMessage(res.message);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        propertyTitle: property.title,
        propertyId: property.id,
        message: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1D2733] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-[#101C2C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to listings</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              type="button"
              className="p-2 text-gray-500 hover:text-[#101C2C] bg-white border border-gray-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => toggleFavorite(property.id)}
              type="button"
              className={`p-2 bg-white border border-gray-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs ${
                favorited ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500' : ''}`} />
              <span>{favorited ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Property Header Strip */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#C6A15B] font-semibold uppercase tracking-wider mb-2">
                <span>Property ID: {property.id}</span>
                <span aria-hidden="true">·</span>
                <span>For {property.purpose}</span>
                <span aria-hidden="true">·</span>
                <span>{property.block}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#101C2C]">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Price & Direct Contact */}
            <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0">
              <div>
                <span className="text-xs text-gray-400 block lg:text-right uppercase tracking-wider">
                  Demand Price
                </span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#101C2C]">
                  {property.priceDisplay}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={whatsAppDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Inquiry</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.primaryPhone.replace(/\s+/g, '')}`}
                  className="px-4 py-2.5 bg-[#101C2C] hover:bg-[#172B45] text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C6A15B]" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          {/* Main Large Image */}
          <div
            onClick={() => {
              setActiveImageIndex(0);
              setLightboxOpen(true);
            }}
            className="lg:col-span-2 relative h-80 sm:h-96 lg:h-[460px] rounded-2xl overflow-hidden cursor-pointer group bg-gray-100 shadow-sm"
          >
            <img
              src={property.images[0] || '/src/assets/images/hero_luxury_villa_1793973116652.jpg'}
              alt={property.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-4 left-4 bg-[#101C2C]/80 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <span>Click to open full gallery ({property.images.length} photos)</span>
            </div>
          </div>

          {/* Secondary Thumbnail Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.images.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx + 1);
                  setLightboxOpen(true);
                }}
                className="relative h-40 sm:h-46 lg:h-[222px] rounded-2xl overflow-hidden cursor-pointer group bg-gray-100 shadow-sm"
              >
                <img
                  src={img}
                  alt={`${property.title} view ${idx + 2}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Specs, Description, Features, Map */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Specs Grid */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-[#101C2C] mb-6 border-b border-gray-100 pb-3">
                Property Overview & Specs
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#C6A15B]">
                    <Maximize className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase">Plot Size</span>
                    <span className="text-sm font-semibold text-gray-900">{property.size}</span>
                  </div>
                </div>

                {property.bedrooms !== undefined && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#C6A15B]">
                      <Bed className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block uppercase">Bedrooms</span>
                      <span className="text-sm font-semibold text-gray-900">{property.bedrooms} Beds</span>
                    </div>
                  </div>
                )}

                {property.bathrooms !== undefined && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#C6A15B]">
                      <Bath className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block uppercase">Bathrooms</span>
                      <span className="text-sm font-semibold text-gray-900">{property.bathrooms} Baths</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#C6A15B]">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase">Property Type</span>
                    <span className="text-sm font-semibold text-gray-900">{property.categoryTitle}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-[#101C2C] mb-4">
                Property Description
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-light mb-6">
                {property.description}
              </p>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C6A15B] shrink-0" />
                <span>
                  <strong>Verified Deal Land Listing:</strong> Documentation, registry status, and Bahria Town transfer endorsements have been pre-screened by Deal Land Real Estate & Builders.
                </span>
              </div>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-[#101C2C] mb-6">
                Key Features & Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Facilities */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-[#101C2C] mb-6">
                Nearby Landmarks & Facilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.nearbyFacilities.map((facility, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="w-1.5 h-1.5 bg-[#101C2C] rounded-full shrink-0" />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-lg text-[#101C2C]">
                  Location in Bahria Town Lahore
                </h3>
                <a
                  href={COMPANY_INFO.socialLinks.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C6A15B] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                4-C Commercial Area, Sector C, Bahria Town, Lahore, Pakistan.
              </p>
              <div className="w-full h-72 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                <iframe
                  title="Bahria Town Sector C Map"
                  src="https://maps.google.com/maps?q=Sector+C+Bahria+Town+Lahore+Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Right Column: Agent Card & Inquiry Form */}
          <div className="space-y-6">
            {/* Agent Contact Card */}
            <div className="bg-[#101C2C] text-white rounded-2xl p-6 shadow-xl border border-[#C6A15B]/30">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-full bg-[#172B45] border-2 border-[#C6A15B] flex items-center justify-center font-serif text-[#C6A15B] font-bold text-sm shrink-0">
                  DL
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-white">
                    Deal Land Advisory Desk
                  </h4>
                  <p className="text-xs text-[#C6A15B]">Authorized Bahria Town Dealer</p>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed mb-6 font-light">
                Direct consultation for verified property rates, on-ground inspections, and file transfers in Sector C & Bahria Town.
              </p>

              <div className="space-y-2.5">
                <a
                  href={whatsAppDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Agent (+92 321 4997657)</span>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.primaryPhone.replace(/\s+/g, '')}`}
                  className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-white/20 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C6A15B]" />
                  <span>Call {COMPANY_INFO.primaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Interactive Inquiry Form */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
              <h4 className="font-serif font-bold text-base text-[#101C2C] mb-1">
                Schedule a Visit or Inquiry
              </h4>
              <p className="text-xs text-gray-500 mb-5">
                Send your details and our team will get back to you promptly.
              </p>

              {submittedMessage ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Inquiry Recorded</span>
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    {submittedMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedMessage(null)}
                    className="text-[11px] text-emerald-900 underline font-medium pt-1"
                  >
                    Submit another question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tariq Mehmood"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="tariq@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                    />
                    {formErrors.message && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-[#101C2C] hover:bg-[#172B45] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{isSubmitting ? 'Recording...' : 'Send Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <div className="mb-8">
              <span className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest block mb-1">
                More Opportunities
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#101C2C]">
                Similar Properties in Bahria Town
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((simProp) => (
                <PropertyCard key={simProp.id} property={simProp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox for this property */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={property.images}
        currentIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActiveImageIndex((prev) => (prev + 1) % property.images.length)}
        onPrev={() => setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
        title={property.title}
      />
    </div>
  );
};
