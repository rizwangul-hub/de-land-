import React, { useState } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  RotateCcw,
  Building2,
  MapPin,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { filterProperties, sortProperties } from '../utils/propertyUtils';
import { PropertyCard } from '../components/PropertyCard';
import { BAHRIA_BLOCKS } from '../data/properties';

export const PropertiesPage: React.FC<{ forcedPurpose?: 'sale' | 'rent'; pageTitle?: string; pageSubtitle?: string }> = ({
  forcedPurpose,
  pageTitle,
  pageSubtitle,
}) => {
  const { properties, filterState, setFilterState, resetFilters } = usePropertyContext();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // If forcedPurpose is set (e.g. from /buy or /rent route)
  const activePurpose = forcedPurpose || filterState.purpose;

  const filtered = filterProperties(properties, {
    ...filterState,
    purpose: activePurpose,
  });

  const sorted = sortProperties(filtered, filterState.sortBy);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1D2733] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest mb-1.5">
            Bahria Town Lahore Marketplace
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#101C2C]">
            {pageTitle || (activePurpose === 'sale' ? 'Properties for Sale' : activePurpose === 'rent' ? 'Properties for Rent' : 'All Verified Properties')}
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl">
            {pageSubtitle || 'Explore transparent, authorized real estate listings in Sector C, Sector B, Sector E, and prime commercial zones of Bahria Town Lahore.'}
          </p>
        </div>

        {/* Toolbar & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search title, sector, marla, landmark..."
                value={filterState.searchQuery}
                onChange={(e) => setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6A15B] focus:border-transparent transition-all"
              />
            </div>

            {/* Quick Segmented Purpose Toggle (if not forced by route) */}
            {!forcedPurpose && (
              <div className="flex items-center p-1 bg-gray-100 rounded-xl shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setFilterState((prev) => ({ ...prev, purpose: 'all' }))}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    activePurpose === 'all'
                      ? 'bg-[#101C2C] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setFilterState((prev) => ({ ...prev, purpose: 'sale' }))}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    activePurpose === 'sale'
                      ? 'bg-[#101C2C] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setFilterState((prev) => ({ ...prev, purpose: 'rent' }))}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    activePurpose === 'rent'
                      ? 'bg-[#101C2C] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Rent
                </button>
              </div>
            )}

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-gray-500 whitespace-nowrap hidden sm:inline">Sort by:</span>
              <div className="relative">
                <select
                  value={filterState.sortBy}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                  className="pl-3 pr-8 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Added</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* View Toggle (Grid vs List) */}
              <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow-xs text-[#101C2C]' : 'text-gray-400 hover:text-gray-700'}`}
                  aria-label="Grid view layout"
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-white shadow-xs text-[#101C2C]' : 'text-gray-400 hover:text-gray-700'}`}
                  aria-label="List view layout"
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden p-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-1.5 text-xs font-medium"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#C6A15B]" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Secondary Filter Row (Property Type, Block, Bedrooms, Reset) */}
          <div className={`${mobileFilterOpen ? 'block' : 'hidden'} lg:block pt-4 border-t border-gray-100`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Type Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Type
                </label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={filterState.type}
                    onChange={(e) => setFilterState((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full pl-8 pr-7 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                  >
                    <option value="all">All Types</option>
                    <option value="house">Houses & Villas</option>
                    <option value="plot">Residential Plots</option>
                    <option value="building">Commercial Plazas</option>
                    <option value="apartment">Apartments</option>
                    <option value="commercial">Commercial Plots</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Block Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Bahria Town Block
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={filterState.block}
                    onChange={(e) => setFilterState((prev) => ({ ...prev, block: e.target.value }))}
                    className="w-full pl-8 pr-7 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                  >
                    <option value="all">All Sectors</option>
                    {BAHRIA_BLOCKS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Min Bedrooms */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Minimum Bedrooms
                </label>
                <div className="relative">
                  <select
                    value={filterState.minBedrooms}
                    onChange={(e) => setFilterState((prev) => ({ ...prev, minBedrooms: Number(e.target.value) }))}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
                  >
                    <option value={0}>Any Bedrooms</option>
                    <option value={2}>2+ Bedrooms</option>
                    <option value={3}>3+ Bedrooms</option>
                    <option value={4}>4+ Bedrooms</option>
                    <option value={5}>5+ Bedrooms</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Reset Action */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-full py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter & Demo Disclaimer Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-xs text-gray-500">
          <div>
            Showing <strong className="text-gray-900">{sorted.length}</strong> verified properties
            {filterState.searchQuery && ` matching "${filterState.searchQuery}"`}
          </div>
          <div className="text-[#C6A15B] font-medium">
            Demo Inventory · Authorized Deal Land Real Estate & Builders
          </div>
        </div>

        {/* Property Grid or Empty State */}
        {sorted.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto my-12 space-y-4">
            <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900">
              No matching properties found
            </h3>
            <p className="text-xs text-gray-500">
              We couldn't find any properties matching your exact criteria. Try broadening your price range, choosing another block, or resetting your filters.
            </p>
            <button
              onClick={resetFilters}
              type="button"
              className="px-5 py-2.5 bg-[#101C2C] text-[#C6A15B] hover:text-white rounded-xl text-xs font-semibold transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }
          >
            {sorted.map((property) => (
              <PropertyCard key={property.id} property={property} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
