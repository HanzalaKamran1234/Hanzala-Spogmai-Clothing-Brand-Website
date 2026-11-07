import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Admin account verification
    const isAdmin =
      (email.toLowerCase() === "admin@spogmai.com" || email.toLowerCase() === "admin") &&
      password === "spogmai2026";

    const user = {
      id: isAdmin ? "admin-01" : `user-${Date.now().toString().slice(-4)}`,
      email: email.toLowerCase(),
      name: isAdmin ? "Head of Atelier (Admin)" : email.split("@")[0],
      role: isAdmin ? "admin" : "customer",
      token: `spog_tok_${Buffer.from(email + ":" + Date.now()).toString("base64")}`,
    };

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
