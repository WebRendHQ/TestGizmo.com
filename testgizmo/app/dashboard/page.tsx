"use client";

import { useAuth } from "../providers/AuthProvider";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <main className="w-full min-h-[70vh] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Dashboard</h1>
        {!user ? (
          <p className="mt-4 text-foreground/70">
            You are not signed in. Please <Link className="underline" href="/signin">sign in</Link>.
          </p>
        ) : (
          <div className="mt-6 grid gap-6">
            <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] p-6">
              <h2 className="text-lg font-medium">Welcome</h2>
              <p className="mt-2 text-foreground/70">Signed in as {user.email}</p>
            </div>
            <div className="rounded-2xl border border-black/[.08] dark:border-white/[.12] p-6">
              <h2 className="text-lg font-medium">Getting started</h2>
              <ul className="mt-2 list-disc pl-5 text-foreground/80">
                <li>Upload a project</li>
                <li>Connect integrations</li>
                <li>Invite teammates</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


