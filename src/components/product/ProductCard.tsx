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
      className="group relative flex flex-col bg-[#080808] border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300"
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
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-top absolute inset-0 transition-all duration-700 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          />
        )}

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

        {/* Top Minimalist Rectangular Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] bg-white text-black">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] bg-black text-white border border-white/20">
              Signature
            </span>
          )}
        </div>

        {/* Top Right Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 transition-colors ${
              isFavorited
                ? "bg-white text-black"
                : "bg-black/70 text-white/80 hover:text-white border border-white/10"
            }`}
            title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-2 bg-black/70 text-white/80 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Quick preview"
            aria-label="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Size Select & Add Overlay on Hover */}
        <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
          <div className="bg-black/95 border border-white/15 p-2.5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400">
              <span>Size:</span>
              <span className="text-white font-medium">{selectedSize}</span>
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(sz);
                  }}
                  className={`text-[10px] font-medium px-2 py-0.5 transition-colors ${
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
              className="w-full py-2 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
            >
              {added ? (
                <>
                  <Check className="w-3 h-3" /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3" /> Quick Add
                </>
              )}
            </button>
          </div>
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 block mb-1">
            {product.category}
          </span>

          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-serif font-normal text-white group-hover:text-neutral-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">{product.subtitle}</p>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-mono font-medium text-white">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-neutral-500 line-through">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
            COD Available
          </span>
        </div>
      </div>
    </div>
  );
}
