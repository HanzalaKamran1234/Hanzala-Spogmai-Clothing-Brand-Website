"use client";

import React from "react";

export function AnnouncementBar() {
  const text = "CELEBRATE OUR GRAND OPENING — THE BIGGEST SALE AT RJ SHOPPING MALL!";

  return (
    <div className="relative bg-[#000000] border-b border-white/10 text-white py-2.5 overflow-hidden text-[11px] sm:text-xs uppercase tracking-[0.22em] select-none z-40">
      <div className="flex w-fit whitespace-nowrap animate-marquee items-center gap-12">
        {[text, text, text, text, text, text].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span className="inline-block w-1 h-1 bg-white"></span>
            <span className="font-semibold tracking-[0.2em]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
