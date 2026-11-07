import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET() {
  try {
    const coupons = db.getCoupons();
    return NextResponse.json({ success: true, coupons });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.code || !body.discountValue) {
      return NextResponse.json(
        { success: false, error: "Code and discountValue are required." },
        { status: 400 }
      );
    }

    const newCoupon = db.createCoupon({
      code: body.code.trim().toUpperCase(),
      discountType: body.discountType || "percentage",
      discountValue: Number(body.discountValue),
      minOrderAmount: body.minOrderAmount ? Number(body.minOrderAmount) : 0,
      expiryDate: body.expiryDate || "2027-12-31T23:59:59.000Z",
      usageLimit: body.usageLimit ? Number(body.usageLimit) : 100,
      isActive: true,
    });

    return NextResponse.json({ success: true, coupon: newCoupon }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
