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
  Smartphone,
  CreditCard,
  AlertCircle,
  Check,
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
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "JazzCash" | "Easypaisa">("COD");
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  // City-based dynamic shipping
  const majorCities = ["karachi", "lahore", "islamabad", "rawalpindi", "faisalabad", "peshawar", "multan", "sialkot"];
  const isMajorCity = majorCities.includes(city.trim().toLowerCase());
  const freeShippingThreshold = 10000;
  const baseShippingRate = isMajorCity ? 250 : 350;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : baseShippingRate;

  const discountAmount = discountAmountServer || (cartSubtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Pakistani Phone Validation
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const isValidPakPhone =
    (cleanPhone.startsWith("03") && cleanPhone.length === 11) ||
    (cleanPhone.startsWith("923") && cleanPhone.length === 12);

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
    } catch {
      // Fallback
      if (promoCode.trim().toUpperCase() === "SPOGMAI10" || promoCode.trim().toUpperCase() === "LEGACY10") {
        setDiscountPercent(10);
        setPromoApplied(true);
        showToast("Voucher applied! 10% discount deducted.");
      } else {
        showToast("Invalid code. Try 'LEGACY10' or 'LEGACY5000'", "info");
      }
    }
  };

  // Real server-side order creation
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      showToast("Please provide your name, phone, and complete delivery address.", "info");
      return;
    }

    if (!isValidPakPhone) {
      showToast("Please enter a valid 11-digit Pakistani mobile number (e.g. 0300 1234567).", "info");
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
        paymentMethod: paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod,
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
    } catch {
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
              <span className="text-white font-mono font-bold">#{orderComplete.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Payment Method:</span>
              <span className="text-white">{orderComplete.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Delivery Destination:</span>
              <span className="text-white">{orderComplete.shippingAddress}, {orderComplete.city}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 font-semibold">
              <span className="text-neutral-300">Amount Payable at Door:</span>
              <span className="text-emerald-400 text-sm font-bold font-mono">
                {formatPKR(orderComplete.total)}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href={`https://wa.me/923700349146?text=${encodeURIComponent(
                `Salaam SPOGMAI Atelier, I placed order #${orderComplete.orderNumber} and would like to confirm my delivery measurements.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs uppercase tracking-widest font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm on WhatsApp (+92 370 0349146)</span>
            </a>

            <Link
              href={`/track?order=${orderComplete.orderNumber}`}
              className="w-full py-3 bg-white/10 text-white text-xs uppercase tracking-widest font-bold rounded-full hover:bg-white/20 transition-colors block text-center"
            >
              Live Order Milestones & Tracking →
            </Link>

            <Link
              href="/shop"
              className="text-xs text-white/50 hover:text-white pt-2 block text-center"
            >
              Continue Browsing Atelier
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
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
          Atelier Checkout & Bag
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {cart.length === 0 ? (
          <div className="text-center py-24 space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 text-neutral-400 mx-auto flex items-center justify-center">
              <ShoppingBag className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-serif font-bold">Your Bag is Empty</h2>
              <p className="text-xs text-neutral-400 font-light">
                Discover bespoke cut prince coats, bandhgalas, and Italian wool tuxedos crafted exclusively for men.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-200 transition-all shadow-lg"
            >
              <span>Explore Menswear Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Cart Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10 text-xs text-neutral-400">
                <span>{cart.length} Bespoke Creation(s) Selected</span>
                <button
                  onClick={clearCart}
                  className="hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Bag</span>
                </button>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex gap-4 sm:gap-6 items-center"
                  >
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0 border border-white/10">
                      <Image
                        src={item.product.images[0] || ""}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400 block font-mono">
                        {item.product.category}
                      </span>
                      <Link
                        href={`/product/${item.product.id}`}
                        className="text-sm font-serif font-bold text-white hover:text-neutral-300 transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400 pt-1">
                        <span>
                          Size: <strong className="text-white">{item.selectedSize}</strong>
                        </span>
                        {item.selectedColor && (
                          <span>
                            Color: <strong className="text-white">{item.selectedColor}</strong>
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-mono font-bold text-white pt-1">
                        {formatPKR(item.product.price)}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between self-stretch">
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedSize)
                        }
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center border border-white/20 rounded-full px-2 py-0.5 bg-black/60">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="text-neutral-400 hover:text-white px-1 text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="text-neutral-400 hover:text-white px-1 text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/shop"
                  className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Explore More Menswear Pieces</span>
                </Link>
              </div>
            </div>

            {/* Right: Order Summary & Checkout (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-[#0b0b0b] border border-white/15 space-y-6 shadow-2xl">
                <h2 className="text-lg font-serif font-bold tracking-wide border-b border-white/10 pb-4">
                  Order Summary
                </h2>

                {/* Voucher Code */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Tag className="w-3 h-3" />
                    <span>Atelier Promo Voucher</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. LEGACY10"
                      className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-white font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider rounded-xl transition-colors font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                  <span className="text-[10px] text-neutral-500 block">
                    Use code <strong className="text-neutral-300">LEGACY10</strong> for 10% courtesy discount.
                  </span>
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
                    <span>
                      Express Courier Delivery ({city})
                    </span>
                    <span className="text-white font-mono">
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
                    <span className="font-mono">{formatPKR(grandTotal)}</span>
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
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-[11px] uppercase tracking-wider text-neutral-400 block">
                              Phone / WhatsApp *
                            </label>
                            {phone && (
                              <span className={`text-[10px] ${isValidPakPhone ? "text-emerald-400" : "text-amber-400"}`}>
                                {isValidPakPhone ? "✓ Valid" : "Must be 03XX"}
                              </span>
                            )}
                          </div>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="0300 1234567"
                            className={`w-full bg-black/60 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none font-mono ${
                              phone && !isValidPakPhone
                                ? "border-amber-500/50"
                                : "border-white/15 focus:border-white"
                            }`}
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
                            City in Pakistan *
                          </label>
                          <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                          >
                            <option value="Karachi">Karachi (Rs 250)</option>
                            <option value="Lahore">Lahore (Rs 250)</option>
                            <option value="Islamabad">Islamabad (Rs 250)</option>
                            <option value="Rawalpindi">Rawalpindi (Rs 250)</option>
                            <option value="Faisalabad">Faisalabad (Rs 250)</option>
                            <option value="Peshawar">Peshawar (Rs 250)</option>
                            <option value="Multan">Multan (Rs 250)</option>
                            <option value="Sialkot">Sialkot (Rs 250)</option>
                            <option value="Gujranwala">Gujranwala (Rs 350)</option>
                            <option value="Quetta">Quetta (Rs 350)</option>
                            <option value="Hyderabad">Hyderabad (Rs 350)</option>
                            <option value="Abbottabad">Abbottabad (Rs 350)</option>
                            <option value="Other">Other Cities (Rs 350)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                            Payment Mode
                          </label>
                          <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value as any)}
                            className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-emerald-400 focus:outline-none cursor-pointer font-medium"
                          >
                            <option value="COD">Cash on Delivery (COD)</option>
                            <option value="JazzCash">JazzCash (Direct)</option>
                            <option value="Easypaisa">Easypaisa (Direct)</option>
                          </select>
                        </div>
                      </div>

                      {paymentMethod !== "COD" && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300">
                          Transfer directly to SPOGMAI Merchant Account after placing order. Our concierge will send the payment prompt to your WhatsApp.
                        </div>
                      )}

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
                            : `Place Order • ${formatPKR(grandTotal)}`}
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
