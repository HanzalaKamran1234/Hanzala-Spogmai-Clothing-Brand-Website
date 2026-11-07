"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, CheckCircle2, ShieldCheck, MessageCircle, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ReturnRequestPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketResult, setTicketResult] = useState<{ ticketNumber: string; orderNumber: string } | null>(null);

  // Form State
  const [orderNumber, setOrderNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [currentSize, setCurrentSize] = useState("M");
  const [reason, setReason] = useState<
    "Size too small" | "Size too large" | "Fabric / Style preference" | "Defective / Damaged" | "Incorrect item received"
  >("Size too small");
  const [action, setAction] = useState<
    "Exchange Size" | "Refund to Bank Account" | "Refund to JazzCash / Easypaisa" | "Store Credit"
  >("Exchange Size");
  const [replacementSize, setReplacementSize] = useState("L");

  // Bank details for refund
  const [bankName, setBankName] = useState("Meezan Bank");
  const [accountTitle, setAccountTitle] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate Pakistani Phone
    const cleanPhone = customerPhone.replace(/[^0-9]/g, "");
    if (!cleanPhone.startsWith("03") && !cleanPhone.startsWith("923")) {
      setError("Please provide a valid Pakistani mobile number (e.g. 0300 1234567).");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          customerName,
          customerPhone,
          customerEmail,
          items: [
            {
              productId: "custom",
              productName: productName || "SPOGMAI Garment",
              size: currentSize,
              quantity: 1,
            },
          ],
          reason,
          action,
          replacementSize: action === "Exchange Size" ? replacementSize : undefined,
          bankDetails:
            action.includes("Refund")
              ? { bankName, accountTitle, accountNumber }
              : undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setTicketResult({
          ticketNumber: data.ticketNumber,
          orderNumber: data.orderNumber,
        });
        setStep(2);
      } else {
        setError(data.error || "Unable to submit return request.");
      }
    } catch {
      setError("Network error while submitting request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        <Link
          href="/returns"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return & Exchange Policy
        </Link>

        {step === 1 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <RefreshCw className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-light text-white tracking-wide">
                  Return & Exchange Request Portal
                </h1>
                <p className="text-xs text-white/50 uppercase tracking-wider">
                  Bespoke Client Satisfaction Guarantee
                </p>
              </div>
            </div>

            {error && (
              <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Order Reference & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. SPOG-784210"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Daniyal Khan"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                    Pakistani Mobile (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="patron@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Garment Details */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                    Garment Name / Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Obsidian Raw Silk Prince Coat"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                    Current Size *
                  </label>
                  <select
                    value={currentSize}
                    onChange={(e) => setCurrentSize(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                  >
                    {["S", "M", "L", "XL", "XXL", "Custom"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                  Reason for Adjustment *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as any)}
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                >
                  <option value="Size too small">Size too small (Need larger cut)</option>
                  <option value="Size too large">Size too large (Need more tapered cut)</option>
                  <option value="Fabric / Style preference">Fabric / Silhouette preference</option>
                  <option value="Defective / Damaged">Stitching / Needlework adjustment needed</option>
                  <option value="Incorrect item received">Incorrect item received</option>
                </select>
              </div>

              {/* Action Requested */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                  Preferred Resolution *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "Exchange Size", label: "Exchange for Another Size", desc: "Express replacement dispatch" },
                    { id: "Refund to Bank Account", label: "Direct Bank Transfer", desc: "Refund to IBAN / Account" },
                    { id: "Refund to JazzCash / Easypaisa", label: "JazzCash / Easypaisa", desc: "Mobile wallet refund" },
                    { id: "Store Credit", label: "Atelier Store Credit", desc: "Immediate store voucher + 5% bonus" },
                  ].map((act) => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setAction(act.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        action === act.id
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="text-xs font-semibold">{act.label}</div>
                      <div className={`text-[10px] mt-0.5 ${action === act.id ? "text-black/60" : "text-white/40"}`}>
                        {act.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional: Replacement Size */}
              {action === "Exchange Size" && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                    Select Desired Replacement Size *
                  </label>
                  <div className="flex gap-2">
                    {["S", "M", "L", "XL", "XXL", "Custom"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReplacementSize(s)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all ${
                          replacementSize === s
                            ? "bg-white text-black border-white"
                            : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Conditional: Bank details for refund */}
              {action.includes("Refund") && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-white/80 font-semibold">
                    Refund Disbursement Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-white/50 mb-1">
                        Bank or Wallet Name
                      </label>
                      <input
                        type="text"
                        required
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="e.g. Meezan Bank, JazzCash, HBL"
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-white/50 mb-1">
                        Account Title
                      </label>
                      <input
                        type="text"
                        required
                        value={accountTitle}
                        onChange={(e) => setAccountTitle(e.target.value)}
                        placeholder="e.g. Daniyal Khan"
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-white/50 mb-1">
                      Account / IBAN Number
                    </label>
                    <input
                      type="text"
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="e.g. PK89MEZN0000000000000000"
                      className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors shadow-lg disabled:opacity-50"
              >
                {loading ? "Submitting Ticket..." : "Submit Return & Exchange Request"}
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Success Confirmation */
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium block mb-2">
              Request Registered Successfully
            </span>
            <h2 className="text-2xl font-light text-white mb-2">
              Return Ticket #{ticketResult?.ticketNumber}
            </h2>
            <p className="text-xs text-neutral-400 max-w-md mx-auto mb-8 font-light">
              Your request for Order #{ticketResult?.orderNumber} has been logged in the atelier pipeline. Our concierge will review the details and dispatch our reverse courier service.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-md mx-auto text-left text-xs text-white/70 space-y-2 mb-8">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> What Happens Next:
              </div>
              <ul className="list-disc list-inside space-y-1 text-white/60">
                <li>Courier rider will arrive with your replacement or reverse return packaging within 2-3 business days.</li>
                <li>Please keep the garment in its original SPOGMAI dust cover with tags intact.</li>
                <li>No courier return fee is charged to the patron.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/923700349146?text=${encodeURIComponent(
                  `Salaam, I have submitted Return Ticket #${ticketResult?.ticketNumber} for Order #${ticketResult?.orderNumber}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider hover:bg-emerald-500/30 transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Message Concierge on WhatsApp
              </a>
              <Link
                href="/shop"
                className="px-6 py-3 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors inline-flex items-center justify-center"
              >
                Return to Store
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
