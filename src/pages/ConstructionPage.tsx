import React, { useState } from 'react';
import {
  Hammer,
  Building,
  Home,
  Compass,
  Paintbrush,
  Layers,
  CheckCircle2,
  Phone,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { COMPANY_INFO } from '../data/company';
import { generateWhatsAppLink } from '../utils/propertyUtils';
import { ConstructionInquiryData } from '../types/property';
import { IMAGES } from '../assets/images';

export const ConstructionPage: React.FC = () => {
  const { submitConstructionInquiry } = usePropertyContext();

  const [formData, setFormData] = useState<ConstructionInquiryData>({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'Residential Construction (Turnkey)',
    location: '',
    estimatedBudget: '',
    projectDescription: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const services = [
    {
      id: 'residential',
      title: 'Residential Construction',
      tagline: '5 Marla, 10 Marla & 1 Kanal Designer Homes',
      description:
        'Complete turnkey house construction from foundation excavation to finishing touches. Built to Bahria Town architectural building codes with strict quality standards.',
      icon: Home,
      image: IMAGES.constructionArchitecturalSite,
      specs: ['Grey Structure Framing', 'A-Grade Bricks & Cement', 'Concealed Conduits', 'Premium Finishing'],
    },
    {
      id: 'commercial',
      title: 'Commercial Construction',
      tagline: 'Retail Plazas & Corporate Headquarters',
      description:
        'Specialized civil engineering for commercial buildings on Sector C Main Boulevard and commercial civic zones, engineered for high floor loadings and tenant durability.',
      icon: Building,
      image: IMAGES.propertyCommercialPlaza,
      specs: ['Multi-Story Plazas', 'Basement Retaining Walls', 'Elevator Shafts', 'High Footfall Layouts'],
    },
    {
      id: 'renovation',
      title: 'House Renovation & Modernization',
      tagline: 'Transforming Established Properties',
      description:
        'Full interior and exterior villa refurbishment, modern kitchen retrofits, luxury bathroom tiling overhauls, and structural expansions for growing families.',
      icon: Hammer,
      image: IMAGES.heroLuxuryVilla,
      specs: ['Kitchen Remodeling', 'Washroom Upgrades', 'Facade Resurfacing', 'Waterproofing Solutions'],
    },
    {
      id: 'interior',
      title: 'Interior Design & Improvements',
      tagline: 'Bespoke Modern Living Spaces',
      description:
        'Tailored interior detailing including false ceiling profiles, media walls, solid ash and teak cabinetry, imported chandeliers, and ambiance lighting schemes.',
      icon: Paintbrush,
      image: IMAGES.property1KanalModern,
      specs: ['Custom Media Walls', 'Ash Wood Paneling', 'Designer Kitchens', 'Architectural Lighting'],
    },
    {
      id: 'planning',
      title: 'Architectural Planning & Blueprints',
      tagline: '2D/3D Design & Bahria Approvals',
      description:
        'Full structural, electrical, and plumbing architectural drawings submitted directly for Bahria Town Design & Building Control authority endorsements.',
      icon: Compass,
      image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TXMeinSJjKVIOycR_U5YML-XSlAnQLN6J5tSjKTYp43-4j0ywx8T-Mn_nzbl97r-WxjOTvk1ERAxxz_YY43JKwaeTrg43jfm3u8nR3Elql4-vavvRS2ZNinJwMj__AZyheTb_3=s1360-w1360-h1020-rw',
      specs: ['3D Elevations', 'Floor Plans', 'Soil Testing Support', 'Authority Submissions'],
    },
    {
      id: 'development',
      title: 'Property Development Advisory',
      tagline: 'Investor Project Management',
      description:
        'Strategic oversight for land acquisition, project budgeting, contractor supervision, and post-construction tenant acquisition or resale.',
      icon: Layers,
      image: 'https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SY3CnJv9CWSbB-mfCQyRQImcphhwpBYK0eJ_3YNvGtdHpW4A1wYk66Pi6INgu69SQ9CqwX9b1U1SDDxMjsXOWP3-4fXLmucvR_To05roaQ966ghSTyUye8pcLaAVD7tinVPJIBkKllIQZY=s1360-w1360-h1020-rw',
      specs: ['Cost Estimations', 'Timeline Supervision', 'Material Audits', 'Handover Verification'],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.fullName || formData.fullName.trim().length < 3) {
      errors.fullName = 'Please enter your name';
    }
    if (!formData.phone || formData.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone or WhatsApp number';
    }
    if (!formData.email || !formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.location || formData.location.trim().length < 3) {
      errors.location = 'Please state plot/property location in Bahria Town';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const res = await submitConstructionInquiry(formData);
      setSuccessMsg(res.message);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        projectType: 'Residential Construction (Turnkey)',
        location: '',
        estimatedBudget: '',
        projectDescription: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const constructionWhatsAppUrl = generateWhatsAppLink(
    COMPANY_INFO.whatsappNumber,
    'Assalam-o-Alaikum Deal Land Team. I would like to consult with your builders regarding a construction / renovation project in Bahria Town Lahore.'
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1D2733] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="bg-[#101C2C] text-white rounded-3xl p-8 sm:p-12 lg:p-16 mb-16 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Deal Land Builders · 9+ Years Field Experience</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Construction & Renovation Services
            </h1>
            <p className="text-base text-gray-300 leading-relaxed font-light mb-8">
              "We Do Offer SELL / BUY / BUILD / RENOVATE and Rent Services."
              Trust your building project to an experienced family business with extensive on-ground construction capabilities in Bahria Town Lahore.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#consultation-form"
                className="px-6 py-3 bg-[#C6A15B] hover:bg-[#B38E46] text-[#101C2C] text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Request a Consultation
              </a>
              <a
                href={constructionWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Construction Desk</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 opacity-35 overflow-hidden">
            <img
              src="/src/assets/images/construction_architectural_site_1793973117447.jpg"
              alt="Deal Land Site Works"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 6 Core Services */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest block mb-2">
              Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#101C2C]">
              Comprehensive Building Solutions
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              From architectural blueprint approvals to keys in hand, we supervise every stage with total transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs hover:border-[#C6A15B]/50 transition-all hover:shadow-lg flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#101C2C]/90 backdrop-blur-xs text-[#C6A15B] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-[#C6A15B] font-semibold uppercase tracking-wider block mb-1">
                        {srv.tagline}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-[#101C2C] mb-2">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 space-y-1.5">
                      {srv.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-gray-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Inquiry Consultation Form */}
        <div id="consultation-form" className="scroll-mt-24 max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/80 shadow-lg">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest block mb-1">
              Start Your Build
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#101C2C]">
              Request a Construction Consultation
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Fill in your project requirements and our structural team will arrange a site review in Bahria Town.
            </p>
          </div>

          {successMsg ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-bold text-lg text-emerald-950">
                Consultation Request Received
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                {successMsg}
              </p>
              <button
                type="button"
                onClick={() => setSuccessMsg(null)}
                className="mt-2 text-xs font-semibold text-emerald-900 underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bilal Ahmed"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
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
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="bilal@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                  >
                    <option value="Residential Construction (Turnkey)">Residential Construction (Turnkey)</option>
                    <option value="Residential Grey Structure Only">Residential Grey Structure Only</option>
                    <option value="Commercial Plaza Construction">Commercial Plaza Construction</option>
                    <option value="Complete House Renovation">Complete House Renovation</option>
                    <option value="Interior Design & Woodwork">Interior Design & Woodwork</option>
                    <option value="Architectural Blueprint & Approvals">Architectural Blueprint & Approvals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Plot / Project Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sector C, 10 Marla Plot #124"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                  />
                  {formErrors.location && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Estimated Budget Range (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PKR 1.5 - 2 Crore"
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Project Description & Specifications
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details such as desired covered area, architectural style (Modern, Spanish, Classical), expected timeline, or special requirements..."
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#101C2C] hover:bg-[#172B45] text-[#C6A15B] hover:text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Submitting Request...' : 'Request a Consultation'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
