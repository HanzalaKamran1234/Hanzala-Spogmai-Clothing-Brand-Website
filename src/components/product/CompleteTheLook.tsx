"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface CompleteTheLookProps {
  currentProduct: Product;
  allProducts: Product[];
}

export function CompleteTheLook({ currentProduct, allProducts }: CompleteTheLookProps) {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = React.useState<string[]>([]);

  // Curate pairing items (e.g. if current is traditional Prince Coat, suggest Trousers, Shawl, or Kurta)
  const pairings = React.useMemo(() => {
    return allProducts
      .filter((p) => p.id !== currentProduct.id)
      .slice(0, 2);
  }, [allProducts, currentProduct]);

  if (pairings.length === 0) return null;

  const handleAddPairing = (product: Product) => {
    addToCart(product, product.sizes[0] || "M", product.colors[0]?.name || "Default");
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  return (
    <div className="mt-16 pt-12 border-t border-white/10">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium">
          Curated Sartorial Ensemble
        </span>
      </div>
      <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-2">
        Complete The Look
      </h3>
      <p className="text-xs text-neutral-400 mb-6 font-light">
        Our creative director recommends pairing this piece with complementary atelier cuts for an authoritative presence.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pairings.map((item) => {
          const isAdded = addedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="group bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 items-center hover:border-white/20 transition-all"
            >
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0">
                <Image
                  src={item.images[0] || ""}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-white/50 block truncate">
                  {item.category}
                </span>
                <Link
                  href={`/product/${item.id}`}
                  className="text-sm font-medium text-white hover:text-emerald-400 transition-colors block truncate"
                >
                  {item.name}
                </Link>
                <div className="text-xs text-white/90 font-semibold mt-1">
                  PKR {item.price.toLocaleString()}
                </div>

                <button
                  onClick={() => handleAddPairing(item)}
                  disabled={isAdded}
                  className={`mt-2.5 px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                    isAdded
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-white text-black hover:bg-neutral-200"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Added to Bag
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" /> Add Pairing ({item.sizes[0] || "M"})
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
