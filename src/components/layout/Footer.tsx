"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Mail, Phone, ShieldCheck, Heart } from "lucide-react";

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
      } catch (err) {
        // Fallback gracefully
      }
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-black border-t border-white/10 text-white pt-20 pb-12 relative overflow-hidden">
      {/* Background ambient glow matching hanzala.online */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-5">
            <h3 className="text-3xl sm:text-4xl font-serif uppercase tracking-[0.2em] font-bold">
              SPOGMAI
            </h3>
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed font-light">
              Refined menswear where timeless sophistication meets modern character. Handcrafted in Pakistan with pure natural silks, worsted wools, and generational tailoring.
            </p>
            <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-neutral-400 pt-2">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Cash On Delivery Across Pakistan
              </span>
              <span>•</span>
              <a href="tel:+923700349146" className="hover:text-white transition-colors">
                +92 370 0349146
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-mono">
                Gentlemen's Private List
              </span>
              <h4 className="text-xl sm:text-2xl font-serif text-white">
                Receive private access to new menswear drops & bespoke previews.
              </h4>
            </div>

            <form onSubmit={handleSubscribe} className="mt-6">
              {subscribed ? (
                <div className="bg-white/10 border border-white/20 rounded-full px-6 py-3.5 text-sm text-white flex items-center justify-between">
                  <span>Welcome to the SPOGMAI circle. Check your inbox soon.</span>
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-white/5 border border-white/15 rounded-full px-6 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all duration-200 active:scale-95"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10 text-sm">
          {/* Column 1: Menswear Collections */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold font-mono">
              Menswear Collections
            </h5>
            <ul className="space-y-2.5 text-neutral-400 text-xs">
              <li>
                <Link href="/collections/traditional-menswear" className="hover:text-white transition-colors">
                  Traditional Menswear
                </Link>
              </li>
              <li>
                <Link href="/collections/formal-wear" className="hover:text-white transition-colors">
                  Formal Wear & Suiting
                </Link>
              </li>
              <li>
                <Link href="/collections/modern-classics" className="hover:text-white transition-colors">
                  Modern Classics
                </Link>
              </li>
              <li>
                <Link href="/collections/everyday-essentials" className="hover:text-white transition-colors">
                  Everyday Essentials
                </Link>
              </li>
              <li>
                <Link href="/collections/premium-casualwear" className="hover:text-white transition-colors">
                  Premium Casualwear
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
            <ul className="space-y-2.5 text-neutral-400 text-xs">
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
                <Link href="/about#craft" className="hover:text-white transition-colors">
                  Master Tailoring
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Bespoke Appointments
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-neutral-500 hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Care */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold font-mono">
              Client Care
            </h5>
            <ul className="space-y-2.5 text-neutral-400 text-xs">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery (Pakistan)
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  14-Day Return & Exchange
                </Link>
              </li>
              <li>
                <Link href="/faq#sizing" className="hover:text-white transition-colors">
                  Men's Size Guide & Fitting
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Account & Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact & Socials */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold font-mono">
              Official Contact
            </h5>
            <ul className="space-y-2.5 text-neutral-400 text-xs">
              <li>
                <a
                  href="https://wa.me/923700349146"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-white hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp (+92 370 0349146)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              </li>
              <li>
                <a href="tel:+923700349146" className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-white" />
                  <span>03700349146</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 block mb-1.5">Official Channels:</span>
                <div className="flex flex-col space-y-1 text-xs">
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
                    href="https://www.facebook.com/profile.php?id=61596378237660"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center justify-between"
                  >
                    <span>Facebook Profile</span>
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} SPOGMAI MENSWEAR LTD. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-400">Terms & Conditions</Link>
            <span>Prices displayed in PKR (incl. taxes)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
