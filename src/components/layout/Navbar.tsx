"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, User } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "Traditional", href: "/shop?category=Traditional+Menswear" },
    { name: "Formal Wear", href: "/shop?category=Formal+Wear" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Track Order", href: "/track" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#080808]/95 backdrop-blur-md py-4 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
        {/* Approved SPOGMAI Logo & Stylized S Emblem */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-7 h-7 bg-white text-black font-serif font-bold text-sm flex items-center justify-center transition-transform group-hover:scale-105">
            S
          </span>
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-[0.28em] uppercase text-white">
            SPOGMAI
          </span>
        </Link>

        {/* Center Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-7">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xs uppercase tracking-[0.18em] transition-colors py-1 ${
                  isActive
                    ? "text-white font-semibold border-b border-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Action Icons & Rectangular CTA */}
        <div className="flex items-center space-x-4">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Customer Account Trigger */}
          <Link
            href="/account"
            className="text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Customer Account"
            title="My Account"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Wishlist Trigger */}
          <Link
            href="/wishlist"
            className="relative text-neutral-400 hover:text-white transition-colors p-1 hidden sm:block"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white text-black text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Cart Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white text-black text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Minimal Rectangular Shop Now CTA */}
          <Link
            href="/shop"
            className="hidden sm:inline-flex px-4 py-2 bg-white text-black text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-neutral-200 transition-colors"
          >
            Shop Now
          </Link>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-neutral-300 hover:text-white p-1"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#080808]/98 backdrop-blur-2xl border-b border-white/10 p-6 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-300 hover:text-white text-sm uppercase tracking-widest font-medium transition-colors flex items-center justify-between py-2 border-b border-white/5"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              </Link>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 uppercase tracking-wider">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>My Account</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Bag ({cartCount})</span>
              </Link>
            </div>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-white text-black text-center text-xs uppercase tracking-[0.2em] font-semibold mt-2"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
