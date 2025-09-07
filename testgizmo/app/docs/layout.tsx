export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-[80vh] px-6 md:px-12 py-10">
      {children}
    </main>
  );
}


