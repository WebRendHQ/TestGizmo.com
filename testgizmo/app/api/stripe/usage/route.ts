import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/app/lib/firebaseAdmin";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    if (!idToken) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const auth = getAdminAuth();
    const db = getAdminDb();
    const decoded = await auth.verifyIdToken(idToken);
    const uid = decoded.uid;

    const usageRef = db.collection("usage").doc(uid);
    const snap = await usageRef.get();
    const data = snap.exists ? snap.data() : undefined;

    return NextResponse.json({
      periodStart: data?.periodStart || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      periodEnd: data?.periodEnd || new Date().toISOString(),
      usageUsd: data?.usageUsd || 0,
      quotaUsed: data?.quotaUsed || 0,
      quotaTotal: data?.quotaTotal || 100,
      overageBlocksCharged: data?.overageBlocksCharged || 0,
    });
  } catch (e) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}


