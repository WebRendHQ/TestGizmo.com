"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getFirebaseAuth } from "../lib/firebaseClient";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

function SignInInner() {
  const search = useSearchParams();
  const initialMode = (search.get("mode") as "signin" | "signup") || "signin";
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const auth = useMemo(() => getFirebaseAuth(), []);

  // Wrap useSearchParams in a suspense boundary via client-only guard
  useEffect(() => {
    try {
      const m = (search.get("mode") as "signin" | "signup") || "signin";
      setMode(m);
    } catch {}
  }, [search]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Authentication failed";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setSubmitting(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push("/");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to sign in with Google";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="w-full min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-6xl px-4 w-full">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {mode === "signup" ? "Create your Gizmo account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-foreground/70">
            {mode === "signup" ? "Sign up to get early access and sync across tabs." : "Sign in to continue chatting with your tabs."}
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-md rounded-2xl border border-black/[.08] dark:border-white/[.12] bg-background p-6">
            <div className="flex items-center justify-center gap-3 text-sm">
              <button
                onClick={() => setMode("signin")}
                className={`rounded-full px-4 py-2 ${mode === "signin" ? "bg-foreground text-background" : "border border-black/[.12] dark:border-white/[.16]"}`}
              >
                Sign in
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`rounded-full px-4 py-2 ${mode === "signup" ? "bg-foreground text-background" : "border border-black/[.12] dark:border-white/[.16]"}`}
              >
                Create account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-black/[.12] dark:border-white/[.16] bg-transparent px-3 py-2 text-sm outline-none"
              />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-black/[.12] dark:border-white/[.16] bg-transparent px-3 py-2 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-60"
              >
                {mode === "signup" ? "Create account" : "Sign in"}
              </button>
            </form>

            <div className="mt-4">
              <button
                onClick={handleGoogle}
                disabled={submitting}
                className="w-full rounded-full border border-black/[.12] dark:border-white/[.16] px-4 py-2 text-sm hover:bg-black/[.04] dark:hover:bg-white/[.06] disabled:opacity-60"
              >
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-[60vh] flex items-center justify-center text-foreground/70">Loading…</div>}>
      <SignInInner />
    </Suspense>
  );
}


