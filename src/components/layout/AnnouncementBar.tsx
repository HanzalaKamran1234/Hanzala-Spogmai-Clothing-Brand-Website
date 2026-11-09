"use client";

import React from "react";

export function AnnouncementBar() {
  const text = "WEDNESDAY OPENING | 11.11 BIGGEST SALE AT RJ SHOPPING MALL SHOP LG-81 GULSHAN E JOHAR";
  const items = [text, text, text, text, text, text];

  return (
    <aside
      aria-label="Store Announcement"
      className="relative w-full bg-[#D71920] text-white overflow-hidden select-none z-50 h-7 sm:h-8 flex items-center border-b border-black/10 shadow-sm"
    >
      <div className="flex w-full overflow-hidden">
        <div className="flex whitespace-nowrap items-center will-change-transform animate-marquee-rtl">
          {/* First set of repeating announcements */}
          <div className="flex items-center shrink-0">
            {items.map((item, idx) => (
              <span key={`a-${idx}`} className="inline-flex items-center mx-5 sm:mx-8">
                <span className="text-[10px] sm:text-[11px] md:text-xs font-sans font-bold tracking-[0.16em] sm:tracking-[0.2em] text-white uppercase">
                  {item}
                </span>
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-white/70 ml-5 sm:ml-8"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>

          {/* Second identical set for seamless infinite loop */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {items.map((item, idx) => (
              <span key={`b-${idx}`} className="inline-flex items-center mx-5 sm:mx-8">
                <span className="text-[10px] sm:text-[11px] md:text-xs font-sans font-bold tracking-[0.16em] sm:tracking-[0.2em] text-white uppercase">
                  {item}
                </span>
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-white/70 ml-5 sm:ml-8"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
