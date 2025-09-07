"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseAuth } from "../lib/firebaseClient";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuth } from "../providers/AuthProvider";

export default function AuthButtons() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const auth = getFirebaseAuth();

  async function handleGoogle() {
    setError(null);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e: any) {
      setError(e?.message ?? "Failed to sign in with Google");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full animate-pulse bg-black/[.06] dark:bg-white/[.10]" />
        <div className="h-8 w-24 rounded-full animate-pulse bg-black/[.06] dark:bg.white/[.10]" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">{user.email}</span>
        <button
          className="rounded-full border border-black/[.08] dark:border-white/[.14] px-4 py-2 text-sm hover:bg-black/[.04] dark:hover:bg-white/[.06]"
          onClick={() => signOut(auth)}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          id="auth-signin"
          className="rounded-full border border-black/[.08] dark:border-white/[.14] px-4 py-2 text-sm hover:bg-black/[.04] dark:hover:bg-white/[.06]"
          onClick={() => router.push("/signin?mode=signin")}
        >
          Sign in
        </button>
        <button
          id="download-now"
          className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
          onClick={() => router.push("/success")}
        >
          Download Now
        </button>
      </div>
      {/* For quick Google access from header if desired */}
      {/* <button onClick={handleGoogle} className="hidden" /> */}
    </>
  );
}


