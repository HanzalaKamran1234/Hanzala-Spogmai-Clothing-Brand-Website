"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/utils/format";
import { X, Heart, ShoppingBag, ShieldCheck, Truck, Star, ArrowRight } from "lucide-react";

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || product.sizes[0] || "M";
  const isFavorited = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, currentSize, product.colors[0]?.name, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative bg-[#0c0c0c] border border-white/15 rounded-3xl max-w-4xl w-full text-white overflow-hidden shadow-2xl z-10 my-8">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/70 hover:text-white hover:bg-black transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images Column */}
          <div className="p-6 flex flex-col gap-3 bg-black/40">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-900">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border transition-all ${
                      selectedImageIndex === idx ? "border-white" : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                  {product.category} • {product.collection}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                  {product.name}
                </h2>
                <p className="text-xs text-white/60 mt-1">{product.subtitle}</p>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between py-2 border-y border-white/10">
                <div className="flex items-baseline gap-3">
                  <span className="text-xl font-bold text-white">{formatPKR(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-white/40 line-through">
                      {formatPKR(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span className="font-semibold text-white">{product.rating}</span>
                  <span className="text-white/40">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/70">Select Size:</span>
                  <Link
                    href="/size-guide"
                    onClick={() => setQuickViewProduct(null)}
                    className="text-white/50 hover:text-white underline"
                  >
                    Size Guide
                  </Link>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all ${
                        currentSize === sz
                          ? "bg-white text-black"
                          : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs text-white/70">Quantity:</span>
                <div className="flex items-center border border-white/20 px-3 py-1 bg-black">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-white/60 hover:text-white px-1 text-sm"
                  >
                    -
                  </button>
                  <span className="text-xs font-medium px-3">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-white/60 hover:text-white px-1 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • {formatPKR(product.price * quantity)}</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 border border-white/20 transition-colors ${
                    isFavorited ? "bg-white text-black" : "text-white hover:bg-white/10"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/50 pt-1">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-white" /> Free delivery across Pakistan
                </span>
                <Link
                  href={`/product/${product.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-white hover:underline flex items-center gap-1"
                >
                  <span>Full product details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
