"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
 

export default function ArtistsTestimonials() {
  const testimonials = [
    { quote: "Gizmo turned sculpting into a conversation. My meshes finally match my vision.", name: "Alex R.", title: "Blender Artist" },
    { quote: "UVs, retopo, naming – the boring parts got easier, so I spend time on form.", name: "Mina K.", title: "Character Modeler" },
    { quote: "It suggests modifiers like a senior on my shoulder. Subtle, accurate, fast.", name: "Diego S.", title: "Hard‑Surface" },
    { quote: "Shader nodes clicked for me. Gizmo explains and builds them with me in real time.", name: "Tara P.", title: "LookDev" },
    { quote: "The rig tips saved hours. Weight paint hints were creepily good.", name: "Noah V.", title: "Rigger" },
    { quote: "Asset prep for Unity went from chaos to calm. Export presets just work.", name: "Harper L.", title: "Tech Art" },
    { quote: "I storyboard in grease pencil – Gizmo helped block camera moves like a DP.", name: "Jen C.", title: "Previs" },
    { quote: "It caught flipped normals and non‑manifold junk before I did. Lifesaver.", name: "Owen D.", title: "Enviro Artist" },
    { quote: "Baked a clean normal set on the first try. I’m not going back.", name: "Kay M.", title: "Props" },
    { quote: "Explaining bevel weights in my terms was wild. It learns my style notes.", name: "Rin W.", title: "Freelance" },
    { quote: "Cycles tweaks felt like magic sliders tailored to my scene.", name: "Mark A.", title: "Lighting" },
    { quote: "I ask for ‘game‑ready’ and it reminds me of tri budget, packs, and LODs.", name: "Sami G.", title: "Games" },
    // New cards
    { quote: "Grease pencil to 3D was smoother than ever. Gizmo handled the transitions.", name: "Lena Q.", title: "Storyboard" },
    { quote: "Retopo suggestions landed perfectly for my baking workflow.", name: "Brent Y.", title: "Realtime" },
    { quote: "Curve bevel and array setups in seconds – it reads my mind.", name: "Pia F.", title: "Motion Design" },
    { quote: "Gizmo reminded me to pack UDIMs before export. Saved a render day.", name: "Ivan H.", title: "Texturing" },
    { quote: "Camera rigs feel cinematic without the fuss.", name: "Sora T.", title: "Cinematics" },
    { quote: "The tips on bevel weight + normals made my edges sing.", name: "Mikel D.", title: "Hardsurface" },
  ];

  const ref = useRef<HTMLDivElement | null>(null);
  const xMV = useMotionValue(0);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const n = Math.max(-1, Math.min(1, (x - 0.5) * 2)); // -1..1
    xMV.set(n);
  }

  function onLeave() {
    animate(xMV, 0, { type: "tween", duration: 0.4, ease: "easeInOut" });
  }

  const rows = 3; // exactly three rows
  const perRow = Math.ceil(testimonials.length / rows);
  const grid: { quote: string; name: string; title: string }[][] = Array.from({ length: rows }, (_, r) =>
    testimonials.slice(r * perRow, r * perRow + perRow)
  );

  const speeds = [22, 16, 12]; // translate multiplier per row
  // Precompute transforms per row to satisfy hooks rules
  const rowTx0 = useTransform(xMV, (v) => `${v * speeds[0] * 1}px`);
  const rowTx1 = useTransform(xMV, (v) => `${v * speeds[1] * -1}px`);
  const rowTx2 = useTransform(xMV, (v) => `${v * speeds[2] * 1}px`);

  return (
    <section className="w-full py-16 md:py-24" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={ref} className="w-full px-4 overflow-hidden">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Loved by Blender artists</h2>
          <p className="mt-2 text-foreground/70 text-sm md:text-base">
            Artists choose Gizmo to model, rig, shade, and render faster.
          </p>
        </div>

        <div
          className="mt-10 space-y-6 relative"
          style={{
            WebkitMaskImage:
              "radial-gradient(closest-side at 50% 50%, black 70%, transparent 100%)",
            maskImage:
              "radial-gradient(closest-side at 50% 50%, black 70%, transparent 100%)",
          }}
        >
          {[rowTx0, rowTx1, rowTx2].map((tx, rIdx) => (
              <motion.div
                key={rIdx}
                style={{ translateX: tx }}
                className="flex gap-4 md:gap-6 whitespace-nowrap"
              >
                {grid[rIdx]?.map((t, i) => (
                  <div
                    key={`${t.name}-${i}`}
                    className="rounded-2xl border border-black/[.06] dark:border-white/[.10] px-6 py-5 md:px-7 md:py-6 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-black/[.02] dark:bg-white/[.06] shrink-0 flex flex-col justify-between overflow-hidden whitespace-normal"
                    style={{ width: "min(90vw, 380px)" }}
                  >
                    <p
                      className="text-sm md:text-base leading-7 md:leading-8 text-foreground/90 whitespace-normal break-words"
                      style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", fontFamily: "var(--font-genova)" }}
                    >
                      “{t.quote}”
                    </p>
                    <footer className="mt-5 text-sm text-foreground/70 whitespace-normal" style={{ fontFamily: "var(--font-genova)" }}>
                      <span className="font-medium">{t.name}</span> · {t.title}
                    </footer>
                  </div>
                ))}
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


