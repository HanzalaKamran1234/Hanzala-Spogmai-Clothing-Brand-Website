import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      <div className="border-b border-white/10 bg-black/40 py-16 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
          Legal Agreement
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          Terms governing the use of the SPOGMAI website, ordering couture creations, and intellectual property.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">1. Atelier Ownership & Copyright</h2>
            <p>
              All textile patterns, embroidery motifs, silhouettes, lookbook photography, and brand marks displayed on this website are the intellectual property of SPOGMAI COUTURE LTD. Unauthorized reproduction is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">2. Product Descriptions & Photography</h2>
            <p>
              Due to the artisanal handcrafting process (hand-dyed pure silks, manual zardozi needlework, and natural weaves), subtle nuances in texture and tone are characteristic of genuine luxury craft. We photograph all creations under natural studio lighting to ensure maximum color authenticity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">3. Pricing & Currency</h2>
            <p>
              All prices displayed on the website are listed in Pakistani Rupees (PKR) and include applicable domestic sales taxes. For international deliveries, local customs duties (if applicable) are determined by destination border authorities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">4. Order Acceptance</h2>
            <p>
              We reserve the right to verify client phone numbers and addresses via phone or WhatsApp prior to dispatching high-value couture orders under Cash on Delivery.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
