import Hero from "./components/Hero";
import Features from "./components/WritingSection";
// import Students from "./components/Students";
import FAQ from "./components/FAQ";
import ArtistsTestimonials from "./components/ArtistsTestimonials";
import TrustedBy from "./components/TrustedBy";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <TrustedBy />
      <Features />
      {/* Students section removed as requested */}
      <ArtistsTestimonials />
      <section id="early-access" className="w-full py-16 md:py-24 min-h-[80vh]">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Bring your tabs to life</h2>
          <p className="mt-3 text-foreground/70">Gizmo is available on Blender 4+.</p>
          <div className="mt-6 inline-flex rounded-full border border-black/[.08] dark:border-white/[.14] px-2 py-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-4 outline-none text-sm w-56"
            />
            <button className="rounded-full bg-foreground text-background px-5 h-10 text-sm font-medium">Get early access</button>
          </div>
          <div className="mt-12 text-left">
            <FAQ />
          </div>
        </div>
      </section>
    </main>
  );
}
