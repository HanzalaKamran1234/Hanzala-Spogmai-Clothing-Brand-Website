"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSearch, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Collections', href: '/collections' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="text-primary-text font-heading text-2xl tracking-wider">
          SPOGMAI
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-primary-text font-body">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-accent transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>
        {/* Icons */}
        <div className="flex items-center space-x-4 text-primary-text">
          <button aria-label="Search" className="hover:text-accent transition-colors">
            <FiSearch size={20} />
          </button>
          <button aria-label="Account" className="hover:text-accent transition-colors">
            <FiUser size={20} />
          </button>
          <button aria-label="Wishlist" className="hover:text-accent transition-colors">
            <FiHeart size={20} />
          </button>
          <Link href="/cart" className="relative hover:text-accent transition-colors">
            <FiShoppingBag size={20} />
            {/* Cart count placeholder */}
            <span className="absolute -top-2 -right-2 bg-accent text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
              0
            </span>
          </Link>
          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-primary border-t border-border"
          >
            <nav className="flex flex-col space-y-4 p-4 text-primary-text font-body">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg hover:text-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
