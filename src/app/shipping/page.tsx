import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, Clock, Globe } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 py-16 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
          Client Care
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase tracking-tight">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          Detailed delivery timelines, courier partners, Cash on Delivery procedures, and international order options.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <Clock className="w-6 h-6 text-emerald-400" />
            <h3 className="font-serif font-bold text-white text-base">Karachi & Lahore</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Express dispatch within 24 hours. Delivery takes 1 to 2 business days directly to your doorstep.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <Truck className="w-6 h-6 text-white" />
            <h3 className="font-serif font-bold text-white text-base">Nationwide Pakistan</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Islamabad, Rawalpindi, Faisalabad, Peshawar, Multan, Quetta, and all other cities receive delivery within 2 to 4 business days.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <Globe className="w-6 h-6 text-neutral-400" />
            <h3 className="font-serif font-bold text-white text-base">International Orders</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We ship worldwide to UK, USA, UAE, Canada, and Europe via DHL Express in 4 to 7 business days.
            </p>
          </div>
        </div>

        {/* Policy Details */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 space-y-8 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">1. Cash on Delivery (COD) Procedure</h2>
            <p>
              SPOGMAI offers complete Cash on Delivery across all cities in Pakistan. You are not required to enter credit card numbers or make advance bank deposits. You pay cash directly to the courier representative when the sealed parcel arrives.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">2. Free Shipping Threshold</h2>
            <p>
              All orders exceeding PKR 5,000 enjoy complimentary express shipping across Pakistan. Orders below this amount incur a nominal flat standard shipping charge of PKR 450.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">3. Custom Tailoring Timelines</h2>
            <p>
              Creations ordered with 'Custom' sizing require 7 to 10 days for pattern drafting, cutting, hand embroidery finishing, and strict quality control before being dispatched.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">4. Parcel Tracking</h2>
            <p>
              Once your garment leaves our atelier, you will receive an automated tracking code via WhatsApp and SMS so you can monitor transit milestones in real-time.
            </p>
          </section>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all"
          >
            Return to Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
