"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone, MapPin, Globe } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      } catch {}
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#000000] border-t border-white/10 text-white pt-20 pb-12 relative">
      <div className="container mx-auto px-6 md:px-8">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-white text-black font-serif font-bold text-base flex items-center justify-center">
                S
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif uppercase tracking-[0.25em] font-bold">
                SPOGMAI
              </h3>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
              WEAR THE LEGACY
            </p>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed font-light">
              Sophisticated clothing and fashion retail. Minimalist luxury crafted with pure natural silks, worsted wools, and generational tailoring.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-300 pt-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
              <span>RJ Shopping Mall, Gulshan-e-Jamal, Shop LG-81.</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-mono">
                Private Patron List
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-light text-white">
                Receive private access to new fashion collections & bespoke previews.
              </h4>
            </div>

            <form onSubmit={handleSubscribe} className="mt-6">
              {subscribed ? (
                <div className="border border-white/20 p-3 text-xs text-neutral-300">
                  Welcome to the SPOGMAI private registry.
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-[#0a0a0a] border border-white/20 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10 text-xs">
          {/* Column 1: Collections */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold font-mono">
              Collections
            </h5>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <Link href="/collections/traditional-menswear" className="hover:text-white transition-colors">
                  Traditional Menswear
                </Link>
              </li>
              <li>
                <Link href="/collections/formal-wear" className="hover:text-white transition-colors">
                  Formal Suiting & Tuxedos
                </Link>
              </li>
              <li>
                <Link href="/collections/modern-classics" className="hover:text-white transition-colors">
                  Modern Classics
                </Link>
              </li>
              <li>
                <Link href="/collections/everyday-essentials" className="hover:text-white transition-colors">
                  Pure Irish Linens
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  View All Creations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: The House */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold font-mono">
              The House
            </h5>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About SPOGMAI
                </Link>
              </li>
              <li>
                <Link href="/about#philosophy" className="hover:text-white transition-colors">
                  Sartorial Manifesto
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Bespoke Appointments
                </Link>
              </li>
              <li>
                <a
                  href="https://spogmai.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Globe className="w-3 h-3 text-neutral-400" />
                  <span>spogmai.store</span>
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-neutral-500 hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Services */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold font-mono">
              Client Care
            </h5>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <Link href="/track" className="text-white hover:text-neutral-300 transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition-colors">
                  Men's Size Guide & Calculator
                </Link>
              </li>
              <li>
                <Link href="/returns/request" className="hover:text-white transition-colors">
                  Return & Exchange Portal
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery (Pakistan)
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold font-mono">
              Flagship Boutique
            </h5>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <span className="text-white block font-medium">RJ Shopping Mall</span>
                <span className="text-neutral-400">Gulshan-e-Jamal, Shop LG-81.</span>
              </li>
              <li>
                <a
                  href="https://wa.me/923700349146"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-white hover:text-neutral-300 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp (+92 370 0349146)</span>
                </a>
              </li>
              <li>
                <a href="tel:+923700349146" className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  <span>03700349146</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">Official Channels:</span>
                <div className="flex flex-col space-y-1 text-neutral-400">
                  <a
                    href="https://www.instagram.com/spogmai.store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center justify-between"
                  >
                    <span>Instagram (@spogmai.store)</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@spogmai.store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center justify-between"
                  >
                    <span>TikTok (@spogmai.store)</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-600" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} SPOGMAI. STORE: RJ SHOPPING MALL, GULSHAN-E-JAMAL, SHOP LG-81. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-400">Terms & Conditions</Link>
            <span>spogmai.store</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
