import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { client } from "@/src/sanity/lib/client";
import ShellWrapper from "../components/ShellWrapper";
import Navbar from "../components/Navbar";
import type { NavbarData } from "../components/Navbar";
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
  metadataBase: new URL("https://faroutmediaco.com"),

  title: "Far Out Media | Premium Videography Services in Charlotte",
  description: "Premium videography services in Charlotte specializing in real estate, events, and social media content. High-quality visuals that elevate your brand.",
  keywords: [
    "videography Charlotte",
    "real estate videography",
    "event videography",
    "drone videography",
    "social media content creation",
  ],
  icons: {
      icon: "/Far-Out-Media-Logo.svg", // 👈 points to your new PNG
  },

  openGraph: {
    title: "Far Out Media | Premium Videography Services in Charlotte",
    description:
      "Premium videography services in Charlotte specializing in real estate, events, and social media content. High-quality visuals that elevate your brand.",
    images: ['/Far-Out-Media-Logo.svg'],
  },

  twitter: {
    card: 'summary_large_image',
    title: "Far Out Media | Premium Videography Services in Charlotte",
    description:
      "Premium videography services in Charlotte specializing in real estate, events, and social media content. High-quality visuals that elevate your brand.",
    images: ['/Far-Out-Media-Logo.svg'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navbarData, footerData] = await Promise.all([
    client.fetch<NavbarData | null>(NAVBAR_QUERY),
    client.fetch<FooterData | null>(FOOTER_QUERY),
  ]);

  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <ShellWrapper navbar={navbarData} footer={footerData}>
          {children}
        </ShellWrapper>
      </body>
    </html>
  );
}
