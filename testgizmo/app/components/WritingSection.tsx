import AutoVideo from "./AutoVideo";

export default function WritingSection() {
  return (
    <section id="skills" className="w-full py-20 md:py-28">
      <div className="mx-auto max-w-[90rem] px-4">
        <div className="space-y-16 md:space-y-24">
          {[0, 1, 2].map((i) => (
            <div key={i} className="">
              <div className="text-center">
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-runner)' }}>
                  A writing partner in every text box
                </h3>
                <p className="mt-3 text-base md:text-xl text-foreground/80">
                  An extra set of eyes to always hit your quality bar
                </p>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="relative w-full max-w-[90rem] aspect-[16/9] max-h-[860px]">
                  <AutoVideo
                    src="/videos/placeholder.mp4"
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


