"use client";

import Link from "next/link";
import Image from "next/image";
import AuthButtons from "./AuthButtons";
import { useAuth } from "../providers/AuthProvider";

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="w-full sticky top-0 z-40">
      <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Left island: brand + nav */}
        <div className="flex items-center gap-6 rounded-full px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/70 border border-black/[.06] dark:border-white/[.10] shadow-sm">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logos/logo_white.png" alt="Gizmo" width={28} height={28} />
            <span className="text-base font-semibold tracking-tight">Gizmo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/pricing" className="hover:underline underline-offset-4">Pricing</Link>
            {user && (
              <Link href="/dashboard" className="hover:underline underline-offset-4">Dashboard</Link>
            )}
          </nav>
        </div>

        {/* Right island: auth buttons (Firebase-ready ids) */}
        <div className="flex items-center gap-2 rounded-full px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/70 border border-black/[.06] dark:border-white/[.10] shadow-sm">
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}


