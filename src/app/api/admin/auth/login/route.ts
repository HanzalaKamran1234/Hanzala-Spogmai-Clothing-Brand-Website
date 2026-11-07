import { NextRequest, NextResponse } from "next/server";
import { AdminAuthService } from "@/lib/security/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!AdminAuthService.verifyPassword(password)) {
      return NextResponse.json(
        { error: "Invalid administrator credentials" },
        { status: 401 }
      );
    }

    const token = AdminAuthService.createSessionToken();

    const response = NextResponse.json({
      success: true,
      message: "Administrator session established",
      token,
    });

    response.cookies.set("spogmai_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Authentication processing failed" },
      { status: 500 }
    );
  }
}
