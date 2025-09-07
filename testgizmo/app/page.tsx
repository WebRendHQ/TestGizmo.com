import Hero from "./components/Hero";
import Students from "./components/Students";
import Testimonials from "./components/Testimonials";
import Privacy from "./components/Privacy";
import WritingSection from "./components/WritingSection";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <WritingSection />
      <Students />
      <Testimonials />
      <Privacy />
      <section id="early-access" className="w-full py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Bring your tabs to life</h2>
          <p className="mt-3 text-foreground/70">Gizmo is currently in Beta. Available on Apple macOS 14+ with M1 or later.</p>
          <div className="mt-6 inline-flex rounded-full border border-black/[.08] dark:border-white/[.14] px-2 py-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-4 outline-none text-sm w-56"
            />
            <button className="rounded-full bg-foreground text-background px-5 h-10 text-sm font-medium">Get early access</button>
          </div>
        </div>
      </section>
    </main>
  );
}
