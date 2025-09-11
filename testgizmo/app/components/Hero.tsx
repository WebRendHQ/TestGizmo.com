import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-start overflow-hidden pt-20 md:pt-28">
      {/* Full-bleed background video */}
      <video
        id="hero-video-bg"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        style={{ WebkitMaskImage: "linear-gradient(to bottom, black 92%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 92%, transparent 100%)" }}
      >
        <source src="/videos/placeholder.mp4" type="video/mp4" />
      </video>
      {/* Subtle top gradient to lift text while video plays underneath */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 w-full">
        <div className="text-center">
          <p className="text-sm md:text-base uppercase tracking-widest text-foreground/60">The AI add-on Blender needs</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-semibold tracking-tight">
            Gizmo - AI for Blender
          </h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/70">
            AI chat that helps you model, rig, shade, and render... but faster.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 rounded-full px-3 py-2 bg-black/[.03] dark:bg-white/[.06] border border-black/[.06] dark:border-white/[.10] shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70">
              <a
                id="download-now"
                href="/downloads/gizmo.zip.txt"
                download
                className="inline-flex items-center rounded-full bg-foreground text-background px-5 h-10 text-sm font-medium transition-colors transition-transform duration-200 hover:bg-white hover:text-black hover:shadow-md hover:-translate-y-0.5"
                aria-label="Download Gizmo now"
              >
                Download now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


