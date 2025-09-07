type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Gizmo helps me localize content for Brazil. When I'm stuck, it suggests words for a Brazilian audience.",
    name: "Pedro",
    title: "Digital Strategist",
  },
  {
    quote:
      "Gizmo is my engineering tutor: it answers questions in-line and gives me practice problems.",
    name: "Quinn",
    title: "Engineering Student",
  },
  {
    quote:
      "It helped me pick SaaS tools for my team, comparing options with context on what matters most.",
    name: "Mohaned",
    title: "Designer & Fullstack Dev",
  },
  {
    quote:
      "It cuts the busywork. With just a prompt and tabs, I find sources in minutes, not hours.",
    name: "Vitus",
    title: "Student Journalist",
  },
  {
    quote:
      "Personalization is a secret weapon to stay pitch perfect across all our client brands.",
    name: "Kimberly",
    title: "Agency Director",
  },
  {
    quote:
      "There's a ton of context, but Gizmo helps me solve problems super fast.",
    name: "Los",
    title: "Product Engineer",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Gizmo is for You</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <blockquote
              key={idx}
              className="rounded-xl border border-black/[.08] dark:border-white/[.12] p-5 bg-background/70"
            >
              <p className="text-sm md:text-base">“{t.quote}”</p>
              <footer className="mt-4 text-sm text-foreground/70">
                <span className="font-medium">{t.name}</span> · {t.title}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}


