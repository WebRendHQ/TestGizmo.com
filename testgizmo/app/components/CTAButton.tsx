import { PropsWithChildren } from "react";

type CTAButtonProps = PropsWithChildren<{
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  id?: string;
}>;

export default function CTAButton({ href = "#", onClick, children, variant = "primary", id }: CTAButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full h-12 px-6 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:opacity-90"
      : "border border-black/[.08] dark:border-white/[.14] hover:bg-black/[.04] dark:hover:bg-white/[.06]";

  if (href) {
    return (
      <a id={id} href={href} className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }
  return (
    <button id={id} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}


