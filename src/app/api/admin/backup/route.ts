import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/store";
import { AdminAuthService } from "@/lib/security/auth";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const cookieToken = req.cookies.get("spogmai_admin_session")?.value;
    const token = authHeader?.replace("Bearer ", "") || cookieToken;

    if (!token || !AdminAuthService.verifySessionToken(token)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const backup = db.exportBackup();
    return new NextResponse(JSON.stringify(backup, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="spogmai_backup_${new Date().toISOString().slice(0, 10)}.json"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate backup" }, { status: 500 });
  }
}
