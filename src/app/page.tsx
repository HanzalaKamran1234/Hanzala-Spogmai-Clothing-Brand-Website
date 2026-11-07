"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, COLLECTIONS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Scissors,
  CheckCircle2,
  Star,
  ChevronRight,
  MessageCircle,
  Clock,
  Mail,
  Phone,
  Feather,
  Layers,
} from "lucide-react";

export default function HomePage() {
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  const processSteps = [
    {
      num: "01",
      title: "Textile Sourcing",
      desc: "Pure 80g raw silk, imported Irish linen, Italian worsted suiting, and authentic cashmere hand-selected from master mills.",
      icon: Feather,
    },
    {
      num: "02",
      title: "Architectural Drafting",
      desc: "Masculine silhouettes drafted with millimeter precision to structure the chest, sharpen shoulders, and command presence.",
      icon: Scissors,
    },
    {
      num: "03",
      title: "Master Handwork",
      desc: "Up to 180 hours of hand-guided zardozi, antique tilla, and canvas structuring by generational karigars.",
      icon: Sparkles,
    },
    {
      num: "04",
      title: "Doorstep Delivery",
      desc: "Delivered directly across Karachi, Lahore, Islamabad, and nationwide Pakistan with 100% Cash on Delivery.",
      icon: Truck,
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#050505] text-white">
      {/* Background Ambient Glow Orbs directly mirroring hanzala.online */}
      <div className="hidden md:block fixed top-0 left-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-neutral-800/15 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-neutral-700/10 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* =========================================================================
          HERO SECTION — Exact user headline & supporting text with hanzala.online layout
          ========================================================================= */}
      <section className="relative min-h-[96dvh] flex items-center pt-28 pb-16 overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Typography, Badge, Buttons & Tags */}
            <div className="lg:col-span-7 space-y-6">
              {/* Supporting Headline as Status Pill Badge with Ping dot */}
              <div className="inline-flex items-center space-x-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                </span>
                <span className="text-sm text-gray-300 font-medium">
                  Crafted for Men. Designed to Last.
                </span>
              </div>

              {/* Exact Main Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-[1.04] tracking-tight uppercase font-serif">
                WEAR THE{" "}
                <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                  LEGACY.
                </span>
              </h1>

              {/* Exact Description */}
              <p className="text-base md:text-xl text-gray-400 max-w-xl leading-relaxed font-light">
                Discover refined menswear where timeless sophistication meets modern character. Exceptional fabrics, impeccable details, and a distinctive presence in every piece.
              </p>

              {/* Action Buttons row (exact CTA text from prompt) */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.8)] hover:bg-neutral-200 flex items-center justify-center text-center gap-2 group"
                >
                  <span>SHOP THE COLLECTION</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/about"
                  className="w-full sm:w-auto px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-colors backdrop-blur-sm flex items-center justify-center text-center text-xs uppercase tracking-widest text-white font-medium"
                >
                  EXPLORE OUR STORY
                </Link>
              </div>

              {/* Feature Tags row */}
              <div className="flex items-center gap-6 md:gap-8 pt-4 md:pt-6 text-gray-400 flex-wrap text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Pure Raw Silk & Worsted Wool</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-white" />
                  <span>Bespoke Tailoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-white">Cash on Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Showcase Card with Rotating Concentric Orbit Rings & Male Model */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Animated Rotating Rings from hanzala.online */}
              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/10 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />

              {/* Glassmorphic Central Card with MALE FASHION MODEL */}
              <div className="relative z-10 border border-white/10 bg-white/5 backdrop-blur-md w-full max-w-[min(26rem,92vw)] mx-auto rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop"
                  alt="SPOGMAI Signature Menswear Campaign"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Pill Badges anchored to card */}
                <div className="absolute left-3 top-8 bg-black/90 border border-white/20 rounded-full py-1.5 px-3.5 shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20 flex items-center gap-1.5 text-xs text-white">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Pure 80g Raw Silk</span>
                </div>

                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/90 border border-white/20 rounded-full py-1.5 px-3.5 shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20 flex items-center gap-1.5 text-xs text-white">
                  <Scissors className="w-3.5 h-3.5 text-white" />
                  <span>Hand Zardozi Work</span>
                </div>

                <div className="absolute left-3 bottom-8 bg-black/90 border border-emerald-500/40 rounded-full py-1.5 px-3.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] z-20 flex items-center gap-1.5 text-xs text-emerald-300">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cash on Delivery Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MARQUEE BANNER — Infinite smooth scrolling ticker
          ========================================================================= */}
      <section className="py-8 border-y border-white/5 bg-black/50 overflow-hidden relative">
        <div className="flex w-fit whitespace-nowrap animate-marquee items-center gap-12 text-xs uppercase tracking-[0.25em] text-neutral-400">
          {[
            "PREMIUM MENSWEAR",
            "PURE 80G RAW SILK",
            "ITALIAN SUITING WOOL",
            "CASH ON DELIVERY ACROSS PAKISTAN",
            "14-DAY EASY EXCHANGE",
            "BESPOKE BANDHGALA PRINCE COATS",
            "PURE IRISH LINEN KURTA SETS",
            "NATIONWIDE EXPRESS SHIPPING",
            "PREMIUM MENSWEAR",
            "PURE 80G RAW SILK",
            "ITALIAN SUITING WOOL",
            "CASH ON DELIVERY ACROSS PAKISTAN",
            "14-DAY EASY EXCHANGE",
            "BESPOKE BANDHGALA PRINCE COATS",
            "PURE IRISH LINEN KURTA SETS",
            "NATIONWIDE EXPRESS SHIPPING",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              <span className="hover:text-white transition-colors cursor-default">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          STATS COUNTER SECTION
          ========================================================================= */}
      <section className="py-20 bg-black/30 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <p className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 font-serif">
                100%
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Pure Grade Natural Fabrics</p>
            </div>

            <div className="group">
              <p className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 font-serif">
                1,400+
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Gentlemen Styled</p>
            </div>

            <div className="group">
              <p className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 font-serif">
                4.9 / 5
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Client Satisfaction</p>
            </div>

            <div className="group">
              <p className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 font-serif">
                48 Hrs
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Nationwide Dispatch</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MEN'S COLLECTIONS SECTION
          ========================================================================= */}
      <section className="py-24 container mx-auto px-6 md:px-8" id="collections">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Curated <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent font-serif">Menswear</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light">
            Distinctive capsules crafted for the modern gentleman who values architectural tailoring, pure fabrics, and lasting character.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.map((col, index) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-white/30 transition-all group relative overflow-hidden h-full flex flex-col justify-between"
            >
              {/* Subtle card glow overlay on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full blur-[40px] pointer-events-none group-hover:bg-white/[0.08] transition-colors" />

              <div>
                <div className="mb-6 p-3 bg-black border border-white/10 rounded-xl w-fit group-hover:border-white/30 transition-colors">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>

                <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 block mb-2 font-mono">
                  Capsule 0{index + 1}
                </span>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 font-serif">
                  {col.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-3">
                  {col.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 group-hover:text-white transition-colors">
                <span>{col.itemCount} Designs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          NEW ARRIVALS PRODUCT GRID — All Men's Products
          ========================================================================= */}
      <section className="py-20 bg-black/40 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-3 text-xs text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Autumn / Winter Men's Selection</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white font-serif">
                New Arrivals
              </h2>
            </div>

            <Link
              href="/shop?filter=new"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-300 hover:text-white group border-b border-white/20 pb-1"
            >
              <span>View All Releases</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          OUR PROCESS SECTION
          ========================================================================= */}
      <section className="py-24 container mx-auto px-6 md:px-8">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent font-serif">Process</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light">
            How we take raw textile from master looms to your tailored wardrobe with discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-white/30 transition-all group relative overflow-hidden h-full flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 p-3 bg-black border border-white/10 rounded-xl w-fit group-hover:border-white/30 transition-colors">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono text-gray-500 mb-1 block">Step {step.num}</span>
                  <h3 className="text-lg font-bold text-white mb-2 font-serif">{step.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{step.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 text-[10px] uppercase tracking-wider text-gray-500">
                  Strict Sartorial Standard
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          ATELIER SPOTLIGHT — Male Sartorial Director
          ========================================================================= */}
      <section className="py-20 container mx-auto px-6 md:px-8">
        <div className="relative z-10 rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-14 border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.04] rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neutral-800/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Male Director Avatar */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-white via-neutral-300 to-neutral-700 p-1 mb-4 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop"
                    alt="SPOGMAI Sartorial Director"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white font-serif">SPOGMAI Sartorial Atelier</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Master Menswear Tailoring</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Rawalpindi & Lahore Studios</span>
              </div>
            </div>

            {/* Right narrative & badges */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400 font-mono">
                The Sartorial Manifesto
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white">
                "We craft menswear for the man who understands that true power whispers through the discipline of his tailoring."
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed font-light">
                Every SPOGMAI garment begins on master looms with unadulterated natural fibers. Our pattern-makers calibrate shoulder pitch, chest canvas, and waist suppression to deliver effortless authority and poise.
              </p>

              <div className="flex flex-wrap gap-3 pt-3">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  100% In-House Master Tailors
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  Bespoke Body Measurements
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  Cash On Delivery Across Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEST SELLERS SECTION
          ========================================================================= */}
      <section className="py-20 bg-black/40 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400 font-mono">
                Gentlemen's Favorites
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white font-serif mt-1">
                Best Sellers
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-300 hover:text-white group border-b border-white/20 pb-1"
            >
              <span>Explore All Products</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONSULTATION & CONTACT SECTION — with official contact info
          ========================================================================= */}
      <section className="py-24 container mx-auto px-6 md:px-8" id="contact">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Book A <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent font-serif">Consultation</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light">
            Need custom tailoring measurements, bespoke suiting advice, or order tracking? Connect with our master stylists directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Official Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black border border-white/10 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-serif">WhatsApp Concierge</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Direct line to our bespoke team</p>
                </div>
              </div>
              <div className="mt-5">
                <a
                  href="https://wa.me/923700349146"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2"
                >
                  <span>Chat on WhatsApp (+92 370 0349146)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/30 transition-all space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black border border-white/10 rounded-xl">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Official Telephone</h4>
                  <a href="tel:+923700349146" className="text-xs text-gray-300 hover:text-white transition-colors">
                    03700349146 / +92 370 0349146
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                <div className="p-3 bg-black border border-white/10 rounded-xl">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Atelier Hours</h4>
                  <p className="text-xs text-gray-400">Monday — Saturday: 10:00 AM – 8:00 PM PKT</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <p className="text-xs text-gray-400 mb-2">Connect on Official Socials:</p>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <a
                    href="https://www.instagram.com/spogmai.store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    Instagram
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.facebook.com/profile.php?id=61596378237660"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    Facebook
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.tiktok.com/@spogmai.store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Minimalist Consultation Form */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">
            <h3 className="text-xl font-bold font-serif text-white mb-2">Request Bespoke Consultation</h3>
            <p className="text-xs text-gray-400 mb-6">Leave your details and our head tailor will coordinate with you via WhatsApp.</p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Khan"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0370 0349146"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">City in Pakistan</label>
                <select className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white">
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Quetta">Quetta</option>
                  <option value="Other">Other Nationwide City</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Bespoke Requirements / Event Date</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Prince coat, wedding bandhgala, tuxedo, or custom measurements..."
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Thank you! Your consultation request has been received. Our team will contact you on WhatsApp (+92 370 0349146) shortly.");
                }}
                className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                Transmit Consultation Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
