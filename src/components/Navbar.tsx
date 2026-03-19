"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   TYPES — mirror the Sanity `navbar` schema
───────────────────────────────────────────────────────────────────── */
export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarData {
  logoImage: string;       // resolved image URL from Sanity
  logoAlt: string;
  brandFirst: string;      // e.g. "Far Out"
  brandAccent: string;     // e.g. "Media" — rendered in accent color
  accentColor: string;     // hex, e.g. "#C2B280"
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}

const DEFAULTS: NavbarData = {
  logoImage: "/Far-Out-Media-Logo-1024x1014.jpg",
  logoAlt: "Far Out Media logo",
  brandFirst: "Far Out",
  brandAccent: "Media",
  accentColor: "#C2B280",
  links: [
    { label: "Work",     href: "/#work" },
    { label: "About",    href: "/#about" },
    { label: "Services", href: "/services" },
    { label: "Process",  href: "/#process" },
  ],
  ctaLabel: "Get a Quote",
  ctaHref: "/#contact",
};

/* ─────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────── */
export default function Navbar({ data }: { data?: NavbarData | null }) {
  const d = data ?? DEFAULTS;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change / hash link tap
  const handleNavClick = () => setMenuOpen(false);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-inter ${
          scrolled || menuOpen
            ? "bg-black/90 backdrop-blur-lg border-b border-neutral-500/10 py-4"
            : "bg-transparent py-6 border-b border-white/0"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* ── Logo ── */}
          <a href="/" className="flex items-center space-x-2 shrink-0 z-10">
            <img
              src={d.logoImage}
              alt={d.logoAlt}
              className="w-8 h-8 object-cover"
            />
            <span className="text-xl font-bold tracking-widest uppercase">
              {d.brandFirst}{" "}
              <span style={{ color: d.accentColor }}>{d.brandAccent}</span>
            </span>
          </a>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex space-x-10 text-xs font-semibold tracking-widest uppercase text-gray-400">
            {d.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA + Mobile hamburger ── */}
          <div className="flex items-center gap-4">
            <a
              href={d.ctaHref}
              className="hidden md:inline-block px-6 py-2 border border-white/20 text-xs font-bold tracking-widest uppercase transition-all duration-300"
              style={
                {
                  "--accent": d.accentColor,
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = d.accentColor;
                (e.currentTarget as HTMLElement).style.color = d.accentColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLElement).style.color = "";
              }}
            >
              {d.ctaLabel}
            </a>

            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden relative z-10 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
                className="block w-6 h-px bg-white origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-px bg-white"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
                className="block w-6 h-px bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col pt-28 pb-12 px-8 md:hidden"
          >
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-100 h-75 rounded-full blur-[120px] opacity-10"
              style={{ background: d.accentColor }}
            />

            {/* Nav links */}
            <nav className="flex flex-col gap-1 flex-1">
              {d.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 + i * 0.07, ease }}
                  className="group flex items-center justify-between py-5 border-b border-white/6 text-3xl font-black tracking-tight text-white/60 hover:text-white transition-colors duration-200"
                >
                  <span>{link.label}</span>
                  <svg
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              ))}
            </nav>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease }}
              className="mt-10 flex flex-col gap-4"
            >
              <a
                href={d.ctaHref}
                onClick={handleNavClick}
                className="w-full py-5 text-center text-sm font-black uppercase tracking-[0.2em] text-black"
                style={{ background: d.accentColor }}
              >
                {d.ctaLabel}
              </a>
              <p className="text-center text-[10px] tracking-[0.4em] uppercase text-zinc-600">
                Charlotte, NC &amp; Worldwide
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}