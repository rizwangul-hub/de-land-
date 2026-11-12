import { Property, PropertyFilterState, InquiryFormData, SellPropertyFormData } from '../types/property';

export function formatPricePKR(amount: number, purpose: 'sale' | 'rent'): string {
  if (purpose === 'rent') {
    if (amount >= 100000) {
      const lakh = amount / 100000;
      const formatted = lakh % 1 === 0 ? lakh.toString() : parseFloat(lakh.toFixed(2)).toString();
      return `PKR ${formatted} Lakh / month`;
    }
    return `PKR ${amount.toLocaleString('en-PK')} / month`;
  }

  // Sale
  if (amount >= 10000000) {
    const crore = amount / 10000000;
    const formatted = crore % 1 === 0 ? crore.toString() : parseFloat(crore.toFixed(2)).toString();
    return `PKR ${formatted} Crore`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    const formatted = lakh % 1 === 0 ? lakh.toString() : parseFloat(lakh.toFixed(2)).toString();
    return `PKR ${formatted} Lakh`;
  }
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function filterProperties(
  properties: Property[],
  filter: Partial<PropertyFilterState>
): Property[] {
  return properties.filter((prop) => {
    // Purpose filter
    if (filter.purpose && filter.purpose !== 'all' && prop.purpose !== filter.purpose) {
      return false;
    }

    // Property Type
    if (filter.type && filter.type !== 'all' && prop.type !== filter.type) {
      return false;
    }

    // Block filter
    if (filter.block && filter.block !== 'all') {
      const normalizedBlock = filter.block.toLowerCase().trim();
      const propBlock = prop.block.toLowerCase().trim();
      if (!propBlock.includes(normalizedBlock) && !prop.location.toLowerCase().includes(normalizedBlock)) {
        return false;
      }
    }

    // Min Price
    if (typeof filter.minPrice === 'number' && filter.minPrice > 0 && prop.price < filter.minPrice) {
      return false;
    }

    // Max Price
    if (typeof filter.maxPrice === 'number' && filter.maxPrice > 0 && prop.price > filter.maxPrice) {
      return false;
    }

    // Min Bedrooms
    if (typeof filter.minBedrooms === 'number' && filter.minBedrooms > 0) {
      if (!prop.bedrooms || prop.bedrooms < filter.minBedrooms) {
        return false;
      }
    }

    // Search query
    if (filter.searchQuery && filter.searchQuery.trim().length > 0) {
      const q = filter.searchQuery.toLowerCase().trim();
      const haystack = `${prop.title} ${prop.location} ${prop.block} ${prop.size} ${prop.categoryTitle} ${prop.description}`.toLowerCase();
      if (!haystack.includes(q)) {
        return false;
      }
    }

    return true;
  });
}

export function sortProperties(
  properties: Property[],
  sortBy: PropertyFilterState['sortBy'] = 'featured'
): Property[] {
  const list = [...properties];
  switch (sortBy) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'newest':
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'featured':
    default:
      return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

export function generateWhatsAppLink(
  phone: string,
  message: string
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function validateInquiryForm(data: InquiryFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = 'Please enter your full name (at least 3 characters)';
  }

  const phoneRegex = /^[0-9+() -]{7,20}$/;
  if (!data.phone || !phoneRegex.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone or WhatsApp number';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.message = 'Please provide a message or inquiry details';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateSellPropertyForm(data: SellPropertyFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.ownerName || data.ownerName.trim().length < 3) {
    errors.ownerName = 'Please enter owner name';
  }

  const phoneRegex = /^[0-9+() -]{7,20}$/;
  if (!data.contactNumber || !phoneRegex.test(data.contactNumber.trim())) {
    errors.contactNumber = 'Please enter a valid contact number';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.propertyType) {
    errors.propertyType = 'Please select property type';
  }

  if (!data.propertyLocation || data.propertyLocation.trim().length < 3) {
    errors.propertyLocation = 'Please specify location / block in Bahria Town';
  }

  if (!data.propertySize || data.propertySize.trim().length < 2) {
    errors.propertySize = 'Please enter property size (e.g. 5 Marla, 10 Marla, 1 Kanal)';
  }

  if (!data.expectedPrice || data.expectedPrice.trim().length < 2) {
    errors.expectedPrice = 'Please enter expected demand / price in PKR';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
