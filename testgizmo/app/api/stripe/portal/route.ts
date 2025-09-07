import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminAuth, getAdminDb } from "@/app/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    if (!idToken) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const auth = getAdminAuth();
    const db = getAdminDb();
    const decoded = await auth.verifyIdToken(idToken);
    const uid = decoded.uid;

    const userSnap = await db.collection("users").doc(uid).get();
    const customerId = userSnap.get("stripeCustomerId");
    if (!customerId) return NextResponse.json({ error: "no_customer" }, { status: 400 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20" });
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}


