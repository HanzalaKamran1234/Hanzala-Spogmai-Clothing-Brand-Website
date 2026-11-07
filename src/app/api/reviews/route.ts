import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId") || undefined;
    const reviews = db.getReviews(productId);
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, customerName, city, rating, comment, sizePurchased } = body;

    if (!productId || !customerName || !rating || !comment) {
      return NextResponse.json(
        { error: "Required fields missing (productId, customerName, rating, comment)" },
        { status: 400 }
      );
    }

    const review = db.createReview({
      productId,
      customerName,
      city: city || "Pakistan",
      rating: Number(rating),
      comment,
      sizePurchased: sizePurchased || "M",
      verified: true,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to post review";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
