"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { formatPKR } from "@/utils/format";
import { Search, X, ArrowRight, Tag } from "lucide-react";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  const popularSearches = ["Raw Silk Peshwas", "Velvet Kaftan", "Tuxedo Blazer", "Silk Saree", "Irish Linen", "Bespoke Menswear"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative bg-[#0d0d0d] border border-white/15 rounded-3xl max-w-2xl w-full text-white overflow-hidden shadow-2xl z-10">
        {/* Search Input Bar */}
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-white/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product, fabric, collection, or style..."
            autoFocus
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-white/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs uppercase tracking-wider text-white/60 hover:text-white pl-2"
          >
            Esc
          </button>
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="p-6 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-white/40 font-semibold">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3 text-white/40" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 space-y-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-white/50 text-sm">
                No matching couture or luxury pieces found for "{query}".
              </div>
            ) : (
              filteredProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group"
                >
                  <div className="relative w-14 h-18 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-white/50">
                      {p.collection}
                    </span>
                    <h4 className="text-sm font-serif text-white group-hover:text-white/80 truncate">
                      {p.name}
                    </h4>
                    <p className="text-xs font-semibold text-white/90 mt-0.5">
                      {formatPKR(p.price)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
