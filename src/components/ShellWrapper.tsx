"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { NavbarData } from "./Navbar";
import type { FooterData } from "./Footer";

export default function ShellWrapper({
  navbar,
  footer,
  children,
}: {
  navbar: NavbarData | null;
  footer: FooterData | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  return (
    <>
      {!isStudio && <Navbar data={navbar ?? undefined} />}
      {children}
      {!isStudio && <Footer data={footer ?? undefined} />}
    </>
  );
}