import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  Send,
  CheckCircle2,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { generateWhatsAppLink } from '../utils/propertyUtils';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Property Consultation',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const whatsApp1 = generateWhatsAppLink(
    COMPANY_INFO.whatsappNumber,
    'Assalam-o-Alaikum Deal Land Team. I would like to visit your office in Sector C Bahria Town Lahore.'
  );

  const whatsApp2 = generateWhatsAppLink(
    COMPANY_INFO.whatsappNumberAlt,
    'Assalam-o-Alaikum Deal Land Team. I am contacting regarding property advisory and rates.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name || formData.name.trim().length < 3) {
      errors.name = 'Please enter your full name';
    }
    if (!formData.phone || formData.phone.trim().length < 7) {
      errors.phone = 'Please enter your phone or WhatsApp number';
    }
    if (!formData.email || !formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message || formData.message.trim().length < 5) {
      errors.message = 'Please enter your inquiry details';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Property Consultation',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1D2733] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with Deal Land</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#101C2C] mb-4">
            Visit Our Sector C Office
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
            Conveniently located on Main Boulevard, Sector C, Bahria Town Lahore. We look forward to welcoming you for personal property consultations.
          </p>
        </div>

        {/* 2-Column Main Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">
          {/* Left Column: Official Contact Card */}
          <div className="space-y-6">
            <div className="bg-[#101C2C] text-white rounded-2xl p-8 border border-[#C6A15B]/30 shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-6">
                <span className="text-xs font-semibold text-[#C6A15B] tracking-wider uppercase block mb-1">
                  Agency Headquarters
                </span>
                <h2 className="font-serif font-bold text-2xl text-white">
                  {COMPANY_INFO.name}
                </h2>
                <p className="text-xs text-gray-400 mt-1">{COMPANY_INFO.positioning}</p>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#172B45] text-[#C6A15B] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-1">
                    Office Address
                  </h4>
                  <p className="text-sm text-gray-300 leading-snug">
                    {COMPANY_INFO.address.full}
                  </p>
                  <a
                    href={COMPANY_INFO.socialLinks.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#C6A15B] font-semibold mt-2 hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#172B45] text-[#C6A15B] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                    Phone Numbers & Hotlines
                  </h4>
                  <div className="flex flex-col gap-1.5 text-sm">
                    <a
                      href={`tel:${COMPANY_INFO.primaryPhone.replace(/\s+/g, '')}`}
                      className="text-gray-300 hover:text-white font-medium flex items-center gap-2"
                    >
                      <span>{COMPANY_INFO.primaryPhone}</span>
                      <span className="text-[10px] text-[#C6A15B] bg-white/5 px-2 py-0.5 rounded">Primary & WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${COMPANY_INFO.secondaryPhone.replace(/\s+/g, '')}`}
                      className="text-gray-300 hover:text-white font-medium flex items-center gap-2"
                    >
                      <span>{COMPANY_INFO.secondaryPhone}</span>
                      <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">Office Desk</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#172B45] text-[#C6A15B] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-1">
                    Official Business Hours
                  </h4>
                  <p className="text-xs text-gray-300">{COMPANY_INFO.workingHours.days}</p>
                  <p className="text-xs text-amber-400/90 mt-1">{COMPANY_INFO.workingHours.friday}</p>
                </div>
              </div>

              {/* WhatsApp Quick CTA Buttons */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsApp1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Line 1</span>
                </a>
                <a
                  href={whatsApp2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Line 2</span>
                </a>
              </div>
            </div>

            {/* Social Links Box */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs">
              <h4 className="font-serif font-bold text-sm text-[#101C2C] mb-3">
                Follow Us on Social Media
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={COMPANY_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
                >
                  YouTube
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
                >
                  TikTok
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.zameenProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-medium text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  Zameen Profile
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/80 shadow-md">
            <h3 className="font-serif font-bold text-xl text-[#101C2C] mb-2">
              Send an Inquiry to Deal Land
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Our consultants respond within 2-4 business hours with verified information.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif font-bold text-xl text-gray-900">
                  Message Sent Successfully
                </h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting Deal Land Real Estate & Builders. An agent will contact you on WhatsApp or call you directly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#C6A15B] font-semibold underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Asad Ullah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                  />
                  {formErrors.name && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 321 0000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="asad@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                  >
                    <option value="General Property Consultation">General Property Consultation</option>
                    <option value="Buy a Plot in Bahria Town">Buy a Plot in Bahria Town</option>
                    <option value="Buy a Luxury Bungalow / Villa">Buy a Luxury Bungalow / Villa</option>
                    <option value="Sell My Property in Bahria Town">Sell My Property in Bahria Town</option>
                    <option value="Rental Property Inquiry">Rental Property Inquiry</option>
                    <option value="Turnkey House Construction">Turnkey House Construction</option>
                    <option value="Commercial Plaza Investment">Commercial Plaza Investment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Your Message / Query *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what size, sector, or budget you are considering..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#101C2C] hover:bg-[#172B45] text-[#C6A15B] hover:text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#C6A15B]" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Google Map Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest block mb-1">
                Pinpoint Location
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#101C2C]">
                Find Deal Land on the Map
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                4-C Commercial Area, Sector C, Main Boulevard, Bahria Town Lahore.
              </p>
            </div>

            <a
              href={COMPANY_INFO.socialLinks.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#101C2C] text-[#C6A15B] hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="w-full h-96 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
            <iframe
              title="Deal Land Real Estate & Builders Bahria Town Lahore Location"
              src="https://maps.google.com/maps?q=4-C+Sector+C+Main+Boulevard+Bahria+Town+Lahore+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};
