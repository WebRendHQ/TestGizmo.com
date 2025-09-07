import { PropsWithChildren, ReactNode } from "react";

type SectionProps = PropsWithChildren<{
  id?: string;
  title?: string | ReactNode;
  subtitle?: string;
}>;

export default function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {title && (
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
            {subtitle && (
              <p className="mt-2 text-base text-foreground/70 max-w-2xl">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}


