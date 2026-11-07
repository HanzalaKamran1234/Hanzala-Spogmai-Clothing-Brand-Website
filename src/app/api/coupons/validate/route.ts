import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, subtotal } = body;

    if (!code) {
      return NextResponse.json({ valid: false, discount: 0, message: "Code required" }, { status: 400 });
    }

    const result = db.validateCoupon(code, Number(subtotal) || 0);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ valid: false, discount: 0, message: error.message }, { status: 500 });
  }
}
