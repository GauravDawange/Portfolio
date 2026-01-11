import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creative Portfolio",
  description: "Digital Strategist & Creative Designer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(outfit.className, "bg-background text-foreground antialiased")}>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <svg className="hidden">
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </svg>
      </body>
    </html>
  );
}
