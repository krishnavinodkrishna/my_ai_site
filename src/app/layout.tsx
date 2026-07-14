import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import { LeadProvider } from "@/lead";
import { LenisInit } from "@/components/LenisInit";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAX | Style That Defines You",
  description: "Explore premium fashion, luxury watches, handbags, footwear, accessories, and more. Quality products delivered straight to your doorstep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="antialiased bg-brand-beige text-brand-green font-sans">
        <LenisInit />
        <LeadProvider>{children}</LeadProvider>
      </body>
    </html>
  );
}
