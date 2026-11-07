"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, COLLECTIONS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Scissors,
  CheckCircle2,
  ChevronRight,
  MapPin,
} from "lucide-react";

export default function HomePage() {
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="relative overflow-hidden bg-[#080808] text-white">
      {/* =========================================================================
          HERO SECTION — Master Brand Identity: Minimalist Luxury Editorial
          ========================================================================= */}
      <section className="relative min-h-[92dvh] flex items-center pt-28 pb-16 overflow-hidden border-b border-white/10">
        <div className="container mx-auto px-6 md:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Typography, Tagline, Primary/Secondary Rectangular CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Brand Tagline Badge */}
              <div className="inline-flex items-center space-x-3 border border-white/20 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.25em] text-neutral-300">
                <span>SPOGMAI ATELIER</span>
                <span className="w-1 h-1 bg-white"></span>
                <span>EST. PAKISTAN</span>
              </div>

              {/* Exact Main Headline */}
              <div className="space-y-2">
                <h2 className="text-sm uppercase tracking-[0.35em] text-neutral-400 font-medium">
                  SPOGMAI
                </h2>
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-light leading-[1.02] tracking-tight uppercase text-white">
                  WEAR THE <br />
                  <span className="font-normal italic">LEGACY.</span>
                </h1>
              </div>

              {/* Exact Description */}
              <p className="text-base md:text-lg text-neutral-400 max-w-lg leading-relaxed font-light">
                Discover timeless style. Explore the collection. Exceptional fabrics, master tailoring, and architectural silhouettes engineered for distinction.
              </p>

              {/* Action Buttons row: Pure Black/White Minimal Rectangular Shape */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/collections"
                  className="px-8 py-3.5 border border-white/30 text-white text-xs font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                >
                  <span>EXPLORE COLLECTION</span>
                </Link>
              </div>

              {/* Physical Boutique & Sourcing Footnote */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=RJ+Shopping+Mall+Gulshan-e-Johar+Shop+LG-81+Karachi+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <MapPin className="w-3.5 h-3.5 text-white flex-shrink-0" />
                  <span className="underline underline-offset-4">
                    RJ Shopping Mall, Gulshan-e-Johar, Shop LG-81, Karachi, Pakistan.
                  </span>
                </a>
                <div>•</div>
                <div>Cash on Delivery Nationwide</div>
              </div>
            </div>

            {/* Right Column: Clean Studio Product Photography Showcase (No Human Models) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative z-10 border border-white/15 w-full max-w-[min(26rem,92vw)] mx-auto aspect-[3/4] bg-neutral-900 overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop"
                  alt="SPOGMAI Signature Sartorial Formal Shirt"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur-md border border-white/10 text-xs">
                  <div className="font-serif text-white tracking-wider uppercase text-sm">
                    Tailored Poplin Shirt
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-0.5">
                    100% Egyptian Giza Cotton • Studio Flat Lay
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED COLLECTIONS GRID
          ========================================================================= */}
      <section className="py-24 border-b border-white/10">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
                Curated Categories
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-white mt-1">
                Fashion Collections
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-white flex items-center gap-1.5"
            >
              <span>View All Collections</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLLECTIONS.slice(0, 3).map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/10 flex flex-col justify-end p-6"
              >
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                    {col.subtitle}
                  </span>
                  <h3 className="text-xl font-serif text-white group-hover:text-neutral-200 transition-colors">
                    {col.title}
                  </h3>
                  <div className="pt-2 text-xs uppercase tracking-[0.2em] text-white flex items-center gap-1.5 font-medium">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEST SELLERS & NEW ARRIVALS SHOWCASE
          ========================================================================= */}
      <section className="py-24 border-b border-white/10">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
                Atelier Signature Pieces
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-white mt-1">
                Featured Creations
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-white flex items-center gap-1.5"
            >
              <span>Explore All Garments</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SARTORIAL MANIFESTO & PHYSICAL BOUTIQUE
          ========================================================================= */}
      <section className="py-24 border-b border-white/10 bg-[#000000]">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-mono">
            Sartorial Manifesto
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-white leading-tight">
            Crafted for Men. <br />
            Designed to Last.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light max-w-2xl mx-auto">
            SPOGMAI exists at the intersection of generational South Asian needlework and sharp European tailoring discipline. Every garment is cut from pure natural fibers—merino wools, Mongolian cashmere, raw mulberry silk, and imported Irish linen.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/about"
              className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-200 transition-colors"
            >
              Discover Our Story
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-white/30 text-white text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
            >
              Visit Flagship Boutique
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
