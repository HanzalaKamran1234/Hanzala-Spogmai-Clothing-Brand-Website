"use client";

import React from "react";

export function AnnouncementBar() {
  const announcements = [
    "SPOGMAI • WEAR THE LEGACY",
    "COMPLIMENTARY WHITE-GLOVE EXPRESS DISPATCH NATIONWIDE",
    "CASH ON DELIVERY (COD) AVAILABLE ACROSS PAKISTAN",
    "ATELIER: RJ SHOPPING MALL, GULSHAN-E-JAMAL, SHOP LG-81",
    "LIMITED EDITION HEIRLOOM MENSWEAR CUTS",
  ];

  return (
    <div className="relative bg-[#000000] border-b border-white/10 text-white/80 py-2.5 overflow-hidden text-[10px] uppercase tracking-[0.25em] select-none z-40">
      <div className="flex w-fit whitespace-nowrap animate-marquee items-center gap-12">
        {[...announcements, ...announcements, ...announcements].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span className="inline-block w-1 h-1 bg-white/50"></span>
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
