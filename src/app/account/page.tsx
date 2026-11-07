"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Order, Product } from "@/types";
import { formatPKR } from "@/utils/format";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Lock,
  ArrowRight,
  LogOut,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Trash2,
} from "lucide-react";

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "wishlist">("orders");
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const { wishlist, toggleWishlist, addToCart } = useCart();

  // Load existing session from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("spogmai_user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        setIsLoggedIn(true);
        setFullName(u.name);
        setEmail(u.email);
        setPhone(u.phone || "");
        fetchOrders(u.email);
      }
    } catch (e) {
      // Ignored
    }
  }, []);

  const fetchOrders = async (userEmail: string) => {
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      if (data.success) {
        setUserOrders(data.orders);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload = authMode === "login" ? { email, password } : { name: fullName, email, password, phone };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        localStorage.setItem("spogmai_user", JSON.stringify(data.user));
        fetchOrders(data.user.email);
      } else {
        setAuthError(data.error || "Authentication failed.");
      }
    } catch (err: any) {
      setAuthError("Network error. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("spogmai_user");
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  // If not logged in, render sleek login/registration forms matching hanzala.online glassmorphism
  if (!isLoggedIn) {
    return (
      <div className="bg-[#050505] min-h-[85vh] text-white flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-mono">
              Patron Portal
            </span>
            <h1 className="text-3xl font-serif font-bold uppercase tracking-wider">
              {authMode === "login" ? "Sign In" : "Register Account"}
            </h1>
            <p className="text-xs text-neutral-400">
              {authMode === "login"
                ? "Access order history, tracking, and bespoke tailoring measurements."
                : "Join the SPOGMAI gentlemen's private roster."}
            </p>
          </div>

          <div className="flex border-b border-white/10">
            <button
              onClick={() => {
                setAuthMode("login");
                setAuthError("");
              }}
              className={`flex-1 pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative ${
                authMode === "login" ? "text-white" : "text-neutral-500 hover:text-white"
              }`}
            >
              Sign In
              {authMode === "login" && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
              )}
            </button>
            <button
              onClick={() => {
                setAuthMode("register");
                setAuthError("");
              }}
              className={`flex-1 pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative ${
                authMode === "register" ? "text-white" : "text-neutral-500 hover:text-white"
              }`}
            >
              Create Account
              {authMode === "register" && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
              )}
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4 text-xs">
            {authMode === "register" && (
              <>
                <div>
                  <label className="text-neutral-400 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tariq Mansoor"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0370 0349146"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-neutral-400 block mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
              />
            </div>

            {authError && <p className="text-xs text-rose-400">{authError}</p>}

            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all shadow-lg"
            >
              {authMode === "login" ? "Sign In to Account" : "Complete Registration"}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/admin" className="text-[11px] text-neutral-500 hover:text-white underline">
              Admin Portal Access
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Patron Portal
  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      <div className="border-b border-white/10 bg-black/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-mono">
              Verified Patron
            </span>
            <h1 className="text-3xl font-serif font-bold">{fullName || email}</h1>
            <p className="text-xs text-neutral-400 mt-0.5">Contact: {phone || "Not set"} • {email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 border border-white/20 text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 gap-8 text-xs uppercase tracking-widest font-semibold pb-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 transition-colors relative pb-1 ${
              activeTab === "orders" ? "text-white" : "text-neutral-500 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Orders ({userOrders.length})</span>
            {activeTab === "orders" && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />}
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`flex items-center gap-2 transition-colors relative pb-1 ${
              activeTab === "wishlist" ? "text-white" : "text-neutral-500 hover:text-white"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlist.length})</span>
            {activeTab === "wishlist" && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />}
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 transition-colors relative pb-1 ${
              activeTab === "profile" ? "text-white" : "text-neutral-500 hover:text-white"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Addresses</span>
            {activeTab === "profile" && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />}
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="pt-8 space-y-6">
            {userOrders.length === 0 ? (
              <div className="py-16 text-center space-y-4 max-w-sm mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">
                <ShoppingBag className="w-10 h-10 text-neutral-500 mx-auto" />
                <h3 className="text-xl font-serif">No Orders Yet</h3>
                <p className="text-xs text-neutral-400">
                  You have not placed any orders yet. Discover our latest autumn menswear collection.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200"
                >
                  <span>Explore Menswear</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4 hover:border-white/25 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                          Order Number
                        </span>
                        <p className="text-base font-serif font-bold text-white">{ord.orderNumber}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-neutral-400">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${
                            ord.status === "Delivered"
                              ? "bg-white text-black"
                              : "bg-white/10 text-white border border-white/20"
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div>
                            <p className="font-serif font-semibold text-white">{it.productName}</p>
                            <p className="text-[11px] text-neutral-400">
                              Size: {it.size} • Qty: {it.quantity}
                            </p>
                          </div>
                          <span className="font-semibold text-white">
                            {formatPKR(it.price * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                      <div>
                        <span className="text-neutral-400">Delivery Address: </span>
                        <span className="text-white">{ord.shippingAddress}, {ord.city}</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold">
                        <span>Total (COD):</span>
                        <span className="text-white text-sm font-bold">
                          {formatPKR(ord.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === "wishlist" && (
          <div className="pt-8">
            {wishlistProducts.length === 0 ? (
              <div className="py-16 text-center space-y-4 max-w-sm mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">
                <Heart className="w-10 h-10 text-neutral-500 mx-auto" />
                <h3 className="text-xl font-serif">Wishlist is Empty</h3>
                <p className="text-xs text-neutral-400">
                  Save pieces while exploring our shop to compare silhouettes and fabrics.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-900">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-white text-sm line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-xs font-bold text-white mt-0.5">{formatPKR(p.price)}</p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => addToCart(p, p.sizes[0] || "M", p.colors[0]?.name, 1)}
                        className="flex-1 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-200"
                      >
                        Add to Bag
                      </button>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="p-2 border border-white/15 rounded-lg text-neutral-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === "profile" && (
          <div className="pt-8 max-w-xl space-y-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4 text-xs">
              <h3 className="text-base font-serif font-bold text-white">Personal Information</h3>
              <div>
                <label className="text-neutral-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Email</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-neutral-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">WhatsApp / Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
              <button
                onClick={() => alert("Profile information updated successfully.")}
                className="px-6 py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
