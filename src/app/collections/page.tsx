import React from "react";
import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS, PRODUCTS } from "@/data/products";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CollectionsPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 py-16 text-center space-y-3">
        <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
          The Menswear Archives
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase tracking-tight">
          Curated Men's Collections
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
          Each capsule represents an artistic exploration of modern men's tailoring reimagined through architectural minimalism and pure natural textiles.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {COLLECTIONS.map((col, index) => {
          const colProducts = PRODUCTS.filter((p) => p.collection === col.title);
          const isReversed = index % 2 === 1;

          return (
            <div
              key={col.id}
              className={`rounded-3xl border border-white/10 bg-white/5 overflow-hidden p-6 sm:p-10 flex flex-col ${
                isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-10 items-center hover:border-white/30 hover:bg-white/[0.07] transition-all`}
            >
              {/* Image side */}
              <div className="w-full lg:w-1/2 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 group">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-black/70 backdrop-blur-md text-white border border-white/20">
                    Capsule 0{index + 1}
                  </span>
                </div>
              </div>

              {/* Text side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                    {col.subtitle} • {col.itemCount} Designs Available
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
                    {col.title}
                  </h2>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {col.description}
                </p>

                {/* Sneak peek of product thumbnails */}
                {colProducts.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400">
                      Highlighted Pieces:
                    </span>
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {colProducts.slice(0, 3).map((item) => (
                        <Link
                          key={item.id}
                          href={`/product/${item.id}`}
                          className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-all group"
                        >
                          <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0">
                            <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="pr-2">
                            <p className="text-xs font-serif text-white truncate max-w-[140px]">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-neutral-400">PKR {item.price.toLocaleString()}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <Link
                    href={`/collections/${col.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  >
                    <span>Explore Capsule {col.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
