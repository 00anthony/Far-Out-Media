import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { client } from "@/src/sanity/lib/client";
import Navbar from "../components/Navbar";
import { footer } from "../sanity/schemaTypes/Footer"
import Footer from "../components/Footer";
import type { FooterData } from "../components/Footer";

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

const FOOTER_QUERY = `*[_type == "footer"][0] {
  brandFirst, brandAccent, accentColor, tagline,
  contactItems[] { text, href },
  socialLinks[] { platform, href },
  navLinks[] { label, href },
  legalName, privacyHref, termsHref
}`;

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
  const footerData: FooterData | null = await client.fetch(FOOTER_QUERY);

  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Navbar data={navbarData ?? undefined} />
        {children}
        <Footer data={footerData ?? undefined} />
      </body>
    </html>
  );
}
