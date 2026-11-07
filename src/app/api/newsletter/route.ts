import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Valid email required." }, { status: 400 });
    }

    db.addSubscriber(email);
    return NextResponse.json({ success: true, message: "Subscribed to SPOGMAI VIP list." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
