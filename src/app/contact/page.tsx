"use client";

import React, { useState } from "react";
import { MessageCircle, Mail, MapPin, Phone, Clock, ArrowRight, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Bespoke Tailoring Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 py-16 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
          Concierge & Bespoke Tailoring
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase tracking-tight">
          Connect With SPOGMAI
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          We invite you to consult with our master stylists for bespoke suiting, custom kurta measurements, or order assistance across Pakistan.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Official Contact Info & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct WhatsApp Callout */}
            <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-white">Instant WhatsApp Concierge</h3>
                  <p className="text-xs text-emerald-400">Response within minutes</p>
                </div>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Connect directly with our master tailoring concierge for immediate assistance with custom body measurements, fabric advice, or urgent delivery dispatch.
              </p>
              <a
                href="https://wa.me/923700349146"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2"
              >
                <span>Chat on WhatsApp (+92 370 0349146)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Official Phone & Hours */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-5 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-white mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Official Telephone</p>
                  <a href="tel:+923700349146" className="text-neutral-300 hover:text-white transition-colors block mt-0.5 font-mono text-sm">
                    03700349146 / +92 370 0349146
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                <Clock className="w-4 h-4 text-white mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Atelier Working Hours</p>
                  <p className="text-neutral-400">Monday — Saturday: 10:00 AM – 8:00 PM PKT</p>
                  <p className="text-neutral-400">Sunday: Closed for artisan rest</p>
                </div>
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4 text-xs">
              <h3 className="font-serif font-bold text-white text-sm">Official Social Channels</h3>
              <div className="space-y-2 text-neutral-300">
                <a
                  href="https://www.instagram.com/spogmai.store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span>Instagram: @spogmai.store</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61596378237660"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span>Facebook: SPOGMAI Official</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
                </a>

                <a
                  href="https://www.tiktok.com/@spogmai.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span>TikTok: @spogmai.store</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 shadow-2xl">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Message Transmitted</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Thank you, {name}. Our menswear styling team will review your inquiry and connect via WhatsApp (+92 370 0349146) within 2 to 4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-white/10 text-white text-xs uppercase tracking-wider hover:bg-white/20"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">
                      Bespoke Inquiry
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      Leave A Message for Our Tailoring House
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                        WhatsApp / Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0370 0349146"
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                      >
                        <option value="Bespoke Tailoring Inquiry">Bespoke Tailoring Inquiry</option>
                        <option value="Custom Size / Measurements">Custom Size / Measurements</option>
                        <option value="Prince Coat / Wedding Wear">Prince Coat / Wedding Wear</option>
                        <option value="Order Status & COD Tracking">Order Status & COD Tracking</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify your desired silhouette, event date, measurements, or queries..."
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Transmit Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
