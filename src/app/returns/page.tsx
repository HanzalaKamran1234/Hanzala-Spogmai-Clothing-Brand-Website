import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 py-16 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
          Client Care
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase tracking-tight">
          Return & Exchange Policy
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          We want you to feel entirely confident in your SPOGMAI wardrobe with our 14-day exchange pledge.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <span className="text-xs font-mono text-neutral-500">Step 01</span>
            <h3 className="font-serif font-bold text-white text-base">Contact Concierge</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Message us on WhatsApp (+92 370 0349146) within 14 days of delivery with your order reference and preferred size/item.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <span className="text-xs font-mono text-neutral-500">Step 02</span>
            <h3 className="font-serif font-bold text-white text-base">Reverse Pickup</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Our courier will collect the package from your door in original unworn condition with tags intact.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <span className="text-xs font-mono text-neutral-500">Step 03</span>
            <h3 className="font-serif font-bold text-white text-base">Exchange Dispatched</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Your replacement size or alternative silhouette is dispatched immediately upon courier inspection.
            </p>
          </div>
        </div>

        {/* Detailed Terms */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 space-y-6 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-xl font-serif font-bold text-white">Guidelines & Conditions</h2>
          <ul className="space-y-3 list-disc pl-5 text-neutral-400">
            <li>
              Garments must be in unworn, unwashed, unaltered condition with original security tags and garment bags intact.
            </li>
            <li>
              Ready-to-wear pret and formal wear are eligible for full size exchange or store credit valid for 12 months.
            </li>
            <li>
              Custom sized garments tailored to specific bespoke measurements are eligible for complimentary studio alterations rather than replacement.
            </li>
            <li>
              In the unlikely event of transit damage or manufacturing flaw, replacement is expedited free of courier charges.
            </li>
          </ul>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all"
          >
            Contact Concierge for Exchange
          </Link>
        </div>
      </div>
    </div>
  );
}
