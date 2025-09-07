"use client";

import { useMemo, useState } from "react";
import { getFirebaseAuth } from "../lib/firebaseClient";

const MONTHLY = {
  basic: 20,
  pro: 40,
};

const YEARLY = {
  basic: 200, // 2 months free
  pro: 400, // 2 months free
};

const TIERS = [
  { id: "basic", name: "Basic", features: ["Personal use", "Standard support"] },
  { id: "pro", name: "Pro", features: ["Teams", "Priority support", "Usage-based add-ons"] },
  { id: "enterprise", name: "Enterprise", features: ["SAML/SSO", "Custom limits", "Dedicated support"], cta: "Talk to sales" },
];

export default function SubscriptionsPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [interval, setInterval] = useState<"month" | "year">("month");

  const priceIds = useMemo(() => ({
    basic: {
      month: process.env.NEXT_PUBLIC_PRICE_BASIC_MONTHLY || "",
      year: process.env.NEXT_PUBLIC_PRICE_BASIC_YEARLY || "",
    },
    pro: {
      month: process.env.NEXT_PUBLIC_PRICE_PRO_MONTHLY || "",
      year: process.env.NEXT_PUBLIC_PRICE_PRO_YEARLY || "",
    },
  }), []);

  async function startCheckout(tier: string) {
    setLoading(tier);
    try {
      const auth = getFirebaseAuth();
      const currentUser = auth.currentUser;
      const idToken = currentUser ? await currentUser.getIdToken() : "";
      const priceId = (priceIds as any)[tier]?.[interval];

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: idToken ? `Bearer ${idToken}` : "" },
        body: JSON.stringify({ tier, interval, priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  }

  async function openPortal() {
    setLoading("portal");
    try {
      const auth = getFirebaseAuth();
      const currentUser = auth.currentUser;
      const idToken = currentUser ? await currentUser.getIdToken() : "";
      const res = await fetch("/api/stripe/portal", { method: "POST", headers: { Authorization: idToken ? `Bearer ${idToken}` : "" } });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="w-full py-16 md:py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-center">Choose your plan</h1>
        <p className="mt-2 text-center text-foreground/70">Simple pricing with usage-based add-ons inspired by Cursor. Monthly or yearly.</p>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm">
          <button onClick={() => setInterval("month")} className={`rounded-full px-4 py-1.5 border ${interval === "month" ? "bg-foreground text-background" : "border-black/[.12] dark:border-white/[.16]"}`}>Monthly</button>
          <button onClick={() => setInterval("year")} className={`rounded-full px-4 py-1.5 border ${interval === "year" ? "bg-foreground text-background" : "border-black/[.12] dark:border-white/[.16]"}`}>Yearly</button>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div key={tier.id} className="rounded-2xl border border-black/[.08] dark:border-white/[.12] p-6 flex flex-col">
              <h2 className="text-xl font-semibold">{tier.name}</h2>
              <div className="mt-2 flex items-baseline gap-1">
                {tier.id === "enterprise" ? (
                  <span className="text-3xl font-semibold">Custom</span>
                ) : (
                  <>
                    <span className="text-3xl font-semibold">${interval === "month" ? (MONTHLY as any)[tier.id] : (YEARLY as any)[tier.id]}</span>
                    <span className="text-foreground/70">{interval === "month" ? "/mo" : "/yr"}</span>
                  </>
                )}
              </div>
              <ul className="mt-4 space-y-1 text-sm text-foreground/80">
                {tier.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="mt-6">
                {tier.id === "enterprise" ? (
                  <a href="mailto:sales@gizmo.app" className="inline-flex rounded-full border px-4 py-2 text-sm">{tier.cta || "Talk to sales"}</a>
                ) : (
                  <button onClick={() => startCheckout(tier.id)} disabled={loading !== null} className="inline-flex rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-60">
                    {loading === tier.id ? "Redirecting…" : "Get started"}
                  </button>
                )}
              </div>
              {tier.id !== "enterprise" && (
                <p className="mt-4 text-xs text-foreground/60">
                  Includes monthly quota. With usage-based pricing enabled, overages are billed in $20 blocks after crossing $20 of usage.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button onClick={openPortal} disabled={loading !== null} className="inline-flex rounded-full border px-4 py-2 text-sm">
            {loading === "portal" ? "Opening…" : "Manage subscription"}
          </button>
        </div>
      </div>
    </main>
  );
}


