import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Maximize, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { Property } from '../types/property';
import { usePropertyContext } from '../context/PropertyContext';
import { formatPricePKR, generateWhatsAppLink } from '../utils/propertyUtils';
import { COMPANY_INFO } from '../data/company';
import { IMAGES } from '../assets/images';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, viewMode = 'grid' }) => {
  const { isFavorite, toggleFavorite } = usePropertyContext();
  const [imageError, setImageError] = useState(false);
  const favorited = isFavorite(property.id);

  const fallbackImage = IMAGES.heroLuxuryVilla;
  const mainImage = imageError || !property.images[0] ? fallbackImage : property.images[0];

  const whatsAppInquiryUrl = generateWhatsAppLink(
    COMPANY_INFO.whatsappNumber,
    `Assalam-o-Alaikum Deal Land Team. I am interested in "${property.title}" (ID: ${property.id}, Price: ${property.priceDisplay}) located in ${property.location}. Please share full details.`
  );

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-xl border border-gray-200/80 hover:border-[#C6A15B]/50 transition-all duration-300 hover:shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="relative md:w-80 h-56 md:h-auto shrink-0 overflow-hidden bg-gray-100">
          <img
            src={mainImage}
            alt={property.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Discreet Purpose Label */}
          <div className="absolute top-3 left-3 bg-[#101C2C]/90 backdrop-blur-sm text-white px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded">
            For {property.purpose}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(property.id)}
            type="button"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center transition-transform active:scale-90 shadow-sm"
            aria-label={favorited ? `Remove ${property.title} from favorites` : `Save ${property.title} to favorites`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C6A15B] font-semibold uppercase tracking-wider mb-1.5">
              <span>{property.categoryTitle}</span>
              <span aria-hidden="true">·</span>
              <span className="text-gray-500">{property.block}</span>
            </div>

            <Link to={`/properties/${property.slug}`}>
              <h3 className="font-serif font-bold text-lg text-[#101C2C] hover:text-[#C6A15B] transition-colors leading-snug mb-2">
                {property.title}
              </h3>
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
              {property.description}
            </p>

            {/* Unboxed Metadata (Anti-slop zero-pill discipline) */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 py-2 border-t border-b border-gray-100">
              <div className="flex items-center gap-1 font-medium">
                <Maximize className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>{property.size}</span>
              </div>
              {property.bedrooms !== undefined && (
                <div className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{property.bedrooms} Beds</span>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs text-gray-400 block">Demand Price</span>
              <span className="text-xl font-serif font-bold text-[#101C2C] tracking-tight">
                {property.priceDisplay}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsAppInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                title="Instant WhatsApp Inquiry"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <Link
                to={`/properties/${property.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#101C2C] hover:bg-[#172B45] rounded-lg transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Standard)
  return (
    <div className="group bg-white rounded-xl border border-gray-200/80 hover:border-[#C6A15B]/50 transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col h-full">
      {/* Property Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
        <img
          src={mainImage}
          alt={property.title}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-[#101C2C]/90 backdrop-blur-sm text-white px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded">
            For {property.purpose}
          </span>
          {property.featured && (
            <span className="bg-[#C6A15B] text-[#101C2C] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded">
              Featured
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(property.id)}
          type="button"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center transition-transform active:scale-90 shadow-sm"
          aria-label={favorited ? `Remove ${property.title} from favorites` : `Save ${property.title} to favorites`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Bottom Image Gradient & Price */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex items-end justify-between">
          <div>
            <span className="text-[11px] text-gray-300 block uppercase tracking-wider">Demand</span>
            <span className="text-lg font-serif font-bold text-white tracking-tight drop-shadow-sm">
              {property.priceDisplay}
            </span>
          </div>
          <span className="text-xs text-white/90 font-medium">
            {property.size}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed category & block (No pill boxes!) */}
          <div className="flex items-center gap-2 text-xs text-[#C6A15B] font-semibold uppercase tracking-wider mb-1.5">
            <span>{property.categoryTitle}</span>
            <span aria-hidden="true">·</span>
            <span className="text-gray-500">{property.block}</span>
          </div>

          <Link to={`/properties/${property.slug}`}>
            <h3 className="font-serif font-bold text-base text-[#101C2C] hover:text-[#C6A15B] transition-colors leading-snug line-clamp-1 mb-2">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Clean metadata strip */}
          <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-gray-100">
            {property.bedrooms !== undefined ? (
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>{property.bedrooms} Beds</span>
              </div>
            ) : (
              <span className="text-gray-400">Plot Listing</span>
            )}

            {property.bathrooms !== undefined && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 font-medium text-gray-700">
              <Maximize className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{property.size.split(' ')[0]} {property.size.split(' ')[1] || ''}</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-3 flex items-center justify-between gap-2 border-t border-gray-100">
          <a
            href={whatsAppInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            title="Chat about this property on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <Link
            to={`/properties/${property.slug}`}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-[#101C2C] bg-[#FAF9F6] border border-gray-300 hover:border-[#C6A15B] hover:text-[#C6A15B] rounded-lg transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
