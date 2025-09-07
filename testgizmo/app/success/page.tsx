"use client";

import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_GIZMO_DOWNLOAD_URL;
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = "Gizmo.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  return (
    <main className="w-full min-h-[70vh] flex items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Downloading Gizmo…</h1>
        <p className="mt-3 text-foreground/70">
          If the download doesn’t start, <a className="underline" href={process.env.NEXT_PUBLIC_GIZMO_DOWNLOAD_URL || "#"}>click here</a>.
        </p>
        <div className="mt-10 text-left text-sm md:text-base">
          <h2 className="text-base md:text-lg font-medium">Install in Blender</h2>
          <ol className="mt-3 list-decimal pl-6 space-y-1">
            <li>Open Blender → Preferences → Add-ons</li>
            <li>Click “Install…”, select Gizmo.zip</li>
            <li>Enable the add-on checkbox</li>
            <li>Save Preferences and restart Blender if prompted</li>
            <li>Find Gizmo in the sidebar (N) under Add-ons</li>
          </ol>
        </div>
      </div>
    </main>
  );
}


