"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/utils/format";
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Scissors,
  Star,
  ChevronRight,
  Check,
  Share2,
  Sparkles,
} from "lucide-react";

export default function ProductDetailPage() {
  const routeParams = useParams();
  const productId = routeParams?.id as string;
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  const { addToCart, toggleWishlist, isInWishlist, showToast, setIsCartOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Default");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "fabric" | "shipping">("details");

  const isFavorited = isInWishlist(product.id);

  // Related products from same collection or category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNowCOD = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-white/10 bg-black/40 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs text-neutral-400 gap-2 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-white truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ============ LEFT: IMAGE GALLERY (7 COLS) ============ */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-28 flex-shrink-0 rounded-xl overflow-hidden border transition-all ${
                      selectedImage === idx
                        ? "border-white ring-2 ring-white/20"
                        : "border-white/15 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image Viewport */}
            <div className="flex-1 relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 group shadow-2xl">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNewArrival && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-white text-black shadow-md">
                    New Arrival
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-black/80 backdrop-blur-md text-white border border-white/20">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Image index counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] text-white/80">
                {selectedImage + 1} / {product.images.length}
              </div>
            </div>
          </div>

          {/* ============ RIGHT: DETAILS & ACTIONS (5 COLS) ============ */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
                  {product.category} • {product.collection}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mt-1">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">{product.subtitle}</p>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between py-3 border-y border-white/10">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {formatPKR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-500 line-through">
                      {formatPKR(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-amber-400">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-white ml-1">{product.rating}</span>
                  <span className="text-neutral-500">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Color Palette:</span>
                    <span className="text-white font-medium">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs transition-all ${
                          selectedColor === c.name
                            ? "border-white bg-white/15 text-white"
                            : "border-white/15 bg-white/5 text-neutral-400 hover:text-white"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-white/30"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Select Size:</span>
                  <Link href="/faq#sizing" className="text-neutral-400 hover:text-white underline">
                    Measurement & Size Chart
                  </Link>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all text-center ${
                        selectedSize === sz
                          ? "bg-white text-black font-bold shadow-lg"
                          : "bg-white/5 border border-white/15 text-neutral-300 hover:bg-white/10"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                {selectedSize === "Custom" && (
                  <p className="text-[11px] text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 p-2.5 rounded-xl">
                    Custom order selected: Our master tailor will coordinate with you via WhatsApp after ordering to record your exact bust, waist, hip, and length measurements.
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs text-neutral-400">Quantity:</span>
                <div className="flex items-center border border-white/20 rounded-full px-3 py-1 bg-black">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-neutral-400 hover:text-white px-1 text-sm"
                  >
                    -
                  </button>
                  <span className="text-xs font-semibold px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-neutral-400 hover:text-white px-1 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-4 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      added
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-black hover:bg-neutral-200 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Bag • {formatPKR(product.price * quantity)}
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-4 rounded-full border transition-all ${
                      isFavorited
                        ? "bg-white text-black border-white"
                        : "border-white/20 text-white hover:bg-white/10"
                    }`}
                    title="Save to Wishlist"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                    title="Share Creation"
                    aria-label="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleBuyNowCOD}
                  className="w-full py-3.5 rounded-full border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/30 text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Order with Cash on Delivery</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-white" />
                  <span>Complimentary Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>100% Genuine Artisan Silk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-white" />
                  <span>Bespoke Hand Pleating</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-white" />
                  <span>14-Day Easy Exchange</span>
                </div>
              </div>
            </div>

            {/* Information Tabs */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex gap-4 border-b border-white/10 pb-3 text-xs uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-1 transition-colors relative ${
                    activeTab === "details" ? "text-white font-semibold" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  Details & Craft
                  {activeTab === "details" && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("fabric")}
                  className={`pb-1 transition-colors relative ${
                    activeTab === "fabric" ? "text-white font-semibold" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  Fabric & Care
                  {activeTab === "fabric" && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-1 transition-colors relative ${
                    activeTab === "shipping" ? "text-white font-semibold" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  Delivery & COD
                  {activeTab === "shipping" && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
                  )}
                </button>
              </div>

              <div className="pt-4 text-xs text-neutral-300 leading-relaxed">
                {activeTab === "details" && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-neutral-400">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "fabric" && (
                  <div className="space-y-3">
                    <p>
                      <strong className="text-white">Textile Composition:</strong> {product.fabric}
                    </p>
                    <p className="font-semibold text-white">Care Recommendations:</p>
                    <ul className="list-disc pl-4 space-y-1 text-neutral-400">
                      {product.careInstructions.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="space-y-2">
                    <p>
                      <strong className="text-white">Karachi & Lahore:</strong> 1-2 business days express dispatch.
                    </p>
                    <p>
                      <strong className="text-white">Nationwide Pakistan:</strong> 2-4 business days via verified courier.
                    </p>
                    <p>
                      <strong className="text-white">Payment:</strong> Cash on Delivery available across all cities and towns.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Client Reviews Section */}
        <section className="mt-24 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                Verified Customer Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Client Experiences ({product.reviewsCount})
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span className="text-2xl font-bold text-white">{product.rating}</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span>from 38 verified patrons in Pakistan</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                "The hand-tailored bandhgala collar fits like an Italian bespoke suit. Pure 80g raw silk has a distinct weight and presence that turns heads. Arrived in Lahore within 36 hours via COD."
              </p>
              <div className="text-[11px] text-neutral-400 pt-2 border-t border-white/10">
                <span className="text-white font-medium">Tariq Mansoor</span> • Gulberg, Lahore
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                "Finding minimalist black formalwear in Pakistan that doesn't feel cheap is difficult. SPOGMAI mastered the silhouette. The worsted wool tuxedo drape is world-class."
              </p>
              <div className="text-[11px] text-neutral-400 pt-2 border-t border-white/10">
                <span className="text-white font-medium">Bilal Siddiqui</span> • Clifton, Karachi
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                "Ordered a custom size kurta and prince coat. The atelier called on WhatsApp within an hour to confirm shoulder pitch and sleeve length. Exceptional craftsmanship."
              </p>
              <div className="text-[11px] text-neutral-400 pt-2 border-t border-white/10">
                <span className="text-white font-medium">Hamza Durrani</span> • F-8, Islamabad
              </div>
            </div>
          </div>
        </section>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-white/10">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                  Curated Pairings
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  You May Also Admire
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-widest text-neutral-300 hover:text-white border-b border-white/20 pb-0.5"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
