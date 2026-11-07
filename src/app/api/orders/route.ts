import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const status = searchParams.get("status");

    let orders = db.getOrders();

    if (email) {
      orders = orders.filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase());
    }
    if (status && status !== "All") {
      orders = orders.filter((o) => o.status === status);
    }

    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Required field validation
    if (!body.customerName || !body.customerPhone || !body.shippingAddress || !body.city) {
      return NextResponse.json(
        { success: false, error: "Name, phone, address, and city are strictly required." },
        { status: 400 }
      );
    }

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Order must contain at least one valid item." },
        { status: 400 }
      );
    }

    const { order } = db.createOrder({
      customerName: body.customerName.trim(),
      customerEmail: body.customerEmail ? body.customerEmail.trim() : "customer@spogmai.com",
      customerPhone: body.customerPhone.trim(),
      shippingAddress: body.shippingAddress.trim(),
      city: body.city,
      postalCode: body.postalCode,
      orderNotes: body.orderNotes,
      items: body.items,
      couponCode: body.couponCode,
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
