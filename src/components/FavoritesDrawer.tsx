import React from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { Property } from '../types/property';
import { IMAGES } from '../assets/images';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ isOpen, onClose }) => {
  const { properties, favorites, toggleFavorite } = usePropertyContext();

  if (!isOpen) return null;

  const favoriteList: Property[] = properties.filter((p) => favorites.includes(p.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Saved properties wishlist"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-[#101C2C] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C6A15B] fill-[#C6A15B]" />
              <h2 className="font-serif font-bold text-lg text-white">
                Saved Properties ({favoriteList.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Close saved properties drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favoriteList.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-800">No properties saved yet</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Click the heart icon on any property card to save it for easy comparison and direct WhatsApp inquiry.
                </p>
                <Link
                  to="/properties"
                  onClick={onClose}
                  className="inline-block mt-2 px-4 py-2 text-xs font-semibold text-[#101C2C] bg-[#C6A15B] rounded-lg hover:bg-[#B38E46] transition-colors"
                >
                  Browse Bahria Listings
                </Link>
              </div>
            ) : (
              favoriteList.map((prop) => (
                <div
                  key={prop.id}
                  className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-200/70 hover:border-[#C6A15B]/50 transition-colors"
                >
                  <img
                    src={prop.images[0] || IMAGES.heroLuxuryVilla}
                    alt={prop.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-lg shrink-0 bg-gray-200"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] text-[#C6A15B] font-semibold uppercase tracking-wider truncate">
                          {prop.categoryTitle} · {prop.size}
                        </span>
                        <button
                          onClick={() => toggleFavorite(prop.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Remove from saved"
                          aria-label={`Remove ${prop.title} from favorites`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <Link
                        to={`/properties/${prop.slug}`}
                        onClick={onClose}
                        className="font-serif font-bold text-sm text-[#101C2C] hover:text-[#C6A15B] transition-colors line-clamp-1"
                      >
                        {prop.title}
                      </Link>
                      <p className="text-xs text-gray-500 truncate">{prop.location}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-serif font-bold text-[#101C2C]">
                        {prop.priceDisplay}
                      </span>
                      <Link
                        to={`/properties/${prop.slug}`}
                        onClick={onClose}
                        className="text-xs text-[#C6A15B] font-medium hover:underline flex items-center gap-0.5"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Action */}
          {favoriteList.length > 0 && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <Link
                to="/contact"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-[#101C2C] hover:bg-[#172B45] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <span>Consult On All Saved Properties</span>
                <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
