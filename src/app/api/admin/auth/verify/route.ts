import { NextRequest, NextResponse } from "next/server";
import { AdminAuthService } from "@/lib/security/auth";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const cookieToken = req.cookies.get("spogmai_admin_session")?.value;

    const token = authHeader?.replace("Bearer ", "") || cookieToken;

    if (!token || !AdminAuthService.verifySessionToken(token)) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
