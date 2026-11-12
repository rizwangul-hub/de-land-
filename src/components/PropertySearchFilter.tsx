import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RotateCcw, Building2, MapPin } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { BAHRIA_BLOCKS } from '../data/properties';

interface PropertySearchFilterProps {
  onSearchComplete?: () => void;
  compact?: boolean;
}

export const PropertySearchFilter: React.FC<PropertySearchFilterProps> = ({
  onSearchComplete,
  compact = false,
}) => {
  const { filterState, setFilterState, resetFilters } = usePropertyContext();
  const navigate = useNavigate();

  const handlePurposeChange = (purpose: 'all' | 'sale' | 'rent') => {
    setFilterState((prev) => ({ ...prev, purpose }));
  };

  const handleTypeChange = (type: string) => {
    setFilterState((prev) => ({ ...prev, type }));
  };

  const handleBlockChange = (block: string) => {
    setFilterState((prev) => ({ ...prev, block }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/properties');
    if (onSearchComplete) {
      onSearchComplete();
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 ${compact ? 'p-4' : 'p-6 sm:p-8'}`}>
      {/* Purpose Segmented Control */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100 flex-wrap gap-3">
        <div className="flex items-center p-1 bg-gray-100 rounded-lg">
          <button
            type="button"
            onClick={() => handlePurposeChange('all')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filterState.purpose === 'all'
                ? 'bg-[#101C2C] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Status
          </button>
          <button
            type="button"
            onClick={() => handlePurposeChange('sale')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filterState.purpose === 'sale'
                ? 'bg-[#101C2C] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Buy Property
          </button>
          <button
            type="button"
            onClick={() => handlePurposeChange('rent')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filterState.purpose === 'rent'
                ? 'bg-[#101C2C] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Rent Property
          </button>
        </div>

        {/* Clear filters action */}
        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#C6A15B] transition-colors"
          title="Reset all search criteria"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <form onSubmit={handleSearchSubmit} className="space-y-4">
        {/* Main Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Keyword Search Input */}
          <div>
            <label htmlFor="searchQuery" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Keyword / Landmark
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="searchQuery"
                type="text"
                placeholder="e.g. 1 Kanal, Corner, Sector C"
                value={filterState.searchQuery}
                onChange={(e) => setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A15B] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Property Type Dropdown */}
          <div>
            <label htmlFor="propertyType" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Property Type
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="propertyType"
                value={filterState.type}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A15B] focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Property Types</option>
                <option value="house">Houses & Luxury Villas</option>
                <option value="plot">Residential Plots</option>
                <option value="building">Commercial Plazas / Buildings</option>
                <option value="apartment">Executive Apartments</option>
                <option value="commercial">Commercial Plots</option>
              </select>
            </div>
          </div>

          {/* Location / Block */}
          <div>
            <label htmlFor="propertyBlock" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Bahria Town Block
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="propertyBlock"
                value={filterState.block}
                onChange={(e) => handleBlockChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A15B] focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Sectors & Blocks</option>
                {BAHRIA_BLOCKS.map((block) => (
                  <option key={block} value={block}>
                    {block}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 px-6 text-sm font-semibold text-[#101C2C] bg-[#C6A15B] hover:bg-[#B38E46] transition-all rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Search className="w-4 h-4" />
              <span>Find Properties</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
