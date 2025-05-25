"use client";
import React, { useState } from "react";

export default function Sidebar({
  priceRange,
  setPriceRange,
  minPrice,
  setMinPrice,
  categoriesList,
  selectedCategories,
  toggleCategory,
  brandsList,
  selectedBrands,
  toggleBrand,
}) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <>
      <div className="p-2 mt-7 sm:hidden">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="bg-blue-900 text-white py-2 px-2 text-[12px] rounded-xl"
        >
          Apply Filters
        </button>
      </div>

      {/* Overlay */}
      {showMobileFilters && (
        <div
          onClick={() => setShowMobileFilters(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}

      {/* Sliding Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white z-50 p-4 space-y-4
          w-4/5 max-w-sm
          transform transition-transform duration-300 ease-in-out
          ${showMobileFilters ? "translate-x-0" : "-translate-x-full"}
          sm:hidden
        `}
      >
        <button
          onClick={() => setShowMobileFilters(false)}
          className="text-gray-700 mb-4"
        >
          Close ✕
        </button>

        {/* Filters content */}
        <div className="bg-blue-900 text-white rounded-xl p-4 space-y-4 shadow-md">
          <h2 className="text-xl font-bold">Filters</h2>
          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <div className="space-y-2">
              {categoriesList.map((item, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(item)}
                    onChange={() => toggleCategory(item)}
                    className="appearance-none w-4 h-4 rounded-full bg-blue-900 border border-white/40 checked:border-2 checked:border-white transition-all"
                  />
                  <span className="text-white">{item}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Price</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-white 
                [&::-webkit-slider-thumb]:border-2 
                [&::-webkit-slider-thumb]:border-blue-900 
                [&::-moz-range-thumb]:bg-white"
            />
            <p className="text-sm mt-1 text-white">Up to ₹{priceRange}</p>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="bg-gray-100 rounded-xl p-4 space-y-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Brand Filter</h3>
          <div className="space-y-2 text-sm text-gray-700">
            {brandsList.map((brand) => (
              <label key={brand} className="block">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="mr-2"
                />
                {brand}
              </label>
            ))}
          </div>
          {/* Min Price Input */}
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <div className="hidden sm:block w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-4 space-y-4">
        {/* Blue Filter Box */}
        <div className="bg-blue-900 text-white rounded-xl p-4 space-y-4 shadow-md">
          <h2 className="text-xl font-bold">Filters</h2>

          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <div className="space-y-2">
              {categoriesList.map((item, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(item)}
                    onChange={() => toggleCategory(item)}
                    className="appearance-none w-4 h-4 rounded-full bg-blue-900 border border-white/40 checked:border-2 checked:border-white transition-all"
                  />
                  <span className="text-white">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Price</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-white 
                [&::-webkit-slider-thumb]:border-2 
                [&::-webkit-slider-thumb]:border-blue-900 
                [&::-moz-range-thumb]:bg-white"
            />
            <p className="text-sm mt-1 text-white">Up to ₹{priceRange}</p>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="bg-gray-100 rounded-xl p-4 space-y-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">Brand Filter</h3>
          <div className="space-y-2 text-sm text-gray-700">
            {brandsList.map((brand) => (
              <label key={brand} className="block">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="mr-2"
                />
                {brand}
              </label>
            ))}
          </div>
          {/* Min Price Input */}
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
