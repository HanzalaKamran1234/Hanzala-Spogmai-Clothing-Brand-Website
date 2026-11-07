"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Heart, Menu, X, User } from "lucide-react";

function NavbarContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, wishlist, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, searchParams]);

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

  const isLinkActive = (href: string) => {
    if (href.includes("?category=")) {
      const [path, query] = href.split("?");
      if (pathname !== path) return false;
      const expectedCategory = new URLSearchParams(query).get("category");
      const currentCategory = searchParams.get("category");
      return currentCategory === expectedCategory;
    }
    if (href === "/shop") {
      return pathname === "/shop" && !searchParams.get("category");
    }
    return pathname === href;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#080808]/95 backdrop-blur-md py-3.5 border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
          : "bg-black/40 backdrop-blur-sm py-4 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LEFT: Text Logo Only (No Icon, No Graphic, Single 'S', breathing space) */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="block py-1 focus:outline-none"
            aria-label="SPOGMAI Homepage"
          >
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-[0.28em] uppercase text-white hover:text-neutral-200 transition-colors">
              SPOGMAI
            </span>
          </Link>
        </div>

        {/* CENTER: Clean, Balanced Desktop Navigation with Active Indicator */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-1.5 text-xs uppercase tracking-[0.18em] transition-all duration-200 ${
                  active
                    ? "text-white font-medium"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <span>{item.name}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white transition-all" />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT: Minimalist Action Controls (Account, Wishlist, Cart, Mobile Toggle) */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Customer Account */}
          <Link
            href="/account"
            className="text-neutral-300 hover:text-white p-1.5 transition-colors"
            aria-label="Account"
            title="My Account"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative text-neutral-300 hover:text-white p-1.5 transition-colors"
            aria-label="Wishlist"
            title="Saved Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 w-3.5 h-3.5 bg-white text-black text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-neutral-300 hover:text-white p-1.5 transition-colors"
            aria-label="Shopping Bag"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-white text-black text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-1.5 hover:text-neutral-300 focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE HEADER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#080808]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-[0.2em] py-3 border-b border-white/5 flex items-center justify-between transition-colors ${
                    active ? "text-white font-semibold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="w-2 h-2 bg-white flex-shrink-0" />
                  )}
                </Link>
              );
            })}

            <div className="pt-4 flex items-center justify-between text-xs uppercase tracking-widest text-neutral-400">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white flex items-center gap-2 py-2"
              >
                <User className="w-4 h-4" />
                <span>My Account</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white flex items-center gap-2 py-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Bag ({cartCount})</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Navbar() {
  return (
    <Suspense
      fallback={
        <nav className="fixed top-0 w-full z-50 bg-[#080808]/95 backdrop-blur-md py-4 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/" className="block py-1 focus:outline-none" aria-label="SPOGMAI Homepage">
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-[0.28em] uppercase text-white">
                  SPOGMAI
                </span>
              </Link>
            </div>
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-400">Shop</span>
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-400">Collections</span>
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-400">Traditional</span>
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-400">Formal Wear</span>
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-400">Size Guide</span>
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-400">Track Order</span>
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-400">About</span>
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-400">Contact</span>
            </div>
            <div className="w-20" />
          </div>
        </nav>
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
