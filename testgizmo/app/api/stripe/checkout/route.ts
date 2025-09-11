import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminAuth, getAdminDb } from "@/app/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { tier, interval, priceId } = await request.json();
    const authHeader = request.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    if (!idToken) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const auth = getAdminAuth();
    const db = getAdminDb();
    const decoded = await auth.verifyIdToken(idToken);
    const uid = decoded.uid;

    if (!priceId) return NextResponse.json({ error: "missing_price" }, { status: 400 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    // Ensure Stripe customer id stored with user and align metadata for server linkage
    const userRef = db.collection("users").doc(uid);
    const userSnap = await userRef.get();
    let customerId = userSnap.get("stripeCustomerId") as string | undefined;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: decoded.email || undefined,
        // The Gizmo server expects metadata.user_id to associate subscriptions
        metadata: { firebase_uid: uid, user_id: uid },
      });
      customerId = customer.id;
      await userRef.set({ stripeCustomerId: customerId }, { merge: true });
    } else {
      // Ensure metadata.user_id is present for existing customers as well
      try {
        await stripe.customers.update(customerId, { metadata: { user_id: uid, firebase_uid: uid } });
      } catch (_) {
        // non-fatal
      }
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_collection: "always", // save payment method for future overage charges
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pricing`,
      allow_promotion_codes: true,
      // Include user_id for server-side webhook association (defensive)
      metadata: { uid, user_id: uid, tier, interval },
    });

    await db.collection("checkouts").doc(session.id).set({
      uid,
      tier,
      interval,
      priceId,
      sessionId: session.id,
      createdAt: Date.now(),
      status: "pending",
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}


