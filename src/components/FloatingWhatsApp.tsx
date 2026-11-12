import React, { useState } from 'react';
import { MessageCircle, Phone, X, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { generateWhatsAppLink } from '../utils/propertyUtils';

interface FloatingWhatsAppProps {
  customMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ customMessage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultGreeting =
    customMessage ||
    'Assalam-o-Alaikum Deal Land Team. I visited your website and would like information about your properties in Bahria Town Lahore.';

  const whatsAppUrl = generateWhatsAppLink(COMPANY_INFO.whatsappNumber, defaultGreeting);
  const whatsAppAltUrl = generateWhatsAppLink(COMPANY_INFO.whatsappNumberAlt, defaultGreeting);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Quick Contact Popover Dialog */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#101C2C] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#172B45] border border-[#C6A15B] flex items-center justify-center font-serif text-[#C6A15B] font-bold text-xs">
                  DL
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#101C2C]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white leading-tight">
                  Deal Land Advisory
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Authorized Bahria Dealer</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Close contact drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#FAF9F6]">
            <p className="text-xs text-gray-600 leading-relaxed">
              Assalam-o-Alaikum! Connect directly with our Bahria Town Lahore property specialists for verified listings, site visits, or rates.
            </p>

            {/* Primary WhatsApp Action */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-xs shadow-sm transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </div>
              <span className="text-[11px] opacity-90">+92 321 4997657</span>
            </a>

            {/* Secondary WhatsApp / Helpline */}
            <a
              href={whatsAppAltUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-2.5 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl font-medium text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Advisory WhatsApp</span>
              </div>
              <span className="text-[11px] text-gray-500">+92 329 1122233</span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${COMPANY_INFO.primaryPhone.replace(/\s+/g, '')}`}
              className="flex items-center justify-between w-full p-2.5 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl font-medium text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C6A15B]" />
                <span>Call Primary Line</span>
              </div>
              <span className="text-[11px] text-gray-500">{COMPANY_INFO.primaryPhone}</span>
            </a>

            <div className="pt-1 text-[11px] text-center text-gray-400">
              Sector C, Main Boulevard, Bahria Town Lahore
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:block bg-white text-gray-800 px-3 py-1.5 rounded-full shadow-lg border border-gray-100 text-xs font-medium animate-pulse">
            Need Property Advice?
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label={isOpen ? 'Close contact menu' : 'Open WhatsApp and phone contact menu'}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95 border-2 border-white focus:outline-none focus:ring-4 focus:ring-emerald-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7 fill-white" />}
        </button>
      </div>
    </div>
  );
};
