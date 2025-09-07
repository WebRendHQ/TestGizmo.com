import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AuthProvider from "@/app/providers/AuthProvider";
import PageTransitionProvider, { ContentTransition } from "@/app/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const runner = Rajdhani({
  variable: "--font-runner",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const headings = Montserrat({
  variable: "--font-headings",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const genova = localFont({
  variable: "--font-genova",
  src: [
    { path: "./fonts/genova/Genova.otf", weight: "500", style: "normal" },
    { path: "./fonts/genova/Genova-Thin.otf", weight: "300", style: "normal" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gizmo - AI for Blender",
  description:
    "Gizmo is an AI-first browser experience: writing partner, tutor, planner, and shopping concierge in every tab.",
  metadataBase: new URL("https://testgizmo.com"),
  icons: {
    icon: "/logos/flavicon.png",
  },
  openGraph: {
    title: "Gizmo - AI for Blender",
    description:
      "An AI partner in every tab: write faster, learn deeper, plan smarter, and shop wiser.",
    url: "https://testgizmo.com",
    siteName: "Gizmo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gizmo - AI for Blender",
    description:
      "An AI partner in every tab: write faster, learn deeper, plan smarter, and shop wiser.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${runner.variable} ${headings.variable} ${genova.variable} antialiased`}
      >
        <AuthProvider>
          <PageTransitionProvider>
            <Header />
            <ContentTransition>
              {children}
            </ContentTransition>
            <Footer />
          </PageTransitionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
