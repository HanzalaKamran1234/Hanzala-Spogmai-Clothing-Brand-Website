import React from "react";
import Link from "next/link";
import { Ruler, ShieldCheck, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Sartorial Size Guide & Measuring Guide | SPOGMAI Men's Fashion",
  description: "Comprehensive men's clothing measurement guide for Prince Coats, Tuxedos, Kurtas, Shalwar Kameez, and Tailored Trousers by SPOGMAI.",
};

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-emerald-400 mb-4">
            <Ruler className="w-3.5 h-3.5" />
            Bespoke Menswear Proportions
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
            The SPOGMAI Fit Architecture
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Every garment from the SPOGMAI atelier is cut with exacting masculine discipline. Refer to our standardized imperial (inches) sizing matrix below or consult our master tailors.
          </p>
        </div>

        {/* Section 1: Traditional Menswear (Prince Coats & Bandhgalas) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-light tracking-wide text-white mb-2">
            1. Traditional Menswear — Prince Coats & Bandhgalas
          </h2>
          <p className="text-xs text-neutral-400 mb-6">
            Measured flat across garment in inches. Structured shoulder pad allowance included.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider">
                  <th className="py-3 px-3">Size</th>
                  <th className="py-3 px-3">Chest (in)</th>
                  <th className="py-3 px-3">Shoulder (in)</th>
                  <th className="py-3 px-3">Sleeve Length (in)</th>
                  <th className="py-3 px-3">Coat Length (in)</th>
                  <th className="py-3 px-3">Matching Trouser Waist (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Small (38)</td>
                  <td className="py-3 px-3">38" - 39"</td>
                  <td className="py-3 px-3">17.5"</td>
                  <td className="py-3 px-3">24.5"</td>
                  <td className="py-3 px-3">29"</td>
                  <td className="py-3 px-3">30" - 32"</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Medium (40)</td>
                  <td className="py-3 px-3">40" - 41"</td>
                  <td className="py-3 px-3">18.25"</td>
                  <td className="py-3 px-3">25"</td>
                  <td className="py-3 px-3">30"</td>
                  <td className="py-3 px-3">32" - 34"</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Large (42)</td>
                  <td className="py-3 px-3">42" - 43"</td>
                  <td className="py-3 px-3">19"</td>
                  <td className="py-3 px-3">25.5"</td>
                  <td className="py-3 px-3">31"</td>
                  <td className="py-3 px-3">34" - 36"</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">X-Large (44)</td>
                  <td className="py-3 px-3">44" - 45"</td>
                  <td className="py-3 px-3">19.75"</td>
                  <td className="py-3 px-3">26"</td>
                  <td className="py-3 px-3">31.5"</td>
                  <td className="py-3 px-3">36" - 38"</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">XX-Large (46)</td>
                  <td className="py-3 px-3">46" - 47"</td>
                  <td className="py-3 px-3">20.5"</td>
                  <td className="py-3 px-3">26.5"</td>
                  <td className="py-3 px-3">32"</td>
                  <td className="py-3 px-3">38" - 40"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Pure Irish Linen & Silk Kurtas */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-light tracking-wide text-white mb-2">
            2. Pure Irish Linen & Silk Kurta Sets
          </h2>
          <p className="text-xs text-neutral-400 mb-6">
            Classic ease of movement cut with comfortable shoulder ease.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider">
                  <th className="py-3 px-3">Size</th>
                  <th className="py-3 px-3">Chest (in)</th>
                  <th className="py-3 px-3">Shoulder (in)</th>
                  <th className="py-3 px-3">Collar / Ban (in)</th>
                  <th className="py-3 px-3">Kurta Length (in)</th>
                  <th className="py-3 px-3">Shalwar/Trouser Inseam (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Small</td>
                  <td className="py-3 px-3">41" (Relaxed)</td>
                  <td className="py-3 px-3">17.5"</td>
                  <td className="py-3 px-3">15"</td>
                  <td className="py-3 px-3">40"</td>
                  <td className="py-3 px-3">38"</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Medium</td>
                  <td className="py-3 px-3">43" (Relaxed)</td>
                  <td className="py-3 px-3">18.5"</td>
                  <td className="py-3 px-3">15.5"</td>
                  <td className="py-3 px-3">42"</td>
                  <td className="py-3 px-3">39.5"</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">Large</td>
                  <td className="py-3 px-3">45" (Relaxed)</td>
                  <td className="py-3 px-3">19.5"</td>
                  <td className="py-3 px-3">16"</td>
                  <td className="py-3 px-3">44"</td>
                  <td className="py-3 px-3">41"</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-white">X-Large</td>
                  <td className="py-3 px-3">48" (Relaxed)</td>
                  <td className="py-3 px-3">20.5"</td>
                  <td className="py-3 px-3">16.5"</td>
                  <td className="py-3 px-3">45"</td>
                  <td className="py-3 px-3">42"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tailored Custom Orders Banner */}
        <div className="bg-gradient-to-r from-neutral-900 to-black border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              Guaranteed Sartorial Fit Policy
            </div>
            <h3 className="text-xl font-light text-white">
              Complimentary Size Exchange Nationwide
            </h3>
            <p className="text-xs text-neutral-400 max-w-lg">
              If an off-the-rack garment does not drape to your complete satisfaction, SPOGMAI coordinates an immediate courier exchange with zero hassle.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop"
              className="px-6 py-3 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 justify-center"
            >
              Shop Menswear <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/923700349146?text=Salaam%2C%20I%20have%20questions%20regarding%20men%27s%20sizing%20at%20SPOGMAI."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/5 border border-white/10 text-white text-xs font-medium uppercase tracking-wider rounded-xl hover:bg-white/10 transition-colors inline-flex items-center justify-center"
            >
              Consult Tailor on WhatsApp
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
