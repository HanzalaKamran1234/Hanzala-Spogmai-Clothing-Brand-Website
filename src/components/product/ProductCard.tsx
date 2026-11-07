"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPKR } from "@/utils/format";
import { useCart } from "@/context/CartContext";
import { Heart, Eye, ShoppingBag, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [added, setAdded] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, product.colors[0]?.name, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 hover:bg-white/10 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 block">
        {/* Primary Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover object-top transition-all duration-700 ${
            isHovered && product.images[1] ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* Secondary Image for Hover Swap */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} back angle`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-top absolute inset-0 transition-all duration-700 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          />
        )}

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-white text-black shadow-md">
              New Arrival
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-black/80 backdrop-blur-md text-white border border-white/20">
              Bestseller
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-red-950/80 backdrop-blur-md text-red-300 border border-red-500/30">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Top Right Wishlist & Quick View Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              isFavorited
                ? "bg-white text-black fill-black"
                : "bg-black/60 text-white/80 hover:text-white hover:bg-black/90 border border-white/10"
            }`}
            title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
            title="Quick preview"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Size Select & Add Overlay on Hover */}
        <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="bg-black/90 backdrop-blur-md border border-white/15 rounded-xl p-2.5 flex flex-col gap-2 shadow-2xl">
            <div className="flex items-center justify-between text-[11px] text-white/60">
              <span>Select Size:</span>
              <span className="text-white font-medium">{selectedSize}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(sz);
                  }}
                  className={`text-[11px] font-medium px-2 py-1 rounded transition-colors ${
                    selectedSize === sz
                      ? "bg-white text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
            <button
              onClick={handleQuickAdd}
              className={`w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                added
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                </>
              )}
            </button>
          </div>
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-white/50 mb-1">
            <span>{product.collection}</span>
            <span>{product.fabric.split(" ")[0]}</span>
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm sm:text-base font-serif font-medium text-white group-hover:text-white/80 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-white/50 line-clamp-1 mt-0.5">{product.subtitle}</p>
        </div>

        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold text-white">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-white/40 line-through">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-medium">
            Cash On Delivery
          </span>
        </div>
      </div>
    </div>
  );
}
