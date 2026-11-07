/**
 * Server-side Admin Authorization for SPOGMAI
 * Replaces client-side plain passkeys with cryptographically secure session tokens
 * and timing-safe server-side verification.
 */

import crypto from "crypto";

const DEFAULT_ADMIN_KEY = process.env.ADMIN_SECRET_KEY || "spogmai_luxury_admin_2026";

export class AdminAuthService {
  /**
   * Generates a signed admin session token with timestamp
   */
  public static createSessionToken(): string {
    const timestamp = Date.now();
    const nonce = crypto.randomBytes(16).toString("hex");
    const payload = `${timestamp}:${nonce}`;
    const signature = crypto
      .createHmac("sha256", DEFAULT_ADMIN_KEY)
      .update(payload)
      .digest("hex");

    return Buffer.from(`${payload}:${signature}`).toString("base64");
  }

  /**
   * Verifies an incoming session token
   */
  public static verifySessionToken(token: string): boolean {
    try {
      if (!token) return false;
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      const parts = decoded.split(":");
      if (parts.length !== 3) return false;

      const [timestampStr, nonce, receivedSig] = parts;
      const timestamp = parseInt(timestampStr, 10);

      // Check token expiration (24 hours)
      const maxAge = 24 * 60 * 60 * 1000;
      if (Date.now() - timestamp > maxAge || timestamp > Date.now() + 60000) {
        return false;
      }

      const payload = `${timestampStr}:${nonce}`;
      const expectedSig = crypto
        .createHmac("sha256", DEFAULT_ADMIN_KEY)
        .update(payload)
        .digest("hex");

      return crypto.timingSafeEqual(
        Buffer.from(receivedSig),
        Buffer.from(expectedSig)
      );
    } catch {
      return false;
    }
  }

  /**
   * Verifies submitted password against configured admin credentials using timing-safe comparison
   */
  public static verifyPassword(inputPassword: string): boolean {
    const validPassword = process.env.ADMIN_PASSWORD || "spogmai2026";
    if (!inputPassword || typeof inputPassword !== "string") return false;

    const inputBuffer = Buffer.from(inputPassword);
    const validBuffer = Buffer.from(validPassword);

    if (inputBuffer.length !== validBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(inputBuffer, validBuffer);
  }
}
