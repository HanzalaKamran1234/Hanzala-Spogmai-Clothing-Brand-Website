"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/utils/format";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Tag,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    showToast,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmountServer, setDiscountAmountServer] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Checkout form state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Karachi");
  const [notes, setNotes] = useState("");
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  const freeShippingThreshold = 10000;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 450;
  const discountAmount = discountAmountServer || (cartSubtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Server-side promo validation
  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode, subtotal: cartSubtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setDiscountAmountServer(data.discount);
        setPromoApplied(true);
        showToast(data.message || "Promo voucher applied!");
      } else {
        showToast(data.message || "Invalid voucher code", "info");
      }
    } catch (err) {
      // Fallback
      if (promoCode.trim().toUpperCase() === "SPOGMAI10") {
        setDiscountPercent(10);
        setPromoApplied(true);
        showToast("Voucher SPOGMAI10 applied! 10% discount deducted.");
      } else {
        showToast("Invalid code. Try 'SPOGMAI10' or 'LEGACY5000'", "info");
      }
    }
  };

  // Real server-side order creation
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      showToast("Please provide your name, phone, and complete delivery address.", "info");
      return;
    }

    setSubmittingOrder(true);
    try {
      const orderPayload = {
        customerName: fullName.trim(),
        customerEmail: email ? email.trim() : "customer@spogmai.com",
        customerPhone: phone.trim(),
        shippingAddress: address.trim(),
        city,
        orderNotes: notes,
        items: cart.map((item) => ({
          productId: item.product.id,
          size: item.selectedSize,
          color: item.selectedColor,
          quantity: item.quantity,
        })),
        couponCode: promoApplied ? promoCode : undefined,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (data.success) {
        setOrderComplete(data.order);
        clearCart();
      } else {
        showToast(data.error || "Order placement failed.", "info");
      }
    } catch (err) {
      showToast("Failed to place order. Please try again.", "info");
    } finally {
      setSubmittingOrder(false);
    }
  };

  // Order Complete Confirmation Screen
  if (orderComplete) {
    return (
      <div className="bg-[#050505] min-h-[85vh] flex items-center justify-center px-4 py-20 text-white">
        <div className="max-w-md w-full bg-[#0c0c0c] border border-white/15 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 font-semibold font-mono">
              Cash on Delivery Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold">
              Thank You, {orderComplete.customerName}
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Your bespoke menswear order has been registered in our database. Our team will verify your measurements via WhatsApp (+92 370 0349146) before dispatch.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-left space-y-2.5">
            <div className="flex justify-between">
              <span className="text-neutral-500">Order Reference:</span>
              <span className="text-white font-mono font-bold">{orderComplete.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Payment Method:</span>
              <span className="text-white">Cash on Delivery (COD)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Delivery Destination:</span>
              <span className="text-white">{orderComplete.city}, Pakistan</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 font-semibold">
              <span className="text-neutral-300">Amount Payable at Door:</span>
              <span className="text-emerald-400 text-sm font-bold">
                {formatPKR(orderComplete.total)}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href={`https://wa.me/923700349146?text=Hello%20SPOGMAI%20Concierge%2C%20I%20placed%20order%20${orderComplete.orderNumber}%20and%20would%20like%20to%20confirm.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs uppercase tracking-widest font-bold rounded-full transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>

            <Link
              href="/shop"
              className="w-full py-3 bg-white/10 text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-white/20 transition-colors block"
            >
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 py-12 text-center space-y-2">
        <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
          Gentlemen's Shopping Bag
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold uppercase tracking-tight">
          Your Curated Selection
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {cart.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-500">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif">Your bag is currently empty</h2>
              <p className="text-xs text-neutral-400 font-light">
                Explore our raw silk prince coats, Irish linen kurta sets, and Italian wool evening suiting.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all shadow-lg"
            >
              <span>Explore Menswear</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Items list (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-neutral-400">
                <span>{cart.length} distinct item(s) in bag</span>
                <button
                  onClick={clearCart}
                  className="hover:text-rose-400 underline transition-colors"
                >
                  Empty Bag
                </button>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-all"
                  >
                    <div className="relative w-24 h-32 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover object-top"
                        sizes="100px"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link href={`/product/${item.product.id}`}>
                            <h3 className="text-base font-serif font-semibold text-white hover:text-neutral-300 transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                            className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{item.product.subtitle}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
                          <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                          <span>•</span>
                          <span>{item.product.fabric.split(" ")[0]}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/5">
                        <div className="flex items-center border border-white/15 rounded-full px-3 py-1 bg-black">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            className="text-neutral-400 hover:text-white px-1 text-sm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-3">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            className="text-neutral-400 hover:text-white px-1 text-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">
                            {formatPKR(item.product.price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[10px] text-neutral-500">
                              {formatPKR(item.product.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Exploring Menswear</span>
                </Link>
              </div>
            </div>

            {/* Right: Order Summary & Checkout Form (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 space-y-5">
                <h2 className="text-xl font-serif font-bold text-white pb-3 border-b border-white/10">
                  Order Summary
                </h2>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (Try: SPOGMAI10)"
                      className="w-full bg-black/60 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {/* Price Breakdown */}
                <div className="space-y-3 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="text-white font-medium">{formatPKR(cartSubtotal)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Voucher Discount</span>
                      <span>-{formatPKR(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Nationwide Express Delivery</span>
                    <span className="text-white">
                      {shippingFee === 0 ? "Complimentary" : formatPKR(shippingFee)}
                    </span>
                  </div>

                  {shippingFee === 0 && (
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" /> Order qualifies for complimentary express shipping
                    </p>
                  )}

                  <div className="flex justify-between text-base font-serif font-bold text-white pt-3 border-t border-white/10">
                    <span>Grand Total (PKR)</span>
                    <span>{formatPKR(grandTotal)}</span>
                  </div>
                </div>

                {!isCheckingOut ? (
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-4 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                  >
                    <span>Proceed to Cash on Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="pt-2 border-t border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-serif font-semibold text-white">
                        Delivery Destination in Pakistan
                      </h3>
                      <button
                        onClick={() => setIsCheckingOut(false)}
                        className="text-[11px] text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handlePlaceOrder} className="space-y-3">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Tariq Mansoor"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. 0370 0349146"
                            className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                            Email (Optional)
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tariq@gmail.com"
                            className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                            City *
                          </label>
                          <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                          >
                            <option value="Karachi">Karachi</option>
                            <option value="Lahore">Lahore</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Rawalpindi">Rawalpindi</option>
                            <option value="Faisalabad">Faisalabad</option>
                            <option value="Peshawar">Peshawar</option>
                            <option value="Multan">Multan</option>
                            <option value="Quetta">Quetta</option>
                            <option value="Sialkot">Sialkot</option>
                            <option value="Gujranwala">Gujranwala</option>
                            <option value="Other">Other Nationwide City</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                            Payment Method
                          </label>
                          <div className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-emerald-400 font-medium">
                            Cash On Delivery (COD)
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                          Street Address *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House #, Street, Phase / Sector"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white resize-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                          Special Instructions (Optional)
                        </label>
                        <input
                          type="text"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="e.g. Call before delivery, specific chest measurement..."
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submittingOrder}
                        className="w-full mt-2 py-4 bg-emerald-500 hover:bg-emerald-400 text-black text-xs uppercase tracking-widest font-bold rounded-full transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                          {submittingOrder
                            ? "Registering Order..."
                            : `Place Cash on Delivery Order • ${formatPKR(grandTotal)}`}
                        </span>
                      </button>
                    </form>
                  </div>
                )}

                <div className="pt-2 text-[11px] text-neutral-500 text-center space-y-1">
                  <p className="flex items-center justify-center gap-1.5 text-neutral-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Courier Delivery with Cash on Arrival
                  </p>
                  <p>14-Day Free Exchange Guarantee Across Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
