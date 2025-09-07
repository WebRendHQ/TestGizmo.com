"use client";

import { useState } from "react";

const tabs = [
  { id: "welcome", label: "Welcome" },
  { id: "installation", label: "Installation" },
];

export default function DocsTabbedPage() {
  const [active, setActive] = useState<string>("welcome");

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
      <aside className="md:sticky md:top-16 h-max md:h-[calc(100vh-4rem)] md:overflow-auto pr-0 md:pr-6 md:border-r md:border-black/[.06] md:dark:border-white/[.10]">
        <h1 className="text-xl font-semibold tracking-tight mb-3">Gizmo Docs</h1>
        <nav className="space-y-1 text-sm">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`w-full text-left rounded-lg px-3 py-2 hover:bg-black/[.04] dark:hover:bg-white/[.06] ${active === t.id ? "bg-black/[.05] dark:bg-white/[.06]" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>
      <section className="min-w-0">
        {active === "welcome" && (
          <div className="max-w-3xl">
            <header className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/[.08] dark:border-white/[.12] px-3 py-1 text-xs text-foreground/70">Getting started</div>
              <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Welcome to Gizmo</h1>
              <p className="mt-2 text-foreground/70 md:text-base">Gizmo is an AI assistant for Blender artists. This guide helps you install the add‑on, find the panel, and start working faster.</p>
            </header>

            <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] p-4 md:p-5 bg-background/60">
              <h2 className="text-base font-medium">Requirements</h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80">
                <li>Blender 3.6 or newer</li>
                <li>Access to <code>Gizmo.zip</code> (download from the website)</li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold">What’s inside</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-black/[.08] dark:border-white/[.12] p-4">
                  <h3 className="text-sm font-medium">Installation</h3>
                  <p className="mt-1 text-sm text-foreground/70">Install the add‑on from a <code>.zip</code> file and enable it in Preferences.</p>
                </div>
                <div className="rounded-xl border border-black/[.08] dark:border-white/[.12] p-4">
                  <h3 className="text-sm font-medium">Finding the panel</h3>
                  <p className="mt-1 text-sm text-foreground/70">Open the <strong>N</strong> sidebar in the 3D Viewport and look for <strong>Gizmo</strong>.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border-l-4 border-emerald-500/70 bg-emerald-500/5 p-4">
              <p className="text-sm text-foreground/80"><strong>Tip:</strong> Keep Blender’s System Console open to capture errors while installing (Windows → Toggle System Console).</p>
            </div>
          </div>
        )}
        {active === "installation" && (
          <div className="max-w-3xl">
            <header className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/[.08] dark:border-white/[.12] px-3 py-1 text-xs text-foreground/70">Setup</div>
              <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Installation</h1>
              <p className="mt-2 text-foreground/70 md:text-base">Install the Gizmo add‑on from a <code>.zip</code> file, enable it, and open the panel.</p>
            </header>

            <ol className="space-y-4">
              <li className="rounded-xl border border-black/[.08] dark:border-white/[.12] p-4">
                <h3 className="text-sm font-medium">1) Download</h3>
                <p className="mt-1 text-sm text-foreground/80">Grab <code>Gizmo.zip</code> from the website’s download link.</p>
              </li>
              <li className="rounded-xl border border-black/[.08] dark:border-white/[.12] p-4">
                <h3 className="text-sm font-medium">2) Install the add‑on</h3>
                <p className="mt-1 text-sm text-foreground/80">Blender → <strong>Edit</strong> → <strong>Preferences…</strong> → <strong>Add‑ons</strong> → <strong>Install…</strong> → select <code>Gizmo.zip</code>.</p>
              </li>
              <li className="rounded-xl border border-black/[.08] dark:border-white/[.12] p-4">
                <h3 className="text-sm font-medium">3) Enable & save</h3>
                <p className="mt-1 text-sm text-foreground/80">Enable the checkbox next to <strong>Gizmo</strong> and click <strong>Save Preferences</strong>. Restart if prompted.</p>
              </li>
              <li className="rounded-xl border border-black/[.08] dark:border-white/[.12] p-4">
                <h3 className="text-sm font-medium">4) Open the panel</h3>
                <p className="mt-1 text-sm text-foreground/80">In the 3D Viewport press <kbd className="rounded border px-1.5 py-0.5 text-xs">N</kbd> to open the sidebar and select <strong>Gizmo</strong>.</p>
              </li>
            </ol>

            <div className="mt-8 rounded-2xl border-l-4 border-amber-500/70 bg-amber-500/5 p-4">
              <p className="text-sm text-foreground/80"><strong>Troubleshooting:</strong> If the add‑on doesn’t appear, confirm you installed the correct <code>.zip</code>, update Blender, and check the System Console for any errors.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}


