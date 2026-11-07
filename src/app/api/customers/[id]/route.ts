import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { email, notes, tags, tier } = body;

    const targetEmail = email || id;
    const success = db.updateCustomerMeta(targetEmail, { notes, tags, tier });

    return NextResponse.json({ success });
  } catch {
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}
