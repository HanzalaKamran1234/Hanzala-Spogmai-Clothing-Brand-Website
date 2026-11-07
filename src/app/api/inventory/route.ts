import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET() {
  try {
    const products = db.getProducts().map((p) => ({
      id: p.id,
      sku: p.sku,
      name: p.name,
      category: p.category,
      price: p.price,
      stockQuantity: p.stockQuantity,
      inStock: p.inStock,
      isLowStock: p.stockQuantity < 15,
      sizes: p.sizes,
    }));
    return NextResponse.json({ success: true, inventory: products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { success: false, error: "productId and quantity are required." },
        { status: 400 }
      );
    }

    const success = db.updateStock(productId, Number(quantity));
    if (!success) {
      return NextResponse.json({ success: false, error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Inventory updated successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
