import React, { useState } from 'react';
import {
  Upload,
  CheckCircle2,
  Building,
  ShieldAlert,
  PhoneCall,
  Clock,
  Sparkles,
} from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { validateSellPropertyForm, generateWhatsAppLink } from '../utils/propertyUtils';
import { COMPANY_INFO } from '../data/company';
import { SellPropertyFormData } from '../types/property';

export const SellPage: React.FC = () => {
  const { submitSellProperty } = usePropertyContext();

  const [formData, setFormData] = useState<SellPropertyFormData>({
    ownerName: '',
    contactNumber: '',
    email: '',
    propertyType: 'house',
    propertyLocation: '',
    propertySize: '',
    expectedPrice: '',
    propertyDescription: '',
    imagesCount: 0,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const [simulatedFiles, setSimulatedFiles] = useState<string[]>([]);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setSimulatedFiles(names);
      setFormData((prev) => ({ ...prev, imagesCount: names.length }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateSellPropertyForm(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const res = await submitSellProperty(formData);
      setSuccessResponse(res.message);
      setFormData({
        ownerName: '',
        contactNumber: '',
        email: '',
        propertyType: 'house',
        propertyLocation: '',
        propertySize: '',
        expectedPrice: '',
        propertyDescription: '',
        imagesCount: 0,
      });
      setSimulatedFiles([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sellWhatsAppUrl = generateWhatsAppLink(
    COMPANY_INFO.whatsappNumber,
    'Assalam-o-Alaikum Deal Land Team. I want to sell my property in Bahria Town Lahore and would like a market valuation.'
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1D2733] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Authorized Bahria Town Valuation & Brokerage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#101C2C] mb-4">
            Want to Sell Your Property?
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto font-light leading-relaxed">
            Let Deal Land help you connect with qualified, verified buyers. Benefit from our 9+ years of market presence and high-intent investor network.
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-4 bg-white rounded-xl border border-gray-200/80 flex items-center gap-3">
            <Building className="w-8 h-8 text-[#C6A15B] shrink-0" />
            <div>
              <span className="text-xs font-bold text-gray-900 block">Maximum Exposure</span>
              <span className="text-[11px] text-gray-500">Showcased to high-net-worth investors</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-gray-200/80 flex items-center gap-3">
            <Clock className="w-8 h-8 text-[#C6A15B] shrink-0" />
            <div>
              <span className="text-xs font-bold text-gray-900 block">Fast Turnaround</span>
              <span className="text-[11px] text-gray-500">Direct buyers ready with verified funds</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-gray-200/80 flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-[#C6A15B] shrink-0" />
            <div>
              <span className="text-xs font-bold text-gray-900 block">Secure Transfer</span>
              <span className="text-[11px] text-gray-500">End-to-end Bahria office documentation</span>
            </div>
          </div>
        </div>

        {/* Main Form Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/80 shadow-md">
          {successResponse ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif font-bold text-2xl text-[#101C2C]">
                Property Submission Received
              </h2>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                {successResponse}
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setSuccessResponse(null)}
                  className="px-6 py-2.5 bg-[#101C2C] text-[#C6A15B] hover:text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  List Another Property
                </button>
                <a
                  href={sellWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Follow up on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Owner Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Owner / Representative Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mian Shahzad"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
                  />
                  {formErrors.ownerName && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.ownerName}</p>
                  )}
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Contact Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 321 0000000"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
                  />
                  {formErrors.contactNumber && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.contactNumber}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="owner@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
                  >
                    <option value="house">House / Villa</option>
                    <option value="plot">Residential Plot</option>
                    <option value="commercial">Commercial Plot</option>
                    <option value="building">Commercial Plaza</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Location / Sector / Block *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sector C, Block N, Bahria Town"
                    value={formData.propertyLocation}
                    onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
                  />
                  {formErrors.propertyLocation && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.propertyLocation}</p>
                  )}
                </div>

                {/* Size */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Property Size *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Marla, 10 Marla, 1 Kanal"
                    value={formData.propertySize}
                    onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
                  />
                  {formErrors.propertySize && (
                    <p className="text-[11px] text-red-500 mt-1">{formErrors.propertySize}</p>
                  )}
                </div>
              </div>

              {/* Expected Price */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Expected Demand Price (PKR) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. PKR 4.5 Crore or PKR 1.85 Crore"
                  value={formData.expectedPrice}
                  onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
                />
                {formErrors.expectedPrice && (
                  <p className="text-[11px] text-red-500 mt-1">{formErrors.expectedPrice}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Property Description / Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Mention corner status, park facing, road width, construction quality, possession status, or any other features..."
                  value={formData.propertyDescription}
                  onChange={(e) => setFormData({ ...formData, propertyDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
                />
              </div>

              {/* Upload Property Images */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Upload Property Images (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#C6A15B] transition-colors bg-gray-50/50">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-1">
                    Drag and drop your photos here, or click to browse
                  </p>
                  <p className="text-[10px] text-gray-400 mb-3">
                    Supported: JPG, PNG, WEBP (Exterior, Interior, Layout map)
                  </p>
                  <label className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer">
                    Browse Files
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleSimulatedUpload}
                      className="hidden"
                    />
                  </label>
                  {simulatedFiles.length > 0 && (
                    <div className="mt-3 text-xs text-emerald-700 font-medium">
                      ✓ {simulatedFiles.length} file(s) attached: {simulatedFiles.slice(0, 3).join(', ')}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#101C2C] hover:bg-[#172B45] text-[#C6A15B] hover:text-white text-sm font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Submitting Property Details...' : 'Submit Property for Listing'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Alternative Direct Phone Valuation */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-200/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif font-bold text-base text-[#101C2C]">
              Need Immediate Verbal Valuation?
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Speak directly with our chief appraiser for instant Bahria Town market analysis.
            </p>
          </div>
          <a
            href={`tel:${COMPANY_INFO.primaryPhone.replace(/\s+/g, '')}`}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-[#C6A15B]" />
            <span>Call +92 321 4997657</span>
          </a>
        </div>
      </div>
    </div>
  );
};
