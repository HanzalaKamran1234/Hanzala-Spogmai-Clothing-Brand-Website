"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES, COLLECTIONS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import {
  Filter,
  SlidersHorizontal,
  X,
  ChevronDown,
  LayoutGrid,
  Grid3X3,
  Search,
  Sparkles,
} from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialCollection = searchParams.get("collection") || "All";
  const initialFilter = searchParams.get("filter") || "";

  const { wishlist } = useCart();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedSize, setSelectedSize] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "newest" | "price-asc" | "price-desc" | "rating">("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyWishlist, setShowOnlyWishlist] = useState(initialFilter === "wishlist");
  const [showOnlyNew, setShowOnlyNew] = useState(initialFilter === "new");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  // Available Sizes
  const sizes = ["All", "XS", "S", "M", "L", "XL", "Custom"];

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }
      // Collection filter
      if (selectedCollection !== "All" && product.collection !== selectedCollection) {
        return false;
      }
      // Size filter
      if (selectedSize !== "All" && !product.sizes.includes(selectedSize as any)) {
        return false;
      }
      // Wishlist only
      if (showOnlyWishlist && !wishlist.includes(product.id)) {
        return false;
      }
      // New arrivals only
      if (showOnlyNew && !product.isNewArrival) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesFabric = product.fabric.toLowerCase().includes(q);
        const matchesSub = product.subtitle.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesFabric && !matchesSub) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedCollection, selectedSize, showOnlyWishlist, showOnlyNew, searchQuery, sortBy, wishlist]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedCollection("All");
    setSelectedSize("All");
    setSearchQuery("");
    setShowOnlyWishlist(false);
    setShowOnlyNew(false);
    setSortBy("featured");
  };

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedCollection !== "All" ? 1 : 0) +
    (selectedSize !== "All" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (showOnlyWishlist ? 1 : 0) +
    (showOnlyNew ? 1 : 0);

  return (
    <div className="bg-[#050505] min-h-screen pb-24 text-white">
      {/* Shop Header Banner */}
      <div className="border-b border-white/10 bg-black/40 py-12 md:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
            The Complete Menswear Edit
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold uppercase tracking-tight">
            {showOnlyWishlist ? "Saved In Wishlist" : selectedCategory !== "All" ? selectedCategory : "All Menswear"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Discover bespoke prince coats, luxury linen kurta sets, and Italian wool suiting tailored for the modern gentleman.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls Bar: Filter, Categories Pill Bar, Sorting, Grid View */}
        <div className="flex flex-col gap-5 pb-6 border-b border-white/10">
          {/* Top row: Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowOnlyWishlist(false);
                }}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat && !showOnlyWishlist
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => {
                setShowOnlyWishlist(!showOnlyWishlist);
                if (!showOnlyWishlist) setSelectedCategory("All");
              }}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all ${
                showOnlyWishlist
                  ? "bg-white text-black font-semibold"
                  : "bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Wishlist ({wishlist.length})
            </button>
          </div>

          {/* Secondary Controls Bar: Search, Mobile filter drawer toggle, Sort, Grid selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search within shop */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products or fabric..."
                className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              {/* Filter drawer toggle button */}
              <button
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 border transition-all ${
                  activeFiltersCount > 0
                    ? "bg-white/15 border-white text-white"
                    : "bg-white/5 border-white/10 text-neutral-300 hover:text-white"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              {/* Sort Selector */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products by"
                  className="appearance-none bg-white/5 border border-white/10 rounded-full px-4 py-2 pr-8 text-xs text-neutral-300 hover:text-white focus:outline-none focus:border-white cursor-pointer"
                >
                  <option value="featured" className="bg-neutral-900 text-white">Sort: Featured</option>
                  <option value="newest" className="bg-neutral-900 text-white">Sort: Newest</option>
                  <option value="price-asc" className="bg-neutral-900 text-white">Price: Low to High</option>
                  <option value="price-desc" className="bg-neutral-900 text-white">Price: High to Low</option>
                  <option value="rating" className="bg-neutral-900 text-white">Top Rated</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Grid Column Selector (Desktop) */}
              <div className="hidden lg:flex items-center border border-white/10 rounded-full p-0.5 bg-white/5">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded-full transition-colors ${
                    gridCols === 3 ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                  }`}
                  title="3 Columns"
                  aria-label="3 Columns Grid"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded-full transition-colors ${
                    gridCols === 4 ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                  }`}
                  title="4 Columns"
                  aria-label="4 Columns Grid"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
              <span className="text-neutral-400">Active Filters:</span>

              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px]">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")} aria-label="Remove category filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCollection !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px]">
                  Collection: {selectedCollection}
                  <button onClick={() => setSelectedCollection("All")} aria-label="Remove collection filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedSize !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px]">
                  Size: {selectedSize}
                  <button onClick={() => setSelectedSize("All")} aria-label="Remove size filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px]">
                  Query: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} aria-label="Clear search query">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-neutral-400 hover:text-white underline text-[11px] ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Expandable Filter Drawer Panel */}
        {isFilterDrawerOpen && (
          <div className="my-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in">
            {/* Filter by Collection */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                Collections
              </label>
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="All">All Collections</option>
                {COLLECTIONS.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Size */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                Size
              </label>
              <div className="flex gap-1.5 flex-wrap">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      selectedSize === sz
                        ? "bg-white text-black"
                        : "bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by New / Special */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold block">
                Highlights
              </label>
              <div className="flex flex-col gap-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyNew}
                    onChange={(e) => setShowOnlyNew(e.target.checked)}
                    className="rounded bg-black border-white/20 text-white focus:ring-0"
                  />
                  <span>New Arrivals Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyWishlist}
                    onChange={(e) => setShowOnlyWishlist(e.target.checked)}
                    className="rounded bg-black border-white/20 text-white focus:ring-0"
                  />
                  <span>Saved to Wishlist ({wishlist.length})</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Results Count & Product Grid */}
        <div className="pt-6">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
            <span>Showing {filteredProducts.length} handcrafted creations</span>
            <span>All prices listed in PKR (Pakistani Rupee)</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4 bg-white/[0.01] border border-white/5 rounded-3xl">
              <p className="text-xl font-serif text-white">No creations match your selected filters</p>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Try modifying your category, size, or search terms to explore other pieces from the atelier.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-6 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridCols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
              } gap-6 md:gap-8`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white text-sm">
          Loading Atelier Collection...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
