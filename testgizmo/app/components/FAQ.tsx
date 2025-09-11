import Image from "next/image";
type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is Gizmo?",
    answer:
      "Gizmo is a Blender addon that brings AI assistance into Blender to help you model, rig, shade, and render faster.",
  },
  {
    question: "Which platforms are supported?",
    answer: "Gizmo is available on Blender 4+.",
  },
  {
    question: "Is there a free trial?",
    answer: "We offer a free beta. Paid plans and usage limits are shown on the pricing page.",
  },
  {
    question: "How does billing work?",
    answer: "Billing is handled securely via Stripe. You can manage your subscription in the customer portal.",
  },
];

export default function FAQ() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Frequently Asked Questions</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-black/[.08] dark:border-white/[.12] p-5 bg-background/70"
          >
            <h3 className="text-base md:text-lg font-medium">{item.question}</h3>
            <p className="mt-2 text-sm md:text-base text-foreground/70">{item.answer}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <div className="inline-flex items-center gap-3 rounded-full px-3 py-2 bg-black/[.03] dark:bg-white/[.06] border border-black/[.06] dark:border-white/[.10] shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <a
            href="/downloads/gizmo.zip.txt"
            download
            className="inline-flex items-center rounded-full bg-foreground text-background px-5 h-10 text-sm font-medium transition-colors transition-transform duration-200 hover:bg-white hover:text-black hover:shadow-md hover:-translate-y-0.5"
            aria-label="Download Gizmo now"
          >
            Download now
          </a>
          <div className="flex items-center gap-2 pr-1">
            <Image src="/logos/logo.png" alt="Gizmo" width={28} height={28} className="block dark:hidden" />
            <Image src="/logos/logo_white.png" alt="Gizmo" width={28} height={28} className="hidden dark:block" />
          </div>
        </div>
      </div>
    </div>
  );
}


