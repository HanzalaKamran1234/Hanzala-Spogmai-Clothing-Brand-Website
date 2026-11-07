"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, PackageCheck, Truck, CheckCircle2, AlertCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Order } from "@/types";

export default function OrderTrackingPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check URL params for prefilled query (e.g. /track?order=SPOG-784210)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const prefill = urlParams.get("order") || urlParams.get("phone");
      if (prefill) {
        setQuery(prefill);
        executeSearch(prefill);
      }
    }
  }, []);

  const executeSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/track?query=${encodeURIComponent(searchTerm.trim())}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setOrders(data.orders);
      } else {
        setError(data.error || "No order found matching that reference.");
        setOrders(null);
      }
    } catch {
      setError("Network error while searching for your order.");
      setOrders(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-emerald-400 mb-4">
            <PackageCheck className="w-3.5 h-3.5" />
            Atelier Dispatch & Logistics
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-3">
            Track Your SPOGMAI Order
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm font-light">
            Enter your 6-digit Order Reference (e.g. <span className="text-white font-mono">SPOG-784210</span>) or your registered Pakistani Mobile Number.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. SPOG-784210 or 0300 1234567"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-28 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
            />
            <Search className="absolute left-4 w-5 h-5 text-white/40" />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 px-5 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {loading ? "Locating..." : "Track"}
            </button>
          </div>
        </form>

        {/* Error message */}
        {error && (
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3 mb-8">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>{error}</div>
          </div>
        )}

        {/* Results */}
        {orders && orders.length > 0 && (
          <div className="space-y-8 animate-fade-in">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-light text-white tracking-wide font-mono">
                        #{order.orderNumber}
                      </h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider ${
                        order.status === "Delivered"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : order.status === "Cancelled"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-1">
                      Placed on {new Date(order.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>

                  {/* WhatsApp Help */}
                  <a
                    href={`https://wa.me/923700349146?text=${encodeURIComponent(
                      `Salaam, I am inquiring about the status of SPOGMAI Order #${order.orderNumber}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Inquire with Concierge on WhatsApp
                  </a>
                </div>

                {/* Milestone Stepper */}
                <div className="py-8">
                  <h3 className="text-xs uppercase tracking-widest text-white/50 mb-6 font-semibold">
                    Delivery Progress & Milestones
                  </h3>
                  <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                      {[
                        { title: "Order Placed", desc: "Submitted online", icon: PackageCheck, done: true },
                        {
                          title: "COD Verified",
                          desc: order.codVerificationStatus === "Verified" ? "Confirmed via WhatsApp" : "Pending WhatsApp confirmation",
                          icon: CheckCircle2,
                          done: order.codVerificationStatus === "Verified" || ["Processing", "Shipped", "Delivered"].includes(order.status),
                        },
                        {
                          title: "Atelier Tailoring",
                          desc: "Quality inspection & press",
                          icon: PackageCheck,
                          done: ["Processing", "Shipped", "Delivered"].includes(order.status),
                        },
                        {
                          title: "Courier Dispatched",
                          desc: order.courierInfo
                            ? `${order.courierInfo.courierName} (${order.courierInfo.trackingNumber})`
                            : "Preparing parcel dispatch",
                          icon: Truck,
                          done: ["Shipped", "Delivered"].includes(order.status),
                        },
                        {
                          title: "Delivered",
                          desc: order.status === "Delivered" ? "Received by Patron" : "Out for delivery",
                          icon: CheckCircle2,
                          done: order.status === "Delivered",
                        },
                      ].map((step, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border transition-all ${
                            step.done
                              ? "bg-white/10 border-white/20 text-white"
                              : "bg-white/[0.02] border-white/5 text-white/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <step.icon className={`w-5 h-5 ${step.done ? "text-emerald-400" : "text-white/30"}`} />
                            <span className="text-[10px] font-mono text-white/30">0{idx + 1}</span>
                          </div>
                          <div className="text-xs font-semibold text-white mb-0.5">{step.title}</div>
                          <div className="text-[10px] text-white/50 leading-tight">{step.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Courier info card if available */}
                {order.courierInfo && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-emerald-400" />
                      <div>
                        <div className="text-xs text-white font-medium">
                          Active Courier Consignment: <strong className="text-emerald-400">{order.courierInfo.courierName} Logistics</strong>
                        </div>
                        <div className="text-[11px] text-white/60">
                          Tracking CN: <span className="font-mono">{order.courierInfo.trackingNumber}</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={order.courierInfo.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-400 text-black text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-emerald-300 transition-colors inline-flex items-center gap-1.5"
                    >
                      Live Courier Portal <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Ordered Items */}
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4 font-semibold">
                    Garments in this Shipment ({order.items.length})
                  </h3>
                  <div className="divide-y divide-white/5">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0">
                            <Image
                              src={it.productImage || "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=200"}
                              alt={it.productName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-white">{it.productName}</div>
                            <div className="text-[11px] text-white/50">
                              Size: <strong className="text-white/80">{it.size}</strong> • Qty: {it.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-mono text-white/90">
                          PKR {(it.price * it.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Footer */}
                  <div className="border-t border-white/10 pt-4 mt-4 flex flex-col sm:flex-row justify-between text-xs text-white/60 gap-4">
                    <div>
                      <span className="text-white/40 block">Delivery Destination:</span>
                      <span className="text-white">{order.shippingAddress}, {order.city}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white/40 block">Total Due upon Courier Delivery (COD):</span>
                      <span className="text-base font-semibold text-white font-mono">
                        PKR {order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Return Assistance */}
        <div className="mt-16 text-center border-t border-white/10 pt-8 text-xs text-neutral-400">
          <span>Need to exchange your size or request an adjustment?</span>{" "}
          <Link href="/returns/request" className="text-white hover:text-emerald-400 underline font-medium">
            Open Return & Exchange Portal →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
