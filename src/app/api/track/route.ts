import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim();

    if (!query) {
      return NextResponse.json({ error: "Order number or phone number required." }, { status: 400 });
    }

    // Try finding by order ID / order number first
    const order = db.getOrderById(query);
    if (order) {
      return NextResponse.json({ success: true, orders: [order] });
    }

    // Otherwise try finding by phone number
    const phoneOrders = db.getOrdersByPhone(query);
    if (phoneOrders.length > 0) {
      return NextResponse.json({ success: true, orders: phoneOrders });
    }

    return NextResponse.json(
      { success: false, error: "No orders found matching that Order ID or Phone Number." },
      { status: 404 }
    );
  } catch {
    return NextResponse.json({ success: false, error: "Error searching for order" }, { status: 500 });
  }
}
