"use client";

import React, { useState } from "react";
import { X, Ruler, Sparkles, Check } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export function SizeGuideModal({ isOpen, onClose, category = "Formal Wear" }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [activeTab, setActiveTab] = useState<"chart" | "calculator">("chart");

  // Calculator state
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("10");
  const [weightKg, setWeightKg] = useState("75");
  const [fitPreference, setFitPreference] = useState<"slim" | "regular" | "classic">("regular");
  const [calculatedSize, setCalculatedSize] = useState<string | null>(null);

  if (!isOpen) return null;

  const toUnit = (valInInches: number) => {
    if (unit === "cm") {
      return `${Math.round(valInInches * 2.54)} cm`;
    }
    return `${valInInches}"`;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const totalInches = parseInt(heightFeet, 10) * 12 + parseInt(heightInches, 10);
    const weight = parseInt(weightKg, 10);

    let baseSize = "M";
    if (weight < 65 || totalInches < 67) {
      baseSize = "S";
    } else if (weight >= 65 && weight < 78) {
      baseSize = fitPreference === "slim" ? "M" : "M (40R)";
    } else if (weight >= 78 && weight < 90) {
      baseSize = fitPreference === "slim" ? "M" : "L (42R)";
    } else if (weight >= 90 && weight < 105) {
      baseSize = "XL (44R)";
    } else {
      baseSize = "XXL (46R)";
    }

    setCalculatedSize(baseSize);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-full hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <Ruler className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-serif tracking-wide text-white">
              Sartorial Measurement & Size Guide
            </h2>
            <p className="text-xs text-white/50 tracking-widest uppercase">
              Bespoke Proportions for Men ({category})
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("chart")}
              className={`px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition-all ${
                activeTab === "chart"
                  ? "bg-white text-black font-semibold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Size Charts
            </button>
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-4 py-1.5 text-xs font-medium uppercase tracking-widest flex items-center gap-1.5 transition-all ${
                activeTab === "calculator"
                  ? "bg-white text-black font-semibold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              Fit Recommender
            </button>
          </div>

          {activeTab === "chart" && (
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setUnit("in")}
                className={`px-2.5 py-1 rounded ${
                  unit === "in" ? "bg-white/20 text-white font-medium" : "text-white/40 hover:text-white"
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit("cm")}
                className={`px-2.5 py-1 rounded ${
                  unit === "cm" ? "bg-white/20 text-white font-medium" : "text-white/40 hover:text-white"
                }`}
              >
                Centimeters
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Size Charts */}
        {activeTab === "chart" && (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider">
                    <th className="py-3 px-3">Size</th>
                    <th className="py-3 px-3">Chest</th>
                    <th className="py-3 px-3">Shoulder</th>
                    <th className="py-3 px-3">Sleeve</th>
                    <th className="py-3 px-3">Waist</th>
                    <th className="py-3 px-3">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-semibold text-white">S (38R)</td>
                    <td className="py-3 px-3">{toUnit(38)}</td>
                    <td className="py-3 px-3">{toUnit(17.5)}</td>
                    <td className="py-3 px-3">{toUnit(24.5)}</td>
                    <td className="py-3 px-3">{toUnit(32)}</td>
                    <td className="py-3 px-3">{toUnit(29)}</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] bg-white/[0.01]">
                    <td className="py-3 px-3 font-semibold text-white">M (40R)</td>
                    <td className="py-3 px-3">{toUnit(40)}</td>
                    <td className="py-3 px-3">{toUnit(18.25)}</td>
                    <td className="py-3 px-3">{toUnit(25)}</td>
                    <td className="py-3 px-3">{toUnit(34)}</td>
                    <td className="py-3 px-3">{toUnit(30)}</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-semibold text-white">L (42R)</td>
                    <td className="py-3 px-3">{toUnit(42)}</td>
                    <td className="py-3 px-3">{toUnit(19)}</td>
                    <td className="py-3 px-3">{toUnit(25.5)}</td>
                    <td className="py-3 px-3">{toUnit(36)}</td>
                    <td className="py-3 px-3">{toUnit(31)}</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] bg-white/[0.01]">
                    <td className="py-3 px-3 font-semibold text-white">XL (44R)</td>
                    <td className="py-3 px-3">{toUnit(44)}</td>
                    <td className="py-3 px-3">{toUnit(19.75)}</td>
                    <td className="py-3 px-3">{toUnit(26)}</td>
                    <td className="py-3 px-3">{toUnit(38)}</td>
                    <td className="py-3 px-3">{toUnit(31.5)}</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-semibold text-white">XXL (46R)</td>
                    <td className="py-3 px-3">{toUnit(46)}</td>
                    <td className="py-3 px-3">{toUnit(20.5)}</td>
                    <td className="py-3 px-3">{toUnit(26.5)}</td>
                    <td className="py-3 px-3">{toUnit(40)}</td>
                    <td className="py-3 px-3">{toUnit(32)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Measuring Advice */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white/70 space-y-2">
              <p className="font-semibold text-white uppercase tracking-wider text-[11px]">
                How to Measure Your Body:
              </p>
              <ul className="list-disc list-inside space-y-1 text-white/60">
                <li><strong className="text-white">Chest:</strong> Measure around the fullest part of your chest, keeping tape horizontal under arms.</li>
                <li><strong className="text-white">Shoulder:</strong> Measure from the edge of the left shoulder bone across the back to the edge of the right.</li>
                <li><strong className="text-white">Waist:</strong> Measure around your natural waistline where your trousers normally sit.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Fit Recommender Calculator */}
        {activeTab === "calculator" && (
          <form onSubmit={handleCalculate} className="space-y-5">
            <p className="text-xs text-white/60">
              Enter your physical dimensions and preferred drape. Our bespoke atelier algorithm will recommend the ideal SPOGMAI size.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                  Height
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min="4"
                      max="7"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                      placeholder="Feet"
                      required
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-white/40">ft</span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                      placeholder="Inches"
                      required
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-white/40">in</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
                  Weight (Kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="45"
                    max="160"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                    placeholder="e.g. 75"
                    required
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-white/40">kg</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
                Drape & Fit Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "slim", label: "Slim Tapered", desc: "Closer to body silhouette" },
                  { id: "regular", label: "Structured Regular", desc: "Classic modern drape" },
                  { id: "classic", label: "Relaxed Heirloom", desc: "Traditional room for movement" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFitPreference(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      fitPreference === item.id
                        ? "border-white bg-white/10 text-white"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                    }`}
                  >
                    <div className="text-xs font-semibold text-white mb-0.5">{item.label}</div>
                    <div className="text-[10px] text-white/50">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
            >
              Calculate Recommended Size
            </button>

            {calculatedSize && (
              <div className="p-4 bg-neutral-900 border border-white/20 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 text-white flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 font-medium uppercase tracking-widest">
                      Recommended Size
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {calculatedSize}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-white/50">98% Fit Accuracy</span>
                </div>
              </div>
            )}
          </form>
        )}

        {/* Footer WhatsApp Bespoke concierge */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
          <span>Need custom bespoke tailoring measurements?</span>
          <a
            href="https://wa.me/923700349146?text=Salaam%2C%20I%20would%20like%20to%20consult%20with%20a%20SPOGMAI%20tailor%20regarding%20custom%20measurements."
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline font-medium"
          >
            WhatsApp Master Tailor (+92 370 0349146) →
          </a>
        </div>
      </div>
    </div>
  );
}
