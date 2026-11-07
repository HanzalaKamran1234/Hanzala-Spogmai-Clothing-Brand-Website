"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { COLLECTIONS, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function CollectionDetailPage() {
  const routeParams = useParams();
  const slug = routeParams?.slug as string;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = PRODUCTS.filter((p) => p.collection === collection.title);

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Breadcrumb */}
      <div className="border-b border-white/10 bg-black/40 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs text-neutral-400 gap-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link href="/collections" className="hover:text-white transition-colors">
            Collections
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-white">{collection.title}</span>
        </div>
      </div>

      {/* Hero Banner for Collection */}
      <div className="relative h-[420px] md:h-[480px] w-full overflow-hidden border-b border-white/10 flex items-center justify-center text-center">
        <Image
          src={collection.image}
          alt={collection.title}
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/30" />

        <div className="relative z-10 max-w-3xl px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-300">
            {collection.subtitle}
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase tracking-tight text-white">
            {collection.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed font-light">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 text-xs text-neutral-400">
          <span>{collectionProducts.length} pieces in this capsule</span>
          <Link href="/collections" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Collections</span>
          </Link>
        </div>

        {collectionProducts.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            New pieces are currently being finished in the atelier for this collection.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
