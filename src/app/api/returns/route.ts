import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { CourierService } from "@/lib/couriers";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const item = db.getReturnById(id);
      if (!item) {
        return NextResponse.json({ error: "Return request not found" }, { status: 404 });
      }
      return NextResponse.json(item);
    }
    const returns = db.getReturns();
    return NextResponse.json(returns);
  } catch {
    return NextResponse.json({ error: "Failed to fetch returns" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderNumber,
      customerName,
      customerPhone,
      customerEmail,
      items,
      reason,
      action,
      replacementSize,
      bankDetails,
    } = body;

    if (!orderNumber || !customerName || !customerPhone || !items?.length || !reason || !action) {
      return NextResponse.json(
        { error: "Missing required return request fields." },
        { status: 400 }
      );
    }

    const returnRequest = db.createReturn({
      orderNumber,
      customerName,
      customerPhone,
      customerEmail: customerEmail || "",
      items,
      reason,
      action,
      replacementSize,
      bankDetails,
    });

    return NextResponse.json(returnRequest, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to process return request";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, adminNotes, courierTracking, autoBookPickup } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Return ID and status required" }, { status: 400 });
    }

    let tracking = courierTracking;
    if (autoBookPickup && status === "Pickup Scheduled") {
      const item = db.getReturnById(id);
      if (item) {
        const booking = await CourierService.bookShipment("Trax", {
          orderNumber: `${item.ticketNumber}-REV`,
          customerName: item.customerName,
          customerPhone: item.customerPhone,
          customerAddress: "Patron Residence",
          city: "Pakistan",
          orderAmount: 0,
          weightKg: 1.5,
          itemDescription: `Reverse Pickup Return for ${item.orderNumber}`,
          pieces: item.items.length,
        });
        tracking = booking.trackingNumber;
      }
    }

    const updated = db.updateReturnStatus(id, status, adminNotes, tracking);
    if (!updated) {
      return NextResponse.json({ error: "Return request not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update return request" }, { status: 500 });
  }
}
