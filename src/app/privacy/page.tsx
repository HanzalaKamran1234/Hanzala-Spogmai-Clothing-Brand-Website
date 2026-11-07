import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      <div className="border-b border-white/10 bg-black/40 py-16 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">
          Legal & Privacy
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          How SPOGMAI safeguards your personal information, address records, and communication confidentiality.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">1. Information We Collect</h2>
            <p>
              When you interact with SPOGMAI or place an order via our online platform, we collect information necessary to fulfill your order: full name, shipping destination address, mobile/WhatsApp telephone number, and order preferences.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">2. Confidentiality & Third-Party Disclosure</h2>
            <p>
              We treat your contact and address details as strictly private. Your telephone number and delivery address are shared solely with our authorized courier logistics partners (e.g., TCS, Leopards Courier, DHL) for delivery completion. We never sell or distribute client records to third-party marketers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">3. Communications & WhatsApp Notifications</h2>
            <p>
              We communicate order status updates, size verifications, and delivery confirmations via SMS and WhatsApp. You may opt out of promotional previews at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-white">4. Data Security</h2>
            <p>
              Our systems implement encrypted transmission (SSL/TLS) and secure session storage to protect client data against unauthorized access.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
