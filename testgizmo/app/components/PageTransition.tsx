"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useRef } from "react";

type TransitionContextValue = {
  navigateWithFade: (href: string) => Promise<void>;
  overlayControls: ReturnType<typeof useAnimationControls>;
  pathname: string | null;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export const usePageTransition = (): TransitionContextValue => {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within PageTransition");
  return ctx;
};

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const overlayControls = useAnimationControls();
  const hasPendingNavRef = useRef(false);

  useEffect(() => {
    if (hasPendingNavRef.current) {
      overlayControls.start({
        opacity: 0,
        backdropFilter: "blur(0px)",
        transition: { duration: 0.35, ease: "easeInOut" },
      });
      hasPendingNavRef.current = false;
    }
  }, [pathname, overlayControls]);

  const navigateWithFade = async (href: string) => {
    hasPendingNavRef.current = true;
    await overlayControls.start({
      opacity: 1,
      backdropFilter: "blur(12px)",
      transition: { duration: 0.25, ease: "easeInOut" },
    });
    router.push(href);
  };

  return (
    <TransitionContext.Provider value={{ navigateWithFade, overlayControls, pathname }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function ContentTransition({ children }: { children: React.ReactNode }) {
  const { overlayControls, pathname } = usePageTransition();

  return (
    <div className="relative">
      <AnimatePresence initial={false}>
        <motion.div
          key={pathname || "root"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{ willChange: "opacity" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {/* Overlay only within content area, not covering navbar */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={overlayControls}
        className="pointer-events-none absolute inset-0 z-40 bg-white/90 dark:bg-black/90"
        style={{ willChange: "opacity, backdrop-filter" }}
      />
    </div>
  );
}


