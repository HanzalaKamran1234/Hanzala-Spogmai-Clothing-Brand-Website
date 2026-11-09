"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone, MapPin, Globe, Mail } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=RJ+Shopping+Mall+Gulshan-e-Johar+Shop+LG-81+Karachi+Pakistan";

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
            <h3 className="text-2xl sm:text-3xl font-serif uppercase tracking-[0.25em] font-bold text-white">
              SPOGMAI
            </h3>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
              WEAR THE LEGACY
            </p>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed font-light">
              Sophisticated clothing and fashion retail. Minimalist luxury crafted with pure natural silks, worsted wools, premium cottons, and generational tailoring.
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-white pt-1 transition-colors group"
            >
              <MapPin className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white flex-shrink-0 transition-colors" />
              <span className="underline underline-offset-4">
                RJ Shopping Mall, Gulshan-e-Johar, Shop LG-81, Karachi, Pakistan.
              </span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
            </a>
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
                  Everyday Essentials
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

          {/* Column 4: Location & Official Social Channels */}
          <div className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold font-mono">
              Flagship Boutique
            </h5>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors block"
                >
                  <span className="text-white block font-medium">RJ Shopping Mall</span>
                  <span className="text-neutral-400">Gulshan-e-Johar, Shop LG-81, Karachi, Pakistan.</span>
                </a>
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
                <a
                  href="tel:+923700349146"
                  className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>03700349146</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@spogmai.store"
                  className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>contact@spogmai.store</span>
                </a>
              </li>

              {/* All Three Official Social Media Accounts with Recognizable SVGs & Clickable Links */}
              <li className="pt-3 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 block mb-2 font-mono">
                  Official Channels:
                </span>
                <div className="flex flex-col space-y-2 text-neutral-300">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/spogmai.store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center justify-between group transition-colors"
                    aria-label="Instagram @spogmai.store"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Instagram</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-white transition-colors" />
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61596378237660"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center justify-between group transition-colors"
                    aria-label="Facebook Profile"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                      </svg>
                      <span>Facebook</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-white transition-colors" />
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@spogmai.store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center justify-between group transition-colors"
                    aria-label="TikTok @spogmai.store"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                      <span>TikTok</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            © {new Date().getFullYear()} SPOGMAI. STORE:{" "}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
            >
              RJ SHOPPING MALL, GULSHAN-E-JOHAR, SHOP LG-81, KARACHI, PAKISTAN.
            </a>{" "}
            ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-neutral-400">
              Terms & Conditions
            </Link>
            <span>spogmai.store</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
