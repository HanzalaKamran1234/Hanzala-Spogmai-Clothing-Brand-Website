"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export function AnnouncementBar() {
  const announcements = [
    "COMPLIMENTARY EXPRESS DELIVERY NATIONWIDE ON ORDERS OVER PKR 5,000",
    "CASH ON DELIVERY (COD) AVAILABLE ACROSS PAKISTAN",
    "AUTUMN/WINTER '26: NOCTURNE HAUTE COLLECTION NOW LIVE",
    "HANDCRAFTED LUXURY TAILORING & BESPOKE ATELIER SERVICES",
    "14-DAY HASSLE-FREE RETURN & EXCHANGE GUARANTEE"
  ];

  return (
    <div className="relative bg-black border-b border-white/10 text-white/80 py-2.5 overflow-hidden text-[11px] uppercase tracking-[0.2em] select-none z-40">
      <div className="flex w-fit whitespace-nowrap animate-marquee items-center gap-10">
        {[...announcements, ...announcements].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="inline-block w-1 h-1 rounded-full bg-white/60"></span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
