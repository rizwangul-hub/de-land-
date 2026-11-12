import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPricePKR,
  filterProperties,
  sortProperties,
  generateWhatsAppLink,
  validateInquiryForm,
  validateSellPropertyForm,
} from './propertyUtils';
import { Property } from '../types/property';

const dummyProperties: Property[] = [
  {
    id: 'PROP-101',
    slug: '1-kanal-luxury-villa-sector-c',
    title: '1 Kanal Luxury Spanish Villa',
    purpose: 'sale',
    type: 'house',
    categoryTitle: 'Luxury Houses',
    price: 75000000, // 7.5 Crore
    priceDisplay: 'PKR 7.5 Crore',
    location: 'Sector C, Bahria Town Lahore',
    block: 'Sector C',
    size: '1 Kanal',
    bedrooms: 5,
    bathrooms: 6,
    featured: true,
    images: ['/img1.jpg'],
    description: 'Ultra luxury villa in Sector C',
    features: ['Swimming Pool', 'Double Height Lobby'],
    nearbyFacilities: ['Grand Mosque'],
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'PROP-102',
    slug: '10-marla-modern-bungalow-sector-b',
    title: '10 Marla Brand New Bungalow',
    purpose: 'sale',
    type: 'house',
    categoryTitle: 'Luxury Houses',
    price: 38000000, // 3.8 Crore
    priceDisplay: 'PKR 3.8 Crore',
    location: 'Sector B, Bahria Town Lahore',
    block: 'Sector B',
    size: '10 Marla',
    bedrooms: 4,
    bathrooms: 5,
    featured: false,
    images: ['/img2.jpg'],
    description: 'Brand new 10 marla bungalow',
    features: ['Solid Teak Wood Doors'],
    nearbyFacilities: ['Commercial Hub'],
    createdAt: '2026-03-10T12:00:00Z',
  },
  {
    id: 'PROP-103',
    slug: '5-marla-house-for-rent-sector-c',
    title: '5 Marla Designer House for Rent',
    purpose: 'rent',
    type: 'house',
    categoryTitle: 'Rental Properties',
    price: 130000, // 1.3 Lakh / month
    priceDisplay: 'PKR 1.3 Lakh / month',
    location: 'Sector C, Bahria Town Lahore',
    block: 'Sector C',
    size: '5 Marla',
    bedrooms: 3,
    bathrooms: 4,
    featured: true,
    images: ['/img3.jpg'],
    description: 'Fully furnished 5 marla house',
    features: ['Furnished'],
    nearbyFacilities: ['Sector C Market'],
    createdAt: '2026-03-15T09:00:00Z',
  },
  {
    id: 'PROP-104',
    slug: '1-kanal-prime-plot-sector-c',
    title: '1 Kanal Prime Residential Plot',
    purpose: 'sale',
    type: 'plot',
    categoryTitle: 'Residential Plots',
    price: 32000000, // 3.2 Crore
    priceDisplay: 'PKR 3.2 Crore',
    location: 'Sector C, Bahria Town Lahore',
    block: 'Sector C',
    size: '1 Kanal',
    featured: false,
    images: ['/img4.jpg'],
    description: 'Corner plot with park facing',
    features: ['Park Facing', 'Near Main Boulevard'],
    nearbyFacilities: ['Park', 'Mosque'],
    createdAt: '2026-03-20T15:00:00Z',
  },
];

test('formatPricePKR formats Crore, Lakh, and rent accurately', () => {
  assert.equal(formatPricePKR(75000000, 'sale'), 'PKR 7.5 Crore');
  assert.equal(formatPricePKR(80000000, 'sale'), 'PKR 8 Crore');
  assert.equal(formatPricePKR(3500000, 'sale'), 'PKR 35 Lakh');
  assert.equal(formatPricePKR(130000, 'rent'), 'PKR 1.3 Lakh / month');
  assert.equal(formatPricePKR(85000, 'rent'), 'PKR 85,000 / month');
});

test('filterProperties filters by purpose correctly', () => {
  const saleOnly = filterProperties(dummyProperties, { purpose: 'sale' });
  assert.equal(saleOnly.length, 3);
  const rentOnly = filterProperties(dummyProperties, { purpose: 'rent' });
  assert.equal(rentOnly.length, 1);
  assert.equal(rentOnly[0].id, 'PROP-103');
});

test('filterProperties filters by type and block', () => {
  const plots = filterProperties(dummyProperties, { type: 'plot' });
  assert.equal(plots.length, 1);
  assert.equal(plots[0].id, 'PROP-104');

  const sectorB = filterProperties(dummyProperties, { block: 'Sector B' });
  assert.equal(sectorB.length, 1);
  assert.equal(sectorB[0].id, 'PROP-102');
});

test('filterProperties filters by search query', () => {
  const results = filterProperties(dummyProperties, { searchQuery: 'spanish' });
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'PROP-101');
});

test('sortProperties orders by price and newest', () => {
  const priceAsc = sortProperties(dummyProperties, 'price-asc');
  assert.equal(priceAsc[0].id, 'PROP-103'); // 130k
  assert.equal(priceAsc[priceAsc.length - 1].id, 'PROP-101'); // 7.5 Crore

  const newest = sortProperties(dummyProperties, 'newest');
  assert.equal(newest[0].id, 'PROP-104'); // March 20
});

test('generateWhatsAppLink creates valid encoded wa.me URL', () => {
  const url = generateWhatsAppLink('+92 321 4997657', 'Hello Deal Land Team!');
  assert.equal(url, 'https://wa.me/923214997657?text=Hello%20Deal%20Land%20Team!');
});

test('validateInquiryForm checks required fields and formats', () => {
  const invalid = validateInquiryForm({
    fullName: 'A',
    phone: '123',
    email: 'bademail',
    propertyTitle: 'House',
    propertyId: '101',
    message: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);

  const valid = validateInquiryForm({
    fullName: 'Muhammad Ahmad',
    phone: '+92 321 4997657',
    email: 'ahmad@example.com',
    propertyTitle: '1 Kanal Luxury Villa',
    propertyId: 'PROP-101',
    message: 'I am interested in scheduling a site visit.',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('validateSellPropertyForm checks owner submission requirements', () => {
  const invalid = validateSellPropertyForm({
    ownerName: '',
    contactNumber: '',
    email: '',
    propertyType: '',
    propertyLocation: '',
    propertySize: '',
    expectedPrice: '',
    propertyDescription: '',
  });
  assert.equal(invalid.isValid, false);

  const valid = validateSellPropertyForm({
    ownerName: 'Chaudhry Tariq',
    contactNumber: '+92 300 1234567',
    email: 'tariq@gmail.com',
    propertyType: 'house',
    propertyLocation: 'Sector C, Block N, Bahria Town Lahore',
    propertySize: '1 Kanal',
    expectedPrice: 'PKR 8.2 Crore',
    propertyDescription: 'Brand new corner designer house with basement.',
  });
  assert.equal(valid.isValid, true);
});
