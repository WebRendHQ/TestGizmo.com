"use client";

import Link from "next/link";
import Image from "next/image";
import AuthButtons from "./AuthButtons";
import { useAuth } from "../providers/AuthProvider";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/app/components/PageTransition";

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const { navigateWithFade } = usePageTransition();

  const linkBase = "rounded-full px-3 py-1.5 transition-colors duration-200";
  const activeClasses = "bg-black text-white dark:bg-white dark:text-black";
  const hoverClasses = "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black";

  const linkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(`${href}/`);
    return `${linkBase} ${isActive ? activeClasses : hoverClasses}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // let default
    e.preventDefault();
    navigateWithFade(href);
  };
  return (
    <header className="w-full sticky top-0 z-[999999999]">
      <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Left: unified navbar container with inner wrapper for nav items */}
        <div className="flex items-center gap-4 rounded-full px-3 py-2 bg-black/[.03] dark:bg-white/[.06] border border-black/[.06] dark:border-white/[.10] shadow-sm">
          <Link href="/" className="flex items-center gap-2" onClick={(e) => handleClick(e, "/")}>
            {/* Swap logo based on color scheme */}
            <Image src="/logos/logo.png" alt="Gizmo" width={28} height={28} className="block dark:hidden" />
            <Image src="/logos/logo_white.png" alt="Gizmo" width={28} height={28} className="hidden dark:block" />
            <span className="text-base tracking-tight" style={{ fontFamily: "var(--font-genova)" }}>Gizmo</span>
          </Link>
          {/* inner wrapper for nav items only */}
          <div className="hidden md:flex items-center gap-6 rounded-full px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/70 border border-black/[.06] dark:border-white/[.10]">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/pricing" className={linkClass("/pricing")} onClick={(e) => handleClick(e, "/pricing")}>Pricing</Link>
              <Link href="/features" className={linkClass("/features")} onClick={(e) => handleClick(e, "/features")}>Features</Link>
              <Link href="/enterprise" className={linkClass("/enterprise")} onClick={(e) => handleClick(e, "/enterprise")}>Enterprise</Link>
              <Link href="/blog" className={linkClass("/blog")} onClick={(e) => handleClick(e, "/blog")}>AI Blog</Link>
              <Link href="/docs" className={linkClass("/docs")} onClick={(e) => handleClick(e, "/docs")}>Docs</Link>
              <Link href="/careers" className={linkClass("/careers")} onClick={(e) => handleClick(e, "/careers")}>Careers</Link>
              {user && (
                <Link href="/dashboard" className={linkClass("/dashboard")} onClick={(e) => handleClick(e, "/dashboard")}>Dashboard</Link>
              )}
            </nav>
          </div>
        </div>

        {/* Right island: auth buttons */}
        <div className="flex items-center gap-2 rounded-full px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/70 border border-black/[.06] dark:border-white/[.10] shadow-sm">
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}


