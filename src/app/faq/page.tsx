"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Plus, Minus, MessageCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "Orders & COD" | "Men's Sizing & Fit" | "Shipping" | "Returns";
}

const FAQS: FAQItem[] = [
  {
    category: "Orders & COD",
    question: "Do you offer Cash on Delivery (COD) across Pakistan?",
    answer: "Yes, 100% Cash on Delivery is available across all major cities, towns, and regions in Pakistan without surcharge. You simply pay our verified courier upon inspecting your delivered parcel."
  },
  {
    category: "Orders & COD",
    question: "How do I know my order is confirmed?",
    answer: "Immediately after placing your order online, you will receive an on-screen order reference. Our team also sends an automated WhatsApp message and SMS from +92 370 0349146 confirming your selected items and shipping address before dispatch."
  },
  {
    category: "Men's Sizing & Fit",
    question: "What if standard sizes don't fit me? Do you offer Bespoke Tailoring?",
    answer: "Yes. Every creation in our Traditional Menswear, Suiting, and Essentials collections features a 'Custom' size option. If selected, our head pattern-maker will reach out directly on WhatsApp (+92 370 0349146) to record your exact chest circumference, shoulder width, sleeve length, bicep, neck circumference, waist, and coat length."
  },
  {
    category: "Men's Sizing & Fit",
    question: "What is your standard Men's size breakdown?",
    answer: "Our standard sizes follow tailored international menswear grading: Small (Chest 38\", Shoulder 17.5\"), Medium (Chest 40\", Shoulder 18\"), Large (Chest 42\", Shoulder 18.5\"), XL (Chest 44\", Shoulder 19\"), XXL (Chest 46\", Shoulder 19.5\"). All trousers feature 2 inches of internal seam margin for easy tailoring."
  },
  {
    category: "Shipping",
    question: "What are your delivery timelines across Pakistan?",
    answer: "For major metropolitan areas (Karachi, Lahore, Islamabad, Rawalpindi), ready-to-wear pieces arrive in 1 to 2 business days. For other nationwide cities, delivery takes 2 to 4 business days. Custom tailored orders require 7 to 10 days for handwork completion."
  },
  {
    category: "Shipping",
    question: "Is shipping free?",
    answer: "We offer complimentary express delivery on all orders valued above PKR 5,000 across Pakistan. For smaller orders below this threshold, a flat courier fee of PKR 450 is applied."
  },
  {
    category: "Returns",
    question: "What is your Return and Exchange policy?",
    answer: "We provide a 14-day hassle-free exchange and return window across Pakistan. If the size does not fit or if you wish to exchange for another silhouette, simply contact our concierge on WhatsApp (+92 370 0349146) and we will arrange a reverse pickup or swap."
  },
  {
    category: "Returns",
    question: "Are customized menswear garments exchangeable?",
    answer: "Custom-made garments tailored to personal body measurements are eligible for complimentary studio alterations until the fit is completely satisfactory to you."
  }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ["All", "Orders & COD", "Men's Sizing & Fit", "Shipping", "Returns"];

  const filteredFaqs = FAQS.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 py-16 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
          Gentlemen's Client Care
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          Clear answers regarding Cash on Delivery, men's sizing, bespoke measurements, and nationwide express shipping.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 justify-center scrollbar-none" id="sizing">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-white text-black font-semibold shadow-md"
                  : "bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all hover:border-white/25"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg text-white"
                >
                  <span>{faq.question}</span>
                  <div className="p-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 flex-shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 animate-fade-in font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-16 p-8 bg-neutral-900 border border-white/10 text-center space-y-4">
          <h3 className="text-xl font-serif font-semibold text-white">Have a Bespoke Measurement Question?</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Our master tailor is active daily on WhatsApp (+92 370 0349146) to advise on fitting, event dates, and fabric selections.
          </p>
          <a
            href="https://wa.me/923700349146"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-widest transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp (+92 370 0349146)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
