import { NextResponse } from "next/server";

// Note: Next.js route handlers run server-side; we verify the Firebase ID token
// and proxy to the Gizmo server's /billing/settings endpoints.

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    if (!idToken) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    const baseUrl = process.env.GIZMO_SERVER_URL || "http://localhost:8080";
    // Exchange token with server for user_id/token
    const verifyRes = await fetch(`${baseUrl}/auth/firebase/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: idToken }),
    });
    const verifyJson = await verifyRes.json();
    const ok = verifyJson?.result?.type === 2 && verifyJson?.result?.code === 0;
    if (!ok) return NextResponse.json({ error: "auth_failed" }, { status: 401 });
    const user = verifyJson?.data?.user_id;
    const token = verifyJson?.data?.token;
    const res = await fetch(`${baseUrl}/billing/settings?user=${encodeURIComponent(user)}&token=${encodeURIComponent(token)}`);
    const data = await res.json();
    return NextResponse.json(data?.data || data);
  } catch (e) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    if (!idToken) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    const { metered_enabled } = await request.json();
    const baseUrl = process.env.GIZMO_SERVER_URL || "http://localhost:8080";
    const verifyRes = await fetch(`${baseUrl}/auth/firebase/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: idToken }),
    });
    const verifyJson = await verifyRes.json();
    const ok = verifyJson?.result?.type === 2 && verifyJson?.result?.code === 0;
    if (!ok) return NextResponse.json({ error: "auth_failed" }, { status: 401 });
    const user = verifyJson?.data?.user_id;
    const token = verifyJson?.data?.token;
    const res = await fetch(`${baseUrl}/billing/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, token, metered_enabled: !!metered_enabled }),
    });
    const data = await res.json();
    return NextResponse.json(data?.data || data);
  } catch (e) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}


