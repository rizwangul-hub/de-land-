export interface Property {
  id: string;
  slug: string;
  title: string;
  purpose: 'sale' | 'rent';
  type: 'house' | 'plot' | 'commercial' | 'apartment' | 'building';
  categoryTitle: string;
  price: number; // in PKR
  priceDisplay: string;
  location: string;
  block: string;
  size: string; // e.g. "1 Kanal", "10 Marla", "5 Marla"
  coveredArea?: string;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  featured: boolean;
  isCorner?: boolean;
  images: string[];
  description: string;
  features: string[];
  nearbyFacilities: string[];
  createdAt: string;
}

export interface PropertyFilterState {
  purpose: 'all' | 'sale' | 'rent';
  type: string;
  block: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

export interface InquiryFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyTitle: string;
  propertyId: string;
  message: string;
}

export interface SellPropertyFormData {
  ownerName: string;
  contactNumber: string;
  email: string;
  propertyType: string;
  propertyLocation: string;
  propertySize: string;
  expectedPrice: string;
  propertyDescription: string;
  imagesCount?: number;
}

export interface ConstructionInquiryData {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  estimatedBudget: string;
  projectDescription: string;
}
