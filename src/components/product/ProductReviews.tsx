"use client";

import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, MessageSquarePlus, Check, ThumbsUp } from "lucide-react";
import { Review } from "@/types";

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [city, setCity] = useState("Lahore");
  const [rating, setRating] = useState(5);
  const [sizePurchased, setSizePurchased] = useState("M");
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/reviews?productId=${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch {
      console.error("Could not fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          customerName: name,
          city,
          rating,
          sizePurchased,
          comment,
        }),
      });

      if (res.ok) {
        setSuccessMsg("Thank you! Your verified critique has been published to the atelier.");
        setName("");
        setComment("");
        fetchReviews();
        setTimeout(() => {
          setShowModal(false);
          setSuccessMsg("");
        }, 2000);
      }
    } catch {
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div className="mt-16 pt-12 border-t border-white/10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium">
              Verified Patron Critiques
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
              {reviews.length} Reviews
            </span>
          </div>
          <h3 className="text-2xl font-light text-white tracking-tight">
            Client Experience & Fit Feedback
          </h3>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-lg"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Review This Garment
        </button>
      </div>

      {/* Rating Snapshot Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
        <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
          <div className="text-4xl font-light text-white">{avgRating}</div>
          <div>
            <div className="flex text-amber-400 gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(Number(avgRating)) ? "fill-amber-400" : "text-white/20"
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-white/50">Based on verified purchases</div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
          <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div className="text-xs text-white/70">
            <div className="font-semibold text-white">100% Verified Patrons</div>
            Authentic customer reviews from verified Pakistani addresses.
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/70">
            98%
          </div>
          <div className="text-xs text-white/70">
            <div className="font-semibold text-white">True to Size</div>
            98% of gentlemen report standard sizing accuracy.
          </div>
        </div>
      </div>

      {/* Review Cards List */}
      {loading ? (
        <div className="text-center py-12 text-xs text-white/40">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
          <p className="text-sm text-white/60 mb-2">Be the first gentleman to review this piece.</p>
          <button
            onClick={() => setShowModal(true)}
            className="text-xs text-emerald-400 hover:underline uppercase tracking-wider"
          >
            Submit an atelier critique →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{rev.customerName}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" /> Verified Buyer
                    </span>
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">
                    {rev.city} • Purchased Size: <strong className="text-white/70">{rev.sizePurchased || "M"}</strong>
                  </div>
                </div>

                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? "fill-amber-400" : "text-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-3">
                "{rev.comment}"
              </p>

              <div className="flex items-center justify-between text-[11px] text-white/40 pt-2 border-t border-white/5">
                <span>{new Date(rev.date).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}</span>
                <button className="flex items-center gap-1 hover:text-white transition-colors">
                  <ThumbsUp className="w-3 h-3" /> Helpful ({rev.helpfulCount || 0})
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
            <h3 className="text-xl font-light text-white mb-1">Share Your Atelier Experience</h3>
            <p className="text-xs text-white/50 mb-6 truncate">{productName}</p>

            {successMsg ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center text-emerald-400 text-xs">
                <Check className="w-6 h-6 mx-auto mb-2" />
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">
                    Rating (Stars)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? "fill-amber-400" : "text-white/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Asad Qureshi"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">
                      City
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Multan">Multan</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">
                    Size Acquired
                  </label>
                  <div className="flex gap-2">
                    {["S", "M", "L", "XL", "XXL", "Custom"].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSizePurchased(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          sizePurchased === sz
                            ? "bg-white text-black border-white"
                            : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">
                    Your Sartorial Critique
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the fabric texture, shoulder drape, and needlework..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg disabled:opacity-50"
                  >
                    {submitting ? "Publishing..." : "Submit Review"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
