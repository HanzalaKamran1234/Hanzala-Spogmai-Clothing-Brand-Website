import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { CourierService } from "@/lib/couriers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = db.getOrderById(id);

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error fetching order";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // 1. Handle COD Verification Status update
    if (body.codVerificationStatus) {
      const updated = db.updateCodVerification(id, body.codVerificationStatus);
      if (!updated) {
        return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, order: updated });
    }

    // 2. Handle Courier Dispatch auto-booking if requested
    let courierInfo = body.courierInfo;
    if (body.status === "Shipped" && body.autoBookCourier) {
      const order = db.getOrderById(id);
      if (order) {
        const courierChoice = body.courierChoice || "Trax";
        const booking = await CourierService.bookShipment(courierChoice, {
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          customerAddress: order.shippingAddress,
          city: order.city,
          orderAmount: order.paymentStatus === "Paid" ? 0 : order.total,
          weightKg: 1.5,
          itemDescription: `SPOGMAI Menswear: ${order.items.map((i) => i.productName).join(", ")}`,
          pieces: order.items.length,
        });

        courierInfo = {
          courierName: booking.courierName,
          trackingNumber: booking.trackingNumber,
          trackingUrl: booking.trackingUrl,
          dispatchedAt: new Date().toISOString(),
        };
      }
    }

    // 3. Regular Status update
    if (body.status) {
      const updated = db.updateOrderStatus(id, body.status, body.paymentStatus, courierInfo);
      if (!updated) {
        return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, order: updated });
    }

    return NextResponse.json({ success: false, error: "No valid action specified." }, { status: 400 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error updating order";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
