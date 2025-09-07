# Gizmo Billing and Usage

This document lays out how subscriptions and usage-based billing work in Gizmo. We will build this up step by step.

## 1) Plans and Quotas (initial recommendation)

- Basic: $20/mo — includes $20 of usage credit per period
- Pro: $40/mo — includes $40 of usage credit per period
- Enterprise: custom — negotiated limits and pricing

Overage (usage-based) policy:
- After included credit is consumed, bill in $20 blocks (Cursor-style). Example: if Pro user reaches $57 of normalized usage in a period → base $40 + 1 overage block ($20) = $60; $17 remains toward the next block.

Rationale: using USD credit instead of raw units allows internal cost changes without changing public plan pages.

## 2) Environment Variables (needed so far)

Stripe
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`
- `NEXT_PUBLIC_APP_URL` (e.g., https://gizmo.app)

Price IDs (Stripe → Products → Prices)
- `NEXT_PUBLIC_PRICE_BASIC_MONTHLY`
- `NEXT_PUBLIC_PRICE_BASIC_YEARLY`
- `NEXT_PUBLIC_PRICE_PRO_MONTHLY`
- `NEXT_PUBLIC_PRICE_PRO_YEARLY`

Firebase Admin
- `FIREBASE_SERVICE_ACCOUNT` (JSON-encoded service account) or use ADC on the server

---
Next step (to be added): Usage normalization → how we convert tokens/GPU/API/storage into `usageUsd`, then Firestore schema and endpoints.

## 3) Usage Normalization (map activity → USD)

Goal: convert heterogeneous activity into one scalar `usageUsd`.

Suggested starting weights (tune later):
- Tokens: $0.000002 per token (≈$2 per 1M)
- GPU minutes: $0.08 per minute (≈$4.80 per hour)
- API calls: $0.005 per call (≈$5 per 1k)
- Storage: $0.02 per GB-month

Pseudocode
```ts
type UsageEvent =
  | { type: 'tokens'; count: number; ts: number }
  | { type: 'gpu_minutes'; minutes: number; ts: number }
  | { type: 'api_call'; count: number; ts: number }
  | { type: 'storage_gb_month'; gb: number; ts: number };

export function computeUsageUsd(event: UsageEvent): number {
  switch (event.type) {
    case 'tokens': return event.count * 0.000002;
    case 'gpu_minutes': return event.minutes * 0.08;
    case 'api_call': return event.count * 0.005;
    case 'storage_gb_month': return event.gb * 0.02;
    default: return 0;
  }
}
```

Period rollup (server job or on-write):
```ts
const includedUsd = plan === 'basic' ? 20 : plan === 'pro' ? 40 : customUsd;
const usageUsd = events.reduce((a,e)=>a+computeUsageUsd(e), 0);
const overageUsd = Math.max(0, usageUsd - includedUsd);
const blocks = Math.floor(overageUsd / 20);
```

When `blocks` increases, emit $20 charges (metered usage or invoice item) and remember how many blocks were already charged.

---

## 4) Firestore Schema (minimum viable)

- `users/{uid}`
  - `stripeCustomerId: string`
  - `plan: 'basic'|'pro'|'enterprise'` (synced from Stripe)
- `usage_events/{uid}/{eventId}` (append-only)
  - `ts: number` (ms), `type`, raw payload, `usd: number` (after normalization)
- `usage/{uid}` (period summary for dashboard)
  - `periodStart: ISO`, `periodEnd: ISO`
  - `usageUsd: number`, `quotaUsed: number`, `quotaTotal: number`
  - `overageBlocksCharged: number`
- (optional) `usage_rollups/{periodId}/{uid}` — archive snapshots per billing period

We’ll add endpoints and the server job in the next step.

## 5) Endpoints & Job Wiring

### Usage ingest endpoint (server)
- `POST /api/usage/event`
  - Headers: `Authorization: Bearer <Firebase ID token>`
  - Body: `UsageEvent` (see step 2), server computes `usd` via `computeUsageUsd`
  - Actions:
    - Append doc to `usage_events/{uid}`
    - Transaction: increment `usage/{uid}` summary fields (`usageUsd`, `quotaUsed`) and upsert `periodStart/End` if missing
  - Returns `{ ok: true }`

### Rollup / charging job
- Runs every few minutes (e.g., Cloud Scheduler → HTTP or cron on your server)
- For each active subscription/user:
  - Read `users/{uid}.plan` and `usage/{uid}` summary
  - Compute `includedUsd` (20 or 40 or custom)
  - `overageUsd = max(0, usageUsd - includedUsd)`
  - `blocksToCharge = floor(overageUsd/20) - overageBlocksCharged`
  - If `blocksToCharge > 0`:
    - Option A (metered item): `stripe.subscriptionItems.createUsageRecord(item, { quantity: blocksToCharge, action: 'increment', timestamp: now })`
    - Option B (invoice items): create invoice item(s) for `$20 * blocksToCharge`
    - Update Firestore `usage/{uid}.overageBlocksCharged += blocksToCharge`

### Webhook-driven rollover
- On `invoice.paid` (or `invoice.finalized`), archive period to `usage_rollups` and reset `usage/{uid}` counters for the next window

## 6) Minimal Server Pseudocode (TypeScript)

```ts
// POST /api/usage/event
export async function POST(req: Request) {
  const token = getBearer(req.headers);
  const { uid } = await adminAuth.verifyIdToken(token);
  const event = await req.json();
  const usd = computeUsageUsd(event);

  const batch = db.runTransaction(async (tx) => {
    const evRef = db.collection('usage_events').doc(uid).collection('events').doc();
    tx.set(evRef, { ...event, usd, ts: Date.now() });

    const sumRef = db.collection('usage').doc(uid);
    const snap = await tx.get(sumRef);
    const cur = snap.exists ? snap.data() : { usageUsd: 0, quotaUsed: 0 };
    tx.set(sumRef, {
      periodStart: cur.periodStart || new Date().toISOString(),
      periodEnd: cur.periodEnd || new Date(Date.now() + 30*24*3600*1000).toISOString(),
      usageUsd: (cur.usageUsd || 0) + usd,
      quotaUsed: (cur.quotaUsed || 0) + 1,
      quotaTotal: cur.quotaTotal || 100,
      overageBlocksCharged: cur.overageBlocksCharged || 0,
    }, { merge: true });
  });

  return json({ ok: true });
}
```

## 7) Stripe Integration Notes
- Create a metered price for `$20` blocks if you choose Option A (metered usage)
- Add it to each subscription as a second item alongside the base plan price
- The job posts `createUsageRecord` when blocks accumulate
- If using invoice items instead, create invoice items against the customer and optionally finalize the invoice

---
This completes the implementation plan. Next steps: build `/api/usage/event` and the scheduled rollup job, then test with a dev Stripe account and sample events.
