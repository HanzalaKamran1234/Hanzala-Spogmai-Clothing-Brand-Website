"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, Info } from "lucide-react";

export function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
      <div className="flex items-center gap-3 bg-neutral-950 text-white border border-white/20 px-4 py-3 shadow-2xl backdrop-blur-xl">
        {toast.type === "info" ? (
          <Info className="w-4 h-4 text-neutral-400 flex-shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
        )}
        <p className="text-xs font-serif tracking-wide leading-snug">{toast.message}</p>
      </div>
    </div>
  );
}
