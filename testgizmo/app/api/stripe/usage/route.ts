import { NextResponse } from "next/server";

// This route proxies the Gizmo server's subscription-aware usage so the dashboard
// displays the same counters and billing period as the backend.
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    if (!idToken) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const baseUrl = process.env.GIZMO_SERVER_URL || "http://localhost:8080";

    // Exchange Firebase ID token for Gizmo server credentials
    const verifyRes = await fetch(`${baseUrl}/auth/firebase/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: idToken }),
    });
    const verifyJson = await verifyRes.json();
    const verifyOk = verifyJson?.result?.type === 2 && verifyJson?.result?.code === 0;
    if (!verifyOk) return NextResponse.json({ error: "auth_failed" }, { status: 401 });

    const userId = verifyJson?.data?.user_id as string | undefined;
    const token = verifyJson?.data?.token as string | undefined;
    if (!userId || !token) return NextResponse.json({ error: "auth_failed" }, { status: 401 });

    // Fetch subscription-aware usage from Gizmo server
    const usageRes = await fetch(
      `${baseUrl}/gizmo/v1/usage?user=${encodeURIComponent(userId)}&token=${encodeURIComponent(token)}`
    );
    const usageJson = await usageRes.json();
    const usageOk = usageJson?.result?.type === 2 && usageJson?.result?.code === 0;
    if (!usageOk) return NextResponse.json({ error: "usage_fetch_failed" }, { status: 500 });

    // Return backend usage data as-is to preserve parity with server
    return NextResponse.json(usageJson.data || {});
  } catch (e) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}


