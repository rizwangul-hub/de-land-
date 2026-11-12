import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, PropertyFilterState, InquiryFormData, SellPropertyFormData, ConstructionInquiryData } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';

interface PropertyContextType {
  properties: Property[];
  favorites: string[]; // property IDs
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  filterState: PropertyFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<PropertyFilterState>>;
  resetFilters: () => void;
  submitInquiry: (data: InquiryFormData) => Promise<{ success: boolean; message: string }>;
  submitSellProperty: (data: SellPropertyFormData) => Promise<{ success: boolean; message: string }>;
  submitConstructionInquiry: (data: ConstructionInquiryData) => Promise<{ success: boolean; message: string }>;
  userInquiries: InquiryFormData[];
  userSubmissions: SellPropertyFormData[];
}

const defaultFilterState: PropertyFilterState = {
  purpose: 'all',
  type: 'all',
  block: 'all',
  minPrice: 0,
  maxPrice: 0,
  minBedrooms: 0,
  searchQuery: '',
  sortBy: 'featured',
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties] = useState<Property[]>(PROPERTIES_DATA);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('deal_land_favorites');
      return saved ? JSON.parse(saved) : ['DL-BT-101', 'DL-BT-103'];
    } catch {
      return ['DL-BT-101', 'DL-BT-103'];
    }
  });

  const [filterState, setFilterState] = useState<PropertyFilterState>(defaultFilterState);

  const [userInquiries, setUserInquiries] = useState<InquiryFormData[]>(() => {
    try {
      const saved = localStorage.getItem('deal_land_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userSubmissions, setUserSubmissions] = useState<SellPropertyFormData[]>(() => {
    try {
      const saved = localStorage.getItem('deal_land_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deal_land_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('deal_land_inquiries', JSON.stringify(userInquiries));
    } catch (e) {
      console.error(e);
    }
  }, [userInquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('deal_land_submissions', JSON.stringify(userSubmissions));
    } catch (e) {
      console.error(e);
    }
  }, [userSubmissions]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const resetFilters = () => {
    setFilterState(defaultFilterState);
  };

  const submitInquiry = async (data: InquiryFormData) => {
    // Simulated delivery with client-side persistence
    setUserInquiries((prev) => [data, ...prev]);
    return {
      success: true,
      message: `Inquiry recorded for "${data.propertyTitle}". Our Deal Land agent will contact you shortly via WhatsApp / Phone.`,
    };
  };

  const submitSellProperty = async (data: SellPropertyFormData) => {
    setUserSubmissions((prev) => [data, ...prev]);
    return {
      success: true,
      message: `Property listing submitted successfully for ${data.propertySize} in ${data.propertyLocation}! Our listing team will review and verify details.`,
    };
  };

  const submitConstructionInquiry = async (data: ConstructionInquiryData) => {
    return {
      success: true,
      message: `Construction consultation request received for ${data.projectType} in ${data.location}. Our chief architectural engineer will contact you directly.`,
    };
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        favorites,
        toggleFavorite,
        isFavorite,
        filterState,
        setFilterState,
        resetFilters,
        submitInquiry,
        submitSellProperty,
        submitConstructionInquiry,
        userInquiries,
        userSubmissions,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};
