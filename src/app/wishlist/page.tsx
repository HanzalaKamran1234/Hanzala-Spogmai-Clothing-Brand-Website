"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, Share2, Check, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [allMoved, setAllMoved] = useState(false);

  // Map wishlist product IDs to actual products
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    if (wishlistProducts.length === 0) return;
    wishlistProducts.forEach((item) => {
      addToCart(item, item.sizes[0] || "M", item.colors[0]?.name || "Default");
    });
    setAllMoved(true);
    setTimeout(() => setAllMoved(false), 2500);
  };

  const handleShareWishlist = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium">
                Saved Menswear Ensembles
              </span>
            </div>
            <h1 className="text-3xl font-light text-white tracking-tight">
              Your Atelier Wishlist ({wishlistProducts.length})
            </h1>
          </div>

          {wishlistProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleShareWishlist}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs uppercase tracking-wider text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? "Link Copied" : "Share Wishlist"}
              </button>
              <button
                onClick={handleMoveAllToCart}
                className="px-5 py-2 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 shadow-lg"
              >
                {allMoved ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                {allMoved ? "Ensembles Moved" : "Move All To Bag"}
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl p-8 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h2 className="text-xl font-light text-white mb-2">Your Wishlist is Empty</h2>
            <p className="text-xs text-neutral-400 mb-6 font-light">
              Explore our traditional menswear, architectural evening tuxedos, and pure linen shirts to curate your bespoke wardrobe.
            </p>
            <Link
              href="/shop"
              className="px-6 py-3 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              Explore Menswear Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((item) => (
              <div
                key={item.id}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden">
                  <Image
                    src={item.images[0] || ""}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Stock status pill */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase backdrop-blur-md ${
                        item.stockQuantity <= 3
                          ? "bg-amber-500/80 text-black font-semibold"
                          : "bg-black/60 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {item.stockQuantity <= 3 ? `Only ${item.stockQuantity} Left` : "In Stock"}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white/70 hover:text-red-400 hover:bg-black transition-colors backdrop-blur-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                      {item.category}
                    </span>
                    <Link
                      href={`/product/${item.id}`}
                      className="text-sm font-medium text-white hover:text-emerald-400 transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <div className="text-sm font-mono text-white/90 mt-2">
                      PKR {item.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex gap-2">
                    <button
                      onClick={() => addToCart(item, item.sizes[0] || "M", item.colors[0]?.name || "Default")}
                      className="flex-1 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add ({item.sizes[0] || "M"})
                    </button>
                    <Link
                      href={`/product/${item.id}`}
                      className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 text-xs flex items-center justify-center"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
