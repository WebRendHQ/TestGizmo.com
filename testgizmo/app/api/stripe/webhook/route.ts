import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getStripe } from "@/app/lib/stripe";
import { getAdminDb } from "@/app/lib/firebaseAdmin";

export async function POST(request: Request) {
  const sig = (await headers()).get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET as string;
  const stripe = getStripe();
  const db = getAdminDb();

  let event;
  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, sig as string, secret);
  } catch (err) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        await db.collection("checkouts").doc(session.id).set({ status: "completed", subscriptionId: session.subscription }, { merge: true });
        if (session.customer) {
          // Optionally persist customerId to user record via metadata.uid if needed
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.created":
      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        await db.collection("subscriptions").doc(sub.id).set({
          status: sub.status,
          currentPeriodEnd: sub.current_period_end * 1000,
          customer: sub.customer,
          price: sub.items?.data?.[0]?.price?.id,
        }, { merge: true });
        break;
      }
      case "invoice.finalized":
      case "invoice.paid": {
        const inv = event.data.object as any;
        await db.collection("invoices").doc(inv.id).set({
          total: inv.total,
          customer: inv.customer,
          hostedInvoiceUrl: inv.hosted_invoice_url,
          created: inv.created * 1000,
          status: inv.status,
        }, { merge: true });
        break;
      }
    }
  } catch (e) {
    return NextResponse.json({ error: "processing_error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: { bodyParser: false },
};


