import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { client } from "@/src/sanity/lib/client";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const NAVBAR_QUERY = `
  *[_type == "navbar"][0] {
    "logoImage": logoImage.asset->url,
    logoAlt,
    brandFirst,
    brandAccent,
    accentColor,
    links[] { label, href },
    ctaLabel,
    ctaHref
  }
`;

export const metadata: Metadata = {
  title: "Far Out Media | Premium Videography Services in Charlotte",
  description: "Videography built on quality, reliability, and value.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarData = await client.fetch(NAVBAR_QUERY);
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Navbar data={navbarData ?? undefined} />
        {children}
      </body>
    </html>
  );
}
