import { NextResponse } from "next/server";
import { db } from "@/lib/db/store";

export async function GET() {
  const products = db.getProducts();
  const orders = db.getOrders();
  const returns = db.getReturns();

  return NextResponse.json({
    status: "HEALTHY",
    brand: "SPOGMAI Haute Couture Menswear",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      storageType: "Atomic JSON Disk Persistence + Supabase Schema Ready",
      productsCount: products.length,
      ordersCount: orders.length,
      returnsCount: returns.length,
      persistenceFile: "data/store.json",
    },
    integrations: {
      couriers: ["Trax", "PostEx", "Leopards", "TCS", "CallCourier"],
      payments: ["Cash on Delivery (Active)", "JazzCash (Architecture Ready)", "Easypaisa (Architecture Ready)"],
      whatsappNotificationEngine: "Active (+92 370 0349146)",
    },
  });
}
