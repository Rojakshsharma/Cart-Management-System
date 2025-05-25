"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import Sidebar from "@/components/Filter";
import ProductGrid from "@/components/productgrid";
import products from "@/assets/cartdata";
import { useCart } from "@/Context/CartContext";

const categoriesList = ["Electronics", "Clothing", "Home", "Others"];
const brandsList = ["Nike", "Samsung", "LG", "Puma"];

function HomeContent() {
  const { searchTerm } = useCart();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryFromUrl = searchParams.get("category");
  const brandFromUrl = searchParams.get("brand");
  const priceFromUrl = searchParams.get("price"); 
  const searchFromUrl = searchParams.get("search");

  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl ? [categoryFromUrl] : []
  );
  const [selectedBrands, setSelectedBrands] = useState(
    brandFromUrl ? [brandFromUrl] : []
  );

  const [minPrice, setMinPrice] = useState(
    priceFromUrl ? priceFromUrl.split("-")[0] : ""
  );
  const [priceRange, setPriceRange] = useState(
    priceFromUrl ? Number(priceFromUrl.split("-")[1]) : 1000
  );

  // Update URL when any filter changes
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories[0]);
    }
    if (selectedBrands.length > 0) {
      params.set("brand", selectedBrands[0]);
    }

    params.set("price", `${minPrice || 0}-${priceRange}`);

    if (searchTerm) {
      params.set("search", searchTerm);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [selectedCategories, selectedBrands, priceRange, minPrice, searchTerm, router, pathname]);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);

      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(p.brand);

      const min = minPrice === "" ? 0 : Number(minPrice);
      const matchesPrice = p.price <= priceRange && p.price >= min;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  }, [priceRange, minPrice, selectedCategories, selectedBrands, searchTerm]);

  // Toggle helpers
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [cat]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [brand]
    );
  };

  return (
    <div className="mx-6 flex">
      <Sidebar
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        categoriesList={categoriesList}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        brandsList={brandsList}
        selectedBrands={selectedBrands}
        toggleBrand={toggleBrand}
      />
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
