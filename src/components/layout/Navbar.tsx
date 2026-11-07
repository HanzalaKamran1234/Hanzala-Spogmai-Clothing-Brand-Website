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
      setIsScrolled(window.scrollY > 40);
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
    { name: "Traditional Menswear", href: "/shop?category=Traditional+Menswear" },
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
          ? "bg-[#050505]/85 backdrop-blur-md py-4 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
        {/* Brand Logo matching hanzala.online */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent font-serif hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span>SPOGMAI</span>
        </Link>

        {/* Center Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-7">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-white font-semibold drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Action Icons & Pill CTA matching hanzala.online */}
        <div className="flex items-center space-x-3.5 sm:space-x-4">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-gray-300 hover:text-white transition-colors p-1.5"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Customer Account Trigger */}
          <Link
            href="/account"
            className="text-gray-300 hover:text-white transition-colors p-1.5"
            aria-label="Customer Account"
            title="My Account"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Wishlist Trigger */}
          <Link
            href="/wishlist"
            className="relative text-gray-300 hover:text-white transition-colors p-1.5 hidden sm:block"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-gray-300 hover:text-white transition-colors p-1.5"
            aria-label="Cart Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Pill Button matching hanzala.online CTA style */}
          <Link
            href="/shop"
            className="hidden sm:inline-flex px-5 py-2 bg-gradient-to-r from-neutral-200 via-white to-neutral-200 text-black text-xs uppercase tracking-widest font-bold rounded-full hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Shop Now
          </Link>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-1"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu matching hanzala.online */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-gray-800 p-6 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white text-lg font-medium transition-colors flex items-center justify-between py-1 border-b border-white/5"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </Link>
            ))}
            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-300 hover:text-white flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>My Account</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-300 hover:text-white flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Bag ({cartCount})</span>
              </Link>
            </div>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-white text-black text-center text-xs uppercase tracking-widest font-bold rounded-full mt-2"
            >
              Explore Shop
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
