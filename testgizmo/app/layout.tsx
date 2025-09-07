import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AuthProvider from "@/app/providers/AuthProvider";

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

export const metadata: Metadata = {
  title: "Gizmo – Chat with your tabs",
  description:
    "Gizmo is an AI-first browser experience: writing partner, tutor, planner, and shopping concierge in every tab.",
  metadataBase: new URL("https://testgizmo.com"),
  openGraph: {
    title: "Gizmo – Chat with your tabs",
    description:
      "An AI partner in every tab: write faster, learn deeper, plan smarter, and shop wiser.",
    url: "https://testgizmo.com",
    siteName: "Gizmo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gizmo – Chat with your tabs",
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
        className={`${geistSans.variable} ${geistMono.variable} ${runner.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
