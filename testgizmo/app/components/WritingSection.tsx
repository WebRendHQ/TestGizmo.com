import AutoVideo from "./AutoVideo";

export default function WritingSection() {
  return (
    <section id="features" className="w-full py-20 md:py-28">
      <div className="mx-auto max-w-[90rem] px-4">
        <div className="space-y-16 md:space-y-24">
          {[
            {
              title: "Another AI tool?",
              subtitle: "Gizmo let's you model, rig, shade, and render... faster.",
              src: "/videos/writing.mp4",
            },
            {
              title: "Knows your collections",
              subtitle: "Gizmo reads your assets in Blender and can edit, find, or create new ones.",
              src: "/videos/learning.mp4",
            },
            {
              title: "Ah, I know you!",
              subtitle: "Familiar interface, using enterprise models to modify your scene in real-time.",
              src: "/videos/planning.mp4",
            },
          ].map((item, idx) => (
            <div key={idx} className="">
              <div className="text-center">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-runner)' }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-foreground/80">
                  {item.subtitle}
                </p>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="relative w-full max-w-[90rem] aspect-[16/9] max-h-[860px]">
                  <AutoVideo
                    src={item.src}
                    className="absolute inset-0 h-full w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


