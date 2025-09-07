export default function Footer() {
  return (
    <footer className="w-full border-t border-black/[.06] dark:border-white/[.08] mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-center text-foreground/70">
        <p>© {new Date().getFullYear()} Gizmo</p>
      </div>
    </footer>
  );
}


