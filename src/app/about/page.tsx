import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scissors, ShieldCheck, Sparkles, Feather } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Editorial Header */}
      <div className="relative border-b border-white/10 bg-black/40 py-20 md:py-28 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.35em] text-neutral-400 font-mono">
            The Sartorial Manifesto
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold uppercase tracking-tight text-white">
            Architecture for Men
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
            Founded with the conviction that true menswear elegance requires neither loud branding nor hurried trends. SPOGMAI stands for uncompromising South Asian tailoring, pure natural textiles, and masculine discipline.
          </p>
        </div>
      </div>

      {/* Main Story & Photography */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-24">
        {/* Section 1: The Genesis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">
              01 • The Genesis
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Born from Sartorial Discipline
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              SPOGMAI was conceived to redefine the modern South Asian man's wardrobe. We turned away from mass-produced synthetic blends, returning instead to the dignity of heavy raw silk, Italian worsted wools, and organic Irish linens.
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              Each piece is created to command quiet authority. Collaborating with master craftsmen across Rawalpindi and Lahore, we preserve centuries of embroidery and canvas construction in garments designed for lifetimes, not seasons.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop"
              alt="SPOGMAI Sartorial Craft & Folded Textiles"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-xs text-neutral-300 font-serif">
              "Power whispers through the discipline of tailoring." — SPOGMAI
            </div>
          </div>
        </div>

        {/* Section 2: Three Pillars */}
        <div className="py-12 border-y border-white/10" id="philosophy">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
              Foundational Principles
            </span>
            <h3 className="text-3xl font-serif font-bold uppercase">The Three Pillars</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white">
                <Scissors className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-serif font-bold text-white">Anatomical Form</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                We calculate chest canvassing, armhole pitch, and waist suppression to give structure and poise without restricting comfortable movement.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-serif font-bold text-white">Unadulterated Textiles</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Certified 80g raw silk, Irish suiting linen, 9000 micro-velvet, and pure cashmere. We refuse polyester blends that cheapen drape and breathability.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-serif font-bold text-white">Generational Needlework</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Hand-guided resham piping, subtle antique tilla, and hand-sewn buttonholes executed by master craftsmen who have practiced their art for decades.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The Atelier Craft */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="craft">
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">
              02 • The Atelier
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Every Stitch Engineered with Precision
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              From our flagship bandhgala prince coats to bespoke linen kurta sets, each garment receives between 40 and 180 hours of meticulous hand-finishing. We calibrate tension and symmetry under natural studio light to ensure heirloom permanence.
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              We provide ethical compensation, career dignity, and healthcare to our artisan guild, honoring their generational skill while bringing bespoke luxury to patrons across Pakistan and the globe.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all"
              >
                <span>View The Creations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1 relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop"
              alt="SPOGMAI Menswear Tailoring & Studio Garment"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
