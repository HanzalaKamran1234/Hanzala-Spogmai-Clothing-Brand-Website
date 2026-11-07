import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const collection = searchParams.get("collection");
    const featured = searchParams.get("featured");

    let products = db.getProducts();

    if (category && category !== "All") {
      products = products.filter((p) => p.category === category);
    }
    if (collection && collection !== "All") {
      products = products.filter((p) => p.collection === collection);
    }
    if (featured === "true") {
      products = products.filter((p) => p.isFeatured);
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, error: "Name, price, and category are required." },
        { status: 400 }
      );
    }

    const newProduct = db.createProduct({
      sku: body.sku || `SPOG-${Date.now().toString().slice(-4)}`,
      name: body.name,
      subtitle: body.subtitle || "",
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      category: body.category,
      collection: body.collection || "New Arrivals",
      description: body.description || "",
      details: body.details || ["Tailored with pure fabrics", "Handcrafted in Pakistan"],
      fabric: body.fabric || "Pure Worsted Wool & Raw Silk",
      careInstructions: body.careInstructions || ["Dry Clean Only"],
      sizes: body.sizes || ["S", "M", "L", "XL", "Custom"],
      colors: body.colors || [{ name: "Obsidian Black", hex: "#0a0a0a" }],
      images: body.images?.length
        ? body.images
        : ["https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop"],
      isNewArrival: Boolean(body.isNewArrival),
      isBestSeller: Boolean(body.isBestSeller),
      isFeatured: Boolean(body.isFeatured),
      inStock: body.stockQuantity ? Number(body.stockQuantity) > 0 : true,
      stockQuantity: body.stockQuantity ? Number(body.stockQuantity) : 25,
      rating: 5.0,
      reviewsCount: 0,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
