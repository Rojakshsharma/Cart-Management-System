"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ShoppingCart, Search, X } from "lucide-react";
import { useCart } from "@/Context/CartContext";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const { cart, searchTerm, setSearchTerm } = useCart();

  return (
    <nav className="bg-blue-900 px-6 py-[3rem] flex items-center justify-between h-16 relative">
      {/* Logo on left */}
      <Link href="/">
        <div className="text-white font-semibold tracking-widest text-4xl cursor-pointer">
          Logo
        </div>
      </Link>

      {/* Full search bar on larger screens */}
      <div className="hidden sm:flex items-center border-[1px] border-white px-3 py-3 rounded-xl w-1/3 max-w-md">
        <Search size={20} color="white" />
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent placeholder-white text-white font-light outline-none ml-3 flex-grow"
        />
      </div>

      {/* Buttons container on right */}
      <div className="flex items-center space-x-4">
        {/* Search button on small screens */}
        <button
          className="sm:hidden bg-[#14213D] text-white flex items-center space-x-2 px-6 py-3 rounded-xl"
          onClick={() => setShowSearch(!showSearch)}
          aria-label="Toggle search"
        >
          <Search size={24} />
          <span>Search</span>
        </button>

        {/* Cart button */}
        <Link href="/cart">
          <button className="bg-[#14213D] text-white flex items-center space-x-2 px-8 py-3 rounded-xl">
            <ShoppingCart size={24} />
            <span>Cart</span>
            <span className=" bg-white text-indigo-900 rounded-[50%] px-2 text-sm font-semibold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </button>
        </Link>
      </div>

      {/* Search input overlay on small screens, above navbar */}
      <div
        className={`
          absolute right-0 left-0 flex justify-center px-6 z-50
          transition-all duration-300 ease-in-out
          overflow-hidden
          ${showSearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}
        `}
        aria-hidden={!showSearch}
      >
        <div className="bg-blue-900 border-[1px] border-white rounded-xl w-full max-w-md flex items-center px-3 py-3">
          <Search size={20} color="white" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent placeholder-white text-white font-light outline-none ml-3 flex-grow"
          />
          <button
            className="text-white ml-3"
            onClick={() => setShowSearch(false)}
            aria-label="Close search"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
