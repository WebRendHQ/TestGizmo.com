"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const nav = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/usage", label: "Usage" },
    { href: "/subscriptions", label: "Billing" },
  ];

  return (
    <div className="w-full min-h-[70vh] flex">
      <aside className="w-56 shrink-0 border-r border-black/[.08] dark:border-white/[.12] p-4">
        <nav className="space-y-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 ${pathname === item.href ? "bg-black/[.05] dark:bg-white/[.06]" : "hover:bg-black/[.04] dark:hover:bg-white/[.06]"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="flex-1">{children}</section>
    </div>
  );
}


