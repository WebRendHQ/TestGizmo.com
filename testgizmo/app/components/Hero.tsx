import CTAButton from "./CTAButton";

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
          <p className="text-sm uppercase tracking-widest text-foreground/60">A new AI browser</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
            Chat with your tabs
          </h1>
          <p className="mt-4 text-base md:text-lg text-foreground/70">
            A writing partner, tutor, planner, and retail concierge wherever you browse.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <CTAButton href="#early-access" id="early-access">Get early access</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}


