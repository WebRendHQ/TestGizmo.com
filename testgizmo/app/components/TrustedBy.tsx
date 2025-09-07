import Image from "next/image";

export default function TrustedBy() {
  const logos = [
    { src: "/logos/trustedby/odesza.png", alt: "Odesza" },
    { src: "/logos/trustedby/blender.png", alt: "Blender" },
    { src: "/logos/trustedby/stripe.png", alt: "Stripe" },
    { src: "/logos/trustedby/amazon.png", alt: "Amazon" },
    { src: "/logos/trustedby/lumaai.png", alt: "Luma AI" },

  ];

  return (
    <section className="w-full py-10 md:py-14">
      <div className="w-full px-4">
        <p className="text-center text-[10px] md:text-xs tracking-[0.18em] text-foreground/50">
          TRUSTED BY ENGINEERS AT
        </p>
        <div className="mt-6 md:mt-8 mx-auto max-w-[110rem]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-10 gap-y-8 place-items-center opacity-90">
            {logos.map((logo, idx) => (
              <Image
                key={idx}
                src={logo.src}
                alt={logo.alt}
                width={190}
                height={54}
                className="grayscale"
                style={{ maxWidth: "190px", height: "auto" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


