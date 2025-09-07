"use client";

import { useEffect, useState } from "react";
import { getFirebaseAuth } from "@/app/lib/firebaseClient";

type Usage = {
  periodStart: string;
  periodEnd: string;
  usageUsd: number;
  quotaUsed: number;
  quotaTotal: number;
  overageBlocksCharged: number;
};

export default function UsagePage() {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const auth = getFirebaseAuth();
        const user = auth.currentUser;
        const token = user ? await user.getIdToken() : "";
        const res = await fetch("/api/stripe/usage", { headers: { Authorization: token ? `Bearer ${token}` : "" } });
        const data = await res.json();
        setUsage(data);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Usage</h1>
      {loading ? (
        <p className="mt-4 text-foreground/70">Loading…</p>
      ) : usage ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] p-6">
            <h2 className="text-lg font-medium">Current period</h2>
            <p className="mt-2 text-sm text-foreground/70">
              {new Date(usage.periodStart).toLocaleDateString()} – {new Date(usage.periodEnd).toLocaleDateString()}
            </p>
            <p className="mt-4 text-xl">${usage.usageUsd.toFixed(2)} usage</p>
          </div>
          <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] p-6">
            <h2 className="text-lg font-medium">Quota</h2>
            <p className="mt-2 text-sm text-foreground/70">{usage.quotaUsed} / {usage.quotaTotal}</p>
            <div className="mt-3 h-2 w-full rounded-full bg-black/[.06] dark:bg-white/[.10] overflow-hidden">
              <div className="h-full bg-foreground" style={{ width: `${Math.min(100, (usage.quotaUsed / usage.quotaTotal) * 100)}%` }} />
            </div>
          </div>
          <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] p-6">
            <h2 className="text-lg font-medium">Overage blocks</h2>
            <p className="mt-2 text-sm text-foreground/70">Charged blocks: {usage.overageBlocksCharged}</p>
            <p className="mt-4 text-sm">With usage-based pricing on, every $20 beyond your included usage adds a $20 charge.</p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-foreground/70">No usage data.</p>
      )}
    </div>
  );
}


