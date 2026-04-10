"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   TYPES — mirror the Sanity `footer` schema
───────────────────────────────────────────────────────────────────── */
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  platform: string;
  href: string;
}

export interface FooterContactItem {
  text: string;
  href?: string; // optional — makes the item a link (e.g. mailto:)
}

export interface FooterData {
  brandFirst: string;
  brandAccent: string;
  accentColor: string;
  tagline: string;
  contactItems: FooterContactItem[];
  socialLinks: FooterSocialLink[];
  navLinks: FooterLink[];
  legalName: string;       // e.g. "Far Out Media Co."
  privacyHref: string;
  termsHref: string;
}

/* ─────────────────────────────────────────────────────────────────────
   DEFAULTS
───────────────────────────────────────────────────────────────────── */
const DEFAULTS: FooterData = {
  brandFirst: "Far Out",
  brandAccent: "Media",
  accentColor: "#C2B280",
  tagline: "Premium cinematic videography and storytelling. Elevating brands through intentional motion and drone artistry.",
  contactItems: [
    { text: "cam@faroutmediaco.com", href: "mailto:cam@faroutmediaco.com" },
    { text: "Charlotte, NC" },
    { text: "FAA Licensed Drone Operator" },
  ],
  socialLinks: [
    { platform: "Instagram", href: "https://instagram.com" },
    { platform: "Vimeo",     href: "https://vimeo.com" },
    { platform: "TikTok",    href: "https://tiktok.com" },
  ],
  navLinks: [
    { label: "Work",     href: "/#work" },
    { label: "About",    href: "/#about" },
    { label: "Services", href: "/services" },
    { label: "Process",  href: "/#process" },
    { label: "Contact",  href: "/#contact" },
  ],
  legalName: "Far Out Media Co.",
  privacyHref: "#",
  termsHref: "#",
};

const ease = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────── */
export default function Footer({ data }: { data?: FooterData | null }) {
  const d: FooterData = data ?? DEFAULTS;

  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer ref={ref} className="relative bg-black border-t border-white/5 overflow-hidden">

      {/* ── Grain ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ── Ambient glow ── */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-75 rounded-full blur-[140px] opacity-[0.05]"
        style={{ background: d.accentColor }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* ── Large brand wordmark ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="pt-20 pb-16 border-b border-white/5"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

            {/* Oversized logotype */}
            <a
              href="/"
              className="group flex items-baseline gap-3 leading-none"
            >
              <span className="text-5xl md:text-7xl font-black tracking-tighter text-white transition-opacity duration-300 group-hover:opacity-80">
                {d.brandFirst}
              </span>
              <span
                className="text-5xl md:text-7xl font-black tracking-tighter transition-opacity duration-300 group-hover:opacity-80"
                style={{ color: d.accentColor }}
              >
                {d.brandAccent}
              </span>
            </a>

            {/* Tagline + CTA */}
            <div className="flex flex-col gap-5 md:items-end max-w-xs md:max-w-sm">
              <p className="text-zinc-500 text-sm leading-relaxed md:text-right">
                {d.tagline}
              </p>
              <a
                href="/#contact"
                className="group relative self-start md:self-end px-8 py-3 border border-white/10 text-xs font-black uppercase tracking-[0.2em] text-white overflow-hidden transition-colors duration-300 hover:border-[#C2B280]/50"
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ background: `${d.accentColor}1a` }}
                />
                <span className="relative z-10">Start a Project</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Middle grid ── */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/5">

          {/* Nav links */}
          

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              {d.contactItems.map((item, i) => (
                <li key={i}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-sm text-zinc-500">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-6">
              Follow
            </h4>
            <ul className="space-y-3">
              {d.socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    <span
                      className="w-0 h-px transition-all duration-300 group-hover:w-4"
                      style={{ background: d.accentColor }}
                    />
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Status card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="flex flex-col gap-4"
          >
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
              Status
            </h4>
            {/* Availability badge */}
            <div className="flex items-center gap-2.5 px-3 py-2 border border-white/6 w-fit">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                style={{ background: d.accentColor }}
              />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-400">
                Accepting Projects
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 leading-relaxed">
              Charlotte, NC<br />
            </p>
          </motion.div>

        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="py-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-700">
            &copy; {new Date().getFullYear()} {d.legalName}. All rights reserved.
          </span>

          <div className="flex items-center gap-6">
            <a
              href={d.privacyHref}
              className="text-[10px] uppercase tracking-[0.35em] text-zinc-700 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span className="w-px h-3 bg-white/10" />
            <a
              href={d.termsHref}
              className="text-[10px] uppercase tracking-[0.35em] text-zinc-700 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}