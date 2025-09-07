type Feature = {
  title: string;
  points: string[];
};

const groups: { heading: string; description: string; features: Feature[] }[] = [
  // Writing is showcased as its own section now
  {
    heading: "TestGizmo is for Learning",
    description: "A tutor in every tab with instant summaries and perspectives.",
    features: [
      {
        title: "Break down complex topics",
        points: ["Step-by-step", "Real examples", "Practice problems"],
      },
      {
        title: "YouTube timestamps",
        points: ["Jump to key moments", "Skim faster"],
      },
    ],
  },
  {
    heading: "TestGizmo is for Planning",
    description: "A personal assistant already up to speed.",
    features: [
      {
        title: "Instant to-do lists",
        points: ["Actionable tasks", "Shareable"],
      },
      {
        title: "Translate on demand",
        points: ["Communicate clearly", "Anywhere"],
      },
    ],
  },
  {
    heading: "TestGizmo is for Shopping",
    description: "A retail concierge wherever you browse.",
    features: [
      {
        title: "Review blitz",
        points: ["Summarize reviews", "Find pros & cons"],
      },
      {
        title: "Compare products",
        points: ["Specs & prices", "Right fit for you"],
      },
    ],
  },
];

export default function Features() {
  return (
    <section id="skills" className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {groups.map((group, idx) => (
          <div key={idx} className="mt-10 first:mt-0">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
              {group.heading}
            </h3>
            <p className="mt-2 text-foreground/70">{group.description}</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {group.features.map((f, fidx) => (
                <div
                  key={fidx}
                  className="rounded-xl border border-black/[.08] dark:border-white/[.12] p-5"
                >
                  <h4 className="text-base font-medium">{f.title}</h4>
                  <ul className="mt-3 list-disc pl-5 text-sm text-foreground/80">
                    {f.points.map((p, pidx) => (
                      <li key={pidx}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


