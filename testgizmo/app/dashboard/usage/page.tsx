"use client";

import { useEffect, useState } from "react";
import { getFirebaseAuth } from "@/app/lib/firebaseClient";

type Usage = {
  current_usage: number;
  limit: number;
  usage_percentage: number;
  remaining_requests: number;
  limit_type: string;
  plan_id?: string;
  plan_name?: string;
  allowed: boolean;
  period_start?: number; // seconds since epoch
  period_end?: number;   // seconds since epoch
  day?: string;          // YYYY-MM-DD (for free tier daily usage)
};

export default function UsagePage() {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [loading, setLoading] = useState(true);
  const [metered, setMetered] = useState<boolean | null>(null);

  useEffect(() => {
    async function run() {
      try {
        const auth = getFirebaseAuth();
        const user = auth.currentUser;
        const token = user ? await user.getIdToken() : "";
        const [uRes, sRes] = await Promise.all([
          fetch("/api/stripe/usage", { headers: { Authorization: token ? `Bearer ${token}` : "" } }),
          fetch("/api/billing/settings", { headers: { Authorization: token ? `Bearer ${token}` : "" } }),
        ]);
        const uData = await uRes.json();
        const sData = await sRes.json();
        setUsage(uData as Usage);
        setMetered(Boolean(sData?.metered_enabled ?? sData?.data?.metered_enabled));
      } finally {
        setLoading(false);
      }
    }
    run();
  }, []);

  async function toggleMetered(next: boolean) {
    const auth = getFirebaseAuth();
    const user = auth.currentUser;
    const token = user ? await user.getIdToken() : "";
    await fetch("/api/billing/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" },
      body: JSON.stringify({ metered_enabled: next }),
    });
    setMetered(next);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Usage</h1>
      {loading ? (
        <p className="mt-4 text-foreground/70">Loading…</p>
      ) : (
        <>
          <div className="mt-4 flex items-center gap-3">
            <label className="text-sm text-foreground/70">Usage-based billing</label>
            <button
              onClick={() => metered !== null && toggleMetered(!metered)}
              className={`h-6 w-11 rounded-full transition-colors ${metered ? "bg-foreground" : "bg-black/[.15] dark:bg-white/[.20]"}`}
              aria-pressed={!!metered}
            >
              <span
                className={`block h-5 w-5 bg-white dark:bg-black rounded-full translate-y-0.5 transition-transform ${metered ? "translate-x-6" : "translate-x-0.5"}`}
              />
            </button>
            <span className="text-sm text-foreground/70">{metered ? "Enabled (overage billed)" : "Disabled (hard cap)"}</span>
          </div>

          {usage ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] p-6">
                <h2 className="text-lg font-medium">Current period</h2>
                {usage.period_start && usage.period_end ? (
                  <p className="mt-2 text-sm text-foreground/70">
                    {new Date(usage.period_start * 1000).toLocaleDateString()} – {new Date(usage.period_end * 1000).toLocaleDateString()}
                  </p>
                ) : usage.day ? (
                  <p className="mt-2 text-sm text-foreground/70">{usage.day}</p>
                ) : (
                  <p className="mt-2 text-sm text-foreground/70">No period data</p>
                )}
                <p className="mt-4 text-sm text-foreground/70">Plan: {usage.plan_name || usage.plan_id || "Unknown"}</p>
              </div>
              <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] p-6">
                <h2 className="text-lg font-medium">Quota</h2>
                <p className="mt-2 text-sm text-foreground/70">{usage.current_usage} / {usage.limit} ({usage.limit_type})</p>
                <div className="mt-3 h-2 w-full rounded-full bg-black/[.06] dark:bg-white/[.10] overflow-hidden">
                  <div className="h-full bg-foreground" style={{ width: `${Math.min(100, usage.usage_percentage)}%` }} />
                </div>
                <p className="mt-2 text-sm text-foreground/70">Remaining: {usage.remaining_requests}</p>
              </div>
              <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] p-6">
                <h2 className="text-lg font-medium">Status</h2>
                <p className="mt-2 text-sm text-foreground/70">{usage.allowed ? "Usage allowed" : "Limit exceeded"}</p>
                <p className="mt-4 text-sm">When usage-based billing is enabled, extra usage is billed. When disabled, requests stop at the quota.</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-foreground/70">No usage data.</p>
          )}
        </>
      )}
    </div>
  );
}


